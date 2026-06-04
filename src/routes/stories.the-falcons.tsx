import { createFileRoute, Link } from "@tanstack/react-router";
import { STORIES } from "./stories";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const Route = createFileRoute("/stories/the-falcons")({
  head: () => {
    const story = STORIES.find((s) => s.id === "the-falcons");
    return {
      meta: [
        { title: `${story?.title} — Stories of the Hills` },
        { name: "description", content: story?.body.substring(0, 160) },
      ],
    };
  },
  component: TheFalconsStoryPage,
});

function TheFalconsStoryPage() {
  const story = STORIES.find((s) => s.id === "the-falcons")!;

  return (
    <article className="relative min-h-screen bg-gradient-to-b from-blue-950 via-slate-900 to-orange-950">
      {/* Sky gradient and flight pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-300 rounded-full"
            initial={{
              x: -100,
              y: 100 + i * 150,
            }}
            animate={{
              x: 1400,
              y: 100 + i * 150 + Math.sin(i) * 100,
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Sun glow */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-orange-600/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-slate-900/80 to-transparent" />

      <div className="relative z-10 px-6 py-16 md:px-16 md:py-24 min-h-screen flex flex-col justify-center">
        <div className="mx-auto max-w-4xl w-full">
          <div className="mb-12">
            <Button
              asChild
              variant="ghost"
              className="font-journal uppercase tracking-widest text-blue-100 hover:text-white"
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
              <p className="font-journal text-sm uppercase tracking-[0.5em] text-blue-400">
                {story.folio} · {story.place}
              </p>
              <h1 className="mt-6 font-journal text-5xl leading-[1.05] md:text-7xl text-blue-50">
                {story.title}
              </h1>
            </header>

            <figure className="my-12">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={story.image}
                  alt={story.alt}
                  className="w-full h-auto object-cover shadow-2xl"
                  style={{ maxHeight: "60vh" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-50" />
              </div>
              <figcaption className="mt-4 text-center font-journal text-xs uppercase tracking-[0.2em] text-blue-200/60">
                {story.alt}
              </figcaption>
            </figure>

            <div className="space-y-8 font-journal text-xl leading-relaxed text-blue-50/90 md:text-2xl max-w-3xl">
              <p className="first-letter:text-7xl first-letter:font-bold first-letter:text-orange-400 first-letter:mr-3 first-letter:float-left">
                {story.body}
              </p>

              <blockquote className="border-l-4 border-orange-600 pl-6 text-3xl italic leading-snug text-blue-100 py-4">
                &ldquo;{story.pull}&rdquo;
              </blockquote>

              <p className="text-blue-100/80">
                Their migration is one of the most remarkable journeys on earth — a testament to
                endurance, instinct, and the unbreakable connection between the sky and the land.
                The hills of Nagaland have become a sanctuary, a place where these ancient travelers
                find rest and refuge before continuing their eternal pilgrimage.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </article>
  );
}
