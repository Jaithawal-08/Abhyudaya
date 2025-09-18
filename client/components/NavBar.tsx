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
        <div className="flex items-center justify-between px-5 py-3 rounded-2xl border border-white bg-white text-white backdrop-blur-xl">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="size-8 rounded-md overflow-hidden grid place-items-center ring-1 ring-white">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F9758f7b189e3493e85a0640ad32b6e46%2Fe1068dbaed354b2bbc6891ac7ddc1046?format=webp&width=128"
                alt="Abhyudaya logo"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="leading-tight">
              <div className="font-orbitron text-sm uppercase tracking-widest text-white">
                Abhyudaya
              </div>
              <div className="font-semibold text-white">Club Portal</div>
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
                      "text-white",
                      isActive || location.pathname === item.to
                        ? "bg-white/10"
                        : "hover:bg-white/10",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </motion.div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/events"
              className="px-4 py-2 rounded-full bg-black text-white font-semibold"
            >
              Explore Events
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
