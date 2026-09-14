import { NextResponse } from "next/server";
import { db } from "@/src/prisma/db";

export async function GET() {
  try {
    const alerts = await db.orm.public.Alert
      .orderBy((a) => a.createdAt.desc())
      .limit(100)
      .all();

    return NextResponse.json({
      success: true,
      data: alerts.map((item) => ({
        ...item,
        id: item.id.toString(),
      })),
    });
  } catch (error) {
    console.error("Alerts API error:", error);

    return NextResponse.json(
      {
        success: false,
        code: "ALERTS_FETCH_FAILED",
        message: "Unable to fetch alerts",
      },
      { status: 500 }
    );
  }
}
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      plantId,
      type,
      severity,
      message,
    } = body;

    if (
      typeof plantId !== "number" ||
      typeof type !== "string" ||
      typeof severity !== "string" ||
      typeof message !== "string"
    ) {
      return NextResponse.json(
        {
          success: false,
          code: "INVALID_ALERT_DATA",
          message: "plantId, type, severity and message are required",
        },
        { status: 400 }
      );
    }

    const alert = await db.orm.public.Alert.create({
      plantId,
      type,
      severity,
      message,
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          ...alert,
          id: alert.id.toString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Alert POST error:", error);

    return NextResponse.json(
      {
        success: false,
        code: "ALERT_CREATE_FAILED",
        message: "Unable to create alert",
      },
      { status: 500 }
    );
  }
}