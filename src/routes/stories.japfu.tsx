import { createFileRoute, Link } from "@tanstack/react-router";
import { STORIES } from "./stories";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { r3f } from "@/components/canvas/tunnel";
import { JapfuMistScene } from "@/components/canvas/JapfuMist";

export const Route = createFileRoute("/stories/japfu")({
  head: () => {
    const story = STORIES.find((s) => s.id === "japfu");
    return {
      meta: [
        { title: `${story?.title} — Stories of the Hills` },
        { name: "description", content: story?.body.substring(0, 160) },
      ],
    };
  },
  component: JapfuAnimatedStoryPage,
});

function JapfuAnimatedStoryPage() {
  const story = STORIES.find((s) => s.id === "japfu")!;

  return (
    <article className="relative min-h-screen">
      <r3f.In>
        <JapfuMistScene />
      </r3f.In>

      <div className="relative z-10 px-6 py-16 md:px-16 md:py-24 min-h-screen flex flex-col justify-end">
        <div className="mx-auto max-w-4xl w-full">
          <div className="mb-12 absolute top-16 left-6 md:left-16">
            <Button
              asChild
              variant="ghost"
              className="font-journal uppercase tracking-widest text-parchment hover:text-white bg-black/20 hover:bg-black/40 backdrop-blur-sm"
            >
              <Link to="/stories">← Back to Stories</Link>
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
            className="bg-black/40 backdrop-blur-md p-8 md:p-12 rounded-lg shadow-2xl border border-white/10 text-parchment"
          >
            <header className="mb-10">
              <p className="font-journal text-sm uppercase tracking-[0.5em] text-[#e8d4b0]">
                {story.folio} · {story.place}
              </p>
              <h1 className="mt-6 font-journal text-4xl leading-[1.05] md:text-6xl text-white">
                {story.title}
              </h1>
            </header>

            <div className="prose prose-lg prose-invert max-w-none font-journal text-xl leading-relaxed text-parchment/90 md:text-2xl">
              <p className="first-letter:text-7xl first-letter:font-bold first-letter:text-white first-letter:mr-3 first-letter:float-left">
                {story.body}
              </p>

              <blockquote className="my-10 border-l-4 pl-6 font-journal text-3xl italic leading-snug border-[#e8d4b0] text-white">
                &ldquo;{story.pull}&rdquo;
              </blockquote>

              <p>
                The mountain's breath is a reminder that the land is alive, holding the memories of
                the Naga people in its misty embrace.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </article>
  );
}
