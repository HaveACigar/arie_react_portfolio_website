#!/usr/bin/env python3
"""Fetch and wrangle Chicago crimes data into RAG documents, then ingest into API."""

from __future__ import annotations

import argparse
import json
import re
import ssl
from collections import Counter, defaultdict
from datetime import UTC, datetime, timedelta
from typing import Any
from urllib.parse import urlencode
from urllib.request import Request, urlopen

from ingest_nyc311 import ingest_documents, write_documents

CHICAGO_CRIME_ENDPOINT = "https://data.cityofchicago.org/resource/ijzp-q8t2.json"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Ingest real Chicago crimes data into the RAG API.")
    parser.add_argument("--api-base-url", default="http://localhost:8000", help="RAG API base URL")
    parser.add_argument("--limit", type=int, default=50000, help="Max total records to fetch (paginated)")
    parser.add_argument("--days", type=int, default=365, help="Lookback window in days")
    parser.add_argument("--page-size", type=int, default=50000, help="Records per Socrata page")
    parser.add_argument(
        "--output",
        default="data/chicago_crimes_documents.json",
        help="Where to write wrangled documents JSON",
    )
    parser.add_argument("--no-ingest", action="store_true", help="Only fetch/wrangle and write JSON")
    parser.add_argument(
        "--allow-insecure-ssl",
        action="store_true",
        help="Disable SSL verification for source fetch as a local troubleshooting fallback.",
    )
    return parser.parse_args()


def _slugify(text: str) -> str:
    lowered = text.lower().strip()
    lowered = re.sub(r"[^a-z0-9]+", "-", lowered)
    lowered = lowered.strip("-")
    return lowered or "unknown"


def _build_ssl_context(allow_insecure_ssl: bool) -> ssl.SSLContext:
    if allow_insecure_ssl:
        return ssl._create_unverified_context()
    try:
        import certifi

        return ssl.create_default_context(cafile=certifi.where())
    except Exception:
        return ssl.create_default_context()


def fetch_chicago_crimes(days: int, limit: int, allow_insecure_ssl: bool, page_size: int = 50000) -> list[dict[str, Any]]:
    since = (datetime.now(UTC) - timedelta(days=days)).strftime("%Y-%m-%dT%H:%M:%S")
    select_cols = ",".join(
        [
            "id",
            "date",
            "primary_type",
            "description",
            "location_description",
            "arrest",
            "domestic",
            "district",
            "beat",
            "block",
            "year",
            "latitude",
            "longitude",
        ]
    )
    ssl_ctx = _build_ssl_context(allow_insecure_ssl)
    all_rows: list[dict[str, Any]] = []
    offset = 0
    batch_size = min(page_size, 50000)  # Socrata hard cap is 50 000 per request

    while len(all_rows) < limit:
        fetch_count = min(batch_size, limit - len(all_rows))
        params = {
            "$select": select_cols,
            "$where": f"date >= '{since}'",
            "$order": "date DESC",
            "$limit": str(fetch_count),
            "$offset": str(offset),
        }
        url = f"{CHICAGO_CRIME_ENDPOINT}?{urlencode(params)}"
        req = Request(url, headers={"Accept": "application/json"})
        with urlopen(req, timeout=120, context=ssl_ctx) as response:
            page = json.loads(response.read().decode("utf-8"))

        if not isinstance(page, list):
            raise RuntimeError("Chicago crimes API returned unexpected payload format.")

        all_rows.extend(page)
        print(f"  Chicago crimes page offset={offset}: {len(page)} rows (total so far: {len(all_rows)})")

        if len(page) < fetch_count:
            break  # No more data available
        offset += len(page)

    return all_rows


def wrangle_to_documents(records: list[dict[str, Any]], days: int) -> list[dict[str, str]]:
    grouped: dict[tuple[str, str], list[dict[str, Any]]] = defaultdict(list)

    for row in records:
        primary_type = (row.get("primary_type") or "UNKNOWN").strip().upper()
        district = (row.get("district") or "UNSPECIFIED").strip()
        grouped[(primary_type, district)].append(row)

    docs: list[dict[str, str]] = []

    for (primary_type, district), rows in sorted(grouped.items(), key=lambda item: len(item[1]), reverse=True):
        arrests = sum(1 for row in rows if str(row.get("arrest", "")).lower() == "true")
        domestics = sum(1 for row in rows if str(row.get("domestic", "")).lower() == "true")
        top_descriptions = Counter((row.get("description") or "UNKNOWN").strip() for row in rows)

        sample_lines: list[str] = []
        for sample in rows[:3]:
            sample_lines.append(
                "- #{} date={} block={} beat={} loc={} arrest={} domestic={} geo=({}, {})".format(
                    sample.get("id", "unknown"),
                    sample.get("date", "unknown"),
                    sample.get("block", "unknown"),
                    sample.get("beat", "unknown"),
                    sample.get("location_description", "unknown"),
                    sample.get("arrest", "unknown"),
                    sample.get("domestic", "unknown"),
                    sample.get("latitude", "?"),
                    sample.get("longitude", "?"),
                )
            )

        docs.append(
            {
                "id": f"chicago-crime-{_slugify(primary_type)}-d{_slugify(district)}",
                "title": f"Chicago Crime | {primary_type} | District {district}",
                "source": "chicago_crimes",
                "text": "\n".join(
                    [
                        f"Chicago crimes summary for {primary_type} in district {district}.",
                        f"Time window: last {days} days.",
                        f"Total incidents: {len(rows)}.",
                        f"Arrest rate: {arrests}/{len(rows)} ({(arrests / len(rows)) * 100:.1f}%).",
                        f"Domestic flag rate: {domestics}/{len(rows)} ({(domestics / len(rows)) * 100:.1f}%).",
                        "Top descriptions: "
                        + ", ".join(f"{name} ({count})" for name, count in top_descriptions.most_common(5)),
                        "Representative messy rows:",
                        *sample_lines,
                    ]
                ),
            }
        )

    return docs


def main() -> None:
    args = parse_args()
    rows = fetch_chicago_crimes(days=args.days, limit=args.limit, allow_insecure_ssl=args.allow_insecure_ssl, page_size=args.page_size)
    docs = wrangle_to_documents(rows, days=args.days)
    write_documents(args.output, docs)

    print(f"Fetched {len(rows)} Chicago crime rows and built {len(docs)} RAG documents.")
    print(f"Wrote wrangled docs to: {args.output}")

    if args.no_ingest:
        print("Skipping ingest (--no-ingest set).")
        return

    ingest_result = ingest_documents(args.api_base_url, docs)
    print(f"Ingest API response: {json.dumps(ingest_result)}")


if __name__ == "__main__":
    main()
