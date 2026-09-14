import { NextResponse } from "next/server";
import { db } from "@/src/prisma/db";

export async function GET() {
  try {
    const telemetry = await db.orm.public.Telemetry
      .orderBy((t) => t.recordedAt.desc())
      .limit(100)
      .all();

    return NextResponse.json({
      success: true,
      data: telemetry.map((item) => ({
        ...item,
        id: item.id.toString(),
      })),
    });
  } catch (error) {
    console.error("Telemetry API error:", error);

    return NextResponse.json(
      {
        success: false,
        code: "TELEMETRY_FETCH_FAILED",
        message: "Unable to fetch telemetry data",
      },
      { status: 500 }
    );
  }
}
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { plantId, sensorId, value } = body;

    if (
      typeof plantId !== "number" ||
      typeof sensorId !== "number" ||
      typeof value !== "number"
    ) {
      return NextResponse.json(
        {
          success: false,
          code: "INVALID_TELEMETRY_DATA",
          message: "plantId, sensorId and value are required",
        },
        { status: 400 }
      );
    }

    const telemetry = await db.orm.public.Telemetry.create({
      plantId,
      sensorId,
      value,
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          ...telemetry,
          id: telemetry.id.toString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Telemetry POST error:", error);

    return NextResponse.json(
      {
        success: false,
        code: "TELEMETRY_CREATE_FAILED",
        message: "Unable to create telemetry data",
      },
      { status: 500 }
    );
  }
}