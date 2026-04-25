WITH monthly AS (
    SELECT
        month,
        SUM(mrr) * 12.0 AS arr,
        SUM(billed_amount) AS billed_revenue,
        SUM(collected_amount) AS collected_cash,
        SUM(open_ar) AS open_ar,
        SUM(prior_mrr) AS prior_period_mrr,
        SUM(mrr) AS current_period_mrr,
        SUM(expansion_amount) AS expansion_revenue,
        SUM(contraction_amount) AS contraction_revenue,
        SUM(CASE WHEN churn_flag = 1 THEN prior_mrr ELSE 0 END) AS churned_revenue,
        SUM(churn_flag) AS churned_accounts,
        COUNT(DISTINCT account_id) AS active_accounts
    FROM silver_account_monthly
    GROUP BY month
)
SELECT
    month,
    ROUND(arr, 2) AS arr,
    ROUND(billed_revenue, 2) AS billed_revenue,
    ROUND(collected_cash, 2) AS collected_cash,
    ROUND(open_ar, 2) AS open_ar,
    ROUND(CASE WHEN billed_revenue = 0 THEN 0 ELSE (open_ar / billed_revenue) * 30 END, 2) AS dso_days,
    ROUND(CASE WHEN prior_period_mrr = 0 THEN 100 ELSE ((prior_period_mrr - churned_revenue - contraction_revenue + expansion_revenue) / prior_period_mrr) * 100 END, 2) AS nrr_pct,
    ROUND(CASE WHEN prior_period_mrr = 0 THEN 100 ELSE ((prior_period_mrr - churned_revenue - contraction_revenue) / prior_period_mrr) * 100 END, 2) AS gross_revenue_retention_pct,
    ROUND(CASE WHEN active_accounts = 0 THEN 0 ELSE (churned_accounts * 100.0 / active_accounts) END, 2) AS logo_churn_pct,
    active_accounts,
    churned_accounts
FROM monthly
ORDER BY month