import { motion } from "framer-motion";
import { useMemo } from "react";

export function HearthEmbers({ count = 25 }: { count?: number }) {
  // Generate random properties for the embers only once on mount
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 1,
      left: Math.random() * 100,
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 5,
      sway: Math.random() * 40 - 20, // Sway left or right
    }));
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bottom-[-10px] rounded-full bg-orange-400"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            boxShadow: "0 0 10px 2px rgba(251, 146, 60, 0.8)",
          }}
          animate={{
            y: [-10, -800], // Drift upward
            opacity: [0, 0.8, 0], // Fade in, glow, fade out
            x: [0, p.sway], // Subtle wind sway
          }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}