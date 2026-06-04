import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ParallaxImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Moves the image from -20% to 20% on the Y axis as the user scrolls past it
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden w-full h-full ${className}`}
    >
      <motion.img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover origin-center"
        style={{ y, scale: 1.25 }} // Scaled up slightly to prevent the background from showing at the edges during the parallax offset
      />
    </div>
  );
}