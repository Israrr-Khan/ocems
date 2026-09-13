"use client";

import {
  Bell,
  BarChart3,
  BrainCircuit,
  CalendarDays,
  FileBarChart,
  LayoutDashboard,
  Menu,
  ShieldCheck,
  X,
} from "lucide-react";

type TopHeaderProps = {
  menuOpen: boolean;
  onToggleMenu: () => void;
};

const NAVIGATION = [
  {
    label: "OVERVIEW",
    icon: LayoutDashboard,
    active: true,
  },
  {
    label: "PLANT TWIN",
    icon: BarChart3,
  },
  {
    label: "ANALYTICS",
    icon: BarChart3,
  },
  {
    label: "AI INSIGHTS",
    icon: BrainCircuit,
  },
  {
    label: "ALERTS",
    icon: Bell,
    badge: 3,
  },
  {
    label: "REPORTS",
    icon: FileBarChart,
  },
  {
    label: "COMPLIANCE",
    icon: ShieldCheck,
  },
];

export function TopHeader({
  menuOpen,
  onToggleMenu,
}: TopHeaderProps) {
  return (
    <header className="sticky top-0 z-30 h-[68px] border-b border-cyan-500/20 bg-[#03070b]/95 backdrop-blur-xl">
      <div className="flex h-full items-center px-5">
        {/* BRAND */}
        <div className="flex w-[315px] shrink-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-cyan-400/40 bg-cyan-400/10">
            <ShieldCheck
              className="h-6 w-6 text-cyan-300"
              strokeWidth={1.5}
            />
          </div>

          <div className="min-w-0">
            <h1
              className="whitespace-nowrap text-[19px] font-bold leading-none tracking-[0.055em] text-white"
              style={{
                fontFamily:
                  '"Arial Narrow", "Roboto Condensed", Arial, sans-serif',
              }}
            >
              TEST HEADER
            </h1>

            <p
              className="mt-1.5 whitespace-nowrap text-[8px] font-medium uppercase tracking-[0.075em] text-cyan-400/80"
              style={{
                fontFamily:
                  '"Arial Narrow", "Roboto Condensed", Arial, sans-serif',
              }}
            >
              AI POWERED EFFLUENT MONITORING & FRAUD DETECTION
            </p>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav
          className="flex h-full min-w-0 flex-1 items-center justify-center gap-1"
          aria-label="Primary"
        >
          {NAVIGATION.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className={[
                  "relative flex h-full shrink-0 items-center gap-2 px-3",
                  "text-[10px] font-medium tracking-[0.035em]",
                  item.active
                    ? "text-cyan-300"
                    : "text-slate-400",
                ].join(" ")}
                style={{
                  fontFamily:
                    '"Arial Narrow", "Roboto Condensed", Arial, sans-serif',
                }}
              >
                <Icon
                  className="h-3.5 w-3.5 shrink-0"
                  strokeWidth={1.6}
                />

                <span>{item.label}</span>

                {item.badge ? (
                  <span className="absolute right-0 top-[15px] flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[8px] font-bold text-white">
                    {item.badge}
                  </span>
                ) : null}

                {item.active ? (
                  <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
                ) : null}
              </div>
            );
          })}
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex w-[270px] shrink-0 items-center justify-end gap-3">
          {/* Plant Online */}
          <div className="flex h-9 items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-400/[0.03] px-3">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />

            <span
              className="text-[10px] font-semibold text-emerald-300"
              style={{
                fontFamily:
                  '"Arial Narrow", "Roboto Condensed", Arial, sans-serif',
              }}
            >
              Plant Online
            </span>
          </div>

          {/* Date / Time */}
          <div className="hidden items-center gap-2 xl:flex">
            <CalendarDays className="h-3.5 w-3.5 text-slate-500" />

            <div className="text-right leading-tight">
              <p
                className="text-[8px] text-slate-400"
                style={{
                  fontFamily:
                    '"Arial Narrow", "Roboto Condensed", Arial, sans-serif',
                }}
              >
                MON, 24 MAY 2024
              </p>

              <p
                className="mt-0.5 text-[10px] font-medium text-slate-300"
                style={{
                  fontFamily:
                    '"Arial Narrow", "Roboto Condensed", Arial, sans-serif',
                }}
              >
                09:15:32 AM
              </p>
            </div>
          </div>

          {/* Profile */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/[0.03]">
            <span
              className="text-xs font-medium text-cyan-200"
              style={{
                fontFamily:
                  '"Arial Narrow", "Roboto Condensed", Arial, sans-serif',
              }}
            >
              N
            </span>
          </div>

          {/* Mobile menu */}
          <button
            type="button"
            onClick={onToggleMenu}
            aria-expanded={menuOpen}
            aria-label={
              menuOpen ? "Close navigation" : "Open navigation"
            }
            className="flex h-9 w-9 items-center justify-center rounded-md border border-cyan-500/20 text-cyan-300 lg:hidden"
          >
            {menuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}