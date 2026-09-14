export type SimulationScenario =
  | "NORMAL"
  | "BYPASS"
  | "DILUTION"
  | "SENSOR_TAMPERING"
  | "HIGH_POLLUTION";

type SimulationState = {
  running: boolean;
  scenario: SimulationScenario;
  mainValve: "OPEN" | "CLOSED";
  bypassValve: "OPEN" | "CLOSED";
  tickCount: number;
  startedAt: number;
};

const globalForSimulation = globalThis as typeof globalThis & {
  __ocemsSimulationState?: SimulationState;
};

export const simulationState =
  globalForSimulation.__ocemsSimulationState ??
  (globalForSimulation.__ocemsSimulationState = {
    running: false,
    scenario: "NORMAL",
    mainValve: "OPEN",
    bypassValve: "CLOSED",
    tickCount: 0,
    startedAt: Date.now(),
  });