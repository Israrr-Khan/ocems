from typing import Literal

from fastapi import FastAPI
from pydantic import BaseModel, Field

from ml.fraud import detect_bypass, detect_dilution
from ml.anomaly import detect_general_anomalies, detect_sensor_tampering
from ml.correlation import detect_production_flow_mismatch
from ml.prediction import build_prediction
from ml.risk import calculate_risk


app = FastAPI(
    title="OCEMS Sentinel ML Service",
    version="0.1.0",
)


class TelemetryInput(BaseModel):
    ph: float = Field(..., ge=0, le=14)
    bod: float = Field(..., ge=0)
    tds: float = Field(..., ge=0)
    flow: float = Field(..., ge=0)
    temperature: float
    production: float = Field(..., ge=0, le=100)
    mainValve: Literal["OPEN", "CLOSED"]
    bypassValve: Literal["OPEN", "CLOSED"]
    history: list[dict] = Field(default_factory=list)


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "ocems-sentinel-ml",
        "mlMode": "rule-based",
    }


@app.post("/predict")
def predict(telemetry: TelemetryInput):
    telemetry_data = telemetry.model_dump()
    anomalies = (
        detect_bypass(telemetry_data)
        + detect_dilution(telemetry_data)
        + detect_sensor_tampering(telemetry.history)
        + detect_general_anomalies(telemetry_data)
        + detect_production_flow_mismatch(telemetry_data)
    )
    risk_result = calculate_risk(anomalies)
    risk_score = risk_result["score"]
    confidence = risk_result["confidence"]
    prediction = build_prediction(telemetry_data, telemetry.history)

    if risk_score >= 81:
        status = "CRITICAL"
    elif risk_score >= 61:
        status = "HIGH"
    elif risk_score >= 31:
        status = "MEDIUM"
    else:
        status = "LOW"

    return {
        "status": status,
        "riskScore": risk_score,
        "confidence": confidence,
        "anomalies": anomalies,
        "prediction": prediction,
    }
