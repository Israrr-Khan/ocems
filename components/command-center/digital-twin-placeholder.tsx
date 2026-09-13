import { Box, MapPin } from "lucide-react";
import { FACILITY_NAME, SITE_CODE } from "@/lib/mock-telemetry";

export function DigitalTwinPlaceholder() {
  return (
    <section className="flex min-h-[320px] flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0c1118] lg:min-h-[440px]">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2">
          <Box className="h-4 w-4 text-cyan-300" strokeWidth={1.75} />
          <div>
            <h2 className="text-sm font-medium text-slate-100">Digital Twin</h2>
            <p className="text-xs text-slate-500">
              {FACILITY_NAME} · {SITE_CODE}
            </p>
          </div>
        </div>
        <p className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 sm:block">
          Viewport reserved for Three.js
        </p>
      </div>

      <div
        id="digital-twin-root"
        className="relative flex flex-1 items-center justify-center overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0 twin-grid opacity-40" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.08),transparent_62%)]" />

        <div className="relative z-10 mx-4 my-8 w-full max-w-2xl">
          <svg
            viewBox="0 0 640 280"
            className="h-auto w-full text-cyan-300/70"
            aria-hidden="true"
          >
            <rect x="48" y="70" width="120" height="88" rx="10" fill="#101820" stroke="currentColor" strokeWidth="1.4" />
            <rect x="200" y="56" width="150" height="116" rx="12" fill="#101820" stroke="currentColor" strokeWidth="1.4" />
            <rect x="390" y="78" width="110" height="80" rx="10" fill="#101820" stroke="currentColor" strokeWidth="1.4" />
            <path
              d="M168 114 H200 M350 114 H390 M500 118 H560"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
              opacity="0.55"
            />
            <circle cx="184" cy="114" r="7" fill="#22d3ee" />
            <circle cx="370" cy="114" r="7" fill="#22d3ee" />
            <circle cx="530" cy="118" r="8" fill="#f43f5e" />
            <rect x="548" y="96" width="44" height="44" rx="6" fill="#1a1014" stroke="#f43f5e" strokeWidth="1.4" />
          </svg>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-500">
            <span>EQ tank</span>
            <span>Aeration</span>
            <span>Clarifier</span>
            <span className="text-rose-300">Bypass node</span>
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-cyan-400" />
            Facility schematic placeholder · 3D twin not mounted
          </span>
          <span className="font-mono tracking-[0.14em]">CAM ORBIT LOCKED</span>
        </div>
      </div>
    </section>
  );
}
