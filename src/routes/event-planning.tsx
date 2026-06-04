import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/event-planning")({
  head: () => ({
    meta: [
      { title: "Event Planning — The Heritage Hearth" },
      {
        name: "description",
        content:
          "Host your weddings, conferences, and private gatherings at The Heritage Hearth in Kohima.",
      },
    ],
  }),
  component: EventPlanningPage,
});

const EVENTS = [
  {
    key: "weddings",
    name: "Weddings & Ceremonies",
    type: "Celebration",
    body: "Begin your shared chapter under the open sky or within our grand hall. Traditional Naga feasts, beautiful floral arrangements sourced from the valley, and a timeless setting for your most important day.",
    note: "Up to 200 guests · catering included",
  },
  {
    key: "conferences",
    name: "Conferences & Retreats",
    type: "Corporate",
    body: "Find clarity away from the noise. Our conference spaces are equipped with modern amenities but styled with heritage warmth. Perfect for executive retreats and team-building.",
    note: "Up to 50 guests · AV equipped · high-speed internet",
  },
  {
    key: "gatherings",
    name: "Private Gatherings",
    type: "Social",
    body: "From intimate anniversary dinners by the central fire to family reunions spanning multiple lofts. We craft bespoke experiences tailored to your group's unique story.",
    note: "Flexible capacity · custom menus",
  },
];

function EventPlanningPage() {
  return (
    <section className="relative px-6 py-24 md:px-16">
      <div className="mx-auto max-w-6xl">
        <p
          className="font-journal text-xs uppercase tracking-[0.45em]"
          style={{ color: "var(--naga)" }}
        >
          Folio · Event Planning
        </p>
        <h1
          className="mt-4 font-journal text-5xl leading-[1.05] md:text-7xl"
          style={{ color: "var(--naga-deep)" }}
        >
          Gather at the hearth.
        </h1>
        <p className="mt-6 max-w-2xl font-journal text-lg italic text-foreground/80">
          Whether you are celebrating a union, gathering your team, or hosting an intimate dinner,
          The Heritage Hearth provides a setting steeped in history and warmth.
        </p>

        <div className="mt-20 grid gap-16 md:grid-cols-3">
          {EVENTS.map((evt, i) => (
            <motion.article
              key={evt.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="vellum-card flex flex-col justify-between border border-border/60 bg-vellum/40 p-8 rounded-sm"
            >
              <div>
                <p
                  className="font-journal text-xs uppercase tracking-[0.4em]"
                  style={{ color: "var(--naga)" }}
                >
                  {evt.type}
                </p>
                <h2
                  className="mt-3 font-journal text-3xl"
                  style={{ color: "var(--naga-deep)" }}
                >
                  {evt.name}
                </h2>
                <p className="mt-4 font-journal text-base italic text-foreground/80 leading-relaxed">
                  {evt.body}
                </p>
              </div>
              <div className="mt-8 flex items-center gap-3 font-journal text-xs uppercase tracking-[0.3em] text-muted-foreground pt-6 border-t border-border/40">
                {evt.note}
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-24 border-t border-border/40 pt-16 text-center">
          <p className="font-journal text-lg text-muted-foreground">
            Ready to plan your event?
          </p>
          <a
            href="mailto:events@heritagehearth.com"
            className="mt-4 inline-block font-journal text-sm uppercase tracking-[0.3em] transition-colors hover:opacity-80"
            style={{ color: "var(--naga)" }}
          >
            events@heritagehearth.com →
          </a>
        </div>
      </div>
    </section>
  );
}
