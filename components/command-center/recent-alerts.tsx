import { Bell } from "lucide-react";
import { RECENT_ALERTS, type FacilityAlert } from "@/lib/mock-telemetry";

const SEVERITY: Record<FacilityAlert["severity"], string> = {
  critical: "bg-rose-400/15 text-rose-300 border-rose-400/25",
  warning: "bg-amber-400/15 text-amber-300 border-amber-400/25",
  info: "bg-cyan-400/15 text-cyan-300 border-cyan-400/25",
};

export function RecentAlerts() {
  return (
    <section className="flex h-full flex-col rounded-xl border border-white/10 bg-[#0c1118] p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-cyan-300" strokeWidth={1.75} />
          <h2 className="text-sm font-medium text-slate-100">Recent Alerts</h2>
        </div>
        <span className="font-mono text-[10px] tracking-[0.16em] text-slate-500">
          LAST 30 MIN
        </span>
      </div>

      <ul className="mt-4 divide-y divide-white/10">
        {RECENT_ALERTS.map((alert) => (
          <li key={alert.id} className="py-3 first:pt-0 last:pb-0">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm text-slate-200">{alert.title}</p>
                <p className="mt-1 truncate text-xs text-slate-500">{alert.source}</p>
              </div>
              <span
                className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] ${SEVERITY[alert.severity]}`}
              >
                {alert.severity}
              </span>
            </div>
            <p className="mt-2 font-mono text-[11px] text-slate-500">
              {alert.id} · T-{alert.time}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
