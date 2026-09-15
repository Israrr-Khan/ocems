import type { SimulationScenario } from "@/lib/simulation-state";

export type SimulationTelemetry = {
  ph: number;
  bod: number;
  tds: number;
  flow: number;
  temperature: number;
  production: number;
};

export const SIMULATION_SCENARIOS: Record<
  SimulationScenario,
  SimulationTelemetry
> = {
  NORMAL: {
    ph: 7.2,
    bod: 25,
    tds: 1200,
    flow: 65,
    temperature: 25,
    production: 60,
  },

  BYPASS: {
    ph: 7.2,
    bod: 15,
    tds: 700,
    flow: 40,
    temperature: 25,
    production: 85,
  },

  DILUTION: {
    ph: 7.2,
    bod: 15,
    tds: 700,
    flow: 90,
    temperature: 25,
    production: 85,
  },

  SENSOR_TAMPERING: {
    ph: 7.2,
    bod: 25,
    tds: 1200,
    flow: 65,
    temperature: 25,
    production: 60,
  },

  HIGH_POLLUTION: {
    ph: 7.2,
    bod: 80,
    tds: 2500,
    flow: 70,
    temperature: 30,
    production: 85,
  },
};