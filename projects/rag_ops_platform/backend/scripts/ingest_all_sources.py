#!/usr/bin/env python3
"""Ingest multiple real-world sources into a single RAG corpus."""

from __future__ import annotations

import argparse
import json

from ingest_nyc311 import (
    fetch_nyc_311,
    ingest_documents,
    wrangle_to_documents,
    write_documents,
)
from ingest_chicago_crimes import fetch_chicago_crimes, wrangle_to_documents as wrangle_chicago_docs
from ingest_sec_companyfacts import build_documents_from_tickers

SUPPORTED_SOURCES = {"nyc311", "sec_companyfacts", "chicago_crimes"}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Ingest multiple difficult real-world datasets into RAG.")
    parser.add_argument("--api-base-url", default="http://localhost:8000", help="RAG API base URL")
    parser.add_argument(
        "--sources",
        default="nyc311,sec_companyfacts,chicago_crimes",
        help="Comma-separated sources: nyc311, sec_companyfacts, chicago_crimes",
    )
    parser.add_argument("--nyc-days", type=int, default=30, help="NYC 311 lookback window in days")
    parser.add_argument("--nyc-limit", type=int, default=2000, help="NYC 311 fetch limit")
    parser.add_argument("--chicago-days", type=int, default=30, help="Chicago crime lookback window in days")
    parser.add_argument("--chicago-limit", type=int, default=2000, help="Chicago crime fetch limit")
    parser.add_argument(
        "--sec-tickers",
        default="AAPL,MSFT,AMZN,TSLA,NVDA",
        help="SEC ticker list",
    )
    parser.add_argument(
        "--sec-user-agent",
        default="RAGOpsPortfolio/1.0 (contact: arie@example.com)",
        help="SEC requires descriptive User-Agent",
    )
    parser.add_argument(
        "--output",
        default="data/multisource_documents.json",
        help="Where to write merged documents JSON",
    )
    parser.add_argument("--no-ingest", action="store_true", help="Only fetch/wrangle and write JSON")
    parser.add_argument(
        "--allow-insecure-ssl",
        action="store_true",
        help="Disable SSL verification for source fetch as a local troubleshooting fallback.",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    selected_sources = {item.strip().lower() for item in args.sources.split(",") if item.strip()}

    unknown = selected_sources - SUPPORTED_SOURCES
    if unknown:
        raise ValueError(f"Unsupported sources requested: {sorted(unknown)}")

    docs: list[dict[str, str]] = []

    if "nyc311" in selected_sources:
        nyc_rows = fetch_nyc_311(days=args.nyc_days, limit=args.nyc_limit, allow_insecure_ssl=args.allow_insecure_ssl)
        nyc_docs = wrangle_to_documents(records=nyc_rows, days=args.nyc_days)
        for doc in nyc_docs:
            doc["source"] = "nyc_311"
        docs.extend(nyc_docs)
        print(f"NYC 311: fetched {len(nyc_rows)} rows -> {len(nyc_docs)} docs")

    if "sec_companyfacts" in selected_sources:
        tickers = [item.strip().upper() for item in args.sec_tickers.split(",") if item.strip()]
        sec_docs = build_documents_from_tickers(
            tickers=tickers,
            sec_user_agent=args.sec_user_agent,
            allow_insecure_ssl=args.allow_insecure_ssl,
        )
        docs.extend(sec_docs)
        print(f"SEC CompanyFacts: fetched {len(sec_docs)} company docs")

    if "chicago_crimes" in selected_sources:
        chicago_rows = fetch_chicago_crimes(
            days=args.chicago_days,
            limit=args.chicago_limit,
            allow_insecure_ssl=args.allow_insecure_ssl,
        )
        chicago_docs = wrangle_chicago_docs(chicago_rows, days=args.chicago_days)
        docs.extend(chicago_docs)
        print(f"Chicago crimes: fetched {len(chicago_rows)} rows -> {len(chicago_docs)} docs")

    write_documents(args.output, docs)
    print(f"Wrote merged docs to: {args.output}")

    if args.no_ingest:
        print("Skipping ingest (--no-ingest set).")
        return

    ingest_result = ingest_documents(args.api_base_url, docs)
    print(f"Ingest API response: {json.dumps(ingest_result)}")


if __name__ == "__main__":
    main()
