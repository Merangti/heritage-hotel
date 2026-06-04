import { createFileRoute, Link } from "@tanstack/react-router";
import { STORIES } from "./stories";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const Route = createFileRoute("/stories/the-weave")({
  head: () => {
    const story = STORIES.find((s) => s.id === "the-weave");
    return {
      meta: [
        { title: `${story?.title} — Stories of the Hills` },
        { name: "description", content: story?.body.substring(0, 160) },
      ],
    };
  },
  component: TheWeaveStoryPage,
});

function TheWeaveStoryPage() {
  const story = STORIES.find((s) => s.id === "the-weave")!;

  return (
    <article className="relative min-h-screen bg-gradient-to-b from-red-950 via-red-900 to-red-950">
      {/* Woven pattern overlay */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(90deg, transparent 24%, rgba(139, 0, 0, 0.3) 25%, rgba(139, 0, 0, 0.3) 26%, transparent 27%, transparent 74%, rgba(139, 0, 0, 0.3) 75%, rgba(139, 0, 0, 0.3) 76%, transparent 77%, transparent),
            linear-gradient(0deg, transparent 24%, rgba(139, 0, 0, 0.3) 25%, rgba(139, 0, 0, 0.3) 26%, transparent 27%, transparent 74%, rgba(139, 0, 0, 0.3) 75%, rgba(139, 0, 0, 0.3) 76%, transparent 77%, transparent)
          `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-900/20 rounded-full blur-3xl translate-x-1/2" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-red-800/10 rounded-full blur-3xl -translate-x-1/2" />

      <div className="relative z-10 px-6 py-16 md:px-16 md:py-24 min-h-screen flex flex-col justify-center">
        <div className="mx-auto max-w-4xl w-full">
          <div className="mb-12">
            <Button
              asChild
              variant="ghost"
              className="font-journal uppercase tracking-widest text-red-100 hover:text-white"
            >
              <Link to="/stories">← Back to Stories</Link>
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <header>
              <p className="font-journal text-sm uppercase tracking-[0.5em] text-red-400">
                {story.folio} · {story.place}
              </p>
              <h1 className="mt-6 font-journal text-5xl leading-[1.05] md:text-7xl text-red-50">
                {story.title}
              </h1>
            </header>

            <figure className="my-12">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={story.image}
                  alt={story.alt}
                  className="w-full h-auto object-cover shadow-2xl border-4 border-red-900"
                  style={{ maxHeight: "60vh" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-950 via-transparent to-transparent opacity-40" />
              </div>
              <figcaption className="mt-4 text-center font-journal text-xs uppercase tracking-[0.2em] text-red-200/60">
                {story.alt}
              </figcaption>
            </figure>

            <div className="space-y-8 font-journal text-xl leading-relaxed text-red-50/90 md:text-2xl max-w-3xl">
              <p className="first-letter:text-7xl first-letter:font-bold first-letter:text-red-400 first-letter:mr-3 first-letter:float-left">
                {story.body}
              </p>

              <blockquote className="border-l-4 border-red-700 pl-6 text-3xl italic leading-snug text-red-100 py-4">
                &ldquo;{story.pull}&rdquo;
              </blockquote>

              <p className="text-red-100/80">
                The threads themselves are sacred — each fiber carries intention, each pattern holds
                memory. To wear the shawl is to carry the story of your people, woven into cloth
                that will pass from generation to generation. The loom is where past and future meet
                in the hands of present hands.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </article>
  );
}
