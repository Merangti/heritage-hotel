import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import japfu from "@/assets/story-japfu.jpg";
import konyak from "@/assets/story-konyak.jpg";
import morung from "@/assets/story-morung.jpg";
import textile from "@/assets/story-textile.jpg";
import falcons from "@/assets/story-falcons.jpg";

export const Route = createFileRoute("/stories")({
  head: () => ({
    meta: [
      { title: "Stories of the Hills — The Heritage Hearth" },
      {
        name: "description",
        content:
          "Five stories from Nagaland: Japfü's mist, the Konyak elders, the morung fire, the red weave, and the falcons of Wokha.",
      },
      { property: "og:title", content: "Stories of the Hills" },
      {
        property: "og:description",
        content:
          "Five stories from Nagaland — Japfü, the Konyak, the morung, the weave, the falcons.",
      },
    ],
  }),
  component: StoriesPage,
});

export type Story = {
  id: string;
  folio: string;
  place: string;
  title: string;
  body: string;
  pull: string;
  image: string;
  alt: string;
  align: "left" | "right";
  aspect: "tall" | "wide";
};

export const STORIES: Story[] = [
  {
    id: "japfu",
    folio: "Folio I",
    place: "Kohima · Japfü",
    title: "The mountain that breathes a sea.",
    body: "Before sunrise the valley fills with cloud. From the ridge of Japfü — second highest peak in Nagaland — only the dark crowns of the hills remain, islands in a slow white tide. The Angami say the mountain is breathing; that the mist is the memory of every fire ever lit at its foot, returned each morning to be counted.",
    pull: "An island in a slow white tide.",
    image: japfu,
    alt: "Japfü Peak in Nagaland at dawn, mist filling the valley below",
    align: "right",
    aspect: "tall",
  },
  {
    id: "konyak",
    folio: "Folio II",
    place: "Mon · Longwa",
    title: "The last of the marked men.",
    body: "The Konyak elders of Mon wear their history on their faces — geometric tattoos earned in a time when valor was carved into the skin. Today only a handful remain, the last living witnesses to the headhunter age. They speak softly of the old code: of brass, of feather, of the hornbill whose beak tops every warrior's crown.",
    pull: "Valor carved into the skin.",
    image: konyak,
    alt: "Elder Konyak Naga tribesman with traditional facial tattoos and hornbill headdress",
    align: "left",
    aspect: "tall",
  },
  {
    id: "morung",
    folio: "Folio III",
    place: "Kohima · The Morung",
    title: "A fire that never learns to die.",
    body: "At the centre of every traditional Naga village stood a morung — a longhouse where boys learned to be men, where stories were taught between the carved beams, and where a fire was kept burning without pause. We built our hearth around this idea. Sit close. The smoke remembers your name once you have given it.",
    pull: "The smoke remembers your name.",
    image: morung,
    alt: "Interior of a traditional Naga morung longhouse with central fire",
    align: "right",
    aspect: "wide",
  },
  {
    id: "the-weave",
    folio: "Folio IV",
    place: "All Hills · The Weave",
    title: "Red is the colour of the kept.",
    body: "Every Naga tribe has a shawl, and every shawl is a sentence. Diamonds for harvest, zigzag for the rivers crossed, cowrie shells stitched in for the seas the wearer's ancestors never saw but always imagined. Red runs through them like the thread of remembrance — the colour of the kept.",
    pull: "Every shawl is a sentence.",
    image: textile,
    alt: "Hand-woven Naga textile in deep red and black with cowrie shells",
    align: "left",
    aspect: "tall",
  },
  {
    id: "the-falcons",
    folio: "Folio V",
    place: "Wokha · Doyang",
    title: "The longest journey, made by the smallest wing.",
    body: "Each November, a million Amur falcons descend on the Doyang reservoir in Wokha. They have come from Siberia and they will leave for southern Africa — the longest oceanic crossing of any raptor on earth. Once hunted in their thousands, the falcons are now protected by the very villages that used to take them. The hills have learned to count again.",
    pull: "A million wings, one quiet count.",
    image: falcons,
    alt: "Amur falcons in flight at sunset over the hills of Wokha, Nagaland",
    align: "right",
    aspect: "wide",
  },
];

function StoryCard({ story, idx }: { story: Story; idx: number }) {
  const imgRight = story.align === "right";
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
      className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-14"
    >
      {/* Image */}
      <div
        className={
          "relative md:col-span-7 " + (imgRight ? "md:order-2 md:col-start-6" : "md:order-1")
        }
      >
        <div className="absolute -inset-3 -z-10 rounded-sm bg-parchment/60 shadow-[0_30px_60px_-30px_oklch(0.2_0.05_30/0.5)]" />
        <div className="overflow-hidden rounded-sm">
          <img
            src={story.image}
            alt={story.alt}
            loading="lazy"
            width={story.aspect === "tall" ? 1080 : 1920}
            height={story.aspect === "tall" ? 1600 : 1080}
            className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out hover:scale-[1.03]"
            style={{ aspectRatio: story.aspect === "tall" ? "3 / 4" : "16 / 9" }}
          />
        </div>
        {/* Margin annotation */}
        <div
          className={
            "mt-3 flex items-center gap-3 font-journal text-[11px] uppercase tracking-[0.35em] text-muted-foreground " +
            (imgRight ? "md:justify-end" : "")
          }
        >
          <span className="h-px w-8 bg-current" />
          Plate {String(idx + 1).padStart(2, "0")} · {story.place}
        </div>
      </div>

      {/* Text */}
      <div
        className={
          "md:col-span-5 " +
          (imgRight ? "md:order-1 md:col-start-1 md:pr-4" : "md:order-2 md:col-start-8 md:pl-4")
        }
      >
        <p
          className="font-journal text-[11px] uppercase tracking-[0.45em]"
          style={{ color: "var(--naga)" }}
        >
          {story.folio} · {story.place}
        </p>
        <h2
          className="mt-4 font-journal text-4xl leading-[1.05] md:text-5xl"
          style={{ color: "var(--naga-deep)" }}
        >
          {story.title}
        </h2>
        <p className="mt-6 font-journal text-lg italic leading-relaxed text-foreground/85">
          {story.body}
        </p>
        <blockquote
          className="mt-8 border-l-2 pl-5 font-journal text-2xl italic leading-snug"
          style={{ borderColor: "var(--brass)", color: "var(--naga-deep)" }}
        >
          &ldquo;{story.pull}&rdquo;
        </blockquote>
        <div className="mt-8">
          <Button asChild variant="outline" className="font-journal uppercase tracking-[0.2em]">
            <Link to="/stories/$storyId" params={{ storyId: story.id }}>
              View Full Story
            </Link>
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

function StoriesPage() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  if (pathname !== "/stories") {
    return <Outlet />;
  }

  return (
    <section className="relative px-6 py-16 md:px-16 md:py-24">
      {/* Header */}
      <header className="mx-auto mb-20 max-w-5xl text-center md:mb-32">
        <p
          className="font-journal text-xs uppercase tracking-[0.5em]"
          style={{ color: "var(--naga)" }}
        >
          The Heritage Journal · Volume I
        </p>
        <h1
          className="mt-5 font-journal text-5xl leading-[0.95] md:text-7xl"
          style={{ color: "var(--naga-deep)" }}
        >
          Stories of the Hills.
        </h1>
        <p className="mx-auto mt-6 max-w-xl font-journal text-lg italic text-foreground/75">
          Five plates from a longer book — gathered from the morung fires, the elders of Mon, the
          weavers of the Angami, and the falcons that cross an ocean each November.
        </p>
        <div className="mt-10 flex items-center justify-center gap-3 font-journal text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
          <span className="h-px w-10 bg-current" />
          Five folios
          <span className="h-px w-10 bg-current" />
        </div>
      </header>

      {/* Stories */}
      <div className="mx-auto flex max-w-6xl flex-col gap-28 md:gap-40">
        {STORIES.map((s, i) => (
          <StoryCard key={s.title} story={s} idx={i} />
        ))}
      </div>

      {/* Closing */}
      <footer className="mx-auto mt-32 max-w-2xl text-center">
        <p className="font-journal text-xs uppercase tracking-[0.45em] text-muted-foreground">
          End of Volume I
        </p>
        <p className="mt-4 font-journal text-2xl italic" style={{ color: "var(--naga-deep)" }}>
          The journal continues by firelight.
        </p>
      </footer>
    </section>
  );
}
