"use client";

const sensorCards = [
  { x: 430, label: "pH-101", value: "7.2", color: "#22d3ee" },
  { x: 650, label: "DO-101", value: "2.8 mg/L", color: "#34d399" },
  { x: 885, label: "TSS-101", value: "28 mg/L", color: "#22d3ee" },
  { x: 1090, label: "TDS-101", value: "620 mg/L", color: "#22d3ee" },
  { x: 1260, label: "Cl-101", value: "0.5 mg/L", color: "#34d399" },
];

const stages = [
  { x: 150, w: 120, title: "SCREENING", sub: "Screening\n& Grit Removal" },
  { x: 290, w: 130, title: "EQUALIZATION", sub: "Equalization\nTank" },
  { x: 440, w: 120, title: "PRIMARY", sub: "Primary\nTreatment" },
  { x: 580, w: 175, title: "AERATION TANK", sub: "Aeration Tank" },
  { x: 775, w: 165, title: "SECONDARY CLARIFIER", sub: "Secondary\nClarifier" },
  { x: 960, w: 120, title: "TERTIARY", sub: "Tertiary\nFiltration" },
  { x: 1100, w: 135, title: "DISINFECTION", sub: "Disinfection\n(UV/Chlorine)" },
];

const steps = [
  ["01", "Inlet & Screening", "Removes large solids"],
  ["02", "Equalization", "Flow balancing"],
  ["03", "Primary Treatment", "Sedimentation"],
  ["04", "Aeration (Biological)", "BOD reduction"],
  ["05", "Secondary Clarifier", "Solid-liquid separation"],
  ["06", "Tertiary Filtration", "Polishing"],
  ["07", "Disinfection", "UV / Chlorine"],
  ["08", "Treated Water", "Compliant discharge"],
];

export function PlantSchematic() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-[#06121b] shadow-[0_0_40px_rgba(0,180,255,.08)]">
      <div className="flex items-center justify-between border-b border-cyan-500/15 px-5 py-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[.25em] text-cyan-400">
            Digital Twin
          </p>
          <h3 className="mt-1 text-lg font-semibold text-white">
            2D Plant Schematic
          </h3>
          <p className="text-xs text-slate-500">
            Live process flow · sensor network · AI monitoring
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-400/5 px-3 py-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          <span className="font-mono text-[10px] font-semibold text-emerald-300">
            LIVE
          </span>
        </div>
      </div>

      <div className="relative bg-[#071923] p-2 sm:p-3">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,190,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,190,255,.08) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        <svg
          viewBox="0 0 1500 690"
          className="relative block h-auto w-full"
          role="img"
          aria-label="OCEMS wastewater treatment plant digital twin schematic"
        >
          <defs>
            <linearGradient id="waterPipe" x1="0" x2="1">
              <stop offset="0%" stopColor="#0891b2" />
              <stop offset="50%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <linearGradient id="tankFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#155e75" />
              <stop offset="100%" stopColor="#082b36" />
            </linearGradient>
            <filter id="cyanGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <marker id="arrowCyan" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
              <path d="M0 0 L10 5 L0 10 Z" fill="#22d3ee" />
            </marker>
            <marker id="arrowOrange" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
              <path d="M0 0 L10 5 L0 10 Z" fill="#fb923c" />
            </marker>
            <marker id="arrowPurple" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
              <path d="M0 0 L10 5 L0 10 Z" fill="#a78bfa" />
            </marker>
          </defs>

          {/* technical title */}
          <text x="20" y="24" fill="#475569" fontSize="8" fontFamily="monospace" letterSpacing="1.5">
            WASTEWATER TREATMENT PROCESS / LIVE DIGITAL TWIN
          </text>

          {/* legend */}
          <g fontFamily="monospace" fontSize="8">
            <line x1="880" y1="22" x2="910" y2="22" stroke="#22d3ee" strokeWidth="3" />
            <text x="918" y="25" fill="#94a3b8">Water Flow</text>
            <line x1="995" y1="22" x2="1025" y2="22" stroke="#fb923c" strokeWidth="3" strokeDasharray="7 5" />
            <text x="1033" y="25" fill="#94a3b8">Sludge Flow</text>
            <line x1="1110" y1="22" x2="1140" y2="22" stroke="#10b981" strokeWidth="3" />
            <text x="1148" y="25" fill="#94a3b8">Recycled Flow</text>
            <line x1="1240" y1="22" x2="1270" y2="22" stroke="#a78bfa" strokeWidth="2" strokeDasharray="5 5" />
            <text x="1278" y="25" fill="#94a3b8">Chemical Dosing</text>
          </g>

          {/* main water pipe */}
          <path d="M30 275 H1430" stroke="#083746" strokeWidth="16" strokeLinecap="round" />
          <path
            d="M30 275 H1430"
            stroke="url(#waterPipe)"
            strokeWidth="4"
            strokeDasharray="14 10"
            markerEnd="url(#arrowCyan)"
            filter="url(#cyanGlow)"
            className="animate-[flow_2s_linear_infinite]"
          />

          {/* inlet */}
          <g>
            <text x="22" y="105" fill="#22d3ee" fontSize="9" fontFamily="monospace" fontWeight="700">INLET</text>
            <text x="22" y="118" fill="#64748b" fontSize="7" fontFamily="monospace">RAW EFFLUENT</text>
            <rect x="20" y="145" width="82" height="82" rx="6" fill="#071923" stroke="#0e7490" />
            <path d="M35 158 L57 208 M49 158 L71 208 M63 158 L85 208" stroke="#94a3b8" strokeWidth="4" />
            <text x="61" y="245" textAnchor="middle" fill="#64748b" fontSize="7" fontFamily="monospace">FLOW-101</text>
            <text x="61" y="258" textAnchor="middle" fill="#22d3ee" fontSize="8" fontFamily="monospace">120.4 m³/h</text>
          </g>

          {/* process units */}
          <g>
            {/* screening */}
            <rect x="135" y="205" width="120" height="110" rx="7" fill="url(#tankFill)" stroke="#155e75" />
            <text x="195" y="190" textAnchor="middle" fill="#22d3ee" fontSize="8" fontFamily="monospace" fontWeight="700">SCREENING</text>
            {[0,1,2,3,4].map((i) => (
              <line key={i} x1={155 + i * 18} y1="220" x2={155 + i * 18} y2="295" stroke="#64748b" strokeWidth="4" />
            ))}
            <text x="195" y="335" textAnchor="middle" fill="#cbd5e1" fontSize="8" fontFamily="monospace">Screening &amp; Grit Removal</text>

            {/* equalization */}
            <rect x="275" y="200" width="130" height="115" rx="7" fill="url(#tankFill)" stroke="#0e7490" />
            <text x="340" y="185" textAnchor="middle" fill="#22d3ee" fontSize="8" fontFamily="monospace" fontWeight="700">EQUALIZATION TANK</text>
            <rect x="290" y="235" width="100" height="65" rx="5" fill="#075066" />
            <path d="M295 247 Q320 237 345 247 T385 247" fill="none" stroke="#67e8f9" strokeWidth="2" />
            <circle cx="320" cy="275" r="4" fill="#67e8f9" />
            <circle cx="350" cy="260" r="3" fill="#67e8f9" />
            <circle cx="375" cy="282" r="5" fill="#67e8f9" />
            <text x="340" y="335" textAnchor="middle" fill="#64748b" fontSize="7" fontFamily="monospace">LT-101 · LEVEL 2.4 m</text>

            {/* primary */}
            <rect x="425" y="205" width="120" height="110" rx="7" fill="url(#tankFill)" stroke="#155e75" />
            <text x="485" y="190" textAnchor="middle" fill="#22d3ee" fontSize="8" fontFamily="monospace" fontWeight="700">PRIMARY TREATMENT</text>
            <rect x="440" y="235" width="90" height="65" rx="5" fill="#0c4553" />
            <circle cx="465" cy="258" r="5" fill="#94a3b8" />
            <circle cx="495" cy="248" r="4" fill="#94a3b8" />
            <circle cx="515" cy="270" r="6" fill="#94a3b8" />
            <path d="M445 285 H525" stroke="#67e8f9" strokeWidth="2" opacity=".6" />
            <text x="485" y="335" textAnchor="middle" fill="#64748b" fontSize="7" fontFamily="monospace">TSS CONTROL</text>

            {/* aeration */}
            <rect x="565" y="190" width="175" height="125" rx="7" fill="url(#tankFill)" stroke="#0e7490" />
            <text x="652" y="175" textAnchor="middle" fill="#22d3ee" fontSize="8" fontFamily="monospace" fontWeight="700">AERATION TANK</text>
            <rect x="580" y="225" width="145" height="75" rx="5" fill="#075066" />
            <path d="M595 285 H710" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
            {[[600,270],[625,245],[650,280],[675,240],[700,270],[640,230],[685,285]].map(([cx,cy], i) => (
              <circle key={i} cx={cx} cy={cy} r={i % 2 ? 3 : 4} fill="#67e8f9" opacity=".75" className="animate-pulse" />
            ))}
            <text x="652" y="335" textAnchor="middle" fill="#34d399" fontSize="7" fontFamily="monospace">DO-101 · 2.8 mg/L</text>

            {/* clarifier */}
            <ellipse cx="830" cy="255" rx="88" ry="68" fill="#082f3c" stroke="#0891b2" strokeWidth="2" />
            <ellipse cx="830" cy="255" rx="70" ry="52" fill="#075066" />
            <text x="830" y="175" textAnchor="middle" fill="#22d3ee" fontSize="8" fontFamily="monospace" fontWeight="700">SECONDARY CLARIFIER</text>
            <rect x="824" y="200" width="12" height="110" rx="4" fill="#64748b" />
            <rect x="775" y="251" width="110" height="7" rx="4" fill="#cbd5e1" />
            <rect x="810" y="184" width="40" height="22" rx="5" fill="#0f172a" stroke="#64748b" />
            <circle cx="830" cy="255" r="9" fill="none" stroke="#67e8f9" strokeWidth="2" className="animate-pulse" />
            <text x="830" y="335" textAnchor="middle" fill="#22d3ee" fontSize="7" fontFamily="monospace">TSS-101 · 28 mg/L</text>

            {/* tertiary */}
            <rect x="950" y="205" width="120" height="110" rx="7" fill="url(#tankFill)" stroke="#155e75" />
            <text x="1010" y="190" textAnchor="middle" fill="#22d3ee" fontSize="8" fontFamily="monospace" fontWeight="700">TERTIARY FILTRATION</text>
            {[0,1,2].map((i) => (
              <rect key={i} x={970 + i * 27} y="235" width="16" height="65" rx="3" fill="#164e63" stroke="#22d3ee" strokeOpacity=".45" />
            ))}
            <text x="1010" y="335" textAnchor="middle" fill="#64748b" fontSize="7" fontFamily="monospace">TDS POLISHING</text>

            {/* disinfection */}
            <rect x="1090" y="205" width="135" height="110" rx="7" fill="url(#tankFill)" stroke="#155e75" />
            <text x="1157" y="190" textAnchor="middle" fill="#22d3ee" fontSize="8" fontFamily="monospace" fontWeight="700">DISINFECTION</text>
            {[0,1,2].map((i) => (
              <rect key={i} x={1125 + i * 25} y="235" width="7" height="65" rx="3" fill="#a78bfa" filter="url(#cyanGlow)" />
            ))}
            <text x="1157" y="335" textAnchor="middle" fill="#a78bfa" fontSize="7" fontFamily="monospace">UV / CHLORINE</text>

            {/* outlet */}
            <rect x="1280" y="215" width="145" height="90" rx="8" fill="#052e35" stroke="#10b981" strokeWidth="2" />
            <text x="1352" y="198" textAnchor="middle" fill="#34d399" fontSize="8" fontFamily="monospace" fontWeight="700">OUTLET</text>
            <text x="1352" y="253" textAnchor="middle" fill="#34d399" fontSize="10" fontFamily="monospace">TREATED WATER</text>
            <text x="1352" y="272" textAnchor="middle" fill="#64748b" fontSize="7" fontFamily="monospace">COMPLIANT DISCHARGE</text>
          </g>

          {/* chemical dosing */}
          <g>
            <rect x="160" y="55" width="150" height="55" rx="7" fill="#160d2b" stroke="#7c3aed" />
            <text x="235" y="78" textAnchor="middle" fill="#a78bfa" fontSize="7" fontFamily="monospace">CHEMICAL DOSING</text>
            <text x="235" y="92" textAnchor="middle" fill="#ddd6fe" fontSize="8" fontFamily="monospace">FeCl₃ / POLY</text>
            <path d="M235 110 V205" stroke="#a78bfa" strokeWidth="2" strokeDasharray="5 5" markerEnd="url(#arrowPurple)" />

            <rect x="1110" y="55" width="150" height="55" rx="7" fill="#160d2b" stroke="#7c3aed" />
            <text x="1185" y="78" textAnchor="middle" fill="#a78bfa" fontSize="7" fontFamily="monospace">CHEMICAL DOSING</text>
            <text x="1185" y="92" textAnchor="middle" fill="#ddd6fe" fontSize="8" fontFamily="monospace">CHLORINE</text>
            <path d="M1185 110 V205" stroke="#a78bfa" strokeWidth="2" strokeDasharray="5 5" markerEnd="url(#arrowPurple)" />
          </g>

          {/* AI monitor */}
          <g>
            <rect x="565" y="55" width="155" height="55" rx="7" fill="#100b22" stroke="#8b5cf6" />
            <circle cx="585" cy="82" r="13" fill="#7c3aed" fillOpacity=".15" stroke="#8b5cf6" />
            <text x="585" y="86" textAnchor="middle" fill="#c4b5fd" fontSize="8" fontFamily="monospace">AI</text>
            <text x="606" y="78" fill="#ddd6fe" fontSize="8" fontFamily="monospace" fontWeight="700">AI MONITOR</text>
            <text x="606" y="92" fill="#8b5cf6" fontSize="6.5" fontFamily="monospace">SENSOR CORRELATION ENGINE</text>
            <path d="M642 110 V190" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="5 5" markerEnd="url(#arrowPurple)" />
          </g>

          {/* sensor cards */}
          {sensorCards.map((sensor) => (
            <g key={sensor.label}>
              <rect x={sensor.x - 48} y="365" width="96" height="43" rx="6" fill="#081923" stroke={sensor.color} strokeOpacity=".75" />
              <circle cx={sensor.x - 34} cy="379" r="4" fill={sensor.color} className="animate-pulse" />
              <text x={sensor.x - 24} y="382" fill="#cbd5e1" fontSize="7" fontFamily="monospace">{sensor.label}</text>
              <text x={sensor.x - 34} y="398" fill={sensor.color} fontSize="8" fontFamily="monospace">{sensor.value}</text>
              <path d={`M${sensor.x} 365 V335`} stroke={sensor.color} strokeWidth="1" strokeDasharray="3 4" opacity=".6" />
            </g>
          ))}

          {/* flow meter */}
          <g>
            <rect x="25" y="365" width="150" height="55" rx="7" fill="#081923" stroke="#0e7490" />
            <circle cx="43" cy="383" r="5" fill="#22d3ee" className="animate-pulse" />
            <text x="55" y="386" fill="#94a3b8" fontSize="8" fontFamily="monospace">FLOW METER</text>
            <text x="43" y="405" fill="#22d3ee" fontSize="11" fontFamily="monospace">120.4 m³/h</text>
          </g>

          {/* blower cards */}
          <g>
            <rect x="575" y="425" width="150" height="45" rx="7" fill="#071923" stroke="#0e7490" />
            <circle cx="605" cy="447" r="12" fill="#062b39" stroke="#22d3ee" />
            <text x="605" y="451" textAnchor="middle" fill="#22d3ee" fontSize="9" fontFamily="monospace">B</text>
            <circle cx="665" cy="447" r="12" fill="#062b39" stroke="#22d3ee" />
            <text x="665" y="451" textAnchor="middle" fill="#22d3ee" fontSize="9" fontFamily="monospace">B</text>
            <text x="688" y="451" fill="#64748b" fontSize="7" fontFamily="monospace">B-201 A/B</text>
          </g>

          {/* sludge return network */}
          <g>
            <path d="M830 323 V505 H280 V315" fill="none" stroke="#fb923c" strokeWidth="3" strokeDasharray="9 7" markerEnd="url(#arrowOrange)" />
            <path d="M830 323 V505 H1040" fill="none" stroke="#fb923c" strokeWidth="3" strokeDasharray="9 7" markerEnd="url(#arrowOrange)" />
            <rect x="520" y="480" width="130" height="48" rx="7" fill="#1c1209" stroke="#fb923c" />
            <text x="585" y="499" textAnchor="middle" fill="#fb923c" fontSize="7" fontFamily="monospace">SLUDGE RETURN</text>
            <text x="585" y="514" textAnchor="middle" fill="#fdba74" fontSize="8" fontFamily="monospace">RAS-201</text>

            <rect x="810" y="480" width="135" height="48" rx="7" fill="#1c1209" stroke="#fb923c" />
            <text x="877" y="499" textAnchor="middle" fill="#fb923c" fontSize="7" fontFamily="monospace">SLUDGE TREATMENT</text>
            <text x="877" y="514" textAnchor="middle" fill="#fdba74" fontSize="8" fontFamily="monospace">WAS-202</text>

            <path d="M945 504 H1080" stroke="#fb923c" strokeWidth="3" strokeDasharray="8 6" markerEnd="url(#arrowOrange)" />
            <text x="1010" y="495" textAnchor="middle" fill="#fb923c" fontSize="7" fontFamily="monospace">TO SLUDGE HANDLING</text>
          </g>

          {/* bypass/fraud indicator */}
          <g>
            <path d="M740 275 V445 H960 V275" fill="none" stroke="#f97316" strokeWidth="2" strokeDasharray="5 6" opacity=".85" />
            <rect x="755" y="400" width="165" height="34" rx="6" fill="#241008" stroke="#f97316" />
            <circle cx="774" cy="417" r="4" fill="#f97316" className="animate-pulse" />
            <text x="785" y="414" fill="#fb923c" fontSize="7" fontFamily="monospace">BYPASS PATH</text>
            <text x="785" y="426" fill="#fdba74" fontSize="7" fontFamily="monospace">MONITORING ACTIVE</text>
          </g>

          {/* final output */}
          <g>
            <rect x="1265" y="365" width="160" height="105" rx="7" fill="#081923" stroke="#0e7490" />
            <text x="1280" y="385" fill="#22d3ee" fontSize="8" fontFamily="monospace" fontWeight="700">FINAL OUTPUT</text>
            <text x="1280" y="405" fill="#64748b" fontSize="7" fontFamily="monospace">pH</text>
            <text x="1405" y="405" textAnchor="end" fill="#34d399" fontSize="8" fontFamily="monospace">7.2</text>
            <text x="1280" y="423" fill="#64748b" fontSize="7" fontFamily="monospace">BOD</text>
            <text x="1405" y="423" textAnchor="end" fill="#34d399" fontSize="8" fontFamily="monospace">28 mg/L</text>
            <text x="1280" y="441" fill="#64748b" fontSize="7" fontFamily="monospace">TDS</text>
            <text x="1405" y="441" textAnchor="end" fill="#34d399" fontSize="8" fontFamily="monospace">620 mg/L</text>
            <text x="1280" y="459" fill="#64748b" fontSize="7" fontFamily="monospace">Flow</text>
            <text x="1405" y="459" textAnchor="end" fill="#22d3ee" fontSize="8" fontFamily="monospace">120.4 m³/h</text>
          </g>

          {/* bottom status */}
          <line x1="25" y1="550" x2="1425" y2="550" stroke="#0e7490" strokeOpacity=".25" />
          <text x="25" y="572" fill="#22d3ee" fontSize="8" fontFamily="monospace" letterSpacing="1.2">PROCESS STEPS</text>

          {steps.map(([num, title, desc], i) => {
            const x = 20 + i * 176;
            return (
              <g key={num}>
                <rect x={x} y="585" width="166" height="55" rx="6" fill="#081923" stroke="#155e75" />
                <rect x={x + 8} y="595" width="24" height="18" rx="3" fill="#062b39" stroke="#0e7490" />
                <text x={x + 20} y="608" textAnchor="middle" fill="#22d3ee" fontSize="7" fontFamily="monospace">{num}</text>
                <text x={x + 40} y="604" fill="#e2e8f0" fontSize="7.2" fontFamily="monospace" fontWeight="700">{title}</text>
                <text x={x + 40} y="619" fill="#64748b" fontSize="6.5" fontFamily="monospace">{desc}</text>
                <circle cx={x + 151} cy="604" r="7" fill="#052e35" stroke="#34d399" />
                <path d={`M${x + 148} 604 l2 2 l4 -5`} fill="none" stroke="#34d399" strokeWidth="1.3" />
              </g>
            );
          })}
        </svg>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-cyan-500/10 pt-2 font-mono text-[9px]">
          <div className="flex flex-wrap gap-4 text-slate-500">
            <span>FLOW <b className="text-cyan-400">120.4 m³/h</b></span>
            <span>pH <b className="text-emerald-400">7.2</b></span>
            <span>BOD <b className="text-emerald-400">28 mg/L</b></span>
            <span>TDS <b className="text-emerald-400">620 mg/L</b></span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            SENSOR NETWORK ONLINE
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes flow {
          to {
            stroke-dashoffset: -48;
          }
        }
      `}</style>
    </section>
  );
}
