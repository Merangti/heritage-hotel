import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function Hornbill() {
  const ref = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.y = s.clock.elapsedTime * 0.6;
      ref.current.position.y = Math.sin(s.clock.elapsedTime * 1.2) * 0.05;
    }
  });
  return (
    <group ref={ref} scale={0.85}>
      {/* body */}
      <mesh>
        <sphereGeometry args={[0.4, 16, 12]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} metalness={0.3} />
      </mesh>
      {/* head */}
      <mesh position={[0.35, 0.15, 0]}>
        <sphereGeometry args={[0.18, 12, 10]} />
        <meshStandardMaterial color="#0f0f0f" roughness={0.4} />
      </mesh>
      {/* casque + beak — brass */}
      <mesh position={[0.6, 0.2, 0]} rotation={[0, 0, -0.2]}>
        <coneGeometry args={[0.1, 0.4, 8]} />
        <meshStandardMaterial color="#c9a44a" metalness={0.85} roughness={0.25} />
      </mesh>
      <mesh position={[0.55, 0.32, 0]}>
        <boxGeometry args={[0.18, 0.08, 0.14]} />
        <meshStandardMaterial color="#b5a642" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* tail feathers */}
      <mesh position={[-0.4, 0, 0]} rotation={[0, 0, 0.3]}>
        <coneGeometry args={[0.12, 0.5, 6]} />
        <meshStandardMaterial color="#8B0000" roughness={0.7} />
      </mesh>
    </group>
  );
}

export function SpiritLine() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? h.scrollTop / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-full w-16 flex-col items-center justify-between border-r border-border/60 bg-vellum/70 py-6 backdrop-blur-sm md:flex">
      {/* artifact */}
      <div className="h-20 w-16">
        <Canvas
          camera={{ position: [0, 0, 2.2], fov: 40 }}
          dpr={[1, 1.5]}
          gl={{ alpha: true, antialias: true }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[2, 3, 2]} intensity={1.2} color="#ffd9a3" />
          <Hornbill />
        </Canvas>
      </div>

      {/* red thread + progress */}
      <div className="relative flex h-full w-px flex-1 items-start justify-center py-4">
        <div className="absolute inset-y-4 w-px bg-border" />
        <div
          className="absolute top-4 w-[2px] thread-divider transition-[height] duration-200 ease-out"
          style={{ height: `calc(${progress * 100}% - 1rem)` }}
        />
      </div>

      {/* mark */}
      <div className="font-journal text-[10px] uppercase tracking-[0.3em] text-muted-foreground [writing-mode:vertical-rl]">
        Heritage · Hearth
      </div>
    </aside>
  );
}
