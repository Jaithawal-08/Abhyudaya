export default function Team() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="font-orbitron text-3xl text-white">Team</h1>
      <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="glass p-6">
            <div className="size-16 rounded-full bg-white/10 border border-white/15" />
            <div className="mt-3 text-white font-semibold">Member {i + 1}</div>
            <div className="text-white/60 text-sm">Role</div>
          </div>
        ))}
      </div>
    </div>
  );
}
