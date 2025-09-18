import { motion } from "framer-motion";

export default function Events() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="flex items-center justify-between">
        <h1 className="font-orbitron text-3xl text-white">Events</h1>
        <p className="text-white/60 text-sm">3D cards coming next</p>
      </div>
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            whileHover={{ rotateX: 6, rotateY: -6, y: -8 }}
            className="glass p-6"
          >
            <div className="text-xs text-white/60">Event {i + 1}</div>
            <div className="mt-2 text-white font-semibold">Title TBD</div>
            <div className="mt-1 text-white/60 text-sm">
              Date • Time • Venue
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
