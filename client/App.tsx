import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Events from "./pages/Events";
import Team from "./pages/Team";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Intro from "./components/Intro";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

function PageFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/95">
      <NavBar />
      <main className="pt-24">{children}</main>
      <Footer />
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  const transition = {
    initial: { opacity: 0, rotateX: -10, y: 20 },
    animate: { opacity: 1, rotateX: 0, y: 0 },
    exit: { opacity: 0, rotateX: 10, y: -20 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  };
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageFrame>
              <motion.div style={{ perspective: 1200 }} {...transition}>
                <Index />
              </motion.div>
            </PageFrame>
          }
        />
        <Route
          path="/about"
          element={
            <PageFrame>
              <motion.div style={{ perspective: 1200 }} {...transition}>
                <About />
              </motion.div>
            </PageFrame>
          }
        />
        <Route
          path="/events"
          element={
            <PageFrame>
              <motion.div style={{ perspective: 1200 }} {...transition}>
                <Events />
              </motion.div>
            </PageFrame>
          }
        />
        <Route
          path="/team"
          element={
            <PageFrame>
              <motion.div style={{ perspective: 1200 }} {...transition}>
                <Team />
              </motion.div>
            </PageFrame>
          }
        />
        <Route
          path="/gallery"
          element={
            <PageFrame>
              <motion.div style={{ perspective: 1200 }} {...transition}>
                <Gallery />
              </motion.div>
            </PageFrame>
          }
        />
        <Route
          path="/contact"
          element={
            <PageFrame>
              <motion.div style={{ perspective: 1200 }} {...transition}>
                <Contact />
              </motion.div>
            </PageFrame>
          }
        />
        <Route
          path="*"
          element={
            <PageFrame>
              <motion.div style={{ perspective: 1200 }} {...transition}>
                <NotFound />
              </motion.div>
            </PageFrame>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

const App = () => {
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const params = new URLSearchParams(window.location.search);
    const force = params.get("intro") === "1";
    return force || sessionStorage.getItem("introPlayed") !== "1";
  });

  const durationMs = (() => {
    if (typeof window === "undefined") return 3200;
    const params = new URLSearchParams(window.location.search);
    if (params.get("introPersist") === "1") return 0; // don't auto-hide
    return 3200; // default
  })();

  useEffect(() => {
    if (!showIntro) return;
    if (durationMs === 0) return; // persist
    const hideOnSlow = setTimeout(() => {
      setShowIntro(false);
      sessionStorage.setItem("introPlayed", "1");
    }, durationMs);
    return () => clearTimeout(hideOnSlow);
  }, [showIntro, durationMs]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
        {showIntro && (
          <Intro
            durationMs={durationMs}
            onFinish={() => {
              sessionStorage.setItem("introPlayed", "1");
              setShowIntro(false);
            }}
          />
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
