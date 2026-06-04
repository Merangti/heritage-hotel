import { AnimatePresence, motion } from "framer-motion";
import { useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";

/**
 * Hornbill's Flight: a true page-flip turn between routes.
 * On every route change, a parchment "page" sweeps across from the right,
 * rotating around its left spine like a turning book page, with a
 * gradient shadow on its underside. The new chapter is revealed beneath.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const key = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="relative" style={{ perspective: "2400px" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Page-turn overlay — one parchment leaf hinged on the left spine */}
      <AnimatePresence>
        <motion.div
          key={key + "-page-flip"}
          aria-hidden
          className="pointer-events-none fixed inset-0 z-50"
          style={{ transformStyle: "preserve-3d", perspective: "2400px" }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.05, ease: [0.85, 0, 0.15, 1] }}
        >
          <motion.div
            className="absolute inset-y-0 right-0 w-full"
            style={{
              transformOrigin: "left center",
              backfaceVisibility: "hidden",
              backgroundImage:
                "linear-gradient(90deg, oklch(0.94 0.04 70) 0%, oklch(0.9 0.05 60) 60%, oklch(0.82 0.06 55) 100%)",
              boxShadow:
                "inset 12px 0 28px -10px oklch(0.2 0.05 30 / 0.45), 0 24px 60px -12px oklch(0.15 0.05 30 / 0.55)",
            }}
            initial={{ rotateY: 0 }}
            animate={{ rotateY: -180 }}
            transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* page texture: ruled lines + ink corner */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(180deg, transparent 0 38px, oklch(0.2 0.05 30 / 0.15) 38px 39px)",
              }}
            />
            <div
              className="absolute right-8 top-8 font-journal text-[10px] uppercase tracking-[0.45em]"
              style={{ color: "oklch(0.35 0.06 35 / 0.75)" }}
            >
              Turning the page…
            </div>
            <div
              className="absolute bottom-10 right-10 font-journal text-[10px] uppercase tracking-[0.4em]"
              style={{ color: "oklch(0.35 0.06 35 / 0.6)" }}
            >
              Volume I · Kohima
            </div>
            {/* shadow seam at spine */}
            <div
              className="absolute inset-y-0 left-0 w-10"
              style={{
                background: "linear-gradient(90deg, oklch(0.18 0.05 30 / 0.45), transparent)",
              }}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
