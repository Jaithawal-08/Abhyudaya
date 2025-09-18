import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

function makeBeamTexture(color: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
  grad.addColorStop(0, "rgba(0,0,0,0)");
  grad.addColorStop(0.15, `${color}`);
  grad.addColorStop(0.5, "rgba(255,255,255,0.85)");
  grad.addColorStop(0.85, `${color}`);
  grad.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.needsUpdate = true;
  return tex;
}

function Beam({ color = "#00A2FF", speed = 1, y = 0, rot = 0 }: { color?: string; speed?: number; y?: number; rot?: number }) {
  const mat = useMemo(() => new THREE.MeshBasicMaterial({
    map: makeBeamTexture(color), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false
  }), [color]);
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    const x = ((t % 2) - 1) * 12; // sweep from left to right
    if (mesh.current) {
      mesh.current.position.x = x;
    }
  });

  return (
    <mesh ref={mesh} position={[-12, y, 0]} rotation={[0, 0, rot]}>
      <planeGeometry args={[10, 1.6]} />
      <primitive object={mat} attach="material" />
    </mesh>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null!);
  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const count = 250;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
      sizes[i] = Math.random() * 2 + 0.5;
    }
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);
  const mat = useMemo(() => new THREE.PointsMaterial({
    color: new THREE.Color("#00A2FF"), size: 0.06, transparent: true, opacity: 0.0, blending: THREE.AdditiveBlending, depthWrite: false
  }), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      const o = Math.min(1, Math.max(0, (t - 0.8) / 0.8)); // fade in after 0.8s
      (ref.current.material as THREE.PointsMaterial).opacity = o * 0.9;
      ref.current.rotation.z = t * 0.1;
    }
  });

  return <points ref={ref} geometry={geom} material={mat} />;
}

export default function Intro({ onFinish }: { onFinish: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onFinish();
    }, 2600);
    return () => clearTimeout(timer);
  }, [onFinish]);

  // load Visme embed script once
  useEffect(() => {
    if (!visible) return;
    const id = "vismeforms-embed";
    if (!document.getElementById(id)) {
      const s = document.createElement("script");
      s.id = id;
      s.src = "https://static-bundles.visme.co/forms/vismeforms-embed.js";
      s.async = true;
      document.body.appendChild(s);
    }
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] bg-gradient-to-b from-black to-black/90"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
        >
          <Canvas
            className="pointer-events-none"
            orthographic
            camera={{ position: [0, 0, 10], zoom: 60 }}
            dpr={[1, 2]}
         >
            {/* beams */}
            <Beam color="#ff3b3b" speed={1.6} y={1.8} rot={0.1} />
            <Beam color="#00a2ff" speed={1.9} y={0.6} rot={-0.05} />
            <Beam color="#ff7a00" speed={1.3} y={-0.6} rot={0.06} />
            <Beam color="#FFD166" speed={1.7} y={-1.8} rot={-0.08} />
            <Particles />
          </Canvas>

          {/* Logo reveal */}
          <div className="absolute inset-0 grid place-items-center pointer-events-none">
            <motion.img
              src="https://cdn.builder.io/api/v1/image/assets%2F9758f7b189e3493e85a0640ad32b6e46%2F4b3b45ce08f9477c9a4b7cc5f5f2e91b?format=webp&width=800"
              alt="Abhyudaya Club Logo"
              className="w-40 md:w-56 drop-shadow-[0_0_30px_rgba(0,162,255,0.6)]"
              initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
            />
          </div>

          {/* Embedded Visme form (full-screen, reliable) */}
          <div className="absolute inset-0 grid place-items-center z-[101] pointer-events-auto">
            <div className="w-[92vw] h-[80vh] md:w-[80vw] md:h-[80vh] max-w-5xl glass overflow-hidden">
              <iframe
                title="Abhyudaya Intro Form"
                src="https://forms.visme.co/g7ddqxx0-untitled-project?fullPage=true"
                style={{ width: "100%", height: "100%", border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
