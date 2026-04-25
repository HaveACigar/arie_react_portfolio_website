WITH base AS (
    SELECT
        account_id,
        account_name,
        month,
        region,
        segment,
        plan_tier,
        renewal_date,
        seats,
        mrr,
        billed_amount,
        collected_amount,
        billed_amount - collected_amount AS open_ar,
        days_late,
        adoption_score,
        support_tickets,
        expansion_amount,
        contraction_amount,
        churn_flag,
        LAG(mrr) OVER (PARTITION BY account_id ORDER BY month) AS prior_mrr
    FROM billing_events
)
SELECT
    account_id,
    account_name,
    month,
    region,
    segment,
    plan_tier,
    renewal_date,
    seats,
    mrr,
    COALESCE(prior_mrr, mrr) AS prior_mrr,
    billed_amount,
    collected_amount,
    open_ar,
    days_late,
    adoption_score,
    support_tickets,
    expansion_amount,
    contraction_amount,
    churn_flag,
    CAST((julianday(renewal_date) - julianday(month)) AS INTEGER) AS days_to_renewal,
    CASE
        WHEN date(renewal_date) <= date(month, '+90 day') THEN 1
        ELSE 0
    END AS renewal_in_90_days
FROM base