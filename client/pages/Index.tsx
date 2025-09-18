import Scene3D from "@/components/Scene3D";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

export default function Index() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <div ref={ref}>
      {/* Hero only */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none">
          <motion.div
            style={{ y: y1 }}
            className="absolute -top-24 -left-32 h-72 w-72 rounded-full blur-3xl"
          />
        </div>
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="py-20 lg:py-28">
              <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold font-orbitron leading-tight text-white drop-shadow-[0_0_24px_rgba(0,162,255,0.25)]">
                Abhyudaya Club Portal
              </h1>
              <p className="mt-4 text-lg text-white/70 max-w-xl">
                Immerse in a smooth, interactive 3D experience powered by React
                Three Fiber.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/events"
                  className="px-6 py-3 rounded-full bg-black text-white font-semibold"
                >
                  Explore
                </Link>
              </div>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                <span className="size-1.5 rounded-full bg-brand shadow-[0_0_12px_hsla(var(--brand)/0.8)]" />
                Modern 3D Experience
              </div>
            </div>

            <motion.div style={{ y: y2 }} className="relative">
              <Scene3D />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
