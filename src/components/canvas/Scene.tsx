import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { Suspense } from "react";
import { r3f } from "./tunnel";

/**
 * Persistent 3D Canvas — fixed full-viewport, behind the DOM.
 * Per-route scenes render via the r3f tunnel so the WebGL context
 * survives the "Hornbill's Flight" route transitions.
 */
export function PersistentScene() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{ contain: "strict" }}
    >
      <Canvas
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 1.2, 6], fov: 45 }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={["#0b0606"]} />
          <fog attach="fog" args={["#1a0a0a", 8, 28]} />
          <ambientLight intensity={0.35} />
          <directionalLight position={[5, 8, 4]} intensity={0.9} color="#ffd9a3" />
          <r3f.Out />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
