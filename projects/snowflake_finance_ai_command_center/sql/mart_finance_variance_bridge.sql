SELECT
    k.month,
    k.arr,
    f.forecast_arr,
    ROUND(k.arr - f.forecast_arr, 2) AS arr_variance,
    k.collected_cash,
    f.forecast_collected_cash,
    ROUND(k.collected_cash - f.forecast_collected_cash, 2) AS cash_variance,
    k.open_ar,
    f.forecast_open_ar,
    ROUND(k.open_ar - f.forecast_open_ar, 2) AS ar_variance,
    k.nrr_pct,
    f.forecast_nrr_pct,
    ROUND(k.nrr_pct - f.forecast_nrr_pct, 2) AS nrr_variance_pct,
    k.logo_churn_pct,
    k.gross_revenue_retention_pct
FROM mart_finance_kpis k
LEFT JOIN forecast_plan f
    ON k.month = f.month
ORDER BY k.month