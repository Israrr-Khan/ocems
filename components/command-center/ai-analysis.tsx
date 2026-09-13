"use client";

import { CheckCircle2, Globe2, Leaf } from "lucide-react";

const analysisSteps = [
  "Reading sensor data...",
  "Checking parameter correlations...",
  "Analyzing flow vs production...",
  "Scanning for abnormal patterns...",
  "Cross-verifying with historical data...",
  "Running fraud detection model...",
  "Generating risk assessment...",
];

const trends = [
  {
    label: "pH",
    value: "7.1 – 7.3",
    points:
      "0,18 8,16 16,17 24,13 32,14 40,10 48,12 56,8 64,10 72,6 82,8 92,4 100,6",
  },
  {
    label: "BOD",
    value: "25 – 32 mg/L",
    points:
      "0,13 8,15 16,12 24,14 32,11 40,13 48,9 56,11 64,8 72,10 82,6 92,9 100,5",
  },
  {
    label: "TDS",
    value: "610 – 640 mg/L",
    points:
      "0,16 8,13 16,16 24,11 32,14 40,10 48,13 56,8 64,11 72,7 82,10 92,6 100,8",
  },
  {
    label: "Flow",
    value: "115 – 125 m³/h",
    points:
      "0,10 8,13 16,11 24,15 32,10 40,13 48,8 56,12 64,7 72,10 82,6 92,9 100,5",
  },
  {
    label: "Temp",
    value: "24 – 26 °C",
    points:
      "0,14 8,12 16,14 24,11 32,13 40,9 48,12 56,10 64,12 72,8 82,11 92,8 100,10",
  },
];


/* =========================================================
   MINI TREND CHART
========================================================= */

function MiniChart({ points }: { points: string }) {
  return (
    <svg
      viewBox="0 0 100 22"
      className="h-[20px] w-[76px] shrink-0"
      preserveAspectRatio="none"
      aria-hidden="true"
    >

      <defs>
        <linearGradient
          id="trendGradient"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop
            offset="0%"
            stopColor="rgba(34,211,238,0.22)"
          />

          <stop
            offset="100%"
            stopColor="rgba(34,211,238,0)"
          />
        </linearGradient>
      </defs>

      <polyline
        points={points}
        fill="none"
        stroke="#22d3ee"
        strokeWidth="1.15"
        vectorEffect="non-scaling-stroke"
      />

      <polyline
        points={`${points} 100,22 0,22`}
        fill="url(#trendGradient)"
        stroke="none"
      />

    </svg>
  );
}


/* =========================================================
   BRAIN ICON
========================================================= */

function FullBrainIcon() {
  return (
    <svg
      viewBox="0 0 40 40"
      className="h-8 w-8 shrink-0 text-cyan-300"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >

      {/* Outer brain */}
      <path d="M19.4 7.2c-1.1-2.1-4-2.7-5.8-1.1-1.7-1.2-4.2-.2-4.4 2-2.3-.1-3.8 2.2-2.8 4.3-1.9 1.2-1.7 4.1.4 5.1-1 2.2.7 4.5 3 4.5.2 2.2 2.7 3.4 4.5 2.1 1.1 1.9 4.1 1.8 5-.4 1.7 1.3 3.9.2 4.7-1.5 1.7 1.7 4.4 1.3 5.3-.7 2.3.2 4-2.1 3-4.2 2.1-1.1 2.1-4.1.1-5.3 1-2.1-.7-4.4-3-4.4-.3-2.1-2.8-3.1-4.5-1.8-1.7-1.6-4.3-.9-5.5 1.4Z" />

      {/* Left folds */}
      <path d="M12.1 8.3c1.5.1 2.4 1.2 2.2 2.5" />
      <path d="M9.1 11.7c1.5-.2 2.7.6 2.9 2" />
      <path d="M8.2 15.6c1.4-.2 2.7.6 2.9 2" />
      <path d="M10.2 19.4c1.4-.2 2.6.7 2.7 2" />
      <path d="M13.6 22.5c1.3-.1 2.4.7 2.5 1.9" />
      <path d="M16.4 12.1c-1.2.1-2 1-1.9 2.1" />
      <path d="M16.5 17.1c-1.2-.1-2 .7-2 1.8" />

      {/* Right folds */}
      <path d="M27.9 8.3c-1.5.1-2.4 1.2-2.2 2.5" />
      <path d="M30.9 11.7c-1.5-.2-2.7.6-2.9 2" />
      <path d="M31.8 15.6c-1.4-.2-2.7.6-2.9 2" />
      <path d="M29.8 19.4c-1.4-.2-2.6.7-2.7 2" />
      <path d="M26.4 22.5c-1.3-.1-2.4.7-2.5 1.9" />
      <path d="M23.6 12.1c1.2.1 2 1 1.9 2.1" />
      <path d="M23.5 17.1c1.2-.1 2 .7-2 1.8" />

      {/* Central fissure */}
      <path
        d="M20 5.8c-.7 2-.7 3.8 0 5.4.7 1.6.6 2.9-.1 4.1-.6 1.1-.6 2.3 0 3.5.6 1.2.6 2.4-.1 3.7-.7 1.3-.7 2.9.1 5.7"
        strokeWidth="1.15"
      />

      {/* Neural paths */}
      <path d="M16.8 9.2c1 .7 1.7 1.5 1.8 2.8.1 1.3-.5 2.2-1.1 3.1-.6.9-.8 1.9-.3 2.9" />
      <path d="M23.2 9.2c-1 .7-1.7 1.5-1.8 2.8-.1 1.3.5 2.2 1.1 3.1.6.9.8 1.9.3 2.9" />
      <path d="M18.1 21.5c-.7.8-1 1.7-.7 2.6.3.9 1.1 1.5 2 1.7" />
      <path d="M21.9 21.5c.7.8 1 1.7.7 2.6-.3.9-1.1 1.5-2 1.7" />

      {/* Nodes */}
      <circle
        cx="13.9"
        cy="14.9"
        r=".75"
        fill="currentColor"
        stroke="none"
      />

      <circle
        cx="26.1"
        cy="14.9"
        r=".75"
        fill="currentColor"
        stroke="none"
      />

      <circle
        cx="14.8"
        cy="19.1"
        r=".75"
        fill="currentColor"
        stroke="none"
      />

      <circle
        cx="25.2"
        cy="19.1"
        r=".75"
        fill="currentColor"
        stroke="none"
      />

      <circle
        cx="20"
        cy="17.4"
        r=".75"
        fill="currentColor"
        stroke="none"
      />

    </svg>
  );
}


/* =========================================================
   AI ANALYSIS PANEL
========================================================= */

export function AIAnalysis() {
  return (
    <aside
      className="
        flex
        w-full
        min-w-0
        flex-col
        gap-2.5
        translate-x-5
        -translate-y-2
      "
    >

      {/* ===================================================
          AI ANALYSIS
      =================================================== */}

<section
  className="
    h-[260px]
    shrink-0
    rounded-xl
    border
    border-cyan-500/25
    bg-[#07121b]
    p-2.5
  "
>

        {/* Header */}
        <div className="relative h-9">

          <div className="absolute left-0 top-0 flex h-7 items-center gap-2">

            <div className="relative flex h-8 w-8 shrink-0 items-center justify-center">

              <div className="absolute inset-0 rounded-full bg-cyan-400/10 blur-md" />

              <FullBrainIcon />

            </div>

            <h3
              className="
                whitespace-nowrap
                text-[11px]
                font-semibold
                leading-7
                text-slate-100
              "
            >
              AI ANALYSIS
            </h3>

          </div>


          {/* Real-time badge */}
          <span
            className="
              absolute
              right-0
              top-0
              flex
              h-6
              items-center
              rounded-lg
              border
              border-emerald-400/30
              bg-emerald-400/[0.04]
              px-2.5
              font-mono
              text-[8px]
              font-medium
              uppercase
              tracking-[0.05em]
              text-emerald-300
            "
          >
            REAL-TIME
          </span>


          {/* Header underline */}
          <div
            className="
              absolute
              bottom-0
              left-[39px]
              right-0
              h-px
              bg-cyan-400/55
              shadow-[0_0_7px_rgba(34,211,238,0.28)]
            "
          />

        </div>


        {/* Analysis steps */}
        <div className="mt-3.5 space-y-1">

          {analysisSteps.map((step) => (
            <div
              key={step}
              className="
                flex
                min-w-0
                items-center
                gap-1.5
                px-1
                py-[1px]
              "
            >

              {/* Step indicator */}
              <span
                className="
                  flex
                  h-3.5
                  w-3.5
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-cyan-400/35
                "
              >
                <span className="h-1 w-1 rounded-full bg-cyan-300" />
              </span>


              {/* Step text */}
              <span
                className="
                  min-w-0
                  flex-1
                  truncate
                  text-[9px]
                  leading-3.5
                  text-slate-300
                "
              >
                {step}
              </span>


              {/* Completed */}
              <CheckCircle2
                className="h-3 w-3 shrink-0 text-emerald-400"
                strokeWidth={2}
              />

            </div>
          ))}

        </div>


        {/* Normal status */}
        <div
          className="
            mt-1.5
            rounded-lg
            border
            border-emerald-400/60
            bg-emerald-400/[0.07]
            px-2.5
            py-2
            shadow-[0_0_16px_rgba(16,185,129,0.08)]
          "
        >

          <div className="flex items-center gap-2">

            <div
              className="
                flex
                h-7
                w-7
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-emerald-400
                text-[#06120d]
                shadow-[0_0_14px_rgba(52,211,153,.35)]
              "
            >

              <CheckCircle2
                className="h-4 w-4"
                strokeWidth={2.5}
              />

            </div>


            <div>

              <p
                className="
                  text-[11px]
                  font-semibold
                  leading-4
                  text-emerald-300
                "
              >
                Status: NORMAL
              </p>

              <p
                className="
                  text-[9px]
                  leading-3
                  text-emerald-200/80
                "
              >
                No anomaly detected
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ===================================================
          PREDICTION & TRENDS
      =================================================== */}

      <section
        className="
          h-[235px]
          shrink-0
          rounded-xl
          border
          border-cyan-500/25
          bg-[#07121b]
          p-2.5
        "
      >

        <div>

          <h3
            className="
              text-[11px]
              font-semibold
              uppercase
              tracking-wide
              text-slate-100
            "
          >
            PREDICTION &amp; TRENDS
          </h3>

          <p className="mt-0.5 text-[8px] text-cyan-300/80">
            Next 2 Hours (AI Forecast)
          </p>

        </div>


        {/* Trend table */}
        <div
          className="
            mt-1.5
            overflow-hidden
            rounded-md
            border
            border-cyan-400/10
            bg-[#061019]
          "
        >

          {trends.map((trend, index) => (
            <div
              key={trend.label}
              className={[
                "flex h-[35px] items-center gap-2 px-2",
                index !== trends.length - 1
                  ? "border-b border-white/[0.04]"
                  : "",
              ].join(" ")}
            >

              <span
                className="
                  w-8
                  shrink-0
                  text-[9px]
                  font-medium
                  text-slate-300
                "
              >
                {trend.label}
              </span>


              <span
                className="
                  w-[82px]
                  shrink-0
                  font-mono
                  text-[9px]
                  leading-3
                  text-slate-200
                "
              >
                {trend.value}
              </span>


              <div className="ml-auto">
                <MiniChart points={trend.points} />
              </div>

            </div>
          ))}

        </div>

      </section>


      {/* ===================================================
          ENVIRONMENTAL IMPACT
      =================================================== */}

<section
  className="
    relative
    top-0.1
    h-[80px]
    shrink-0
    rounded-xl
    border
    border-cyan-500/25
    bg-[#07121b]
    p-2.5
  "
>

        {/* Title */}
        <div className="flex items-center gap-1.5">

          <Leaf
            className="h-3.5 w-3.5 text-emerald-300"
            strokeWidth={1.8}
          />

          <h3
            className="
              text-[11px]
              font-semibold
              uppercase
              tracking-wide
              text-slate-100
            "
          >
            ENVIRONMENTAL IMPACT
          </h3>

        </div>


        {/* Impact cards */}
        <div className="mt-1 grid grid-cols-2">

          {/* Compliant discharge */}
          <div
            className="
              flex
              items-center
              gap-1.5
              border-r
              border-cyan-400/15
              pr-1.5
            "
          >

            <Leaf
              className="h-8 w-8 shrink-0 text-emerald-400"
              strokeWidth={1.4}
            />

            <div className="min-w-0">

              <p
                className="
                  truncate
                  text-[9px]
                  font-semibold
                  leading-3
                  text-slate-100
                "
              >
                Compliant Discharge
              </p>

              <p
                className="
                  mt-0.5
                  text-[7px]
                  leading-3
                  text-slate-400
                "
              >
                Within CPCB Norms
              </p>

            </div>

          </div>


          {/* Cleaner industry */}
          <div
            className="
              flex
              items-center
              gap-1.5
              pl-1.5
            "
          >

            <Globe2
              className="h-8 w-8 shrink-0 text-cyan-300"
              strokeWidth={1.35}
            />

            <div className="min-w-0">

              <p
                className="
                  text-[8px]
                  font-semibold
                  leading-3
                  text-slate-100
                "
              >
                Cleaner Industry
              </p>

              <p
                className="
                  mt-0.5
                  text-[7px]
                  leading-3
                  text-cyan-300/80
                "
              >
                Greener Tomorrow
              </p>

            </div>

          </div>

        </div>


        {/* Compliance bar */}
        <div
          className="
            mt-1.5
            h-1
            overflow-hidden
            rounded-full
            bg-slate-800
          "
        >

          <div
            className="
              h-full
              w-[78%]
              rounded-full
              bg-emerald-400
              shadow-[0_0_8px_rgba(52,211,153,.5)]
            "
          />

        </div>

      </section>

    </aside>
  );
}