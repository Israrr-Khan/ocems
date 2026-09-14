from typing import Any


# Demo operating relationship for the hackathon. Replace with a calibrated
# plant baseline once historical telemetry is available.
HIGH_PRODUCTION_PERCENT = 70
MIN_FLOW_AT_HIGH_PRODUCTION_M3_H = 60


def detect_production_flow_mismatch(
    telemetry: dict[str, Any],
) -> list[dict[str, Any]]:
    """Flag low discharge flow when the production load is high."""
    production = telemetry["production"]
    flow = telemetry["flow"]

    if (
        production < HIGH_PRODUCTION_PERCENT
        or flow >= MIN_FLOW_AT_HIGH_PRODUCTION_M3_H
    ):
        return []

    shortfall = MIN_FLOW_AT_HIGH_PRODUCTION_M3_H - flow
    risk_contribution = 60 if shortfall >= 20 else 45

    return [
        {
            "type": "PRODUCTION_FLOW_MISMATCH",
            "riskContribution": risk_contribution,
            "confidence": 0.80,
            "description": (
                "Production is high but discharge flow is below the expected "
                "demo operating threshold."
            ),
            "evidence": [
                (
                    f"Production is {production}%, above the "
                    f"{HIGH_PRODUCTION_PERCENT}% high-production threshold."
                ),
                (
                    f"Flow is {flow} m³/h, below the expected minimum of "
                    f"{MIN_FLOW_AT_HIGH_PRODUCTION_M3_H} m³/h."
                ),
                f"Estimated flow shortfall is {shortfall:.1f} m³/h.",
            ],
        }
    ]
