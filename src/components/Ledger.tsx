import { useRef, useState } from "react";
import { motion } from "framer-motion";

/** Brass-brushed booking FAB with magnetic-hover. */
export function Ledger() {
  const ref = useRef<HTMLButtonElement>(null);
  const [delta, setDelta] = useState({ x: 0, y: 0 });

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    setDelta({ x: (e.clientX - cx) * 0.25, y: (e.clientY - cy) * 0.25 });
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setDelta({ x: 0, y: 0 })}
      animate={{ x: delta.x, y: delta.y }}
      transition={{ type: "spring", stiffness: 180, damping: 16 }}
      className="brass-surface fixed bottom-6 right-6 z-40 inline-flex items-center gap-3 rounded-full px-6 py-3 font-journal text-sm uppercase tracking-[0.25em] text-[oklch(0.18_0.04_30)] shadow-[var(--shadow-ledger)] hover:brightness-110"
      onClick={() => document.dispatchEvent(new CustomEvent("ledger:open"))}
    >
      <span className="h-2 w-2 rounded-full bg-[oklch(0.25_0.08_30)]" />
      The Ledger
      <span className="text-[10px] opacity-70">Reserve</span>
    </motion.button>
  );
}
