"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 200;
  const timeRef = useRef(0);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10,
        ] as [number, number, number],
        speed: Math.random() * 0.005 + 0.002,
        offset: Math.random() * Math.PI * 2,
        scale: Math.random() * 0.5 + 0.2,
      });
    }
    return temp;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    timeRef.current += delta;
    const t = timeRef.current;

    particles.forEach((particle, i) => {
      dummy.position.set(
        particle.position[0] + Math.sin(t * particle.speed * 50 + particle.offset) * 0.5,
        particle.position[1] + Math.cos(t * particle.speed * 30 + particle.offset) * 0.5,
        particle.position[2]
      );
      dummy.scale.setScalar(
        particle.scale * (0.8 + Math.sin(t * 2 + particle.offset) * 0.2)
      );
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshBasicMaterial color="#8b5cf6" transparent opacity={0.6} />
    </instancedMesh>
  );
}

function FloatingConnections() {
  const lineRef = useRef<THREE.LineSegments>(null);
  const pointCount = 60;
  const timeRef = useRef(0);

  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i < pointCount; i++) {
      pts.push({
        x: (Math.random() - 0.5) * 16,
        y: (Math.random() - 0.5) * 16,
        z: (Math.random() - 0.5) * 6,
        speed: Math.random() * 0.3 + 0.1,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return pts;
  }, []);

  useFrame((_, delta) => {
    if (!lineRef.current) return;
    timeRef.current += delta;
    const t = timeRef.current;
    const positions: number[] = [];

    const currentPositions = points.map((p) => ({
      x: p.x + Math.sin(t * p.speed + p.offset) * 1,
      y: p.y + Math.cos(t * p.speed * 0.7 + p.offset) * 1,
      z: p.z,
    }));

    for (let i = 0; i < currentPositions.length; i++) {
      for (let j = i + 1; j < currentPositions.length; j++) {
        const dist = Math.sqrt(
          (currentPositions[i].x - currentPositions[j].x) ** 2 +
          (currentPositions[i].y - currentPositions[j].y) ** 2 +
          (currentPositions[i].z - currentPositions[j].z) ** 2
        );
        if (dist < 3) {
          positions.push(
            currentPositions[i].x, currentPositions[i].y, currentPositions[i].z,
            currentPositions[j].x, currentPositions[j].y, currentPositions[j].z
          );
        }
      }
    }

    const geometry = lineRef.current.geometry as THREE.BufferGeometry;
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.attributes.position.needsUpdate = true;
  });

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry />
      <lineBasicMaterial color="#8b5cf6" transparent opacity={0.08} />
    </lineSegments>
  );
}

export default function ParticleCanvas() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Particles />
        <FloatingConnections />
      </Canvas>
    </div>
  );
}
