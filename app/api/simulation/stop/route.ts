import { NextResponse } from "next/server";
import { simulationState } from "@/lib/simulation-state";

export async function POST() {
  simulationState.running = false;

  return NextResponse.json({
    success: true,
    message: "Simulation stopped",
    running: simulationState.running,
    scenario: simulationState.scenario,
    mainValve: simulationState.mainValve,
    bypassValve: simulationState.bypassValve,
  });
}