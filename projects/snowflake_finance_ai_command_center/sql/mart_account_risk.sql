SELECT
    account_id,
    account_name,
    region,
    segment,
    plan_tier,
    month,
    renewal_date,
    ROUND(open_ar, 2) AS open_ar,
    ROUND(mrr, 2) AS mrr,
    adoption_score,
    days_late,
    support_tickets,
    renewal_in_90_days,
    ROUND(
        (CASE WHEN open_ar > 5000 THEN 35 ELSE open_ar / 180 END) +
        (CASE WHEN adoption_score < 55 THEN 25 WHEN adoption_score < 70 THEN 12 ELSE 0 END) +
        (CASE WHEN days_late >= 20 THEN 20 WHEN days_late >= 10 THEN 10 ELSE 0 END) +
        (CASE WHEN support_tickets >= 4 THEN 10 ELSE support_tickets * 2 END) +
        (CASE WHEN renewal_in_90_days = 1 THEN 15 ELSE 0 END),
        1
    ) AS risk_score,
    TRIM(
        (CASE WHEN open_ar > 5000 THEN 'High open A/R; ' ELSE '' END) ||
        (CASE WHEN adoption_score < 55 THEN 'Low product adoption; ' ELSE '' END) ||
        (CASE WHEN days_late >= 10 THEN 'Late collections; ' ELSE '' END) ||
        (CASE WHEN support_tickets >= 4 THEN 'Elevated support load; ' ELSE '' END) ||
        (CASE WHEN renewal_in_90_days = 1 THEN 'Renewal inside 90 days; ' ELSE '' END)
    ) AS risk_reasons
FROM silver_account_monthly
WHERE month = (SELECT MAX(month) FROM silver_account_monthly)