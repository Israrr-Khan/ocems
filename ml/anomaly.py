from typing import Any


def detect_sensor_tampering(history: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """
    Detect a pH sensor that remains exactly constant while
    production and flow are changing.
    """
    if len(history) < 5:
        return []

    ph_values = [float(reading["ph"]) for reading in history]
    flow_values = [float(reading["flow"]) for reading in history]
    production_values = [float(reading["production"]) for reading in history]

    ph_is_frozen = len({round(value, 3) for value in ph_values}) == 1
    flow_changed = max(flow_values) - min(flow_values) >= 5
    production_changed = max(production_values) - min(production_values) >= 5

    if not (ph_is_frozen and flow_changed and production_changed):
        return []

    return [
        {
            "type": "POSSIBLE_SENSOR_TAMPERING",
            "riskContribution": 70,
            "confidence": 0.85,
            "description": (
                "pH remains perfectly constant while flow and production change."
            ),
            "evidence": [
                f"pH is unchanged across {len(history)} readings.",
                (
                    f"Flow changed by "
                    f"{max(flow_values) - min(flow_values):.1f} m³/h."
                ),
                (
                    f"Production changed by "
                    f"{max(production_values) - min(production_values):.1f}%."
                ),
            ],
        }
    ]
def detect_general_anomalies(
    telemetry: dict[str, Any],
) -> list[dict[str, Any]]:
    """
    Detect values outside demo operational ranges.
    Replace ranges with plant/CPCB-approved limits during integration.
    """
    checks = [
        ("pH", telemetry["ph"], 6.5, 8.5, ""),
        ("BOD", telemetry["bod"], 0, 30, "mg/L"),
        ("TDS", telemetry["tds"], 0, 2100, "mg/L"),
        ("Flow", telemetry["flow"], 10, 150, "m³/h"),
        ("Temperature", telemetry["temperature"], 5, 50, "°C"),
    ]

    anomalies = []

    for sensor, value, minimum, maximum, unit in checks:
        if minimum <= value <= maximum:
            continue

        direction = "below" if value < minimum else "above"
        display_unit = f" {unit}" if unit else ""

        anomalies.append(
            {
                "type": "GENERAL_SENSOR_ANOMALY",
                "riskContribution": 45,
                "confidence": 0.75,
                "description": (
                    f"{sensor} is {direction} its expected operating range."
                ),
                "evidence": [
                    (
                        f"{sensor} reading is {value}{display_unit}; "
                        f"expected range is {minimum}–{maximum}{display_unit}."
                    )
                ],
            }
        )

    return anomalies

