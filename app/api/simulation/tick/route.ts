import { NextResponse } from "next/server";
import { db } from "@/src/prisma/db";
import {
  simulationState,
  type SimulationScenario,
} from "@/lib/simulation-state";
import {
  SIMULATION_SCENARIOS,
  type SimulationTelemetry,
} from "@/lib/simulation-scenarios";

const SENSOR_IDS = {
  ph: 1,
  bod: 2,
  tds: 3,
  flow: 4,
  temperature: 5,
  production: 6,
} as const;

function getSimulationTelemetry(
  scenario: SimulationScenario,
  tickCount: number
): SimulationTelemetry {
  const base = SIMULATION_SCENARIOS[scenario];

  if (scenario !== "SENSOR_TAMPERING") {
    return { ...base };
  }

  return {
    ...base,
    ph: 7.2,
    flow: 50 + (tickCount % 5) * 5,
    production: 55 + (tickCount % 5) * 10,
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const plantId =
      typeof body.plantId === "number" ? body.plantId : 1;

    if (!simulationState.running) {
      return NextResponse.json(
        {
          success: false,
          code: "SIMULATION_NOT_RUNNING",
          message: "Simulation is not running",
        },
        { status: 409 }
      );
    }

    simulationState.tickCount += 1;

    const telemetry = getSimulationTelemetry(
      simulationState.scenario,
      simulationState.tickCount
    );

    const sensorValues = [
      { sensorId: SENSOR_IDS.ph, value: telemetry.ph },
      { sensorId: SENSOR_IDS.bod, value: telemetry.bod },
      { sensorId: SENSOR_IDS.tds, value: telemetry.tds },
      { sensorId: SENSOR_IDS.flow, value: telemetry.flow },
      {
        sensorId: SENSOR_IDS.temperature,
        value: telemetry.temperature,
      },
      {
        sensorId: SENSOR_IDS.production,
        value: telemetry.production,
      },
    ];

    const created = [];

    for (const item of sensorValues) {
      const record = await db.orm.public.Telemetry.create({
        plantId,
        sensorId: item.sensorId,
        value: item.value,
      });

      created.push({
        id: record.id.toString(),
        sensorId: record.sensorId,
        value: record.value,
      });
    }

    return NextResponse.json({
      success: true,
      scenario: simulationState.scenario,
      tickCount: simulationState.tickCount,
      mainValve: simulationState.mainValve,
      bypassValve: simulationState.bypassValve,
      telemetry,
      recordsCreated: created.length,
    });
  } catch (error) {
    console.error("Simulation tick error:", error);

    return NextResponse.json(
      {
        success: false,
        code: "SIMULATION_TICK_FAILED",
        message: "Unable to generate simulation telemetry",
      },
      { status: 500 }
    );
  }
}