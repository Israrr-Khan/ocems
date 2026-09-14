import { NextResponse } from "next/server";
import { db } from "@/src/prisma/db";

export async function GET() {
  try {
    const plants = await db.orm.public.Plant.all();

    const reports = await Promise.all(
      plants.map(async (plant) => {
        const telemetry = await db.orm.public.Telemetry
          .where((t) => t.plantId.eq(plant.id))
          .limit(100)
          .all();

        const alerts = await db.orm.public.Alert
          .where((a) => a.plantId.eq(plant.id))
          .limit(100)
          .all();

        return {
          plantId: plant.id,
          plantName: plant.name,
          telemetryCount: telemetry.length,
          alertCount: alerts.length,
          unresolvedAlerts: alerts.filter(
            (alert) => !alert.isResolved
          ).length,
        };
      })
    );

    return NextResponse.json({
      success: true,
      data: reports,
    });
  } catch (error) {
    console.error("Reports API error:", error);

    return NextResponse.json(
      {
        success: false,
        code: "REPORTS_FETCH_FAILED",
        message: "Unable to generate reports",
      },
      { status: 500 }
    );
  }
}