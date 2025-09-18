import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-white/60 flex flex-col md:flex-row items-center justify-between gap-4">
        <p>
          © {new Date().getFullYear()} Abhyudaya Club. Built with a modern 3D experience.
        </p>
        <nav className="flex gap-4">
          <Link to="/about" className="hover:text-white">About</Link>
          <Link to="/events" className="hover:text-white">Events</Link>
          <Link to="/team" className="hover:text-white">Team</Link>
          <Link to="/gallery" className="hover:text-white">Gallery</Link>
          <Link to="/contact" className="hover:text-white">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
