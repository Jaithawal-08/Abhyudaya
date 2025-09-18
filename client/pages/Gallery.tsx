export default function Gallery() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="font-orbitron text-3xl text-white">Gallery</h1>
      <p className="mt-2 text-white/70">Interactive 3D wall will be implemented next.</p>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="aspect-video rounded-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-brand/20 to-transparent" />
            <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-xl" />
            <div className="h-full w-full bg-[radial-gradient(circle_at_30%_30%,rgba(0,162,255,0.15),transparent_40%)]" />
          </div>
        ))}
      </div>
    </div>
  );
}
