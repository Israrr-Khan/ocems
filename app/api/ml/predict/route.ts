import { NextResponse } from "next/server";
import { db } from "@/src/prisma/db";
import { simulationState } from "@/lib/simulation-state";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));

    const plantId =
      typeof body.plantId === "number" ? body.plantId : 1;

    const telemetry = (
      await db.orm.public.Telemetry
        .where((t) => t.plantId.eq(plantId))
        .orderBy((t) => t.recordedAt.desc())
        .limit(100)
        .all()
    ).filter(
      (item) =>
        item.recordedAt.epochMilliseconds >= simulationState.startedAt
    );

    const sensors = await db.orm.public.Sensor
      .where((s) => s.plantId.eq(plantId))
      .limit(100)
      .all();

    const sensorTypeById = new Map(
      sensors.map((sensor) => [
        sensor.id,
        sensor.type.toUpperCase(),
      ])
    );

    const latestBySensor = new Map<
      number,
      (typeof telemetry)[number]
    >();

    for (const item of telemetry) {
      if (!latestBySensor.has(item.sensorId)) {
        latestBySensor.set(item.sensorId, item);
      }
    }

    const latestValues: Record<string, number> = {};

    for (const [sensorId, item] of latestBySensor) {
      const type = sensorTypeById.get(sensorId);

      switch (type) {
        case "PH":
          latestValues.ph = item.value;
          break;

        case "BOD":
          latestValues.bod = item.value;
          break;

        case "TDS":
          latestValues.tds = item.value;
          break;

        case "FLOW":
          latestValues.flow = item.value;
          break;

        case "TEMPERATURE":
          latestValues.temperature = item.value;
          break;

        case "PRODUCTION":
          latestValues.production = item.value;
          break;
      }
    }

    const historyByType: Record<string, number[]> = {};

    for (const item of telemetry) {
      const type = sensorTypeById.get(item.sensorId);

      if (!type) {
        continue;
      }

      const key = type.toLowerCase();

      if (!historyByType[key]) {
        historyByType[key] = [];
      }

      if (historyByType[key].length < 5) {
        historyByType[key].push(item.value);
      }
    }

    const historyLength = Math.min(
      5,
      historyByType.ph?.length ?? 0,
      historyByType.bod?.length ?? 0,
      historyByType.tds?.length ?? 0,
      historyByType.flow?.length ?? 0,
      historyByType.temperature?.length ?? 0,
      historyByType.production?.length ?? 0
    );

    const history = Array.from({
      length: historyLength,
    }).map((_, index) => ({
      ph: historyByType.ph[index],
      bod: historyByType.bod[index],
      tds: historyByType.tds[index],
      flow: historyByType.flow[index],
      temperature: historyByType.temperature[index],
      production: historyByType.production[index],
    }));

    const mlInput: Record<string, unknown> = {
      mainValve: simulationState.mainValve,
      bypassValve: simulationState.bypassValve,
      history,
      ...latestValues,
    };

    const mlResponse = await fetch(
      "http://127.0.0.1:8000/predict",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mlInput),
      }
    );

    if (!mlResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          error: "ML service request failed",
        },
        { status: 502 }
      );
    }

    const mlAnalysis = await mlResponse.json();

    return NextResponse.json({
      success: true,
      telemetry: mlInput,
      analysis: mlAnalysis,
    });
  } catch (error) {
    console.error("ML integration error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to connect to ML service",
      },
      { status: 500 }
    );
  }
}