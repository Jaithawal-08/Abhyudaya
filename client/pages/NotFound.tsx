import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[60vh] mx-auto max-w-3xl px-4 flex items-center justify-center">
      <div className="glass w-full p-10 text-center">
        <h1 className="font-orbitron text-5xl text-white">404</h1>
        <p className="mt-2 text-white/70">Oops! Page not found</p>
        <Link to="/" className="mt-6 inline-block btn-cta">Return Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
