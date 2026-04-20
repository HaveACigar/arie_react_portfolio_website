from app.rag.source_router import route_sources


def test_router_finance_route() -> None:
    routed = route_sources("Summarize SEC filing revenue and liabilities trends")
    assert "sec_companyfacts" in routed


def test_router_civic_route() -> None:
    routed = route_sources("What 311 complaint patterns are visible across Brooklyn and Queens?")
    assert "nyc_311" in routed


def test_router_crime_route() -> None:
    routed = route_sources("Show recent Chicago crime and arrest patterns by district")
    assert "chicago_crimes" in routed
