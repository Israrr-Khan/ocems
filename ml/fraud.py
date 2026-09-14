from typing import Any


# Demo thresholds for the hackathon.
# Replace these later with plant-specific baseline values.
HIGH_PRODUCTION_PERCENT = 70
LOW_FLOW_M3_H = 50
LOW_BOD_MG_L = 20
LOW_TDS_MG_L = 800


def detect_bypass(telemetry: dict[str, Any]) -> list[dict[str, Any]]:
    """
    Detect a possible bypass using explainable, rule-based evidence.
    No trained model is claimed here.
    """
    if telemetry["bypassValve"] != "OPEN":
        return []

    evidence = ["Bypass valve is OPEN."]
    risk_score = 35
    signal_count = 1

    if telemetry["production"] >= HIGH_PRODUCTION_PERCENT:
        evidence.append(
            f"Production is high ({telemetry['production']}%), "
            f"above the {HIGH_PRODUCTION_PERCENT}% threshold."
        )
        risk_score += 20
        signal_count += 1

    if telemetry["flow"] <= LOW_FLOW_M3_H:
        evidence.append(
            f"Flow is low ({telemetry['flow']} m³/h), "
            f"at or below the {LOW_FLOW_M3_H} m³/h threshold."
        )
        risk_score += 20
        signal_count += 1

    pollution_is_low = (
        telemetry["bod"] <= LOW_BOD_MG_L
        and telemetry["tds"] <= LOW_TDS_MG_L
    )
    if pollution_is_low:
        evidence.append(
            "BOD and TDS are unexpectedly low while the bypass valve is open."
        )
        risk_score += 15
        signal_count += 1

    if telemetry["mainValve"] == "CLOSED":
        evidence.append("Main valve is CLOSED while bypass valve is OPEN.")
        risk_score += 10
        signal_count += 1

    risk_score = min(risk_score, 100)
    confidence = min(round(0.55 + (signal_count - 1) * 0.10, 2), 0.95)

    anomaly_type = (
        "POSSIBLE_BYPASS" if risk_score >= 60 else "BYPASS_VALVE_OPEN"
    )

    return [
        {
            "type": anomaly_type,
            "riskContribution": risk_score,
            "confidence": confidence,
            "description": (
                "Possible effluent bypass detected from valve, production, "
                "flow, and pollution telemetry."
            ),
            "evidence": evidence,
        }
    ]


HIGH_FLOW_M3_H = 70
NORMAL_PH_MIN = 6.5
NORMAL_PH_MAX = 8.5


def detect_dilution(telemetry: dict[str, Any]) -> list[dict[str, Any]]:
    production_is_high = telemetry["production"] >= HIGH_PRODUCTION_PERCENT
    flow_is_high = telemetry["flow"] >= HIGH_FLOW_M3_H
    bod_is_low = telemetry["bod"] <= LOW_BOD_MG_L
    tds_is_low = telemetry["tds"] <= LOW_TDS_MG_L
    ph_is_normal = NORMAL_PH_MIN <= telemetry["ph"] <= NORMAL_PH_MAX

    if not all(
        [production_is_high, flow_is_high, bod_is_low, tds_is_low, ph_is_normal]
    ):
        return []

    return [
        {
            "type": "POSSIBLE_DILUTION",
            "riskContribution": 75,
            "confidence": 0.80,
            "description": (
                "Possible clean-water dilution: high production and flow "
                "coincide with unusually low BOD and TDS."
            ),
            "evidence": [
                f"Production is high ({telemetry['production']}%).",
                f"Flow is high ({telemetry['flow']} m³/h).",
                f"BOD is low ({telemetry['bod']} mg/L).",
                f"TDS is low ({telemetry['tds']} mg/L).",
                f"pH remains within normal range ({telemetry['ph']}).",
            ],
        }
    ]