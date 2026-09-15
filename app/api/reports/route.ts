import { NextResponse } from "next/server";
import { db } from "@/src/prisma/db";

type ReportType =
  | "daily"
  | "weekly"
  | "compliance"
  | "incident";

const REPORT_TYPES: ReportType[] = [
  "daily",
  "weekly",
  "compliance",
  "incident",
];

function getStartDate(type: ReportType): Date {
  const now = new Date();

  if (type === "weekly") {
    const date = new Date(now);
    date.setDate(date.getDate() - 7);
    return date;
  }

  const date = new Date(now);
  date.setDate(date.getDate() - 1);
  return date;
}

function getAverage(values: number[]): number | null {
  if (values.length === 0) {
    return null;
  }

  return (
    values.reduce((sum, value) => sum + value, 0) /
    values.length
  );
}

function getMin(values: number[]): number | null {
  return values.length > 0 ? Math.min(...values) : null;
}

function getMax(values: number[]): number | null {
  return values.length > 0 ? Math.max(...values) : null;
}

function getTimestamp(value: unknown): number {
  if (value instanceof Date) {
    return value.getTime();
  }

  return Date.parse(String(value));
}

function getLatestValue(
  telemetry: Array<{
    sensorId: number;
    value: number;
  }>,
  sensorTypeById: Map<number, string>,
  targetType: string
): number | null {
  for (const item of telemetry) {
    const type = sensorTypeById.get(item.sensorId);

    if (type === targetType) {
      return item.value;
    }
  }

  return null;
}

function getRiskScore(
  aiAnalysis: unknown
): number | null {
  if (
    typeof aiAnalysis === "object" &&
    aiAnalysis !== null &&
    "riskScore" in aiAnalysis
  ) {
    const riskScore = (
      aiAnalysis as {
        riskScore?: unknown;
      }
    ).riskScore;

    return typeof riskScore === "number"
      ? riskScore
      : null;
  }

  return null;
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);

    const requestedType =
      url.searchParams.get("type")?.toLowerCase() ?? "daily";

    const reportType: ReportType =
      REPORT_TYPES.includes(
        requestedType as ReportType
      )
        ? (requestedType as ReportType)
        : "daily";

    const plantIdParam =
      url.searchParams.get("plantId");

    const requestedPlantId =
      plantIdParam !== null
        ? Number(plantIdParam)
        : null;

    if (
      plantIdParam !== null &&
      (!Number.isInteger(requestedPlantId) ||
        requestedPlantId === null ||
        requestedPlantId <= 0)
    ) {
      return NextResponse.json(
        {
          success: false,
          code: "INVALID_PLANT_ID",
          message:
            "plantId must be a positive integer",
        },
        { status: 400 }
      );
    }

    const startDate = getStartDate(reportType);
    const now = new Date();

    const plants = await db.orm.public.Plant.all();

    const selectedPlants =
      requestedPlantId === null
        ? plants
        : plants.filter(
            (plant) =>
              plant.id === requestedPlantId
          );

    if (
      requestedPlantId !== null &&
      selectedPlants.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          code: "PLANT_NOT_FOUND",
          message:
            "Requested plant was not found",
        },
        { status: 404 }
      );
    }

    const reports = await Promise.all(
      selectedPlants.map(async (plant) => {
        const allTelemetry =
          await db.orm.public.Telemetry
            .where((t) =>
              t.plantId.eq(plant.id)
            )
            .orderBy((t) =>
              t.recordedAt.desc()
            )
            .limit(1000)
            .all();

        const allAlerts =
          await db.orm.public.Alert
            .where((a) =>
              a.plantId.eq(plant.id)
            )
            .orderBy((a) =>
              a.createdAt.desc()
            )
            .limit(1000)
            .all();

        const telemetry = allTelemetry.filter(
          (item) =>
            getTimestamp(item.recordedAt) >=
            startDate.getTime()
        );

        const alerts = allAlerts.filter(
          (alert) =>
            getTimestamp(alert.createdAt) >=
            startDate.getTime()
        );

        const sensors =
          await db.orm.public.Sensor
            .where((s) =>
              s.plantId.eq(plant.id)
            )
            .limit(100)
            .all();

        const sensorTypeById = new Map(
          sensors.map((sensor) => [
            sensor.id,
            sensor.type.toUpperCase(),
          ])
        );

        const values = {
          ph: [] as number[],
          bod: [] as number[],
          tds: [] as number[],
          flow: [] as number[],
          temperature: [] as number[],
          production: [] as number[],
        };

        for (const item of telemetry) {
          const type =
            sensorTypeById.get(item.sensorId);

          switch (type) {
            case "PH":
              values.ph.push(item.value);
              break;

            case "BOD":
              values.bod.push(item.value);
              break;

            case "TDS":
              values.tds.push(item.value);
              break;

            case "FLOW":
              values.flow.push(item.value);
              break;

            case "TEMPERATURE":
              values.temperature.push(
                item.value
              );
              break;

            case "PRODUCTION":
              values.production.push(
                item.value
              );
              break;
          }
        }

        const latestTelemetry = {
          ph: getLatestValue(
            allTelemetry,
            sensorTypeById,
            "PH"
          ),

          bod: getLatestValue(
            allTelemetry,
            sensorTypeById,
            "BOD"
          ),

          tds: getLatestValue(
            allTelemetry,
            sensorTypeById,
            "TDS"
          ),

          flow: getLatestValue(
            allTelemetry,
            sensorTypeById,
            "FLOW"
          ),

          temperature: getLatestValue(
            allTelemetry,
            sensorTypeById,
            "TEMPERATURE"
          ),

          production: getLatestValue(
            allTelemetry,
            sensorTypeById,
            "PRODUCTION"
          ),
        };

        let aiAnalysis: unknown = null;

        try {
          const mlUrl = new URL(
            "/api/ml/predict",
            request.url
          );

          const mlResponse = await fetch(
            mlUrl,
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                plantId: plant.id,
              }),
              cache: "no-store",
            }
          );

          if (mlResponse.ok) {
            const mlResult =
              await mlResponse.json();

            if (mlResult.success) {
              aiAnalysis =
                mlResult.analysis;
            }
          }
        } catch (error) {
          console.error(
            `AI report analysis failed for plant ${plant.id}:`,
            error
          );
        }

        const unresolvedAlerts =
          alerts.filter(
            (alert) => !alert.isResolved
          );

        const violations =
          alerts.filter(
            (alert) => {
              const severity =
                alert.severity.toUpperCase();

              return (
                severity === "HIGH" ||
                severity === "CRITICAL"
              );
            }
          );

        const anomalies =
          alerts.filter(
            (alert) => {
              const type =
                alert.type.toUpperCase();

              return (
                type.includes("ANOMALY") ||
                type.includes("BYPASS") ||
                type.includes("DILUTION") ||
                type.includes("TAMPERING")
              );
            }
          );

        return {
          plantId: plant.id,
          plantName: plant.name,
          location: plant.location,

          report: {
            type: reportType,

            period: {
              start: startDate.toISOString(),
              end: now.toISOString(),
            },
          },

          telemetry: {
            recordCount: telemetry.length,

            average: {
              ph: getAverage(values.ph),
              bod: getAverage(values.bod),
              tds: getAverage(values.tds),
              flow: getAverage(values.flow),
              temperature:
                getAverage(values.temperature),
              production:
                getAverage(values.production),
            },

            minimum: {
              ph: getMin(values.ph),
              bod: getMin(values.bod),
              tds: getMin(values.tds),
              flow: getMin(values.flow),
              temperature:
                getMin(values.temperature),
              production:
                getMin(values.production),
            },

            maximum: {
              ph: getMax(values.ph),
              bod: getMax(values.bod),
              tds: getMax(values.tds),
              flow: getMax(values.flow),
              temperature:
                getMax(values.temperature),
              production:
                getMax(values.production),
            },

            latest: latestTelemetry,
          },

          alerts: {
            total: alerts.length,

            unresolved:
              unresolvedAlerts.length,

            resolved: alerts.filter(
              (alert) =>
                alert.isResolved
            ).length,

            critical: alerts.filter(
              (alert) =>
                alert.severity.toUpperCase() ===
                "CRITICAL"
            ).length,

            high: alerts.filter(
              (alert) =>
                alert.severity.toUpperCase() ===
                "HIGH"
            ).length,

            items: alerts.map(
              (alert) => ({
                id: alert.id.toString(),
                type: alert.type,
                severity: alert.severity,
                message: alert.message,
                isResolved:
                  alert.isResolved,
                createdAt:
                  alert.createdAt,
                resolvedAt:
                  alert.resolvedAt,
              })
            ),
          },

          violations:
            violations.map(
              (alert) => ({
                type: alert.type,
                severity:
                  alert.severity,
                message:
                  alert.message,
                createdAt:
                  alert.createdAt,
              })
            ),

          anomalies:
            anomalies.map(
              (alert) => ({
                type: alert.type,
                severity:
                  alert.severity,
                message:
                  alert.message,
                createdAt:
                  alert.createdAt,
              })
            ),

          ai: {
            available:
              aiAnalysis !== null,

            analysis:
              aiAnalysis,
          },

          summary: {
            telemetryRecords:
              telemetry.length,

            alerts:
              alerts.length,

            unresolvedAlerts:
              unresolvedAlerts.length,

            violations:
              violations.length,

            anomalies:
              anomalies.length,

            riskScore:
              getRiskScore(aiAnalysis),
          },
        };
      })
    );

    return NextResponse.json({
      success: true,
      reportType,
      generatedAt:
        now.toISOString(),
      data: reports,
    });
  } catch (error) {
    console.error(
      "Reports API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        code: "REPORTS_FETCH_FAILED",
        message:
          "Unable to generate reports",
      },
      { status: 500 }
    );
  }
}