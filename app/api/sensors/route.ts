import { NextResponse } from "next/server";
import { db } from "@/src/prisma/db";

export async function GET() {
  try {
    const sensors = await db.orm.public.Sensor
      .orderBy((s) => s.createdAt.desc())
      .limit(100)
      .all();

    return NextResponse.json({
      success: true,
      data: sensors,
    });
  } catch (error) {
    console.error("Sensors API error:", error);

    return NextResponse.json(
      {
        success: false,
        code: "SENSORS_FETCH_FAILED",
        message: "Unable to fetch sensors",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { plantId, name, type, unit } = body;

    if (
      typeof plantId !== "number" ||
      typeof name !== "string" ||
      typeof type !== "string"
    ) {
      return NextResponse.json(
        {
          success: false,
          code: "INVALID_SENSOR_DATA",
          message: "plantId, name and type are required",
        },
        { status: 400 }
      );
    }

    const sensor = await db.orm.public.Sensor.create({
      plantId,
      name,
      type,
      unit,
    });

    return NextResponse.json(
      {
        success: true,
        data: sensor,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Sensor POST error:", error);

    return NextResponse.json(
      {
        success: false,
        code: "SENSOR_CREATE_FAILED",
        message: "Unable to create sensor",
      },
      { status: 500 }
    );
  }
}