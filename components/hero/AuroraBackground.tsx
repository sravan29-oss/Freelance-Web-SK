"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec2 uResolution;
varying vec2 vUv;

// Simplex noise helpers
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

void main() {
  vec2 uv = vUv;
  float t = uTime * 0.15;
  
  // Layered aurora noise
  float n1 = snoise(vec3(uv.x * 1.5, uv.y * 2.0 + t, t * 0.5)) * 0.5 + 0.5;
  float n2 = snoise(vec3(uv.x * 3.0 + t * 0.3, uv.y * 1.5, t * 0.7)) * 0.5 + 0.5;
  float n3 = snoise(vec3(uv.x * 2.0, uv.y * 3.0 - t * 0.4, t * 0.3)) * 0.5 + 0.5;
  
  // Color palette — violet, cyan, emerald
  vec3 violet = vec3(0.545, 0.361, 0.965);
  vec3 cyan = vec3(0.024, 0.714, 0.831);
  vec3 emerald = vec3(0.063, 0.725, 0.506);
  vec3 dark = vec3(0.039, 0.039, 0.059);
  
  // Mix colors based on noise layers
  vec3 color = mix(violet, cyan, n1);
  color = mix(color, emerald, n2 * 0.4);
  
  // Create flowing aurora ribbons
  float ribbon = smoothstep(0.4, 0.6, n1) * smoothstep(0.3, 0.5, n2);
  ribbon += smoothstep(0.5, 0.7, n3) * 0.5;
  ribbon = clamp(ribbon, 0.0, 1.0);
  
  // Fade from center
  float vignette = 1.0 - smoothstep(0.2, 0.9, length(uv - 0.5) * 1.4);
  
  // Compose final — very subtle, not overwhelming
  float intensity = ribbon * vignette * 0.12;
  vec3 finalColor = mix(dark, color, intensity);
  
  // Add very subtle grain
  float grain = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453) * 0.015;
  finalColor += grain;
  
  gl_FragColor = vec4(finalColor, 1.0);
}
`;

function AuroraPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
    }),
    []
  );

  useFrame((_, delta) => {
    timeRef.current += delta;
    uniforms.uTime.value = timeRef.current;
  });

  return (
    <mesh ref={meshRef} scale={[2, 2, 1]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}

export default function AuroraBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <AuroraPlane />
      </Canvas>
    </div>
  );
}
