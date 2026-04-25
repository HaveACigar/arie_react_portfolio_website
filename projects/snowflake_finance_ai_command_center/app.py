from __future__ import annotations

import pandas as pd
import plotly.express as px
import streamlit as st

from pipeline import build_ai_brief, build_demo_frames


st.set_page_config(
    page_title="Snowflake Finance AI Command Center",
    page_icon="❄️",
    layout="wide",
    initial_sidebar_state="expanded",
)


@st.cache_data
def load_frames() -> dict[str, pd.DataFrame]:
    return build_demo_frames()


frames = load_frames()
kpis = frames["mart_finance_kpis"].copy()
risks = frames["mart_account_risk"].copy()
events = frames["billing_events"].copy()
latest = kpis.iloc[-1]


st.title("❄️ Snowflake Finance AI Command Center")
st.caption(
    "Snowflake-style finance analytics demo with bronze/silver/gold SQL layers, executive KPI marts, collections risk, "
    "and AI-ready narrative outputs for finance analytics workflows."
)

with st.sidebar:
    st.markdown("### Why this project fits")
    st.markdown("- Finance KPI modeling: ARR, NRR, open A/R, DSO, churn")
    st.markdown("- Analytics engineering patterns: layered SQL marts")
    st.markdown("- AI workflow: executive brief generated from curated KPI + risk views")
    st.markdown("- Snowflake-ready design: straightforward port from local SQL marts to Snowflake schemas")


m1, m2, m3, m4 = st.columns(4)
m1.metric("Latest ARR", f"${latest['arr']:,.0f}")
m2.metric("NRR", f"{latest['nrr_pct']:.1f}%")
m3.metric("Open A/R", f"${latest['open_ar']:,.0f}")
m4.metric("DSO", f"{latest['dso_days']:.1f} days")

tabs = st.tabs(["Executive KPIs", "Account Risk", "AI Brief", "Source Sample"])

with tabs[0]:
    left, right = st.columns(2)
    with left:
        trend = px.line(
            kpis,
            x="month",
            y=["arr", "collected_cash", "open_ar"],
            markers=True,
            template="plotly_dark",
            title="Monthly ARR, Cash Collection, and Open A/R",
        )
        st.plotly_chart(trend, use_container_width=True)
    with right:
        rates = px.bar(
            kpis,
            x="month",
            y=["nrr_pct", "gross_revenue_retention_pct", "logo_churn_pct"],
            barmode="group",
            template="plotly_dark",
            title="Retention and Churn Trends",
        )
        st.plotly_chart(rates, use_container_width=True)

    st.dataframe(kpis.tail(6), use_container_width=True, hide_index=True)

with tabs[1]:
    st.markdown("### Highest-Risk Accounts")
    st.dataframe(risks.head(15), use_container_width=True, hide_index=True)

    risk_plot = px.scatter(
        risks.head(40),
        x="adoption_score",
        y="open_ar",
        size="risk_score",
        color="segment",
        hover_name="account_name",
        template="plotly_dark",
        title="Risk Prioritization: Low Adoption + Open A/R + Near-Term Renewal",
    )
    st.plotly_chart(risk_plot, use_container_width=True)

with tabs[2]:
    st.markdown("### AI-Ready Executive Narrative")
    st.info(build_ai_brief(kpis, risks))
    st.code(
        """Prompt starter:
Summarize the main drivers of monthly revenue movement, collections pressure, and renewal risk.
Prioritize enterprise accounts with high open A/R, falling adoption, or renewals in the next 90 days.
Return: executive summary, top 5 accounts to review, and recommended analyst follow-ups.""",
        language="text",
    )

with tabs[3]:
    st.markdown("### Billing Event Sample")
    st.dataframe(events.head(25), use_container_width=True, hide_index=True)