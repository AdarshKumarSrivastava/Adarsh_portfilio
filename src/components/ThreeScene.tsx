"use client";
import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function TopographicPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);


  const targetMouse = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      targetMouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColor: { value: new THREE.Color("#6c63ff") }, // Muted violet
      uBaseColor: { value: new THREE.Color("#12121f") }, // Surface
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime * 0.5;
      
      // Lerp mouse
      materialRef.current.uniforms.uMouse.value.lerp(targetMouse.current, 0.05);
    }
    if (meshRef.current) {
      // Subtle tilt parallax
      meshRef.current.rotation.x = -Math.PI / 2.5 + (targetMouse.current.y * 0.1);
      meshRef.current.rotation.z = targetMouse.current.x * 0.1;
    }
  });

  const vertexShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec2 vUv;
    varying float vElevation;

    // Simplex 2D noise
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vUv = uv;
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      
      // Generate elevation using noise + time
      float elevation = snoise(vec2(modelPosition.x * 0.15 + uTime * 0.1, modelPosition.z * 0.15 + uTime * 0.1)) * 2.0;
      
      // Mouse interaction displacement
      float dist = distance(modelPosition.xy, uMouse * 10.0);
      float mouseEffect = smoothstep(5.0, 0.0, dist) * 1.5;
      
      modelPosition.y += elevation + mouseEffect;
      vElevation = elevation;

      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;
      gl_Position = projectedPosition;
    }
  `;

  const fragmentShader = `
    uniform vec3 uColor;
    uniform vec3 uBaseColor;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      // Color gradient based on elevation
      float mixStrength = (vElevation + 2.0) / 4.0;
      vec3 color = mix(uBaseColor, uColor, mixStrength);
      
      // Grid effect (wireframe illusion without actual wireframe performance cost)
      float gridX = fract(vUv.x * 60.0);
      float gridY = fract(vUv.y * 60.0);
      float line = step(0.95, gridX) + step(0.95, gridY);
      
      gl_FragColor = vec4(color + (line * 0.1), 1.0);
    }
  `;

  return (
    <mesh ref={meshRef} position={[0, -2, 0]} rotation={[-Math.PI / 2.5, 0, 0]}>
      <planeGeometry args={[30, 30, 120, 120]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe={true}
        transparent={true}
        opacity={0.3}
      />
    </mesh>
  );
}

export default function ThreeScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <fog attach="fog" args={["#080810", 5, 15]} />
        <TopographicPlane />
      </Canvas>
    </div>
  );
}
