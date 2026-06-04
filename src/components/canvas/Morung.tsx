import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";
import { useNavigate } from "@tanstack/react-router";

type NodeKey = "hearth" | "drum" | "lofts";

const NODES: Record<NodeKey, { pos: [number, number, number]; route: string; label: string }> = {
  hearth: { pos: [0, 0.2, 1.2], route: "/the-hearth", label: "The Hearth · Dining" },
  drum: { pos: [-2.0, 0.4, 0.8], route: "/explore", label: "Log Drum · Explore" },
  lofts: { pos: [1.8, 1.6, -0.2], route: "/event-planning", label: "Event Planning · Gather" },
};

function ModernHotelStructure() {
  return (
    <group>
      {/* Foundation / Plinth (Concrete) */}
      <mesh position={[0, -0.2, 0]} receiveShadow>
        <boxGeometry args={[6.5, 0.4, 4.5]} />
        <meshStandardMaterial color="#d0d0d0" roughness={0.8} />
      </mesh>

      {/* Main Glass Facade (Sleek Box) */}
      <mesh position={[0, 1.2, -0.5]}>
        <boxGeometry args={[5.2, 2.4, 2.8]} />
        <meshStandardMaterial
          color="#112233"
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Modern Overhang Roof */}
      <mesh position={[0, 2.5, 0]}>
        <boxGeometry args={[6.0, 0.15, 4.8]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Architectural Concrete Pillars */}
      {[-2.8, 2.8].map((x) => (
        <mesh key={`p${x}`} position={[x, 1.15, 2.0]} castShadow>
          <boxGeometry args={[0.2, 2.6, 0.4]} />
          <meshStandardMaterial color="#a0a0a0" roughness={0.8} />
        </mesh>
      ))}

      {/* Modern Wood Slatted Accent Wall */}
      <mesh position={[-1.2, 1.2, -1.8]}>
        <boxGeometry args={[2.5, 2.4, 0.1]} />
        <meshStandardMaterial color="#8b5a2b" roughness={0.6} />
      </mesh>

      {/* Interior light box to make it glow slightly */}
      <mesh position={[0, 1.0, -0.5]}>
        <boxGeometry args={[4.8, 2.0, 2.0]} />
        <meshStandardMaterial color="#ffeedd" emissive="#ffddaa" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
}

function ModernHearth({
  active,
  onHover,
  onClick,
}: {
  active: boolean;
  onHover: (h: boolean) => void;
  onClick: () => void;
}) {
  const flame = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (flame.current) {
      const t = s.clock.elapsedTime;
      flame.current.scale.y = 1 + Math.sin(t * 6) * 0.15;
      (flame.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        1.6 + Math.sin(t * 8) * 0.4;
    }
  });
  return (
    <group
      position={NODES.hearth.pos}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        onHover(false);
        document.body.style.cursor = "auto";
      }}
      onClick={onClick}
    >
      {/* Sleek metallic ring base */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.15, 32]} />
        <meshStandardMaterial color="#222222" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Decorative white stones */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.05, 16]} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.9} />
      </mesh>
      {/* Flame */}
      <mesh ref={flame} position={[0, 0.2, 0]} scale={active ? 1.4 : 1}>
        <coneGeometry args={[0.2, 0.6, 16]} />
        <meshStandardMaterial
          color="#ffaa44"
          emissive="#ff5500"
          emissiveIntensity={1.6}
          toneMapped={false}
        />
      </mesh>
      <pointLight
        position={[0, 0.4, 0]}
        intensity={active ? 2.5 : 1.4}
        color="#ff7733"
        distance={4}
      />
    </group>
  );
}

function ModernSculpture({
  active,
  onHover,
  onClick,
}: {
  active: boolean;
  onHover: (h: boolean) => void;
  onClick: () => void;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.5;
  });
  return (
    <group
      position={NODES.drum.pos}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        onHover(false);
        document.body.style.cursor = "auto";
      }}
      onClick={onClick}
    >
      {/* Kinetic Art Piece / "Drum" */}
      <mesh ref={ref} scale={active ? 1.2 : 1} position={[0, 0.3, 0]}>
        <torusGeometry args={[0.4, 0.12, 16, 32]} />
        <meshStandardMaterial color="#eeeeee" roughness={0.1} metalness={1.0} />
      </mesh>
      {/* Pedestal */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial color="#444444" roughness={0.9} />
      </mesh>
    </group>
  );
}

function ModernSuiteBlock({
  active,
  onHover,
  onClick,
}: {
  active: boolean;
  onHover: (h: boolean) => void;
  onClick: () => void;
}) {
  return (
    <group
      position={NODES.lofts.pos}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        onHover(false);
        document.body.style.cursor = "auto";
      }}
      onClick={onClick}
      scale={active ? 1.1 : 1}
    >
      {/* Cantilevered Suite Box */}
      <mesh>
        <boxGeometry args={[1.4, 1.0, 1.4]} />
        <meshStandardMaterial color="#fdfdfd" roughness={0.2} metalness={0.1} />
      </mesh>
      {/* Large Suite Window */}
      <mesh position={[0, 0, 0.71]}>
        <planeGeometry args={[1.2, 0.8]} />
        <meshBasicMaterial color="#aaddff" toneMapped={false} />
      </mesh>
    </group>
  );
}

export function MorungScene() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<NodeKey | null>(null);
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 0.6, 0));
  const camTarget = useRef(new THREE.Vector3(4.5, 3.2, 5.5));

  useFrame((_, dt) => {
    if (hovered) {
      const n = NODES[hovered];
      target.current.set(...n.pos);
      camTarget.current.set(n.pos[0] * 1.4 + 1.5, n.pos[1] + 1.4, n.pos[2] + 4);
    } else {
      target.current.set(0, 0.6, 0);
      camTarget.current.set(5.5, 4.0, 6.5);
    }
    camera.position.lerp(camTarget.current, Math.min(1, dt * 1.6));
    camera.lookAt(target.current);
  });

  return (
    <group>
      <ambientLight intensity={0.5} />
      <directionalLight position={[8, 10, 5]} intensity={1.3} color="#ffffff" castShadow />
      <ModernHotelStructure />
      <ModernHearth
        active={hovered === "hearth"}
        onHover={(h) => setHovered(h ? "hearth" : null)}
        onClick={() => navigate({ to: NODES.hearth.route })}
      />
      <ModernSculpture
        active={hovered === "drum"}
        onHover={(h) => setHovered(h ? "drum" : null)}
        onClick={() => navigate({ to: NODES.drum.route })}
      />
      <ModernSuiteBlock
        active={hovered === "lofts"}
        onHover={(h) => setHovered(h ? "lofts" : null)}
        onClick={() => navigate({ to: NODES.lofts.route })}
      />
      {/* Minimalist ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.4, 0]} receiveShadow>
        <circleGeometry args={[20, 64]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.95} />
      </mesh>
    </group>
  );
}

export const MORUNG_NODE_LABELS = NODES;
