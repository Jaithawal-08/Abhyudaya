import { Link, NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/events", label: "Events" },
  { to: "/team", label: "Team" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

export default function NavBar() {
  const location = useLocation();

  return (
    <header className="fixed top-4 left-0 right-0 z-50">
      <nav className="mx-auto max-w-7xl px-4">
        <div className="glass flex items-center justify-between px-5 py-3">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="size-8 rounded-md bg-brand/20 ring-1 ring-brand/40 shadow-glow grid place-items-center">
              <div className="size-3.5 rounded-sm bg-brand shadow-[0_0_16px_hsla(var(--brand)/0.8)]" />
            </div>
            <div className="leading-tight">
              <div className="font-orbitron text-sm uppercase tracking-widest text-brand">Abhyudaya</div>
              <div className="font-semibold text-white/90">Club Portal</div>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <motion.div key={item.to} whileHover={{ y: -2 }}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      "px-3 py-2 rounded-md text-sm transition-colors",
                      "hover:text-white/95 hover:bg-white/5",
                      isActive || location.pathname === item.to
                        ? "text-white bg-white/5"
                        : "text-white/70",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </motion.div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Link to="/events" className="btn-cta">Explore Events</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
