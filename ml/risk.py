from typing import Any


def calculate_risk(anomalies: list[dict[str, Any]]) -> dict[str, float | int]:
    if not anomalies:
        return {
            "score": 0,
            "confidence": 0,
        }

    contributions = sorted(
        (item["riskContribution"] for item in anomalies),
        reverse=True,
    )

    score = contributions[0] + sum(contributions[1:]) * 0.25
    confidence = max(item["confidence"] for item in anomalies)

    return {
        "score": min(round(score), 100),
        "confidence": confidence,
    }