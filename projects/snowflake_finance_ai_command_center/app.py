from __future__ import annotations

import pandas as pd
import plotly.express as px
import streamlit as st

from pipeline import build_ai_brief, build_demo_frames, run_finance_copilot


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
variance = frames["mart_finance_variance_bridge"].copy()
events = frames["billing_events"].copy()
latest = kpis.iloc[-1]
latest_var = variance.iloc[-1]


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

m5, m6, m7 = st.columns(3)
m5.metric("ARR vs Forecast", f"${latest_var['arr_variance']:,.0f}")
m6.metric("Cash vs Forecast", f"${latest_var['cash_variance']:,.0f}")
m7.metric("A/R vs Forecast", f"${latest_var['ar_variance']:,.0f}")

tabs = st.tabs([
    "Executive KPIs",
    "Variance Bridge",
    "Account Risk",
    "AI Brief",
    "Finance Copilot",
    "Source Sample",
])

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
    left, right = st.columns(2)
    with left:
        variance_plot = px.bar(
            variance,
            x="month",
            y=["arr_variance", "cash_variance", "ar_variance"],
            barmode="group",
            template="plotly_dark",
            title="Forecast vs Actual Variance Bridge",
        )
        st.plotly_chart(variance_plot, use_container_width=True)

    with right:
        nrr_plot = px.line(
            variance,
            x="month",
            y=["nrr_pct", "forecast_nrr_pct"],
            markers=True,
            template="plotly_dark",
            title="NRR Actual vs Forecast",
        )
        st.plotly_chart(nrr_plot, use_container_width=True)

    st.dataframe(variance.tail(8), use_container_width=True, hide_index=True)

with tabs[2]:
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

with tabs[3]:
    st.markdown("### AI-Ready Executive Narrative")
    st.info(build_ai_brief(kpis, risks))
    st.code(
        """Prompt starter:
Summarize the main drivers of monthly revenue movement, collections pressure, and renewal risk.
Prioritize enterprise accounts with high open A/R, falling adoption, or renewals in the next 90 days.
Return: executive summary, top 5 accounts to review, and recommended analyst follow-ups.""",
        language="text",
    )

with tabs[4]:
    st.markdown("### Finance Copilot (Curated Mart Grounding)")
    prompt = st.text_input(
        "Ask a finance analytics question",
        placeholder="Why is cash below forecast this month and which accounts should we review first?",
    )
    if st.button("Generate Answer", type="primary"):
        answer = run_finance_copilot(prompt, kpis, risks, variance)
        st.success(answer)

    st.markdown("**Suggested prompts**")
    st.markdown("- Explain forecast variance for ARR, cash, and A/R this month")
    st.markdown("- Which renewals are most at risk and why?")
    st.markdown("- How should finance prioritize collections follow-up?")

with tabs[5]:
    st.markdown("### Billing Event Sample")
    st.dataframe(events.head(25), use_container_width=True, hide_index=True)