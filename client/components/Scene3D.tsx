import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Stars } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { CAMERA, COLORS, PERFORMANCE } from "@/utils/threeDefaults";

function LogoMesh() {
  const mesh = useRef<THREE.Mesh>(null!);
  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: COLORS.brand,
    metalness: 0.3,
    roughness: 0.2,
    emissive: COLORS.brand.clone().multiplyScalar(0.4),
    emissiveIntensity: 0.8,
  }), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(t / 2) * 0.2 + mouseY * 0.3;
      mesh.current.rotation.y = t * 0.6 + mouseX * 0.5;
      const s = 1 + Math.sin(t * 1.5) * 0.02;
      mesh.current.scale.setScalar(s);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={mesh} castShadow receiveShadow>
        <torusKnotGeometry args={[1.1, 0.34, 220, 32]} />
        <primitive object={material} attach="material" />
      </mesh>
    </Float>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 3, 4]} intensity={1.4} color={COLORS.brand} />
      <pointLight position={[-3, -2, -2]} intensity={0.6} />
    </>
  );
}

export default function Scene3D() {
  return (
    <div className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] w-full">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 pointer-events-none" />
      <Canvas
        shadows={PERFORMANCE.shadows}
        dpr={PERFORMANCE.dpr}
        camera={{ fov: CAMERA.fov, near: CAMERA.near, far: CAMERA.far, position: CAMERA.position }}
      >
        <Suspense fallback={null}>
          <Lights />
          <Stars radius={80} depth={50} count={5000} factor={4} fade speed={0.6} />
          <LogoMesh />
          <OrbitControls enablePan={false} enableZoom={false} enableRotate autoRotate autoRotateSpeed={0.6} />
        </Suspense>
      </Canvas>
    </div>
  );
}
