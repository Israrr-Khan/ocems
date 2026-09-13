import { ShieldAlert } from "lucide-react";
import { RISK_SCORE } from "@/lib/mock-telemetry";

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function RiskScorePanel() {
  const offset = CIRCUMFERENCE - (RISK_SCORE.score / 100) * CIRCUMFERENCE;

  return (
    <section className="rounded-xl border border-white/10 bg-[#0c1118] p-5">
      <div className="flex items-center gap-2">
        <ShieldAlert className="h-4 w-4 text-amber-300" strokeWidth={1.75} />
        <h2 className="text-sm font-medium text-slate-100">AI Risk Score</h2>
      </div>

      <div className="mt-5 flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        <div className="relative h-36 w-36 shrink-0">
          <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90">
            <circle
              cx="70"
              cy="70"
              r={RADIUS}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="10"
            />
            <circle
              cx="70"
              cy="70"
              r={RADIUS}
              fill="none"
              stroke="#f59e0b"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono text-3xl text-slate-50">{RISK_SCORE.score}</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-amber-300">
              {RISK_SCORE.label}
            </span>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm leading-6 text-slate-400">{RISK_SCORE.summary}</p>
          <ul className="mt-4 space-y-3">
            {RISK_SCORE.factors.map((factor) => (
              <li key={factor.label}>
                <div className="mb-1 flex justify-between gap-3 text-xs text-slate-400">
                  <span>{factor.label}</span>
                  <span className="font-mono text-slate-300">{factor.weight}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-amber-400/80"
                    style={{ width: `${factor.weight * 2.2}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
