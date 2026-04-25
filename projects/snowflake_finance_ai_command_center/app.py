from __future__ import annotations

import plotly.graph_objects as go
import pandas as pd
import numpy as np
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


def _favorable_label(metric_name: str, variance_value: float) -> str:
    if metric_name == "ar":
        return "Favorable" if variance_value <= 0 else "Unfavorable"
    return "Favorable" if variance_value >= 0 else "Unfavorable"


def _delta_color(metric_name: str) -> str:
    return "inverse" if metric_name == "ar" else "normal"


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
m5.metric(
    "ARR vs Forecast",
    f"${latest_var['arr_variance']:,.0f}",
    delta=f"{latest_var['arr_variance']:+,.0f} ({_favorable_label('arr', latest_var['arr_variance'])})",
    delta_color=_delta_color("arr"),
)
m6.metric(
    "Cash vs Forecast",
    f"${latest_var['cash_variance']:,.0f}",
    delta=f"{latest_var['cash_variance']:+,.0f} ({_favorable_label('cash', latest_var['cash_variance'])})",
    delta_color=_delta_color("cash"),
)
m7.metric(
    "A/R vs Forecast",
    f"${latest_var['ar_variance']:,.0f}",
    delta=f"{latest_var['ar_variance']:+,.0f} ({_favorable_label('ar', latest_var['ar_variance'])})",
    delta_color=_delta_color("ar"),
)

tabs = st.tabs([
    "Executive KPIs",
    "Variance Bridge",
    "Account Risk",
    "Segment & Region Drilldown",
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

    # Revenue Waterfall - showing expansion/contraction/churn drivers
    waterfall_data = kpis.tail(12).copy()
    waterfall_rows = []
    
    for idx, row in waterfall_data.iterrows():
        waterfall_rows.append({
            "month": pd.to_datetime(row["month"]).strftime("%b '%y"),
            "measure": "absolute",
            "value": row["prior_arr"] if idx == waterfall_data.index[0] else 0,
            "name": "Prior ARR" if idx == waterfall_data.index[0] else "",
            "is_start": idx == waterfall_data.index[0],
        })
        
        if row["expansion_arr"] > 0:
            waterfall_rows.append({
                "month": pd.to_datetime(row["month"]).strftime("%b '%y"),
                "measure": "relative",
                "value": row["expansion_arr"],
                "name": f"Expansion: ${row['expansion_arr']:,.0f}",
                "is_start": False,
            })
        
        if row["contraction_arr"] > 0:
            waterfall_rows.append({
                "month": pd.to_datetime(row["month"]).strftime("%b '%y"),
                "measure": "relative",
                "value": -row["contraction_arr"],
                "name": f"Contraction: ${row['contraction_arr']:,.0f}",
                "is_start": False,
            })
        
        if row["churned_arr"] > 0:
            waterfall_rows.append({
                "month": pd.to_datetime(row["month"]).strftime("%b '%y"),
                "measure": "relative",
                "value": -row["churned_arr"],
                "name": f"Churn: ${row['churned_arr']:,.0f}",
                "is_start": False,
            })
        
        waterfall_rows.append({
            "month": pd.to_datetime(row["month"]).strftime("%b '%y"),
            "measure": "total",
            "value": row["arr"],
            "name": "Current ARR",
            "is_start": False,
        })
    
    waterfall_df = pd.DataFrame(waterfall_rows)
    
    # Group by month and create waterfall for latest month
    latest_month_str = pd.to_datetime(latest["month"]).strftime("%b '%y")
    latest_waterfall = waterfall_df[waterfall_df["month"] == latest_month_str].copy()
    
    if not latest_waterfall.empty:
        fig = go.Figure(go.Waterfall(
            x=latest_waterfall["name"],
            y=latest_waterfall["value"],
            measure=latest_waterfall["measure"],
            connector={"line": {"color": "rgba(0, 150, 255, 0.5)"}},
            increasing={"marker": {"color": "rgba(76, 175, 80, 0.8)"}},
            decreasing={"marker": {"color": "rgba(244, 67, 54, 0.8)"}},
            totals={"marker": {"color": "rgba(66, 133, 244, 0.8)"}},
            textposition="outside",
            texttemplate="$%{y:,.0f}",
        ))
        fig.update_layout(
            title=f"ARR Waterfall - {latest_month_str}",
            showlegend=False,
            template="plotly_dark",
            height=500,
        )
        st.plotly_chart(fig, use_container_width=True)

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
    st.markdown("### Segment and Region Performance Drilldown")
    latest_month = events["month"].max()
    latest_events = events[events["month"] == latest_month].copy()
    latest_events["open_ar"] = latest_events["billed_amount"] - latest_events["collected_amount"]

    agg_dim = st.radio("Drilldown Dimension", ["segment", "region"], horizontal=True)
    metric_options = ["arr", "collected_cash", "open_ar", "dso_days", "logo_churn_pct"]
    selected_metric = st.selectbox("Primary Metric", metric_options, index=0)

    grouped = (
        latest_events.groupby(agg_dim, as_index=False)
        .agg(
            accounts=("account_id", "nunique"),
            arr=("mrr", lambda s: float(s.sum() * 12.0)),
            billed_revenue=("billed_amount", "sum"),
            collected_cash=("collected_amount", "sum"),
            open_ar=("open_ar", "sum"),
            churned_accounts=("churn_flag", "sum"),
        )
    )
    grouped["dso_days"] = np.where(
        grouped["billed_revenue"] > 0,
        (grouped["open_ar"] / grouped["billed_revenue"]) * 30.0,
        0.0,
    )
    grouped["logo_churn_pct"] = np.where(
        grouped["accounts"] > 0,
        (grouped["churned_accounts"] / grouped["accounts"]) * 100.0,
        0.0,
    )

    chart = px.bar(
        grouped.sort_values(selected_metric, ascending=False),
        x=agg_dim,
        y=selected_metric,
        color=agg_dim,
        template="plotly_dark",
        title=f"Latest Month {selected_metric} by {agg_dim.title()}",
        text_auto=True,
    )
    st.plotly_chart(chart, use_container_width=True)

    cross = (
        latest_events.groupby(["segment", "region"], as_index=False)
        .agg(
            accounts=("account_id", "nunique"),
            arr=("mrr", lambda s: float(s.sum() * 12.0)),
            collected_cash=("collected_amount", "sum"),
            open_ar=("open_ar", "sum"),
        )
        .sort_values("arr", ascending=False)
    )
    st.dataframe(grouped, use_container_width=True, hide_index=True)
    st.markdown("#### Segment x Region Matrix")
    st.dataframe(cross, use_container_width=True, hide_index=True)

with tabs[4]:
    st.markdown("### AI-Ready Executive Narrative")
    st.info(build_ai_brief(kpis, risks))
    st.code(
        """Prompt starter:
Summarize the main drivers of monthly revenue movement, collections pressure, and renewal risk.
Prioritize enterprise accounts with high open A/R, falling adoption, or renewals in the next 90 days.
Return: executive summary, top 5 accounts to review, and recommended analyst follow-ups.""",
        language="text",
    )

with tabs[5]:
    st.markdown("### Finance Copilot (Curated Mart Grounding)")
    prompt = st.text_input(
        "Ask a finance analytics question",
        placeholder="Why is cash below forecast this month and which accounts should we review first?",
    )
    if st.button("Generate Answer", type="primary"):
        answer = run_finance_copilot(prompt, kpis, risks, variance, events)
        st.success(answer)

    st.markdown("**Suggested prompts**")
    st.markdown("- Explain the top variance drivers this month and what moved ARR most")
    st.markdown("- Which renewals are most at risk in 0-30, 31-60, and 61-90 day buckets?")
    st.markdown("- Which segment or region is driving collections underperformance?")

with tabs[6]:
    st.markdown("### Billing Event Sample")
    st.dataframe(events.head(25), use_container_width=True, hide_index=True)