"use client";
import { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function LuxuryCrystal() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Mouse tracking
  const targetMouse = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      targetMouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * 0.05;
      currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * 0.05;

      meshRef.current.rotation.x = currentMouse.current.y * 0.5 + state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = currentMouse.current.x * 0.5 + state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.5} floatIntensity={1.5} floatingRange={[-0.2, 0.2]}>
      <mesh ref={meshRef}>
        {/* A complex, faceted torus knot */}
        <torusKnotGeometry args={[2, 0.6, 128, 32, 2, 3]} />
        <MeshTransmissionMaterial 
          background={new THREE.Color("#07080f")}
          backside
          backsideThickness={2}
          thickness={1.5}
          chromaticAberration={0.06}
          anisotropy={0.2}
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.1}
          iridescence={1}
          iridescenceIOR={1.2}
          iridescenceThicknessRange={[100, 400]}
          clearcoat={1}
          clearcoatRoughness={0}
          roughness={0}
          color="#a99dfc"
        />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  const [pixelRatio, setPixelRatio] = useState(1);

  useEffect(() => {
    setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  }, []);

  return (
    <div className="absolute top-0 right-0 w-full h-full z-0 overflow-hidden pointer-events-none flex items-center justify-center opacity-100">
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          dpr={pixelRatio}
        >
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 10]} intensity={3} color="#ffffff" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#6c63ff" />
          <Environment preset="city" />
          
          <LuxuryCrystal />
          
          <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={15} blur={2.5} far={4} color="#6c63ff" />
        </Canvas>
      </Suspense>
    </div>
  );
}
