import { NextResponse } from "next/server";
import { db } from "@/src/prisma/db";

export async function GET() {
  try {
    const telemetry = await db.orm.public.Telemetry
      .orderBy((t) => t.recordedAt.desc())
      .limit(100)
      .all();

    const latestBySensor = new Map<number, (typeof telemetry)[number]>();

    for (const item of telemetry) {
      if (!latestBySensor.has(item.sensorId)) {
        latestBySensor.set(item.sensorId, item);
      }
    }

    const sensors = await db.orm.public.Sensor.limit(100).all();

    const sensorTypeById = new Map(
      sensors.map((sensor) => [sensor.id, sensor.type.toUpperCase()])
    );

    const data: {
      ph?: number;
      bod?: number;
      tds?: number;
      flow?: number;
      temperature?: number;
      production?: number;
    } = {};

    for (const [sensorId, item] of latestBySensor) {
      const type = sensorTypeById.get(sensorId);

      switch (type) {
        case "PH":
          data.ph = item.value;
          break;
        case "BOD":
          data.bod = item.value;
          break;
        case "TDS":
          data.tds = item.value;
          break;
        case "FLOW":
          data.flow = item.value;
          break;
        case "TEMPERATURE":
          data.temperature = item.value;
          break;
        case "PRODUCTION":
          data.production = item.value;
          break;
      }
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Latest telemetry API error:", error);

    return NextResponse.json(
      {
        success: false,
        code: "LATEST_TELEMETRY_FETCH_FAILED",
        message: "Unable to fetch latest telemetry data",
      },
      { status: 500 }
    );
  }
}