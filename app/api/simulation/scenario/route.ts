import { NextResponse } from "next/server";
import {
  simulationState,
  type SimulationScenario,
} from "@/lib/simulation-state";

const SCENARIOS = [
  "NORMAL",
  "BYPASS",
  "DILUTION",
  "SENSOR_TAMPERING",
  "HIGH_POLLUTION",
] as const;

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));

    const scenario = body.scenario;

    if (!SCENARIOS.includes(scenario)) {
      return NextResponse.json(
        {
          success: false,
          code: "INVALID_SCENARIO",
          message: "Invalid simulation scenario",
          allowedScenarios: SCENARIOS,
        },
        { status: 400 }
      );
    }

    const selectedScenario = scenario as SimulationScenario;

    simulationState.scenario = selectedScenario;
    simulationState.tickCount = 0;
    simulationState.startedAt = Date.now();

    if (selectedScenario === "BYPASS") {
      simulationState.mainValve = "CLOSED";
      simulationState.bypassValve = "OPEN";
    } else {
      simulationState.mainValve = "OPEN";
      simulationState.bypassValve = "CLOSED";
    }

    return NextResponse.json({
      success: true,
      message: `Simulation scenario set to ${selectedScenario}`,
      scenario: selectedScenario,
      running: simulationState.running,
      mainValve: simulationState.mainValve,
      bypassValve: simulationState.bypassValve,
    });
  } catch (error) {
    console.error("Simulation scenario error:", error);

    return NextResponse.json(
      {
        success: false,
        code: "SIMULATION_SCENARIO_FAILED",
        message: "Unable to set simulation scenario",
      },
      { status: 500 }
    );
  }
}