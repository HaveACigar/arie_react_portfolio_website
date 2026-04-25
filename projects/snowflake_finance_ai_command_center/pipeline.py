from __future__ import annotations

from pathlib import Path
import sqlite3

import numpy as np
import pandas as pd


BASE_DIR = Path(__file__).resolve().parent
SQL_DIR = BASE_DIR / "sql"
MONTHS = pd.date_range("2024-01-01", periods=18, freq="MS")
REGIONS = ["North America", "EMEA", "APAC", "LATAM"]
SEGMENTS = ["SMB", "Mid-Market", "Enterprise"]
TIERS = ["Core", "Growth", "Enterprise"]


def _load_sql(file_name: str) -> str:
    return (SQL_DIR / file_name).read_text(encoding="utf-8")


def generate_billing_events(seed: int = 21, account_count: int = 180) -> pd.DataFrame:
    rng = np.random.default_rng(seed)
    rows: list[dict] = []

    for account_num in range(1, account_count + 1):
        region = str(rng.choice(REGIONS, p=[0.42, 0.23, 0.23, 0.12]))
        segment = str(rng.choice(SEGMENTS, p=[0.45, 0.35, 0.20]))
        tier = str(rng.choice(TIERS, p=[0.4, 0.38, 0.22]))
        start_idx = int(rng.integers(0, 6))
        base_mrr = float(rng.integers(3000, 22000))
        seats = int(rng.integers(20, 500))
        renewal_idx = min(start_idx + 12, len(MONTHS) - 1)
        renewal_date = MONTHS[renewal_idx]
        churned = False
        current_mrr = base_mrr
        credit_risk = float(rng.uniform(0.0, 1.0))
        adoption_baseline = float(rng.uniform(58, 92))

        for month_idx in range(start_idx, len(MONTHS)):
            month = MONTHS[month_idx]
            if churned:
                break

            expansion_amount = 0.0
            contraction_amount = 0.0
            if month_idx > start_idx and rng.random() < 0.18:
                expansion_amount = round(float(rng.uniform(0.03, 0.18) * current_mrr), 2)
                current_mrr += expansion_amount
            if month_idx > start_idx + 1 and rng.random() < 0.11:
                contraction_amount = round(float(rng.uniform(0.02, 0.12) * current_mrr), 2)
                current_mrr = max(1200.0, current_mrr - contraction_amount)

            renewal_risk = 0.0
            if month_idx >= renewal_idx - 2:
                renewal_risk = 0.10
            churn_probability = 0.015 + (0.10 if credit_risk > 0.72 else 0.0) + renewal_risk
            churn_flag = int(month_idx >= renewal_idx and rng.random() < churn_probability)

            professional_services = round(float(rng.uniform(0, 0.12) * current_mrr), 2)
            billed_amount = round(current_mrr + professional_services, 2)

            collection_rate = 0.992
            if credit_risk > 0.72:
                collection_rate -= 0.10
            if segment == "SMB":
                collection_rate -= 0.015
            if month_idx >= renewal_idx - 1:
                collection_rate -= 0.02
            collection_rate = float(np.clip(collection_rate, 0.78, 1.0))
            collected_amount = round(billed_amount * collection_rate, 2)
            days_late = int(max(0, round((1 - collection_rate) * 65 + rng.normal(3, 4))))

            adoption_score = float(np.clip(adoption_baseline + rng.normal(0, 7) - days_late * 0.25, 22, 99))
            support_tickets = int(max(0, round(rng.poisson(1.3 if segment != "Enterprise" else 2.0) + days_late / 18)))

            rows.append({
                "account_id": f"ACCT-{account_num:04d}",
                "account_name": f"{segment} {region} Customer {account_num:03d}",
                "month": month.strftime("%Y-%m-%d"),
                "region": region,
                "segment": segment,
                "plan_tier": tier,
                "renewal_date": renewal_date.strftime("%Y-%m-%d"),
                "seats": seats,
                "mrr": round(current_mrr, 2),
                "billed_amount": billed_amount,
                "collected_amount": collected_amount,
                "days_late": days_late,
                "adoption_score": round(adoption_score, 1),
                "support_tickets": support_tickets,
                "expansion_amount": expansion_amount,
                "contraction_amount": contraction_amount,
                "churn_flag": churn_flag,
            })

            if churn_flag == 1:
                churned = True

    return pd.DataFrame(rows)


def generate_finance_forecast(kpi_months: list[str], seed: int = 21) -> pd.DataFrame:
    rng = np.random.default_rng(seed + 101)
    rows: list[dict] = []
    arr_base = 24_000_000.0

    for month_idx, month in enumerate(kpi_months):
        seasonality = 1.0 + 0.012 * np.sin(month_idx / 2.0)
        planned_arr = arr_base * seasonality * (1 + month_idx * 0.004)
        planned_collections = planned_arr / 12.0 * float(rng.uniform(0.90, 0.95))
        planned_open_ar = planned_arr / 12.0 * float(rng.uniform(0.05, 0.10))
        planned_nrr = float(rng.uniform(96.0, 105.0))

        rows.append(
            {
                "month": month,
                "forecast_arr": round(planned_arr, 2),
                "forecast_collected_cash": round(planned_collections, 2),
                "forecast_open_ar": round(planned_open_ar, 2),
                "forecast_nrr_pct": round(planned_nrr, 2),
            }
        )

    return pd.DataFrame(rows)


def _account_risk_summary(risk_df: pd.DataFrame) -> str:
    enterprise = risk_df[risk_df["segment"] == "Enterprise"].head(3)
    if enterprise.empty:
        return "No enterprise accounts are currently in the top-risk set."
    items = [
        f"{row.account_name} (risk {row.risk_score:.1f}, open A/R ${row.open_ar:,.0f})"
        for row in enterprise.itertuples()
    ]
    return "; ".join(items)


def run_finance_copilot(question: str, kpi_df: pd.DataFrame, risk_df: pd.DataFrame, variance_df: pd.DataFrame) -> str:
    q = question.lower()
    latest = kpi_df.iloc[-1]
    latest_var = variance_df.iloc[-1]
    top_risk = risk_df.head(5)

    if any(word in q for word in ["dso", "collections", "a/r", "ar"]):
        return (
            f"Collections view: DSO is {latest['dso_days']:.1f} days with open A/R at ${latest['open_ar']:,.0f}. "
            f"Against plan, open A/R variance is ${latest_var['ar_variance']:,.0f} and cash variance is "
            f"${latest_var['cash_variance']:,.0f}. Prioritize late accounts in the risk mart where days_late >= 10."
        )

    if any(word in q for word in ["renewal", "risk", "churn", "retention"]):
        return (
            f"Renewal risk view: logo churn is {latest['logo_churn_pct']:.2f}% and NRR is {latest['nrr_pct']:.2f}%. "
            f"Top enterprise exposures: {_account_risk_summary(top_risk)}. "
            "Recommend account reviews for low adoption plus near-term renewal windows."
        )

    if any(word in q for word in ["variance", "forecast", "plan", "actual", "bridge"]):
        return (
            f"Forecast variance view: ARR variance is ${latest_var['arr_variance']:,.0f}, "
            f"NRR variance is {latest_var['nrr_variance_pct']:.2f} percentage points, and "
            f"cash variance is ${latest_var['cash_variance']:,.0f}. "
            "Use the variance bridge mart to separate expansion/contraction/churn movement from collections timing."
        )

    return (
        f"Executive summary: ARR ${latest['arr']:,.0f}, NRR {latest['nrr_pct']:.2f}%, DSO {latest['dso_days']:.1f} days, "
        f"open A/R ${latest['open_ar']:,.0f}. Top risk account is {top_risk.iloc[0]['account_name']} "
        f"(risk {top_risk.iloc[0]['risk_score']:.1f}). Ask about collections, renewal risk, or forecast variance for a focused answer."
    )


def build_demo_frames(seed: int = 21) -> dict[str, pd.DataFrame]:
    billing_events = generate_billing_events(seed=seed)
    forecast_plan = generate_finance_forecast(sorted(billing_events["month"].unique().tolist()), seed=seed)
    conn = sqlite3.connect(":memory:")
    try:
        billing_events.to_sql("billing_events", conn, index=False, if_exists="replace")
        forecast_plan.to_sql("forecast_plan", conn, index=False, if_exists="replace")
        conn.execute("DROP TABLE IF EXISTS silver_account_monthly")
        conn.execute("CREATE TABLE silver_account_monthly AS " + _load_sql("silver_account_monthly.sql"))
        conn.execute("DROP TABLE IF EXISTS mart_finance_kpis")
        conn.execute("CREATE TABLE mart_finance_kpis AS " + _load_sql("mart_finance_kpis.sql"))
        conn.execute("DROP TABLE IF EXISTS mart_finance_variance_bridge")
        conn.execute("CREATE TABLE mart_finance_variance_bridge AS " + _load_sql("mart_finance_variance_bridge.sql"))
        conn.execute("DROP TABLE IF EXISTS mart_account_risk")
        conn.execute("CREATE TABLE mart_account_risk AS " + _load_sql("mart_account_risk.sql"))

        frames = {
            "billing_events": pd.read_sql_query("SELECT * FROM billing_events", conn),
            "forecast_plan": pd.read_sql_query("SELECT * FROM forecast_plan ORDER BY month", conn),
            "silver_account_monthly": pd.read_sql_query("SELECT * FROM silver_account_monthly", conn),
            "mart_finance_kpis": pd.read_sql_query("SELECT * FROM mart_finance_kpis ORDER BY month", conn),
            "mart_finance_variance_bridge": pd.read_sql_query("SELECT * FROM mart_finance_variance_bridge ORDER BY month", conn),
            "mart_account_risk": pd.read_sql_query("SELECT * FROM mart_account_risk ORDER BY risk_score DESC, account_name", conn),
        }
        return frames
    finally:
        conn.close()


def build_ai_brief(kpi_df: pd.DataFrame, risk_df: pd.DataFrame) -> str:
    latest = kpi_df.iloc[-1]
    top_risks = risk_df.head(3)
    risk_names = ", ".join(top_risks["account_name"].tolist())
    return (
        f"Latest month ARR is ${latest['arr']:,.0f} with NRR at {latest['nrr_pct']:.1f}% and DSO at "
        f"{latest['dso_days']:.1f} days. Open A/R stands at ${latest['open_ar']:,.0f}. "
        f"Highest-risk accounts are {risk_names}. Use this mart to explain the revenue movement, collections pressure, "
        f"and renewal risk drivers in Snowflake-style finance reviews."
    )


if __name__ == "__main__":
    frames = build_demo_frames()
    print(frames["mart_finance_kpis"].tail(3).to_string(index=False))
    print()
    print(frames["mart_account_risk"].head(5).to_string(index=False))