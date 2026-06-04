import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useSpring } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import taleLovers from "@/assets/tale-lovers.jpg";
import taleTiger from "@/assets/tale-tiger.jpg";
import taleLake from "@/assets/tale-lake.jpg";
import taleStone from "@/assets/tale-stone.jpg";
import taleFalcons from "@/assets/tale-falcons.jpg";
import taleEarth from "@/assets/tale-earth.jpg";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore — The Hills Around the Hearth" },
      {
        name: "description",
        content:
          "A living map of Kohima — the Heritage Hearth and the famous places around it, each carrying a Naga tale of its own.",
      },
    ],
  }),
  component: ExplorePage,
});

// Hotel anchor (Kohima)
const HOTEL = { lat: 25.6747, lng: 94.1086, label: "The Heritage Hearth" };

type Place = {
  key: string;
  name: string;
  distanceKm: number;
  lat: number;
  lng: number;
  img: string;
  blurb: string;
  story: string;
};

const PLACES: Place[] = [
  {
    key: "war-cemetery",
    name: "Kohima War Cemetery",
    distanceKm: 1.5,
    lat: 25.6701,
    lng: 94.1086,
    img: taleStone,
    blurb: "Terraced graves on Garrison Hill — the turning point of 1944.",
    story:
      "The elders say the hill itself remembers. When the great battle ended, an old woman climbed up at dawn to gather firewood and found the stones humming softly, as if grieving. To this day villagers leave a single white flower on the topmost terrace — for the dead of every side, who became neighbours under the same soil.",
  },
  {
    key: "kisama",
    name: "Kisama Heritage Village",
    distanceKm: 12,
    lat: 25.5808,
    lng: 94.0986,
    img: taleFalcons,
    blurb: "Open-air village of all the morungs — home of the Hornbill Festival.",
    story:
      "It is told that the first hornbill flew between the seventeen morungs and dropped a single feather at each gate. Where the feathers fell, the tribes built their houses, and where the feathers met in the centre, a fire was lit. That fire is the one rekindled here every December — a flame older than memory.",
  },
  {
    key: "khonoma",
    name: "Khonoma Green Village",
    distanceKm: 20,
    lat: 25.6489,
    lng: 93.9831,
    img: taleEarth,
    blurb: "Asia's first green village — terraced rice and ancestral stone gates.",
    story:
      "A long time ago the village agreed to lay down its hunting bows. The forest, they said, had grown thinner than its own grief. The next spring the alder trees came back on their own, the bees returned, and a barking deer was seen drinking from the village stream at dawn. The forest had heard the promise, and answered.",
  },
  {
    key: "dzukou",
    name: "Dzükou Valley",
    distanceKm: 30,
    lat: 25.5608,
    lng: 94.0356,
    img: taleLovers,
    blurb: "Valley of seasonal lilies between rolling green ridges.",
    story:
      "Two lovers were forbidden to meet. They climbed instead to the highest meadow and lay down side by side in the grass. By morning the wind had covered them with white lilies that no one had planted. Each year, when the lilies bloom across the whole valley, the elders smile and say — they are still talking.",
  },
  {
    key: "japfu",
    name: "Japfü Peak",
    distanceKm: 25,
    lat: 25.5333,
    lng: 94.0333,
    img: taleTiger,
    blurb: "Second-highest peak in Nagaland — home of the world's tallest rhododendron.",
    story:
      "On Japfü there is a tree so tall that the clouds rest on its shoulders. A tiger once climbed it to escape a hunter and refused to come down. The tree, pleased, agreed to keep him. On misty mornings hunters still bow before they pass — for the tiger, they say, is watching from a branch nobody can see.",
  },
  {
    key: "shilloi",
    name: "Shilloi Lake",
    distanceKm: 140,
    lat: 25.45,
    lng: 94.75,
    img: taleLake,
    blurb: "A foot-shaped lake in the southern hills — sacred and untouched.",
    story:
      "A heavenly child once descended to bathe in these hills. When called home he leapt back to the sky, and the print of his foot filled with water. No one drinks from that lake, no one fishes there — the fish belong to the child. Some nights villagers swear they still hear him laughing under the surface.",
  },
];

function osmEmbed(lat: number, lng: number, zoomDelta = 0.12) {
  const left = lng - zoomDelta;
  const right = lng + zoomDelta;
  const top = lat + zoomDelta * 0.7;
  const bottom = lat - zoomDelta * 0.7;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${left}%2C${bottom}%2C${right}%2C${top}&layer=mapnik&marker=${lat}%2C${lng}`;
}

function ExplorePage() {
  const [focused, setFocused] = useState<Place | null>(null);
  const center = focused ?? { lat: HOTEL.lat, lng: HOTEL.lng };
  const zoom = focused ? 0.005 : 0.5;

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

  // Dynamically create the sweeping desktop path so it perfectly aligns with the images
  const desktopPath = useMemo(() => {
    const itemsCount = PLACES.length;
    const yStep = 100 / itemsCount;
    const round = (n: number) => Math.round(n * 100) / 100;
    let path = `M 21 2 L 21 ${round(0.5 * yStep)}`;
    for (let i = 0; i < itemsCount - 1; i++) {
      const isLeft = i % 2 === 0;
      const startX = isLeft ? 21 : 79;
      const endX = isLeft ? 79 : 21;
      const crossY = round((i + 1) * yStep);
      const endY = round((i + 1.5) * yStep);
      path += ` C ${startX} ${crossY}, ${endX} ${crossY}, ${endX} ${endY}`;
    }
    path += ` L ${itemsCount % 2 === 0 ? 79 : 21} 98`;
    return path;
  }, []);

  return (
    <section className="relative px-6 py-24 md:px-16">
      <div className="mx-auto max-w-6xl">
        <p
          className="font-journal text-xs uppercase tracking-[0.45em]"
          style={{ color: "var(--naga)" }}
        >
          Folio · Explore
        </p>
        <h1
          className="mt-4 font-journal text-5xl leading-[1.05] md:text-7xl"
          style={{ color: "var(--naga-deep)" }}
        >
          The Hills Around the Hearth.
        </h1>
        <p className="mt-6 max-w-2xl font-journal text-lg italic text-foreground/80">
          Our hearth sits on a ridge above Kohima. Around us — graves that turned a war, valleys
          that bloom once a year, villages that taught the forest to forgive. Each place keeps its
          own tale.
        </p>

        {/* MAP — WW2 field-map styling with modern detail */}
        <div
          className="mt-12 overflow-hidden rounded-sm border-2 vellum-card"
          style={{
            borderColor: "oklch(0.32 0.05 50)",
            background: "linear-gradient(135deg, oklch(0.86 0.06 75) 0%, oklch(0.78 0.07 60) 100%)",
            boxShadow:
              "0 0 0 6px oklch(0.86 0.06 75), 0 0 0 7px oklch(0.32 0.05 50), 0 24px 60px -20px oklch(0.18 0.05 30 / 0.55)",
          }}
        >
          {/* Header strip — operations log */}
          <div
            className="flex flex-wrap items-center justify-between gap-3 border-b-2 px-4 py-2 font-journal text-[10px] uppercase tracking-[0.4em] md:px-6"
            style={{
              borderColor: "oklch(0.32 0.05 50)",
              color: "oklch(0.28 0.06 40)",
              background:
                "repeating-linear-gradient(90deg, transparent 0 14px, oklch(0.32 0.05 50 / 0.08) 14px 15px)",
            }}
          >
            <span>★ Operational Map · Naga Hills Sector</span>
            <span>Sheet 14 / Series IX · Scale 1 : 50,000</span>
            <span>Compiled · Kohima Field Office</span>
          </div>

          <div className="relative aspect-[16/10] w-full">
            <iframe
              key={`${center.lat},${center.lng},${zoom}`}
              title="Map of The Heritage Hearth and nearby places"
              src={osmEmbed(center.lat, center.lng, zoom)}
              className="absolute inset-0 h-full w-full"
              style={{
                filter:
                  "sepia(0.85) saturate(0.6) contrast(1.05) hue-rotate(-12deg) brightness(0.95)",
              }}
              loading="lazy"
            />

            {/* Parchment + grid + vignette overlay */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "repeating-linear-gradient(0deg, transparent 0 59px, oklch(0.28 0.06 40 / 0.18) 59px 60px), repeating-linear-gradient(90deg, transparent 0 59px, oklch(0.28 0.06 40 / 0.18) 59px 60px), radial-gradient(ellipse at center, transparent 55%, oklch(0.25 0.06 40 / 0.45) 100%)",
                mixBlendMode: "multiply",
              }}
            />
            {/* Paper grain */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                backgroundImage: "radial-gradient(oklch(0.28 0.06 40 / 0.4) 1px, transparent 1px)",
                backgroundSize: "3px 3px",
                mixBlendMode: "multiply",
              }}
            />

            {/* Compass rose (top-right) */}
            <svg
              aria-hidden
              viewBox="0 0 100 100"
              className="pointer-events-none absolute right-4 top-4 h-20 w-20 md:h-24 md:w-24"
              style={{ color: "oklch(0.25 0.06 40)" }}
            >
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="oklch(0.92 0.05 75 / 0.85)"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <circle
                cx="50"
                cy="50"
                r="30"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeDasharray="2 2"
              />
              <polygon points="50,12 56,50 50,46 44,50" fill="currentColor" />
              <polygon
                points="50,88 44,50 50,54 56,50"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
              />
              <text
                x="50"
                y="10"
                textAnchor="middle"
                fontSize="9"
                fontFamily="serif"
                fill="currentColor"
              >
                N
              </text>
              <text
                x="50"
                y="96"
                textAnchor="middle"
                fontSize="7"
                fontFamily="serif"
                fill="currentColor"
              >
                S
              </text>
              <text x="6" y="53" fontSize="7" fontFamily="serif" fill="currentColor">
                W
              </text>
              <text x="90" y="53" fontSize="7" fontFamily="serif" fill="currentColor">
                E
              </text>
            </svg>

            {/* Classified stamp (bottom-left) */}
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-5 left-5 rotate-[-8deg] border-2 px-3 py-1 font-journal text-[10px] uppercase tracking-[0.4em]"
              style={{
                borderColor: "oklch(0.45 0.18 30)",
                color: "oklch(0.45 0.18 30)",
                background: "oklch(0.92 0.05 75 / 0.5)",
              }}
            >
              ★ Restricted · For Guests
            </div>

            {/* Scale bar (bottom-right) */}
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-5 right-5 flex flex-col items-end gap-1 font-journal text-[9px] uppercase tracking-[0.3em]"
              style={{ color: "oklch(0.25 0.06 40)" }}
            >
              <div className="flex h-2 border" style={{ borderColor: "oklch(0.25 0.06 40)" }}>
                <span className="w-8" style={{ background: "oklch(0.25 0.06 40)" }} />
                <span className="w-8" />
                <span className="w-8" style={{ background: "oklch(0.25 0.06 40)" }} />
                <span className="w-8" />
              </div>
              <span>0 — 5 — 10 km</span>
            </div>
          </div>

          <div
            className="flex flex-wrap items-center gap-3 border-t-2 px-4 py-3 md:px-6"
            style={{
              borderColor: "oklch(0.32 0.05 50)",
              background: "oklch(0.88 0.05 70 / 0.6)",
            }}
          >
            <span className="font-journal text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Mark position
            </span>
            <button
              onClick={() => setFocused(null)}
              className={
                "rounded-sm border px-3 py-1 font-journal text-xs uppercase tracking-[0.25em] transition-colors " +
                (focused
                  ? "border-border/60 text-foreground/70 hover:text-foreground"
                  : "border-naga")
              }
              style={!focused ? { color: "var(--naga)", borderColor: "var(--naga)" } : undefined}
            >
              ★ HQ · The Hearth
            </button>
            {PLACES.map((p) => {
              const active = focused?.key === p.key;
              return (
                <button
                  key={p.key}
                  onClick={() => setFocused(p)}
                  className={
                    "rounded-sm border px-3 py-1 font-journal text-xs uppercase tracking-[0.25em] transition-colors " +
                    (active ? "" : "border-border/60 text-foreground/70 hover:text-foreground")
                  }
                  style={active ? { color: "var(--naga)", borderColor: "var(--naga)" } : undefined}
                >
                  {p.name} · {p.distanceKm}km
                </button>
              );
            })}
            <a
              href={
                focused
                  ? `https://www.openstreetmap.org/directions?engine=graphhopper_car&route=${HOTEL.lat}%2C${HOTEL.lng}%3B${focused.lat}%2C${focused.lng}`
                  : `https://www.openstreetmap.org/?mlat=${center.lat}&mlon=${center.lng}#map=12/${center.lat}/${center.lng}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto font-journal text-xs uppercase tracking-[0.3em]"
              style={{ color: "var(--naga)" }}
            >
              {focused ? "Get directions ↗" : "Open in field map ↗"}
            </a>
          </div>
        </div>

        {/* PLACES + STORIES */}
        <div ref={containerRef} className="relative mt-20 pb-20">
          {/* Animated SVG Explorer's Trail - Mobile */}
          <div className="pointer-events-none absolute bottom-0 left-[22px] top-0 z-0 w-8 md:hidden">
            <svg
              className="h-full w-full overflow-visible"
              preserveAspectRatio="none"
              viewBox="0 0 10 100"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {/* Faded Background Trail */}
              <path
                d="M 5 0 C 25 15, -15 35, 5 50 C 25 65, -15 85, 5 100"
                stroke="var(--border)"
                vectorEffect="non-scaling-stroke"
                strokeDasharray="4 4"
              />
              {/* Ink Drawn Trail */}
              <motion.path
                d="M 5 0 C 25 15, -15 35, 5 50 C 25 65, -15 85, 5 100"
                stroke="var(--naga)"
                vectorEffect="non-scaling-stroke"
                style={{ pathLength }}
              />
            </svg>
          </div>

          {/* Animated SVG Explorer's Trail - Desktop */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 top-0 z-0 hidden md:block">
            <svg
              className="h-full w-full overflow-visible"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {/* Faded Background Trail */}
              <path
                d={desktopPath}
                stroke="var(--border)"
                vectorEffect="non-scaling-stroke"
                strokeDasharray="4 4"
              />
              {/* Ink Drawn Trail */}
              <motion.path
                d={desktopPath}
                stroke="var(--naga)"
                vectorEffect="non-scaling-stroke"
                style={{ pathLength }}
              />
            </svg>
          </div>

          <ol className="relative z-10 space-y-28 md:space-y-32">
            {PLACES.map((p, i) => (
              <motion.li
                key={p.key}
                id={p.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={
                  "grid items-center gap-10 md:grid-cols-12 md:gap-16 " +
                  (i % 2 === 1 ? "md:[&>figure]:order-2" : "")
                }
              >
                <figure className="md:col-span-5 overflow-hidden rounded-sm border border-border/60 bg-background/50 pl-16 md:pl-0">
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    width={768}
                    height={768}
                    className="h-full w-full object-cover transition-transform duration-[1.6s] ease-out hover:scale-[1.04]"
                    style={{ aspectRatio: "1 / 1" }}
                  />
                </figure>
                <div className="md:col-span-7 pl-16 md:pl-0">
                  <p
                    className="font-journal text-xs uppercase tracking-[0.4em]"
                    style={{ color: "var(--naga)" }}
                  >
                    Place No. {String(i + 1).padStart(2, "0")} · {p.distanceKm} km from the hearth
                  </p>
                  <h2
                    className="mt-3 font-journal text-3xl md:text-4xl"
                    style={{ color: "var(--naga-deep)" }}
                  >
                    {p.name}
                  </h2>
                  <p className="mt-2 font-journal text-sm italic text-foreground/60">{p.blurb}</p>
                  <p className="mt-5 font-journal text-base italic leading-relaxed text-foreground/85">
                    {p.story}
                  </p>
                  <button
                    onClick={() => {
                      setFocused(p);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="mt-5 font-journal text-xs uppercase tracking-[0.3em] hover:opacity-80"
                    style={{ color: "var(--naga)" }}
                  >
                    Show on map ↑
                  </button>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        <div className="mt-24 vellum-card flex max-w-md items-center justify-between rounded-sm p-5">
          <span className="font-journal text-xs uppercase tracking-[0.35em] text-muted-foreground">
            Next chapter
          </span>
          <Link
            to="/the-hearth"
            className="font-journal text-base uppercase tracking-[0.25em]"
            style={{ color: "var(--naga)" }}
          >
            The Hearth →
          </Link>
        </div>
      </div>
    </section>
  );
}
