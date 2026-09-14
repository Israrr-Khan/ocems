from typing import Any


def build_prediction(
    telemetry: dict[str, Any],
    history: list[dict[str, Any]],
) -> dict[str, Any]:
    """Build a transparent short-term trend forecast without a trained model."""
    window = "next 2 hours"
    if len(history) < 2:
        return {
            "method": "rule-based trend",
            "forecastWindow": window,
            "status": "INSUFFICIENT_HISTORY",
            "summary": (
                "At least two prior readings are needed for a trend forecast. "
                "Current telemetry was still evaluated for anomalies."
            ),
            "trends": [],
        }

    trends = []
    for sensor, unit in (("ph", ""), ("bod", "mg/L"), ("tds", "mg/L"),
                         ("flow", "m³/h"), ("temperature", "°C")):
        values = [float(item[sensor]) for item in history if sensor in item]
        values.append(float(telemetry[sensor]))

        if len(values) < 2:
            continue

        change = values[-1] - values[0]
        if abs(change) < 0.01:
            direction = "STABLE"
        elif change > 0:
            direction = "RISING"
        else:
            direction = "FALLING"

        display_unit = f" {unit}" if unit else ""
        trends.append(
            {
                "sensor": sensor,
                "direction": direction,
                "changeObserved": round(change, 2),
                "unit": unit,
                "reason": (
                    f"{sensor} changed by {change:.2f}{display_unit} across "
                    f"the available telemetry window."
                ),
            }
        )

    return {
        "method": "rule-based trend",
        "forecastWindow": window,
        "status": "TREND_AVAILABLE" if trends else "INSUFFICIENT_HISTORY",
        "summary": (
            "Short-term direction is inferred from available telemetry; "
            "this is not a trained forecast model."
        ),
        "trends": trends,
    }
