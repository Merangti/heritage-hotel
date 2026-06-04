import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Procedural Japfü Peak: low-poly cone silhouette + volumetric mist
 * driven by a fragment shader (fbm-noise). Stand-in for the Draco GLB
 * — same visual intent, zero asset weight.
 */
function Peak() {
  const geo = useMemo(() => {
    const g = new THREE.ConeGeometry(3.5, 5, 24, 12);
    // Jitter vertices for a hand-carved silhouette.
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const j = (Math.random() - 0.5) * 0.25 * (1 - y / 5);
      pos.setX(i, pos.getX(i) + j);
      pos.setZ(i, pos.getZ(i) + j);
    }
    g.computeVertexNormals();
    return g;
  }, []);

  return (
    <group position={[0, -1.2, -2]}>
      <mesh geometry={geo} castShadow receiveShadow>
        <meshStandardMaterial
          color="#2a1414"
          roughness={1}
          flatShading
          emissive="#1a0808"
          emissiveIntensity={0.3}
        />
      </mesh>
      {/* Subtle snowcap */}
      <mesh position={[0, 1.6, 0]}>
        <coneGeometry args={[1.4, 1.6, 18]} />
        <meshStandardMaterial
          color="#d8c8a8"
          roughness={1}
          flatShading
          opacity={0.85}
          transparent
        />
      </mesh>
    </group>
  );
}

const mistVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const mistFragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uColor;

  // hash + value-noise + fbm
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  float fbm(vec2 p) {
    float v = 0.0; float a = 0.5;
    for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.0; a *= 0.5; }
    return v;
  }

  void main() {
    vec2 uv = vUv * vec2(3.0, 1.5);
    float n = fbm(uv + vec2(uTime * 0.04, uTime * 0.02));
    float mist = smoothstep(0.25, 0.85, n);
    // Vertical falloff — heavier at base, dissolves above
    float band = smoothstep(0.0, 0.5, vUv.y) * (1.0 - smoothstep(0.5, 1.0, vUv.y));
    float a = mist * band * 0.85;
    gl_FragColor = vec4(uColor, a);
  }
`;

function Mist() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  useFrame((state) => {
    if (mat.current) mat.current.uniforms.uTime.value = state.clock.elapsedTime;
  });
  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uColor: { value: new THREE.Color("#e8d4b0") } }),
    [],
  );
  return (
    <mesh position={[0, 0.4, 0.5]} renderOrder={2}>
      <planeGeometry args={[14, 5, 1, 1]} />
      <shaderMaterial
        ref={mat}
        vertexShader={mistVertex}
        fragmentShader={mistFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export function JapfuMistScene() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (group.current) {
      const t = state.clock.elapsedTime;
      group.current.rotation.y = Math.sin(t * 0.08) * 0.06;
    }
  });
  return (
    <group ref={group}>
      <Peak />
      <Mist />
      {/* distant ridges */}
      <mesh position={[-4, -1.4, -6]} rotation={[0, 0.3, 0]}>
        <coneGeometry args={[2.5, 3, 14]} />
        <meshStandardMaterial color="#1a0a0a" flatShading roughness={1} />
      </mesh>
      <mesh position={[4.5, -1.6, -7]} rotation={[0, -0.2, 0]}>
        <coneGeometry args={[3, 3.6, 14]} />
        <meshStandardMaterial color="#1f0d0d" flatShading roughness={1} />
      </mesh>
    </group>
  );
}
