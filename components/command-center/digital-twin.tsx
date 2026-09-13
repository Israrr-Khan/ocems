"use client";

import { Canvas, ThreeEvent } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type ComponentInfo = {
  label: string;
  type: string;
  status: "NORMAL" | "WARNING" | "ALERT";
  value: string;
  description: string;
};

const COMPONENTS: Record<string, ComponentInfo> = {
  FLOW_SENSOR: {
    label: "Flow Sensor",
    type: "TELEMETRY",
    status: "NORMAL",
    value: "142 m³/h",
    description: "Continuous wastewater discharge flow measurement.",
  },
  OCEMS_SENSOR: {
    label: "OCEMS Sensor",
    type: "MONITORING",
    status: "NORMAL",
    value: "ONLINE",
    description: "Primary effluent quality monitoring point.",
  },
  BOD_SENSOR: {
    label: "BOD Sensor",
    type: "WATER QUALITY",
    status: "NORMAL",
    value: "28 mg/L",
    description: "Biochemical oxygen demand monitoring.",
  },
  TDS_SENSOR: {
    label: "TDS Sensor",
    type: "WATER QUALITY",
    status: "NORMAL",
    value: "620 mg/L",
    description: "Total dissolved solids monitoring.",
  },
  VALVE_MAIN: {
    label: "Main Valve",
    type: "FLOW CONTROL",
    status: "NORMAL",
    value: "OPEN",
    description: "Primary wastewater discharge control valve.",
  },
  VALVE_BYPASS: {
    label: "Bypass Valve",
    type: "ANTI-FRAUD",
    status: "ALERT",
    value: "OPEN",
    description: "Potential unauthorized bypass route detected.",
  },
  CAMERA_SENSOR: {
    label: "Camera Sensor",
    type: "TAMPER DETECTION",
    status: "NORMAL",
    value: "ACTIVE",
    description: "Visual monitoring of critical infrastructure.",
  },
  PIPE_BYPASS: {
    label: "Bypass Route",
    type: "ANTI-FRAUD",
    status: "ALERT",
    value: "ACTIVE",
    description: "Secondary discharge path requiring verification.",
  },
  DISCHARGE_POINT: {
    label: "Discharge Point",
    type: "OUTLET",
    status: "NORMAL",
    value: "ACTIVE",
    description: "Final monitored effluent discharge location.",
  },
};

const HOVER_EMISSIVE = new THREE.Color("#22d3ee");
const HOVER_EMISSIVE_INTENSITY = 1.2;

type MaterialBaseline = {
  material: THREE.MeshStandardMaterial;
  emissive: THREE.Color;
  emissiveIntensity: number;
};

function FactoryModel({
  onSelect,
}: {
  onSelect: (info: ComponentInfo | null) => void;
}) {
  const { scene } = useGLTF("/models/ocems-factory.glb");

  // Deep-clone the scene graph so we never touch the cached GLTF that
  // useGLTF returns (that cache is shared across every instance/remount).
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  // uuid of the Object3D -> baseline (original) emissive state of its
  // material(s). Materials are cloned exactly ONCE here, at init time,
  // so hover/select never re-clones or permanently repaints anything.
  const baselinesRef = useRef<Map<string, MaterialBaseline[]>>(new Map());
  const hoveredUuidRef = useRef<string | null>(null);

  useMemo(() => {
    const baselines = new Map<string, MaterialBaseline[]>();

    clonedScene.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;

      object.castShadow = true;
      object.receiveShadow = true;

      const sourceMaterials = Array.isArray(object.material)
        ? object.material
        : [object.material];

      // Clone once per mesh instance -> this clone becomes the object's
      // "live" material going forward. Original Blender materials on the
      // cached scene are left completely untouched.
      const clonedMaterials = sourceMaterials.map((material) => material.clone());

      object.material = Array.isArray(object.material)
        ? clonedMaterials
        : clonedMaterials[0];

      const meshBaselines: MaterialBaseline[] = [];

      clonedMaterials.forEach((material) => {
        if (material instanceof THREE.MeshStandardMaterial) {
          material.envMapIntensity = 0.8;

          meshBaselines.push({
            material,
            emissive: material.emissive.clone(),
            emissiveIntensity: material.emissiveIntensity,
          });
        }
      });

      baselines.set(object.uuid, meshBaselines);
    });

    baselinesRef.current = baselines;
  }, [clonedScene]);

  const setHighlighted = (object: THREE.Object3D, isHighlighted: boolean) => {
    const baselines = baselinesRef.current.get(object.uuid);
    if (!baselines) return;

    baselines.forEach(({ material, emissive, emissiveIntensity }) => {
      if (isHighlighted) {
        material.emissive.set(HOVER_EMISSIVE);
        material.emissiveIntensity = HOVER_EMISSIVE_INTENSITY;
      } else {
        // Restore EXACTLY the original (Blender-authored) emissive state.
        material.emissive.copy(emissive);
        material.emissiveIntensity = emissiveIntensity;
      }
    });
  };

  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();

    const object = event.object;
    const objectName = object.name.toUpperCase();

    if (!COMPONENTS[objectName]) return;

    hoveredUuidRef.current = object.uuid;
    setHighlighted(object, true);
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();

    const object = event.object;
    const objectName = object.name.toUpperCase();

    if (!COMPONENTS[objectName]) return;

    setHighlighted(object, false);

    if (hoveredUuidRef.current === object.uuid) {
      hoveredUuidRef.current = null;
    }

    document.body.style.cursor = "default";
  };

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();

    // Selection only drives the info panel — it never touches materials,
    // so the model's appearance is never permanently altered by a click.
    const object = event.object;
    const objectName = object.name.toUpperCase();

    if (COMPONENTS[objectName]) {
      onSelect(COMPONENTS[objectName]);
    }
  };

  return (
    <group position={[0, -0.15, 0]} scale={1.3}>
      <primitive
        object={clonedScene}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      />
    </group>
  );
}

function ComponentPanel({
  component,
  onClose,
}: {
  component: ComponentInfo;
  onClose: () => void;
}) {
  const statusClass =
    component.status === "ALERT"
      ? "text-red-300 bg-red-400/10 border-red-400/20"
      : component.status === "WARNING"
        ? "text-amber-300 bg-amber-400/10 border-amber-400/20"
        : "text-emerald-300 bg-emerald-400/10 border-emerald-400/20";

  return (
    <div className="absolute right-6 top-24 z-20 w-[240px] overflow-hidden rounded-xl border border-slate-700/80 bg-[#071018]/95 shadow-2xl backdrop-blur-xl">
      <div className="flex items-start justify-between border-b border-slate-800 px-3 py-2.5">
        <div>
          <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-cyan-400">
            Selected Component
          </p>

          <h3 className="mt-1 text-[13px] font-medium text-slate-100">
            {component.label}
          </h3>
        </div>

        <button
          onClick={onClose}
          className="text-base leading-none text-slate-500 transition hover:text-slate-200"
          aria-label="Close component panel"
        >
          ×
        </button>
      </div>

      <div className="space-y-3 p-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-slate-500">
            Status
          </span>

          <span
            className={`rounded-md border px-1.5 py-0.5 font-mono text-[8px] tracking-[0.12em] ${statusClass}`}
          >
            {component.status}
          </span>
        </div>

        <div>
          <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-slate-500">
            Current Reading
          </p>

          <p className="mt-0.5 text-lg font-medium tracking-tight text-slate-100">
            {component.value}
          </p>
        </div>

        <div>
          <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-slate-500">
            Classification
          </p>

          <p className="mt-0.5 text-[11px] text-cyan-300">
            {component.type}
          </p>
        </div>

        <div className="border-t border-slate-800 pt-2.5">
          <p className="text-[11px] leading-5 text-slate-400">
            {component.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function DigitalTwin() {
  const [selectedComponent, setSelectedComponent] =
    useState<ComponentInfo | null>(null);

  return (
    <section className="relative h-[460px] overflow-hidden rounded-2xl border border-cyan-400/10 bg-[#050d14] shadow-2xl shadow-black/30 sm:h-[520px] xl:h-[580px]">
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.35) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="absolute left-5 top-5 z-10">
        <div className="rounded-xl border border-cyan-400/20 bg-[#071018]/85 px-4 py-3 shadow-lg backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />

            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-300">
              Digital Twin
            </p>
          </div>

          <p className="mt-1 text-xs text-slate-400">
            Industrial Effluent Facility
          </p>
        </div>
      </div>

      <div className="absolute right-5 top-5 z-10">
        <div className="flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-[#071018]/85 px-4 py-3 shadow-lg backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>

          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-300">
            System Online
          </span>
        </div>
      </div>

      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{
          position: [19, 18, 18],
          fov: 43,
          near: 0.1,
          far: 200,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <color attach="background" args={["#050d14"]} />

        <ambientLight intensity={1.15} />

        <directionalLight
          position={[12, 20, 12]}
          intensity={3}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={0.5}
          shadow-camera-far={100}
        />

        <directionalLight
          position={[-12, 8, -10]}
          intensity={1.4}
        />

        <pointLight
          position={[4, 7, 6]}
          intensity={18}
          distance={35}
        />

        <Suspense fallback={null}>
          <FactoryModel onSelect={setSelectedComponent} />
        </Suspense>

        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.07}
          rotateSpeed={0.55}
          zoomSpeed={0.7}
          panSpeed={0.5}
          minDistance={6}
          maxDistance={40}
          target={[5, 0.5, 1]}
          maxPolarAngle={Math.PI / 2.08}
          minPolarAngle={Math.PI / 5}
        />
      </Canvas>

      {selectedComponent && (
        <ComponentPanel
          component={selectedComponent}
          onClose={() => setSelectedComponent(null)}
        />
      )}

      <div className="absolute bottom-5 left-5 z-10">
        <div className="rounded-xl border border-slate-700/70 bg-[#071018]/85 px-4 py-3 shadow-lg backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500">
              Facility Model
            </span>

            <span className="rounded bg-emerald-400/10 px-1.5 py-0.5 font-mono text-[8px] uppercase text-emerald-300">
              Active
            </span>
          </div>

          <p className="mt-1 font-mono text-[10px] text-slate-400">
            OCEMS · DIGITAL REPRESENTATION
          </p>
        </div>
      </div>

      <div className="absolute bottom-5 right-5 z-10 hidden sm:block">
        <div className="rounded-xl border border-slate-700/70 bg-[#071018]/85 px-4 py-3 text-right shadow-lg backdrop-blur-md">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500">
            Navigation
          </p>

          <p className="mt-1 text-[10px] text-slate-400">
            Hover · Inspect &nbsp;|&nbsp; Click · Details
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-24 bg-gradient-to-t from-cyan-950/10 to-transparent" />
    </section>
  );
}

useGLTF.preload("/models/ocems-factory.glb");
