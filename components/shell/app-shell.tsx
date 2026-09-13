"use client";

import { useState } from "react";

import {
  BarChart3,
  Bell,
  BrainCircuit,
  ChevronDown,
  FileText,
  LayoutDashboard,
  Network,
  ShieldCheck,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Plant Twin", icon: Network },
  { label: "Analytics", icon: BarChart3 },
  { label: "AI Insights", icon: BrainCircuit },
  { label: "Alerts", icon: Bell, badge: 3 },
  { label: "Reports", icon: FileText },
  { label: "Compliance", icon: ShieldCheck },
];

function DropletLogo() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="h-10 w-10 shrink-0 text-cyan-300"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M24 3.5C24 3.5 9.5 19.8 9.5 30C9.5 38.2 16 44.5 24 44.5S38.5 38.2 38.5 30C38.5 19.8 24 3.5 24 3.5Z"
        stroke="currentColor"
        strokeWidth="2.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M17 29.5C17 25.2 20.5 20.3 24 16"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      <path
        d="M17 30C17 34.6 20.1 37.6 24 37.6C27.9 37.6 31 34.6 31 30"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity=".65"
      />

      <circle
        cx="24"
        cy="29.5"
        r="3"
        fill="currentColor"
      />
    </svg>
  );
}

export function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeNav, setActiveNav] = useState("Overview");

  return (
    <div className="min-h-full bg-[#07090c] text-slate-100">

      <header className="sticky top-0 z-40 overflow-hidden border-b border-cyan-500/15 bg-[#05080c]/95 backdrop-blur-xl">

        <div className="flex min-h-[60px] w-full min-w-0 items-center gap-2 px-5 lg:px-6">

          {/* =====================================================
              BRAND
          ====================================================== */}

          <div className="flex w-[285px] min-w-[285px] shrink-0 items-center gap-2.5">

            <DropletLogo />

            <div className="min-w-0 leading-none">

              <div
                className="
                  whitespace-nowrap
                  font-mono
                  text-[20px]
                  font-bold
                  tracking-[0.17em]
                  text-slate-100
                "
              >
                OCEMS SENTINEL
              </div>

              <div
                className="
                  mt-3
                  whitespace-nowrap
                  text-[7px]
                  font-medium
                  uppercase
                  tracking-[0.13em]
                  text-cyan-300/80
                "
              >
                AI POWERED EFFLUENT MONITORING &amp; FRAUD DETECTION
              </div>

            </div>

          </div>


          {/* =====================================================
              NAVIGATION
          ====================================================== */}

          <nav className="hidden min-w-0 flex-1 shrink items-stretch justify-center gap-0 overflow-hidden xl:flex">

            {NAV_ITEMS.map((item) => {

              const Icon = item.icon;
              const active = activeNav === item.label;

              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setActiveNav(item.label)}
                  className={[
                    "relative flex h-14 shrink-0 items-center gap-1 px-2 text-[10px] font-medium uppercase tracking-wide transition",
                    active
                      ? "bg-cyan-400/10 text-cyan-300"
                      : "text-slate-400 hover:bg-white/[0.03] hover:text-slate-200",
                  ].join(" ")}
                >

                  <Icon className="h-3.5 w-3.5 shrink-0" />

                  <span className="whitespace-nowrap">
                    {item.label}
                  </span>

                  {item.badge ? (
                    <span
                      className="
                        absolute
                        right-1
                        top-1
                        flex
                        h-4
                        min-w-4
                        items-center
                        justify-center
                        rounded-full
                        bg-red-500
                        px-1
                        text-[9px]
                        font-bold
                        text-white
                      "
                    >
                      {item.badge}
                    </span>
                  ) : null}

                  {active ? (
                    <span
                      className="
                        absolute
                        inset-x-0
                        bottom-0
                        h-0.5
                        bg-cyan-400
                        shadow-[0_0_10px_rgba(34,211,238,.7)]
                      "
                    />
                  ) : null}

                </button>
              );
            })}

          </nav>


          {/* =====================================================
              RIGHT SIDE
          ====================================================== */}

          <div className="ml-auto flex shrink-0 items-center gap-3">

            {/* Plant Online + Date / Time */}

            <div
              className="
                hidden
                h-12
                shrink-0
                items-center
                rounded-xl
                border
                border-cyan-500/15
                bg-cyan-400/[0.025]
                px-3
                lg:flex
              "
            >

              {/* Plant Online */}

              <div className="flex items-center gap-2 px-2">

                <span
                  className="
                    h-2
                    w-2
                    animate-pulse
                    rounded-full
                    bg-emerald-400
                    shadow-[0_0_10px_rgba(52,211,153,.7)]
                  "
                />

                <span
                  className="
                    whitespace-nowrap
                    font-mono
                    text-[9px]
                    font-medium
                    uppercase
                    tracking-wider
                    text-emerald-300
                  "
                >
                  Plant Online
                </span>

              </div>


              {/* Separator */}

              <div className="mx-3 h-6 w-px shrink-0 bg-cyan-400/20" />


              {/* Date / Time */}

              <div className="min-w-[105px] px-1 text-right">

                <p
                  className="
                    whitespace-nowrap
                    font-mono
                    text-[8px]
                    text-slate-400
                  "
                >
                  Mon, 24 May 2024
                </p>

                <p
                  className="
                    whitespace-nowrap
                    font-mono
                    text-[11px]
                    font-medium
                    text-slate-200
                  "
                >
                  09:15:32 AM
                </p>

              </div>

            </div>


            {/* Profile */}

            <button
              type="button"
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-cyan-400/25
                bg-cyan-400/5
                font-mono
                text-sm
                text-cyan-200
              "
              aria-label="Open system menu"
            >
              N
            </button>

            <ChevronDown className="h-4 w-4 shrink-0 text-slate-600 xl:hidden" />

          </div>

        </div>


        {/* =====================================================
            MOBILE NAVIGATION
        ====================================================== */}

        <div className="flex gap-1 overflow-x-auto border-t border-white/5 px-3 py-2 xl:hidden">

          {NAV_ITEMS.map((item) => {

            const active = activeNav === item.label;

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => setActiveNav(item.label)}
                className={[
                  "relative shrink-0 rounded-lg px-3 py-2 text-[10px] font-medium uppercase tracking-wide",
                  active
                    ? "bg-cyan-400/10 text-cyan-300"
                    : "text-slate-500 hover:text-slate-200",
                ].join(" ")}
              >

                {item.label}

                {item.badge ? (
                  <span
                    className="
                      ml-1.5
                      rounded-full
                      bg-red-500
                      px-1.5
                      py-0.5
                      text-[8px]
                      text-white
                    "
                  >
                    {item.badge}
                  </span>
                ) : null}

              </button>
            );
          })}

        </div>

      </header>


      {/* =====================================================
          PAGE CONTENT
      ====================================================== */}

      <main className="w-full px-4 py-5 sm:px-6 lg:px-7 xl:px-8">
        {children}
      </main>

    </div>
  );
}