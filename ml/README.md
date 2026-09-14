# OCEMS Sentinel ML Service

Independent FastAPI service for explainable, rule-based telemetry analysis.
It does not connect directly to PostgreSQL. The Next.js backend sends telemetry
to this service and can store or return the analysis result.

## Run locally

From the repository root:

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r ml\requirements.txt
uvicorn ml.main:app --reload --port 8000
```

API documentation: `http://127.0.0.1:8000/docs`

## API contract

`POST http://127.0.0.1:8000/predict`

Request body:

```json
{
  "ph": 7.18,
  "bod": 31.4,
  "tds": 1246,
  "flow": 42.6,
  "temperature": 24.6,
  "production": 86,
  "mainValve": "OPEN",
  "bypassValve": "CLOSED",
  "history": []
}
```

`history` is optional. Send at least two previous readings when a trend
forecast is required, and at least five when sensor-tampering detection is
required. Each history record should contain `ph`, `flow`, and `production`.
For trend forecasts, also include `bod`, `tds`, and `temperature`.

Response includes:

```text
status        LOW | MEDIUM | HIGH | CRITICAL
riskScore     final 0–100 aggregated score
confidence    highest confidence among detected anomalies
anomalies     type, risk contribution, description, evidence
prediction    rule-based two-hour trend summary; not a trained model
```

## Next.js backend integration (Person 1)

Call the ML service from a server-side Next.js API route. Do not call it
directly from the browser.

```ts
const mlResponse = await fetch("http://127.0.0.1:8000/predict", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(telemetry),
});

if (!mlResponse.ok) {
  throw new Error("ML service request failed");
}

const mlAnalysis = await mlResponse.json();
```

Recommended flow:

```text
PostgreSQL telemetry -> Next.js API -> FastAPI /predict -> Next.js response
                                      -> store alert / analysis if required
```

## Current detections

- Possible bypass
- Possible clean-water dilution
- Possible pH sensor tampering
- General sensor range anomalies
- Production-flow mismatch
- Risk-score aggregation
- Rule-based short-term trend prediction

Thresholds are demo values for the hackathon. Replace them with plant-specific
baselines and regulatory limits when real historical telemetry is available.
