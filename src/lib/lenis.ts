import { useEffect } from "react";
import Lenis from "lenis";

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    let raf = 0;
    function frame(t: number) {
      lenis.raf(t);
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
}
