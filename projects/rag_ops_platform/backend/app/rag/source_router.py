from __future__ import annotations


def route_sources(question: str) -> list[str]:
    q = question.lower()
    routed: list[str] = []

    nyc_terms = [
        "311",
        "borough",
        "complaint",
        "noise",
        "sanitation",
        "street condition",
        "nypd",
        "brooklyn",
        "manhattan",
        "bronx",
        "queens",
        "staten island",
    ]
    sec_terms = [
        "sec",
        "10-k",
        "10-q",
        "filing",
        "revenue",
        "liabilities",
        "assets",
        "balance sheet",
        "operating income",
        "net income",
        "cash flow",
        "earnings",
    ]
    chicago_terms = [
        "chicago",
        "crime",
        "arrest",
        "homicide",
        "robbery",
        "battery",
        "district",
        "beat",
        "theft",
    ]

    if any(term in q for term in nyc_terms):
        routed.append("nyc_311")
    if any(term in q for term in sec_terms):
        routed.append("sec_companyfacts")
    if any(term in q for term in chicago_terms):
        routed.append("chicago_crimes")

    return routed
