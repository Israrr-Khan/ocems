export type TelemetryStatus = "nominal" | "watch" | "critical";

export type TelemetryMetric = {
  id: "ph" | "bod" | "tds" | "flow" | "production" | "main-valve" | "bypass-valve";
  label: string;
  value: string;
  unit?: string;
  status: TelemetryStatus;
  detail: string;
};

export type FacilityAlert = {
  id: string;
  severity: "critical" | "warning" | "info";
  title: string;
  source: string;
  time: string;
};

export const FACILITY_NAME = "Unit-04 Effluent Train";
export const SITE_CODE = "OCEMS-WT-04";

export const TELEMETRY: TelemetryMetric[] = [
  {
    id: "ph",
    label: "pH",
    value: "7.18",
    unit: "pH",
    status: "nominal",
    detail: "Within 6.5–8.5 discharge window",
  },
  {
    id: "bod",
    label: "BOD",
    value: "31.4",
    unit: "mg/L",
    status: "watch",
    detail: "Elevated vs 24 mg/L rolling baseline",
  },
  {
    id: "tds",
    label: "TDS",
    value: "1,246",
    unit: "mg/L",
    status: "nominal",
    detail: "Stable across last 45-minute window",
  },
  {
    id: "flow",
    label: "Flow",
    value: "42.6",
    unit: "m³/h",
    status: "nominal",
    detail: "Main line velocity consistent with production",
  },
  {
    id: "production",
    label: "Production",
    value: "86",
    unit: "%",
    status: "nominal",
    detail: "Process load aligned with declared batch",
  },
  {
    id: "main-valve",
    label: "Main Valve",
    value: "OPEN",
    status: "nominal",
    detail: "Primary discharge path authorized",
  },
  {
    id: "bypass-valve",
    label: "Bypass Valve",
    value: "OPEN",
    status: "critical",
    detail: "Tamper flag: bypass open while production is live",
  },
];

export const RISK_SCORE = {
  score: 74,
  label: "Elevated",
  summary:
    "Bypass actuator telemetry disagrees with the sealed-state interlock while BOD is trending above the site baseline. Treat as a diversion-risk event until physical verification closes the evidence gap.",
  factors: [
    { label: "Bypass / main path conflict", weight: 38 },
    { label: "BOD excursion vs baseline", weight: 22 },
    { label: "OCEMS enclosure integrity", weight: 14 },
  ],
};

export const RECENT_ALERTS: FacilityAlert[] = [
  {
    id: "ALT-8841",
    severity: "critical",
    title: "Bypass valve state mismatch",
    source: "OCEMS-03 · actuator vs seal",
    time: "00:04:12",
  },
  {
    id: "ALT-8836",
    severity: "warning",
    title: "BOD rising through watch band",
    source: "EQ tank · lab proxy feed",
    time: "00:11:40",
  },
  {
    id: "ALT-8829",
    severity: "info",
    title: "Flow sensor heartbeat restored",
    source: "FT-12 · main effluent",
    time: "00:26:08",
  },
];
