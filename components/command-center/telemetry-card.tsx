import {
  Activity,
  Droplets,
  Factory,
  FlaskConical,
  Gauge,
  Waves,
  type LucideIcon,
} from "lucide-react";

import type { TelemetryMetric } from "@/lib/mock-telemetry";

const ICONS: Record<TelemetryMetric["id"], LucideIcon> = {
  ph: FlaskConical,
  bod: Activity,
  tds: Droplets,
  flow: Waves,
  production: Factory,
  "main-valve": Gauge,
  "bypass-valve": Gauge,
};

const TRENDS: Record<TelemetryMetric["id"], string> = {
  ph: "-0.2",
  bod: "-12%",
  tds: "+5%",
  flow: "-3%",
  production: "+2%",
  "main-valve": "0%",
  "bypass-valve": "ABNORMAL",
};

const TREND_ARROWS: Record<TelemetryMetric["id"], string> = {
  ph: "↘",
  bod: "↘",
  tds: "↗",
  flow: "↘",
  production: "↗",
  "main-valve": "↔",
  "bypass-valve": "↗",
};

const SPARKLINES: Record<TelemetryMetric["id"], string> = {
  ph: "M2 25 C10 23 15 25 21 21 S31 23 37 19 S47 21 54 17 S64 19 71 15 S81 17 88 13 S98 15 105 11 S113 12 118 8",
  bod: "M2 18 C10 20 15 17 22 20 S32 21 39 18 S49 20 56 17 S66 19 73 16 S83 18 90 14 S100 17 107 13 S114 12 118 8",
  tds: "M2 24 C9 20 14 23 20 18 S30 21 36 16 S46 19 52 14 S62 17 69 12 S79 15 85 10 S95 14 102 9 S111 12 118 6",
  flow: "M2 13 C9 17 14 14 20 19 S30 22 37 17 S47 12 54 18 S64 21 71 16 S81 12 88 17 S98 21 105 16 S113 14 118 18",
  production:
    "M2 23 C10 21 15 24 21 20 S31 22 37 18 S47 20 53 16 S63 19 70 13 S80 16 86 11 S96 14 103 9 S112 12 118 7",
  "main-valve":
    "M2 18 C15 18 15 18 28 18 S41 18 54 18 S67 18 80 18 S93 18 106 18 S112 18 118 18",
  "bypass-valve":
    "M2 24 C12 24 16 21 24 22 S36 25 43 19 S53 20 60 16 S70 19 77 14 S87 17 94 12 S104 14 111 9 S115 8 118 7",
};

function Sparkline({ id }: { id: TelemetryMetric["id"] }) {
  const path = SPARKLINES[id];

  return (
    <div className="absolute bottom-[19px] left-3 right-3 h-[25px]">
      <svg
        viewBox="0 0 120 32"
        preserveAspectRatio="none"
        className="h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id={`telemetry-fill-${id}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.16" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path
          d={`${path} L118 32 L2 32 Z`}
          fill={`url(#telemetry-fill-${id})`}
          className="text-cyan-400"
        />

        <path
          d={path}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
          className="text-cyan-400"
        />
      </svg>
    </div>
  );
}

export function TelemetryCard({ metric }: { metric: TelemetryMetric }) {
  const Icon = ICONS[metric.id];

  const trendColor =
    metric.id === "bypass-valve"
      ? "text-rose-400"
      : metric.id === "flow"
        ? "text-orange-400"
        : "text-emerald-400";

  return (
    <article className="relative h-[103px] w-[calc(100%+16px)] -translate-y-1 overflow-hidden rounded-[6px] border border-cyan-500/25 bg-[#07131d] px-3 py-2.5 shadow-[0_0_18px_rgba(0,180,255,0.04)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-cyan-400/25" />

      <div className="flex min-w-0 items-center gap-2">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-cyan-400/20 bg-cyan-400/5">
          <Icon className="h-4 w-4 text-cyan-300" strokeWidth={1.7} />
        </div>

        <h3 className="min-w-0 truncate text-[10px] font-semibold tracking-[0.06em] text-slate-200">
          {metric.label}
        </h3>
      </div>

      <div className="ml-9 mt-0.5 flex items-baseline gap-1">
        <span className="font-sans text-[18px] font-medium leading-none tracking-tight text-white">
          {metric.value}
        </span>

        {metric.unit ? (
          <span className="text-[7px] text-slate-400">
            {metric.unit}
          </span>
        ) : null}
      </div>

      <Sparkline id={metric.id} />

      <div className="absolute bottom-1.5 left-3 right-3 flex items-center gap-1 whitespace-nowrap">
        <span className={`font-mono text-[8px] ${trendColor}`}>
          {TREND_ARROWS[metric.id]}
        </span>

        <span className={`font-mono text-[8px] ${trendColor}`}>
          {TRENDS[metric.id]}
        </span>

        <span className="truncate text-[7px] text-slate-500">
          (vs last hr)
        </span>
      </div>
    </article>
  );
}
