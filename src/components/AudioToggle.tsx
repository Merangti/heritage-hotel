import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import musicSrc from "@/assets/my-full-moon_loop-01.wav";

/** Spatial-audio toggle. */
export function AudioToggle() {
  const [on, setOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio(musicSrc);
      audio.loop = true;
      audio.volume = 0.5;
      audioRef.current = audio;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (on) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [on]);

  return (
    <button
      aria-label={on ? "Mute soundscape" : "Play soundscape"}
      onClick={() => setOn((v) => !v)}
      className="fixed bottom-6 left-20 z-40 hidden h-10 w-10 items-center justify-center rounded-full border border-border bg-vellum/80 text-foreground/80 backdrop-blur transition hover:text-naga md:inline-flex"
    >
      {on ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
    </button>
  );
}
