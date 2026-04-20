#!/usr/bin/env python3
"""Fetch and wrangle SEC CompanyFacts data into RAG documents, then ingest into API."""

from __future__ import annotations

import argparse
import json
import re
import ssl
from collections import defaultdict
from datetime import UTC, datetime
from pathlib import Path
from typing import Any
from urllib.request import Request, urlopen

from ingest_nyc311 import ingest_documents, write_documents

SEC_COMPANYFACTS_URL = "https://data.sec.gov/api/xbrl/companyfacts/CIK{cik}.json"

# Hand-picked tickers with stable CIK mappings for portfolio demos.
DEFAULT_TICKERS_TO_CIK = {
    "AAPL": "0000320193",
    "MSFT": "0000789019",
    "AMZN": "0001018724",
    "TSLA": "0001318605",
    "NVDA": "0001045810",
}

PRIMARY_TAGS = [
    ("us-gaap", "Revenues", "Revenue"),
    ("us-gaap", "NetIncomeLoss", "Net income / loss"),
    ("us-gaap", "Assets", "Assets"),
    ("us-gaap", "Liabilities", "Liabilities"),
    ("us-gaap", "OperatingIncomeLoss", "Operating income / loss"),
    (
        "us-gaap",
        "NetCashProvidedByUsedInOperatingActivities",
        "Operating cash flow",
    ),
]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Ingest real SEC CompanyFacts data into the RAG API.")
    parser.add_argument("--api-base-url", default="http://localhost:8000", help="RAG API base URL")
    parser.add_argument(
        "--tickers",
        default="AAPL,MSFT,AMZN,TSLA,NVDA",
        help="Comma-separated ticker symbols to fetch",
    )
    parser.add_argument(
        "--sec-user-agent",
        default="RAGOpsPortfolio/1.0 (contact: arie@example.com)",
        help="SEC requires a descriptive User-Agent including contact info",
    )
    parser.add_argument(
        "--output",
        default="data/sec_companyfacts_documents.json",
        help="Where to write wrangled documents JSON",
    )
    parser.add_argument("--no-ingest", action="store_true", help="Only fetch/wrangle and write JSON")
    parser.add_argument(
        "--allow-insecure-ssl",
        action="store_true",
        help="Disable SSL verification for source fetch as a local troubleshooting fallback.",
    )
    return parser.parse_args()


def _build_ssl_context(allow_insecure_ssl: bool) -> ssl.SSLContext:
    if allow_insecure_ssl:
        return ssl._create_unverified_context()
    try:
        import certifi

        return ssl.create_default_context(cafile=certifi.where())
    except Exception:
        return ssl.create_default_context()


def _parse_date(value: str | None) -> datetime | None:
    if not value:
        return None
    try:
        return datetime.fromisoformat(value).replace(tzinfo=UTC)
    except ValueError:
        return None


def _safe_float(value: Any) -> float | None:
    try:
        return float(value)
    except (TypeError, ValueError):
        return None


def _slugify(text: str) -> str:
    lowered = text.lower().strip()
    lowered = re.sub(r"[^a-z0-9]+", "-", lowered)
    lowered = lowered.strip("-")
    return lowered or "unknown"


def _best_unit_series(tag_payload: dict[str, Any]) -> list[dict[str, Any]]:
    units = tag_payload.get("units") or {}
    if not isinstance(units, dict) or not units:
        return []

    # Pick the unit with most records as a pragmatic default for messy SEC facts.
    chosen_unit = max(units.items(), key=lambda item: len(item[1]))[0]
    series = units.get(chosen_unit) or []
    if not isinstance(series, list):
        return []
    return series


def _summarize_series(entries: list[dict[str, Any]]) -> tuple[str, list[str]]:
    if not entries:
        return "No values available.", []

    annual_forms = {"10-K", "20-F", "40-F"}
    quarterly_forms = {"10-Q"}
    by_form: dict[str, list[dict[str, Any]]] = defaultdict(list)

    for row in entries:
        form = str(row.get("form") or "UNKNOWN")
        by_form[form].append(row)

    def latest_value(form_set: set[str]) -> float | None:
        candidates: list[tuple[datetime, float]] = []
        for form in form_set:
            for row in by_form.get(form, []):
                value = _safe_float(row.get("val"))
                end_date = _parse_date(row.get("end"))
                if value is None or end_date is None:
                    continue
                candidates.append((end_date, value))
        if not candidates:
            return None
        candidates.sort(key=lambda item: item[0], reverse=True)
        return candidates[0][1]

    annual_latest = latest_value(annual_forms)
    quarterly_latest = latest_value(quarterly_forms)

    points: list[tuple[datetime, float, str, str]] = []
    for row in entries:
        value = _safe_float(row.get("val"))
        end_date = _parse_date(row.get("end"))
        if value is None or end_date is None:
            continue
        fp = str(row.get("fp") or "NA")
        form = str(row.get("form") or "UNKNOWN")
        points.append((end_date, value, fp, form))
    points.sort(key=lambda item: item[0], reverse=True)

    trend_lines: list[str] = []
    for end_date, value, fp, form in points[:5]:
        trend_lines.append(f"- {end_date.date()} | {form} {fp} | {value:,.2f}")

    summary_parts: list[str] = []
    if annual_latest is not None:
        summary_parts.append(f"latest annual: {annual_latest:,.2f}")
    if quarterly_latest is not None:
        summary_parts.append(f"latest quarterly: {quarterly_latest:,.2f}")
    if not summary_parts:
        summary_parts.append("no parsable annual/quarterly values")

    return ", ".join(summary_parts), trend_lines


def fetch_companyfacts(cik: str, sec_user_agent: str, allow_insecure_ssl: bool) -> dict[str, Any]:
    url = SEC_COMPANYFACTS_URL.format(cik=cik)
    req = Request(
        url,
        headers={
            "Accept": "application/json",
            "User-Agent": sec_user_agent,
        },
    )
    with urlopen(req, timeout=60, context=_build_ssl_context(allow_insecure_ssl)) as response:
        payload = json.loads(response.read().decode("utf-8"))

    if not isinstance(payload, dict):
        raise RuntimeError(f"SEC CompanyFacts returned unexpected payload for CIK {cik}.")
    return payload


def wrangle_companyfacts_to_document(ticker: str, payload: dict[str, Any]) -> dict[str, str]:
    cik = str(payload.get("cik") or "unknown")
    entity_name = str(payload.get("entityName") or ticker)
    facts = payload.get("facts") or {}

    lines: list[str] = [
        f"SEC CompanyFacts summary for {entity_name} ({ticker}) CIK={cik}.",
        "Source data includes mixed taxonomies, units, and filing cadences (10-K/10-Q).",
        "This summary normalizes values opportunistically and preserves recent messy points.",
    ]

    for taxonomy, tag, label in PRIMARY_TAGS:
        tag_payload = (((facts.get(taxonomy) or {}).get(tag)) or {}) if isinstance(facts, dict) else {}
        entries = _best_unit_series(tag_payload if isinstance(tag_payload, dict) else {})
        summary, trend_lines = _summarize_series(entries)
        lines.append(f"{label}: {summary}")
        lines.extend(trend_lines)

    return {
        "id": f"sec-companyfacts-{_slugify(ticker)}",
        "title": f"SEC CompanyFacts | {ticker} | {entity_name}",
        "source": "sec_companyfacts",
        "text": "\n".join(lines),
    }


def build_documents_from_tickers(
    tickers: list[str],
    sec_user_agent: str,
    allow_insecure_ssl: bool,
) -> list[dict[str, str]]:
    docs: list[dict[str, str]] = []
    for ticker in tickers:
        ticker_upper = ticker.strip().upper()
        if not ticker_upper:
            continue
        cik = DEFAULT_TICKERS_TO_CIK.get(ticker_upper)
        if not cik:
            print(f"Skipping unsupported ticker {ticker_upper}; add CIK mapping first.")
            continue

        payload = fetch_companyfacts(cik, sec_user_agent=sec_user_agent, allow_insecure_ssl=allow_insecure_ssl)
        docs.append(wrangle_companyfacts_to_document(ticker=ticker_upper, payload=payload))

    return docs


def main() -> None:
    args = parse_args()
    tickers = [part.strip().upper() for part in args.tickers.split(",") if part.strip()]
    docs = build_documents_from_tickers(
        tickers=tickers,
        sec_user_agent=args.sec_user_agent,
        allow_insecure_ssl=args.allow_insecure_ssl,
    )

    write_documents(args.output, docs)
    print(f"Fetched SEC CompanyFacts for {len(docs)} companies.")
    print(f"Wrote wrangled docs to: {args.output}")

    if args.no_ingest:
        print("Skipping ingest (--no-ingest set).")
        return

    ingest_result = ingest_documents(args.api_base_url, docs)
    print(f"Ingest API response: {json.dumps(ingest_result)}")


if __name__ == "__main__":
    main()
