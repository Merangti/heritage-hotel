import { createFileRoute, Link } from "@tanstack/react-router";
import { STORIES } from "./stories";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const Route = createFileRoute("/stories/konyak")({
  head: () => {
    const story = STORIES.find((s) => s.id === "konyak");
    return {
      meta: [
        { title: `${story?.title} — Stories of the Hills` },
        { name: "description", content: story?.body.substring(0, 160) },
      ],
    };
  },
  component: KonyakStoryPage,
});

function KonyakStoryPage() {
  const story = STORIES.find((s) => s.id === "konyak")!;

  return (
    <article className="relative min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,.2)_25%,rgba(0,0,0,.2)_50%,transparent_50%,transparent_75%,rgba(0,0,0,.2)_75%,rgba(0,0,0,.2))] bg-[length:60px_60px]" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-900/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-amber-800/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 px-6 py-16 md:px-16 md:py-24 min-h-screen flex flex-col justify-center">
        <div className="mx-auto max-w-4xl w-full">
          <div className="mb-12">
            <Button
              asChild
              variant="ghost"
              className="font-journal uppercase tracking-widest text-amber-100 hover:text-white"
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
              <p className="font-journal text-sm uppercase tracking-[0.5em] text-amber-400">
                {story.folio} · {story.place}
              </p>
              <h1 className="mt-6 font-journal text-5xl leading-[1.05] md:text-7xl text-amber-50">
                {story.title}
              </h1>
            </header>

            <figure className="my-12">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={story.image}
                  alt={story.alt}
                  className="w-full h-auto object-cover shadow-2xl border border-amber-900/30"
                  style={{ maxHeight: "60vh" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-50" />
              </div>
              <figcaption className="mt-4 text-center font-journal text-xs uppercase tracking-[0.2em] text-amber-200/60">
                {story.alt}
              </figcaption>
            </figure>

            <div className="space-y-8 font-journal text-xl leading-relaxed text-amber-50/90 md:text-2xl max-w-3xl">
              <p className="first-letter:text-7xl first-letter:font-bold first-letter:text-amber-400 first-letter:mr-3 first-letter:float-left">
                {story.body}
              </p>

              <blockquote className="border-l-4 border-amber-600 pl-6 text-3xl italic leading-snug text-amber-100 py-4">
                &ldquo;{story.pull}&rdquo;
              </blockquote>

              <p className="text-amber-100/80">
                Each face tells a tale of the old ways, of honor earned through valor, and of a
                world where tradition was worn like a second skin. To meet their gaze is to connect
                across generations with the unbroken spirit of the Naga warrior.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </article>
  );
}
