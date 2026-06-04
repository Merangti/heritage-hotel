import { createFileRoute, Link } from "@tanstack/react-router";
import { STORIES } from "./stories";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { r3f } from "@/components/canvas/tunnel";
import { MorungScene } from "@/components/canvas/Morung";
import { HearthEmbers } from "@/components/HearthEmbers";

export const Route = createFileRoute("/stories/morung")({
  head: () => {
    const story = STORIES.find((s) => s.id === "morung");
    return {
      meta: [
        { title: `${story?.title} — Stories of the Hills` },
        { name: "description", content: story?.body.substring(0, 160) },
      ],
    };
  },
  component: MorungStoryPage,
});

function MorungStoryPage() {
  const story = STORIES.find((s) => s.id === "morung")!;

  return (
    <article className="relative min-h-screen">
      <r3f.In>
        <MorungScene />
      </r3f.In>

      <div className="relative z-10 px-6 py-16 md:px-16 md:py-24 min-h-screen flex flex-col justify-end">
        <div className="mx-auto max-w-4xl w-full">
          <div className="mb-12 absolute top-16 left-6 md:left-16">
            <Button
              asChild
              variant="ghost"
              className="font-journal uppercase tracking-widest text-amber-100 hover:text-white bg-black/30 hover:bg-black/50 backdrop-blur-sm"
            >
              <Link to="/stories">← Back to Stories</Link>
            </Button>
          </div>

          <HearthEmbers count={35} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
            className="bg-black/40 backdrop-blur-md p-8 md:p-12 rounded-lg shadow-2xl border border-amber-900/20 text-amber-50"
          >
            <header className="mb-10">
              <p className="font-journal text-sm uppercase tracking-[0.5em] text-amber-400">
                {story.folio} · {story.place}
              </p>
              <h1 className="mt-6 font-journal text-4xl leading-[1.05] md:text-6xl text-white">
                {story.title}
              </h1>
            </header>

            <div className="space-y-6 font-journal text-lg leading-relaxed text-amber-50/90 md:text-xl">
              <p className="first-letter:text-7xl first-letter:font-bold first-letter:text-amber-300 first-letter:mr-3 first-letter:float-left">
                {story.body}
              </p>

              <blockquote className="border-l-4 border-amber-600 pl-6 text-2xl italic leading-snug text-amber-100">
                &ldquo;{story.pull}&rdquo;
              </blockquote>

              <p className="text-amber-100/80">
                Within these wooden walls, knowledge was passed down not through books but through
                breath and fire. The morung was a school of life, where boys learned the rituals,
                the songs, the codes that would define them as men of the hills. That fire still
                burns in the memory of the Naga people.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </article>
  );
}
