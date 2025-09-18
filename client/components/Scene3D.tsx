import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Stars, useTexture } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { CAMERA, COLORS, PERFORMANCE } from "@/utils/threeDefaults";

const LOGO_URL = "https://cdn.builder.io/api/v1/image/assets%2F9758f7b189e3493e85a0640ad32b6e46%2Fe1068dbaed354b2bbc6891ac7ddc1046?format=webp&width=800";

function LogoPlane() {
  const mesh = useRef<THREE.Mesh>(null!);
  const texture = useTexture(LOGO_URL);
  const material = useMemo(() => new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 1,
    side: THREE.DoubleSide,
  }), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;
    if (mesh.current) {
      mesh.current.rotation.x = mouseY * 0.2 + Math.sin(t * 0.5) * 0.02;
      mesh.current.rotation.y = mouseX * 0.35;
      const s = 1 + Math.sin(t * 1.2) * 0.01;
      mesh.current.scale.setScalar(s);
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={mesh}>
        <planeGeometry args={[3.2, 3.2]} />
        <meshBasicMaterial map={texture} transparent={true} />
      </mesh>
    </Float>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 3, 4]} intensity={0.8} color={COLORS.brand} />
    </>
  );
}

export default function Scene3D() {
  return (
    <div className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] w-full will-change-transform">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 pointer-events-none" />
      <Canvas
        shadows={false}
        dpr={[1, 1.75]}
        camera={{ fov: CAMERA.fov, near: CAMERA.near, far: CAMERA.far, position: CAMERA.position }}
      >
        <Suspense fallback={null}>
          <Lights />
          <Stars radius={60} depth={40} count={1200} factor={3} fade speed={0.4} />
          <LogoPlane />
          <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}
