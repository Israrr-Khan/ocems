import { TELEMETRY } from "@/lib/mock-telemetry";
import { PlantSchematic } from "@/components/command-center/plant-schematic";
import { RecentAlerts } from "@/components/command-center/recent-alerts";
import { RiskScorePanel } from "@/components/command-center/risk-score-panel";
import { TelemetryCard } from "@/components/command-center/telemetry-card";
import { AIAnalysis } from "@/components/command-center/ai-analysis";

export function CommandCenter() {
  const primaryTelemetry = TELEMETRY.slice(0, 6);

  return (
    <div className="mx-auto w-full max-w-[1900px]">

      {/* =====================================================
          MAIN DASHBOARD
      ===================================================== */}

      <div
        className="
          grid
          min-w-0
          grid-cols-1
          gap-4
          xl:grid-cols-[minmax(0,1fr)_280px]
          2xl:grid-cols-[minmax(0,1fr)_300px]
        "
      >

        {/* ===================================================
            LEFT SIDE
        =================================================== */}

        <main className="min-w-0 space-y-3">

          {/* -------------------------------------------------
              TELEMETRY
          ------------------------------------------------- */}

          <section aria-label="Primary telemetry">

            <div
              className="
                grid
                grid-cols-2
                gap-6.5
                sm:grid-cols-3
                xl:grid-cols-6
              "
            >

              {primaryTelemetry.map((metric) => (
                <TelemetryCard
                  key={metric.id}
                  metric={metric}
                />
              ))}

            </div>

          </section>


          {/* -------------------------------------------------
              PLANT SCHEMATIC
          ------------------------------------------------- */}

          <section aria-label="Plant schematic">

            <PlantSchematic />

          </section>

        </main>


        {/* ===================================================
            RIGHT SIDE INTELLIGENCE COLUMN
        =================================================== */}

<aside
  aria-label="AI intelligence"
  className="
    min-w-0
    self-stretch
    xl:sticky
    xl:top-3
    xl:h-[calc(100vh-115px)]
  "
>
  <AIAnalysis />
</aside>

      </div>


      {/* =====================================================
          SECONDARY PANELS
      ===================================================== */}

      <section
        aria-label="Risk and recent alerts"
        className="
          mt-4
          grid
          grid-cols-1
          gap-4
          xl:grid-cols-5
        "
      >

        <div className="xl:col-span-3">
          <RiskScorePanel />
        </div>

        <div className="xl:col-span-2">
          <RecentAlerts />
        </div>

      </section>

    </div>
  );
}