import { NextResponse } from "next/server";
import { simulationState } from "@/lib/simulation-state";

export async function POST() {
  simulationState.running = true;

  return NextResponse.json({
    success: true,
    message: "Simulation started",
    running: simulationState.running,
    scenario: simulationState.scenario,
    mainValve: simulationState.mainValve,
    bypassValve: simulationState.bypassValve,
  });
}