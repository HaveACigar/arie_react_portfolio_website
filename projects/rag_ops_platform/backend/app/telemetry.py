from collections import defaultdict
from time import perf_counter


class Telemetry:
    def __init__(self) -> None:
        self.counters = defaultdict(int)
        self.latency_totals = defaultdict(float)

    def start_timer(self) -> float:
        return perf_counter()

    def record_request(self, endpoint: str, started_at: float, token_estimate: int = 0) -> None:
        latency = perf_counter() - started_at
        self.counters[f"{endpoint}.count"] += 1
        self.latency_totals[f"{endpoint}.latency_total_s"] += latency
        self.counters["tokens.estimated_total"] += max(token_estimate, 0)

    def snapshot(self) -> dict:
        result = dict(self.counters)
        for key, total in self.latency_totals.items():
            base = key.replace(".latency_total_s", "")
            count = self.counters.get(f"{base}.count", 1)
            result[f"{base}.latency_avg_s"] = round(total / max(count, 1), 4)

        # A rough placeholder budget readout for experiment tracking.
        tokens_used = self.counters.get("tokens.estimated_total", 0)
        result["cost.estimated_usd"] = round(tokens_used * 0.000002, 4)
        return result


telemetry = Telemetry()
