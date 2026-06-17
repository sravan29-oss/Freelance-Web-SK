"use client";

import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import SectionReveal from "@/components/effects/SectionReveal";
import { Code, Layers, Zap, Cpu } from "lucide-react";

// --- 3D Logo Component ---
function GlowingCube() {
  const meshRef = useRef<THREE.Mesh>(null);
  const edgesRef = useRef<THREE.LineSegments>(null);
  
  useFrame((state) => {
    if (meshRef.current && edgesRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      edgesRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      edgesRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      
      // Floating effect
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
      edgesRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <boxGeometry args={[2, 2, 2]} />
        <meshPhysicalMaterial 
          color="#8b5cf6"
          metalness={0.9}
          roughness={0.1}
          transmission={0.9}
          thickness={0.5}
          ior={1.5}
        />
      </mesh>
      <lineSegments ref={edgesRef}>
        <edgesGeometry args={[new THREE.BoxGeometry(2, 2, 2)]} />
        <lineBasicMaterial color="#06b6d4" linewidth={2} />
      </lineSegments>
    </group>
  );
}

function FloatingParticles() {
  const count = 50;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 10,
      y: (Math.random() - 0.5) * 10,
      z: (Math.random() - 0.5) * 10,
      speed: Math.random() * 0.02,
    }));
  }, [count]);

  useFrame(() => {
    if (meshRef.current) {
      particles.forEach((p, i) => {
        p.y += p.speed;
        if (p.y > 5) p.y = -5;
        
        dummy.position.set(p.x, p.y, p.z);
        dummy.updateMatrix();
        meshRef.current!.setMatrixAt(i, dummy.matrix);
      });
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.05]} />
      <meshBasicMaterial color="#8b5cf6" transparent opacity={0.6} />
    </instancedMesh>
  );
}

// --- Main Section Component ---
export default function SKBrandSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const brandValues = [
    { title: "Innovation", icon: Zap, text: "Pushing boundaries with modern stacks." },
    { title: "Architecture", icon: Layers, text: "Scalable, maintainable codebases." },
    { title: "Performance", icon: Cpu, text: "Optimized for speed and efficiency." },
    { title: "Clean Code", icon: Code, text: "Readable, documented, and tested." },
  ];

  return (
    <section id="brand" ref={containerRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 bg-gray-50 dark:bg-[#060609]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-black/5 dark:border-white/5 rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-black/5 dark:border-white/5 rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left: 3D Visualization */}
          <motion.div 
            style={{ y, opacity }}
            className="w-full lg:w-1/2 h-[400px] md:h-[500px] relative rounded-3xl overflow-hidden bg-white/50 dark:bg-black/20 border border-black/5 dark:border-white/5 backdrop-blur-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 z-0" />
            <div className="absolute inset-0 z-10">
              <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: true, alpha: true }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
                <GlowingCube />
                <FloatingParticles />
              </Canvas>
            </div>
          </motion.div>

          {/* Right: Content */}
          <div className="w-full lg:w-1/2">
            <SectionReveal>
              <p className="text-violet-600 dark:text-violet-400 text-sm font-medium tracking-widest uppercase mb-4">
                Our Mission
              </p>
              
              {/* Glitch Headline */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Engineering{" "}
                <span className="sk-glitch-wrapper">
                  <span className="sk-glitch text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-500 dark:from-violet-400 dark:to-cyan-400" data-text="Digital Excellence">
                    Digital Excellence
                  </span>
                </span>
              </h2>

              <div className="space-y-6 text-gray-600 dark:text-white/60 text-lg leading-relaxed mb-10">
                <p>
                  At SK Digital, we believe that great software is the foundation of modern business. We are a specialized team of engineers, designers, and strategists committed to building exceptional digital products.
                </p>
                <p>
                  We partner with ambitious companies to transform complex technical challenges into elegant, scalable solutions that drive measurable business value.
                </p>
              </div>

              {/* Values Grid */}
              <div className="grid grid-cols-2 gap-6">
                {brandValues.map((value, idx) => {
                  const Icon = value.icon;
                  return (
                    <div key={idx} className="group flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center shrink-0 group-hover:bg-violet-500/10 group-hover:border-violet-500/30 transition-colors">
                        <Icon size={18} className="text-gray-700 dark:text-white/70 group-hover:text-violet-500 transition-colors" />
                      </div>
                      <div>
                        <h4 className="text-gray-900 dark:text-white font-semibold text-sm mb-1">{value.title}</h4>
                        <p className="text-gray-500 dark:text-white/40 text-xs leading-relaxed">{value.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>

      {/* Marquee Footer */}
      <div className="mt-32 border-y border-black/5 dark:border-white/5 py-6 bg-white/50 dark:bg-black/20 backdrop-blur-md">
        <div className="sk-marquee-container">
          <div className="sk-marquee">
            {/* Duplicated multiple times for infinite scroll */}
            {[...Array(3)].map((_, i) => (
              <div key={i} className="sk-marquee-content">
                <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-500/50 to-cyan-500/50 uppercase tracking-widest">
                  Clean Architecture
                </span>
                <span className="w-3 h-3 rounded-full bg-violet-500/50" />
                <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500/50 to-emerald-500/50 uppercase tracking-widest">
                  Pixel Perfect
                </span>
                <span className="w-3 h-3 rounded-full bg-cyan-500/50" />
                <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500/50 to-violet-500/50 uppercase tracking-widest">
                  Infinite Scale
                </span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/50" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
