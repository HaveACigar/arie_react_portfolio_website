#!/usr/bin/env python3
"""Fetch and wrangle NYC 311 service requests into RAG documents, then ingest into API."""

from __future__ import annotations

import argparse
import json
import re
import ssl
from collections import Counter, defaultdict
from datetime import UTC, datetime, timedelta
from pathlib import Path
from typing import Any
from urllib.parse import urlencode
from urllib.request import Request, urlopen

NYC_311_ENDPOINT = "https://data.cityofnewyork.us/resource/erm2-nwe9.json"

BOROUGH_MAP = {
    "BROOKLYN": "Brooklyn",
    "MANHATTAN": "Manhattan",
    "QUEENS": "Queens",
    "BRONX": "Bronx",
    "STATEN ISLAND": "Staten Island",
    "UNSPECIFIED": "Unspecified",
    "": "Unspecified",
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Ingest real NYC 311 data into the RAG API.")
    parser.add_argument("--api-base-url", default="http://localhost:8000", help="RAG API base URL")
    parser.add_argument("--limit", type=int, default=2000, help="Max records to fetch")
    parser.add_argument("--days", type=int, default=30, help="Lookback window in days")
    parser.add_argument(
        "--output",
        default="data/nyc311_documents.json",
        help="Where to write wrangled documents JSON",
    )
    parser.add_argument("--no-ingest", action="store_true", help="Only fetch/wrangle and write JSON")
    parser.add_argument(
        "--allow-insecure-ssl",
        action="store_true",
        help="Disable SSL verification for source fetch as a local troubleshooting fallback.",
    )
    return parser.parse_args()


def _parse_dt(value: str | None) -> datetime | None:
    if not value:
        return None
    # Socrata timestamps are typically ISO8601 with trailing Z.
    cleaned = value.replace("Z", "+00:00")
    try:
        dt = datetime.fromisoformat(cleaned)
    except ValueError:
        return None
    return dt.astimezone(UTC)


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


def fetch_nyc_311(days: int, limit: int, allow_insecure_ssl: bool) -> list[dict[str, Any]]:
    since = (datetime.now(UTC) - timedelta(days=days)).strftime("%Y-%m-%dT%H:%M:%S")
    params = {
        "$select": ",".join(
            [
                "unique_key",
                "created_date",
                "closed_date",
                "agency",
                "complaint_type",
                "descriptor",
                "incident_zip",
                "borough",
                "status",
                "incident_address",
                "street_name",
                "cross_street_1",
                "cross_street_2",
                "latitude",
                "longitude",
            ]
        ),
        "$where": f"created_date >= '{since}'",
        "$order": "created_date DESC",
        "$limit": str(limit),
    }

    url = f"{NYC_311_ENDPOINT}?{urlencode(params)}"
    req = Request(url, headers={"Accept": "application/json"})
    with urlopen(req, timeout=60, context=_build_ssl_context(allow_insecure_ssl)) as response:
        payload = json.loads(response.read().decode("utf-8"))

    if not isinstance(payload, list):
        raise RuntimeError("NYC 311 API returned unexpected payload format.")

    return payload


def wrangle_to_documents(records: list[dict[str, Any]], days: int) -> list[dict[str, str]]:
    grouped: dict[tuple[str, str], list[dict[str, Any]]] = defaultdict(list)

    for row in records:
        complaint_type = (row.get("complaint_type") or "Unknown Complaint").strip()
        borough_raw = (row.get("borough") or "").strip().upper()
        borough = BOROUGH_MAP.get(borough_raw, borough_raw.title() if borough_raw else "Unspecified")
        grouped[(complaint_type, borough)].append(row)

    documents: list[dict[str, str]] = []

    for (complaint_type, borough), rows in sorted(grouped.items(), key=lambda item: len(item[1]), reverse=True):
        status_counts = Counter((r.get("status") or "UNKNOWN").strip().upper() for r in rows)
        descriptor_counts = Counter((r.get("descriptor") or "(missing descriptor)").strip() for r in rows)
        agency_counts = Counter((r.get("agency") or "UNKNOWN").strip() for r in rows)

        close_durations_hours: list[float] = []
        for r in rows:
            created = _parse_dt(r.get("created_date"))
            closed = _parse_dt(r.get("closed_date"))
            if created and closed and closed >= created:
                close_durations_hours.append((closed - created).total_seconds() / 3600)

        avg_close = sum(close_durations_hours) / len(close_durations_hours) if close_durations_hours else None

        # Build hard-to-wrangle narrative by preserving messy address components and partial geo fields.
        sample_lines: list[str] = []
        for sample in rows[:3]:
            address_parts = [
                (sample.get("incident_address") or "").strip(),
                (sample.get("street_name") or "").strip(),
                (sample.get("cross_street_1") or "").strip(),
                (sample.get("cross_street_2") or "").strip(),
            ]
            address = " | ".join(part for part in address_parts if part) or "address unavailable"
            lat = sample.get("latitude") or "?"
            lon = sample.get("longitude") or "?"
            sample_lines.append(
                f"- #{sample.get('unique_key', 'unknown')} status={sample.get('status', 'unknown')} "
                f"created={sample.get('created_date', 'unknown')} location={address} geo=({lat},{lon})"
            )

        top_descriptors = ", ".join(f"{name} ({count})" for name, count in descriptor_counts.most_common(5))
        top_agencies = ", ".join(f"{name} ({count})" for name, count in agency_counts.most_common(3))

        summary = [
            f"NYC 311 complaints summary for complaint type '{complaint_type}' in {borough}.",
            f"Time window: last {days} days.",
            f"Total complaints: {len(rows)}.",
            f"Status breakdown: {dict(status_counts)}.",
            f"Top descriptors: {top_descriptors or 'none'}.",
            f"Top agencies: {top_agencies or 'none'}.",
            (
                f"Average close time (hours): {avg_close:.2f}."
                if avg_close is not None
                else "Average close time unavailable due to missing timestamps."
            ),
            "Representative messy rows:",
            *sample_lines,
        ]

        documents.append(
            {
                "id": f"nyc311-{_slugify(complaint_type)}-{_slugify(borough)}",
                "title": f"NYC 311 | {complaint_type} | {borough}",
                "source": "nyc_311",
                "text": "\n".join(summary),
            }
        )

    return documents


def write_documents(path: str, docs: list[dict[str, str]]) -> None:
    out_path = Path(path)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(docs, indent=2), encoding="utf-8")


def ingest_documents(api_base_url: str, docs: list[dict[str, str]]) -> dict[str, Any]:
    ingest_url = f"{api_base_url.rstrip('/')}/ingest"
    body = json.dumps({"documents": docs}).encode("utf-8")
    req = Request(
        ingest_url,
        data=body,
        headers={"Content-Type": "application/json", "Accept": "application/json"},
        method="POST",
    )
    with urlopen(req, timeout=120) as response:
        return json.loads(response.read().decode("utf-8"))


def main() -> None:
    args = parse_args()
    records = fetch_nyc_311(days=args.days, limit=args.limit, allow_insecure_ssl=args.allow_insecure_ssl)
    documents = wrangle_to_documents(records=records, days=args.days)
    write_documents(args.output, documents)

    print(f"Fetched {len(records)} NYC 311 rows and built {len(documents)} RAG documents.")
    print(f"Wrote wrangled docs to: {args.output}")

    if args.no_ingest:
        print("Skipping ingest (--no-ingest set).")
        return

    ingest_result = ingest_documents(args.api_base_url, documents)
    print(f"Ingest API response: {json.dumps(ingest_result)}")


if __name__ == "__main__":
    main()
