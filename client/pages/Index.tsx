import Scene3D from "@/components/Scene3D";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

export default function Index() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <div ref={ref}>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none">
          <motion.div style={{ y: y1 }} className="absolute -top-24 -left-32 h-72 w-72 rounded-full blur-3xl" style={{ y: y1 as any }}>
            {/* decorative blob */}
          </motion.div>
        </div>
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="py-16 lg:py-24">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                <span className="size-1.5 rounded-full bg-brand shadow-[0_0_12px_hsla(var(--brand)/0.8)]" />
                Modern 3D Experience
              </div>
              <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold font-orbitron leading-tight text-white drop-shadow-[0_0_24px_rgba(0,162,255,0.25)]">
                Abhyudaya Club Portal
              </h1>
              <p className="mt-4 text-lg text-white/70 max-w-xl">
                Explore events, meet the team, and immerse yourself in an interactive 3D journey. Built with React, Three.js, and Framer Motion.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link to="/events" className="btn-cta">View Upcoming Events</Link>
                <Link to="/about" className="px-6 py-3 rounded-full border border-white/15 text-white/90 hover:bg-white/5 transition">Learn More</Link>
              </div>

              {/* Floating menu (3D-ish tilt via motion) */}
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg">
                {[
                  { to: "/events", label: "Events" },
                  { to: "/team", label: "Team" },
                  { to: "/gallery", label: "Gallery" },
                  { to: "/about", label: "About" },
                  { to: "/contact", label: "Contact" },
                  { to: "/", label: "Home" },
                ].map((item, i) => (
                  <motion.div
                    key={item.to}
                    whileHover={{ y: -6, rotateX: 6, rotateY: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="glass px-4 py-3 text-center text-sm text-white/80 hover:text-white"
                  >
                    <Link to={item.to}>{item.label}</Link>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div style={{ y: y2 }} className="relative">
              <Scene3D />
            </motion.div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="glass p-8">
            <h2 className="font-orbitron text-2xl md:text-3xl font-semibold text-white">About the Club</h2>
            <p className="mt-3 text-white/70">
              Abhyudaya fosters innovation and creativity through events, workshops, and community projects. Our mission is to empower students with hands-on experiences and a platform to showcase their talents.
            </p>
            <Link to="/about" className="mt-6 inline-block text-brand hover:underline">Read more →</Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="glass p-6">
              <div className="text-white/60 text-sm">Focus</div>
              <div className="mt-2 text-white font-semibold">Technology + Design</div>
            </div>
            <div className="glass p-6">
              <div className="text-white/60 text-sm">Vibe</div>
              <div className="mt-2 text-white font-semibold">Modern, Immersive, Interactive</div>
            </div>
            <div className="glass p-6">
              <div className="text-white/60 text-sm">Stack</div>
              <div className="mt-2 text-white font-semibold">React • R3F • Tailwind • Motion</div>
            </div>
            <div className="glass p-6">
              <div className="text-white/60 text-sm">Theme</div>
              <div className="mt-2 text-white font-semibold">Dark + Glassmorphism</div>
            </div>
          </div>
        </div>
      </section>

      {/* Events preview */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex items-center justify-between">
          <h2 className="font-orbitron text-2xl md:text-3xl font-semibold text-white">Upcoming Events</h2>
          <Link to="/events" className="text-brand hover:underline">See all</Link>
        </div>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {[1,2,3].map((i) => (
            <motion.div key={i} whileHover={{ y: -6 }} className="glass p-6">
              <div className="text-xs text-white/60">Event {i}</div>
              <div className="mt-2 text-white font-semibold">Interactive 3D Workshop #{i}</div>
              <div className="mt-1 text-white/60 text-sm">Learn WebGL and R3F essentials</div>
              <div className="mt-4 text-cta">Register →</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team preview */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex items-center justify-between">
          <h2 className="font-orbitron text-2xl md:text-3xl font-semibold text-white">Meet the Team</h2>
          <Link to="/team" className="text-brand hover:underline">View all</Link>
        </div>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {["Lead", "Designer", "Engineer"].map((role, i) => (
            <div key={role} className="glass p-6">
              <div className="size-14 rounded-full bg-white/10 border border-white/15" />
              <div className="mt-3 text-white font-semibold">Member {i + 1}</div>
              <div className="text-white/60 text-sm">{role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery preview */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex items-center justify-between">
          <h2 className="font-orbitron text-2xl md:text-3xl font-semibold text-white">Gallery</h2>
          <Link to="/gallery" className="text-brand hover:underline">Open 3D Wall</Link>
        </div>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-video rounded-xl overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-brand/20 to-transparent" />
              <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-xl" />
              <div className="h-full w-full bg-[radial-gradient(circle_at_30%_30%,rgba(0,162,255,0.15),transparent_40%)]" />
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="glass p-10 text-center">
          <h3 className="font-orbitron text-2xl text-white">Get in Touch</h3>
          <p className="mt-2 text-white/70 max-w-2xl mx-auto">Questions or ideas? We’d love to hear from you. Collaborate with us for events, workshops, and community initiatives.</p>
          <Link to="/contact" className="mt-6 inline-block btn-cta">Contact Us</Link>
        </div>
      </section>
    </div>
  );
}
