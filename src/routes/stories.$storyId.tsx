import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { STORIES } from "./stories";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const Route = createFileRoute("/stories/$storyId")({
  loader: ({ params: { storyId } }) => {
    const story = STORIES.find((s) => s.id === storyId);
    if (!story) {
      throw notFound();
    }
    return story;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    return {
      meta: [
        { title: `${loaderData.title} — Stories of the Hills` },
        { name: "description", content: loaderData.body.substring(0, 160) },
      ],
    };
  },
  component: StoryDetailPage,
});

function StoryDetailPage() {
  const story = Route.useLoaderData();

  return (
    <article className="relative px-6 py-16 md:px-16 md:py-24 min-h-screen bg-background">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12">
          <Button
            asChild
            variant="ghost"
            className="font-journal uppercase tracking-widest text-muted-foreground hover:text-foreground"
          >
            <Link to="/stories">← Back to Stories</Link>
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <header className="mb-16 text-center">
            <p
              className="font-journal text-sm uppercase tracking-[0.5em]"
              style={{ color: "var(--naga)" }}
            >
              {story.folio} · {story.place}
            </p>
            <h1
              className="mt-6 font-journal text-5xl leading-[1.05] md:text-7xl"
              style={{ color: "var(--naga-deep)" }}
            >
              {story.title}
            </h1>
          </header>

          <figure className="mb-16 relative">
            <div className="absolute -inset-4 -z-10 rounded-sm bg-parchment/60 shadow-[0_30px_60px_-30px_oklch(0.2_0.05_30/0.5)]" />
            <img
              src={story.image}
              alt={story.alt}
              className="w-full rounded-sm object-cover shadow-lg"
              style={{ maxHeight: "70vh" }}
            />
            <figcaption className="mt-4 text-center font-journal text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {story.alt}
            </figcaption>
          </figure>

          <div className="prose prose-lg mx-auto max-w-2xl font-journal text-xl leading-relaxed text-foreground/90 md:text-2xl">
            <p className="first-letter:text-7xl first-letter:font-bold first-letter:text-[var(--naga-deep)] first-letter:mr-3 first-letter:float-left">
              {story.body}
            </p>

            <blockquote
              className="my-12 border-l-4 pl-6 font-journal text-3xl italic leading-snug"
              style={{ borderColor: "var(--brass)", color: "var(--naga-deep)" }}
            >
              &ldquo;{story.pull}&rdquo;
            </blockquote>

            <p>
              The hills hold countless such memories, woven into the very fabric of the landscape.
              To listen to them is to understand the heartbeat of the land, a rhythm maintained
              through generations of storytellers and the enduring spirit of the Naga people.
            </p>
          </div>
        </motion.div>
      </div>
    </article>
  );
}
