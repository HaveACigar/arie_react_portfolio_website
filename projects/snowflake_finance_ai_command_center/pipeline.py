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


def build_demo_frames(seed: int = 21) -> dict[str, pd.DataFrame]:
    billing_events = generate_billing_events(seed=seed)
    conn = sqlite3.connect(":memory:")
    try:
        billing_events.to_sql("billing_events", conn, index=False, if_exists="replace")
        conn.execute("DROP TABLE IF EXISTS silver_account_monthly")
        conn.execute("CREATE TABLE silver_account_monthly AS " + _load_sql("silver_account_monthly.sql"))
        conn.execute("DROP TABLE IF EXISTS mart_finance_kpis")
        conn.execute("CREATE TABLE mart_finance_kpis AS " + _load_sql("mart_finance_kpis.sql"))
        conn.execute("DROP TABLE IF EXISTS mart_account_risk")
        conn.execute("CREATE TABLE mart_account_risk AS " + _load_sql("mart_account_risk.sql"))

        frames = {
            "billing_events": pd.read_sql_query("SELECT * FROM billing_events", conn),
            "silver_account_monthly": pd.read_sql_query("SELECT * FROM silver_account_monthly", conn),
            "mart_finance_kpis": pd.read_sql_query("SELECT * FROM mart_finance_kpis ORDER BY month", conn),
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