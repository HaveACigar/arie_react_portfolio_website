PYTHON ?= python3

.PHONY: setup-backend run-backend test-backend run-frontend ingest-nyc311 ingest-sec ingest-chicago ingest-all setup-all

setup-all: setup-backend

setup-backend:
	cd backend && $(PYTHON) -m venv .venv
	cd backend && .venv/bin/python -m pip install -U pip
	cd backend && .venv/bin/python -m pip install -e '.[dev]'

run-backend:
	cd backend && .venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

test-backend:
	cd backend && .venv/bin/python -m pytest -q

run-frontend:
	cd frontend && $(PYTHON) -m http.server 4173

ingest-nyc311:
	cd backend && .venv/bin/python scripts/ingest_nyc311.py --api-base-url http://localhost:8000 --days 30 --limit 2000

ingest-sec:
	cd backend && .venv/bin/python scripts/ingest_sec_companyfacts.py --api-base-url http://localhost:8000 --tickers AAPL,MSFT,AMZN,TSLA,NVDA

ingest-chicago:
	cd backend && .venv/bin/python scripts/ingest_chicago_crimes.py --api-base-url http://localhost:8000 --days 30 --limit 2000

ingest-all:
	cd backend && .venv/bin/python scripts/ingest_all_sources.py --api-base-url http://localhost:8000 --sources nyc311,sec_companyfacts,chicago_crimes --nyc-days 30 --nyc-limit 2000 --sec-tickers AAPL,MSFT,AMZN,TSLA,NVDA --chicago-days 30 --chicago-limit 2000
