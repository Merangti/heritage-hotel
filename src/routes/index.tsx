import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { r3f } from "@/components/canvas/tunnel";
import { JapfuMistScene } from "@/components/canvas/JapfuMist";
import { Link } from "@tanstack/react-router";
import storyJapfu from "@/assets/story-japfu.jpg";
import storyKonyak from "@/assets/story-konyak.jpg";
import storyMorung from "@/assets/story-morung.jpg";
import storyFalcons from "@/assets/story-falcons.jpg";
import hotelFacade from "@/assets/hotel-facade.jpg";
import hotelHearthRoom from "@/assets/hotel-hearth-room.jpg";
import hotelLoft from "@/assets/hotel-loft.jpg";
import hotelAerial from "@/assets/hotel-aerial.jpg";
import { CinematicHeading } from "@/components/CinematicHeading";
import { ParallaxImage } from "@/components/ParallaxImage";
import { motion, useScroll, useTransform } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Entrance — The Heritage Hearth, Kohima" },
      {
        name: "description",
        content: "Step into Nagaland through mist, memory, and the silhouette of Japfü Peak.",
      },
      { property: "og:title", content: "The Entrance — The Heritage Hearth" },
      { property: "og:description", content: "A living heritage journal of Nagaland." },
    ],
  }),
  component: Entrance,
});

function SmokeHeading({ text, className = "" }: { text: string; className?: string }) {
  const wrap = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const chars = el.querySelectorAll<HTMLSpanElement>("[data-char]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        { y: 0, opacity: 1, filter: "blur(0px)", rotateZ: 0 },
        {
          y: -60,
          opacity: 0,
          filter: "blur(14px)",
          rotateZ: () => gsap.utils.random(-25, 25),
          x: () => gsap.utils.random(-40, 40),
          stagger: { each: 0.012, from: "random" },
          ease: "power2.in",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "+=500",
            scrub: 0.6,
          },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <h1
      ref={wrap}
      className={
        "font-journal text-[clamp(3rem,9vw,8rem)] font-medium leading-[0.95] tracking-tight transition-colors duration-700 " +
        className
      }
    >
      {text.split(" ").map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {Array.from(word).map((c, ci) => (
            <span key={ci} data-char className="inline-block will-change-transform">
              {c}
            </span>
          ))}
          {wi < text.split(" ").length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </h1>
  );
}

const HOTEL_SLIDES = [
  { src: hotelFacade, caption: "The Facade · lantern hour" },
  { src: hotelAerial, caption: "The Ridge · dawn drone" },
  { src: hotelHearthRoom, caption: "The Hearth Room · ember light" },
  { src: hotelLoft, caption: "The Loft · pine-mist morning" },
];

const HOTEL_SLIDE_TONES = ["light", "dark", "light", "light"] as const;

function HotelCarousel({ activeIndex }: { activeIndex: number }) {
  const needsLightText = HOTEL_SLIDE_TONES[activeIndex] === "light";

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-0 overflow-hidden"
      style={{ perspective: "1600px" }}
    >
      {/* sepia veil so type stays legible */}
      <div
        className="absolute inset-0 z-20"
        style={{
          background: needsLightText
            ? "linear-gradient(90deg, oklch(0.13 0.04 30 / 0.76) 0%, oklch(0.13 0.04 30 / 0.48) 44%, oklch(0.13 0.04 30 / 0.18) 100%)"
            : "linear-gradient(90deg, oklch(0.96 0.04 75 / 0.82) 0%, oklch(0.96 0.04 75 / 0.56) 44%, oklch(0.96 0.04 75 / 0.16) 100%)",
        }}
      />
      {HOTEL_SLIDES.map((s, i) => {
        const total = HOTEL_SLIDES.length;
        const cycle = total * 6; // seconds per slide × slides
        const delay = -(i * 6);
        return (
          <div
            key={s.src}
            className="absolute inset-0"
            style={{
              animation: `hotelSwipe ${cycle}s linear ${delay}s infinite`,
              transformStyle: "preserve-3d",
            }}
          >
            <img
              src={s.src}
              alt=""
              loading={i === 0 ? "eager" : "lazy"}
              className="h-full w-full object-cover"
              style={{ filter: "sepia(0.25) contrast(1.02) brightness(0.85)" }}
            />
            <div className="absolute bottom-6 right-6 z-30 font-journal text-[10px] uppercase tracking-[0.4em] text-[oklch(0.95_0.03_75)]">
              {s.caption}
            </div>
          </div>
        );
      })}
      <style>{`
        @keyframes hotelSwipe {
          0%   { opacity: 0; transform: translateX(8%) rotate(1.2deg) scale(1.05); }
          4%   { opacity: 1; transform: translateX(0) rotate(0deg) scale(1.04); }
          21%  { opacity: 1; transform: translateX(-2%) rotate(-0.4deg) scale(1.06); }
          25%  { opacity: 0; transform: translateX(-8%) rotate(-1.2deg) scale(1.05); }
          100% { opacity: 0; transform: translateX(-8%) rotate(-1.2deg) scale(1.05); }
        }
      `}</style>
    </div>
  );
}

function Entrance() {
  const reveal = useRef<HTMLDivElement>(null);
  const top = useRef<HTMLDivElement>(null);
  const bot = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const needsLightHeroText = HOTEL_SLIDE_TONES[activeSlide] === "light";
  const heroTextColor = needsLightHeroText
    ? "text-[oklch(0.96_0.03_75)]"
    : "text-[var(--naga-deep)]";
  const heroMutedColor = needsLightHeroText
    ? "text-[oklch(0.9_0.035_75/0.86)]"
    : "text-foreground/80";
  const heroAccentColor = needsLightHeroText ? "oklch(0.88 0.1 75)" : "var(--naga)";

  const { scrollY } = useScroll();
  const heroBlur = useTransform(scrollY, [0, 500], ["blur(0px)", "blur(12px)"]);

  useEffect(() => {
    if (!reveal.current || !top.current || !bot.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: reveal.current,
          start: "top bottom",
          end: "top top",
          scrub: 0.8,
        },
      });
      tl.to(top.current, { yPercent: -100, ease: "none" }, 0);
      tl.to(bot.current, { yPercent: 100, ease: "none" }, 0);
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % HOTEL_SLIDES.length);
    }, 6000);

    return () => window.clearInterval(id);
  }, []);

  return (
    <>
      {/* Per-route 3D content piped into persistent canvas */}
      <r3f.In>
        <JapfuMistScene />
      </r3f.In>

      {/* HERO — sits over the 3D mist, with an auto-rotating hotel carousel behind */}
      <section className="relative flex min-h-[90vh] flex-col justify-end overflow-hidden px-8 pb-24 md:px-16">
        <motion.div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden" style={{ filter: heroBlur }}>
          <HotelCarousel activeIndex={activeSlide} />
        </motion.div>
        <div className="relative z-10 max-w-5xl">
          <p
            className="mb-6 font-journal text-xs uppercase tracking-[0.45em] transition-colors duration-700"
            style={{ color: heroAccentColor }}
          >
            Volume I · Kohima · The Naga Hills
          </p>
          <SmokeHeading text="Where the mist remembers." className={heroTextColor} />
          <p
            className={
              "mt-8 max-w-xl font-journal text-lg italic transition-colors duration-700 " +
              heroMutedColor
            }
          >
            A heritage hearth at the foot of Japfü Peak — a journal kept in firelight, woven cloth,
            and the slow drum of the hills.
          </p>
        </div>

        <div
          className={
            "relative z-10 mt-16 flex items-center gap-4 font-journal text-xs uppercase tracking-[0.3em] transition-colors duration-700 " +
            heroMutedColor
          }
        >
          <span className="h-px w-10 bg-current" />
          Scroll to turn the page
        </div>
      </section>

      {/* THE HOUSE — hotel from different angles */}
      <section className="relative px-8 py-32 md:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p
                className="font-journal text-xs uppercase tracking-[0.45em]"
                style={{ color: "var(--naga)" }}
              >
                Folio · The House
              </p>
              <CinematicHeading
                className="mt-3 font-journal text-4xl md:text-5xl"
                style={{ color: "var(--naga-deep)" }}
                text="The hearth, from every side."
              />
              <p className="mt-4 max-w-xl font-journal italic text-foreground/75">
                Photographed at dawn, dusk and lantern-hour — the lodge as it stands on the ridge
                above Kohima.
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-12 gap-4 md:gap-6">
            <Link
              to="/listings/$listingId"
              params={{ listingId: "ridge-dawn-table" }}
              className="group relative col-span-12 overflow-hidden rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brass)] md:col-span-6 md:row-span-2"
              aria-label="View booking page for The Ridge dawn table"
            >
              <figure className="h-full">
                <img
                  src={hotelAerial}
                  alt="Aerial view of the lodge on the ridge"
                  loading="lazy"
                  width={1280}
                  height={1600}
                  className="h-full w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-[1.04]"
                  style={{ aspectRatio: "4 / 5" }}
                />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[oklch(0.18_0.04_30/0.85)] via-[oklch(0.18_0.04_30/0.4)] to-transparent p-4 font-journal text-xs uppercase tracking-[0.3em] text-[oklch(0.95_0.03_75)]">
                  The Ridge · dawn drone
                </figcaption>
              </figure>
            </Link>
            <Link
              to="/listings/$listingId"
              params={{ listingId: "hearth-room-dining" }}
              className="group relative col-span-6 overflow-hidden rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brass)]"
              aria-label="View booking page for The Hearth Room dining"
            >
              <figure className="h-full">
                <img
                  src={hotelHearthRoom}
                  alt="The central hearth room interior"
                  loading="lazy"
                  width={1280}
                  height={960}
                  className="h-full w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-[1.04]"
                  style={{ aspectRatio: "4 / 3" }}
                />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[oklch(0.18_0.04_30/0.85)] via-[oklch(0.18_0.04_30/0.4)] to-transparent p-4 font-journal text-xs uppercase tracking-[0.3em] text-[oklch(0.95_0.03_75)]">
                  The Hearth Room · ember light
                </figcaption>
              </figure>
            </Link>
            <Link
              to="/listings/$listingId"
              params={{ listingId: "the-smokehouse-terrace" }}
              className="group relative col-span-6 overflow-hidden rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brass)]"
              aria-label="View booking page for The Smokehouse Terrace"
            >
              <figure className="h-full">
                <img
                  src={hotelFacade}
                  alt="The Smokehouse Terrace"
                  loading="lazy"
                  width={1280}
                  height={960}
                  className="h-full w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-[1.04]"
                  style={{ aspectRatio: "4 / 3" }}
                />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[oklch(0.18_0.04_30/0.85)] via-[oklch(0.18_0.04_30/0.4)] to-transparent p-4 font-journal text-xs uppercase tracking-[0.3em] text-[oklch(0.95_0.03_75)]">
                  The Smokehouse Terrace
                </figcaption>
              </figure>
            </Link>
            <Link
              to="/listings/$listingId"
              params={{ listingId: "hill-foragers-table" }}
              className="group relative col-span-6 overflow-hidden rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brass)]"
              aria-label="View booking page for Hill Forager's Table"
            >
              <figure className="h-full">
                <img
                  src={hotelLoft}
                  alt="Hill Forager's Table"
                  loading="lazy"
                  width={1280}
                  height={960}
                  className="h-full w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-[1.04]"
                  style={{ aspectRatio: "4 / 3" }}
                />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[oklch(0.18_0.04_30/0.85)] via-[oklch(0.18_0.04_30/0.4)] to-transparent p-4 font-journal text-xs uppercase tracking-[0.3em] text-[oklch(0.95_0.03_75)]">
                  Hill Forager's Table
                </figcaption>
              </figure>
            </Link>
            <Link
              to="/listings/$listingId"
              params={{ listingId: "morning-kettle-nook" }}
              className="group relative col-span-6 overflow-hidden rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brass)]"
              aria-label="View booking page for Morning Kettle Nook"
            >
              <figure className="h-full">
                <img
                  src={hotelAerial}
                  alt="Morning Kettle Nook"
                  loading="lazy"
                  width={1280}
                  height={960}
                  className="h-full w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-[1.04]"
                  style={{ aspectRatio: "4 / 3" }}
                />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[oklch(0.18_0.04_30/0.85)] via-[oklch(0.18_0.04_30/0.4)] to-transparent p-4 font-journal text-xs uppercase tracking-[0.3em] text-[oklch(0.95_0.03_75)]">
                  Morning Kettle Nook
                </figcaption>
              </figure>
            </Link>
          </div>
        </div>
      </section>

      <section ref={reveal} className="relative isolate min-h-[140vh]">
        <div
          ref={top}
          className="pointer-events-none sticky top-0 z-20 h-[50vh] w-full"
          style={{
            background: "linear-gradient(180deg, oklch(0.93 0.04 70) 0%, oklch(0.86 0.05 60) 100%)",
            boxShadow: "0 18px 40px -12px oklch(0.2 0.05 30 / 0.4)",
          }}
        />
        <div
          ref={bot}
          className="pointer-events-none absolute bottom-0 left-0 z-20 h-[50vh] w-full"
          style={{
            background: "linear-gradient(0deg, oklch(0.91 0.04 65) 0%, oklch(0.84 0.05 55) 100%)",
            boxShadow: "0 -18px 40px -12px oklch(0.2 0.05 30 / 0.4)",
          }}
        />

        {/* Journal content beneath */}
        <div className="absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 px-8 md:px-16">
          <div className="vellum-card mx-auto max-w-3xl rounded-sm p-10 md:p-14">
            <p className="font-journal text-xs uppercase tracking-[0.4em] text-muted-foreground">
              Folio I · The Hearth
            </p>
            <CinematicHeading
              className="mt-4 font-journal text-4xl leading-tight md:text-6xl"
              style={{ color: "var(--naga-deep)" }}
              text="An ember kept since the first ridgeline."
            />
            <p className="mt-6 max-w-2xl font-journal text-lg italic text-foreground/80">
              The Heritage Hearth is not a hotel. It is a morung re-built for travellers — sleeping
              lofts above a central fire, a log drum at the entrance, and a chart of the hills
              carved into its eastern wall. Stay a night. Read a chapter.
            </p>
          </div>
        </div>
      </section>

      {/* JOURNAL OPENING */}
      <section className="relative px-8 py-32 md:px-16">
        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-12">
          <aside className="md:col-span-4">
            <p
              className="font-journal text-xs uppercase tracking-[0.4em] text-naga"
              style={{ color: "var(--naga)" }}
            >
              Folio II
            </p>
            <CinematicHeading 
              className="mt-4 font-journal text-3xl" 
              text="The Four Chapters" 
            />
            <p className="mt-3 text-sm text-muted-foreground">
              Each room of this house opens onto a region of the hills.
            </p>
          </aside>
          <div className="md:col-span-8">
            <ul className="divide-y divide-border/60">
              {[
                ["Kohima", "The legend of Japfü, and the WWII ridge."],
                ["Mon", "Konyak headhunter heritage, the split-house at Longwa."],
                ["Wokha", "The autumn migration of Amur falcons."],
                ["Phek", "Shilloi — a sacred lake shaped like a footprint."],
              ].map(([place, line]) => (
                <li key={place} className="flex items-baseline justify-between gap-6 py-5">
                  <span className="font-journal text-2xl" style={{ color: "var(--naga-deep)" }}>
                    {place}
                  </span>
                  <span className="font-journal text-base italic text-foreground/75">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* STORIES STRIP */}
      <section className="relative px-8 py-32 md:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p
                className="font-journal text-xs uppercase tracking-[0.45em]"
                style={{ color: "var(--naga)" }}
              >
                Folio III · Stories of the hills
              </p>
              <CinematicHeading
                className="mt-3 font-journal text-4xl md:text-5xl"
                style={{ color: "var(--naga-deep)" }}
                text="Plates from the journal."
              />
            </div>
            <Link
              to="/stories"
              className="hidden font-journal text-xs uppercase tracking-[0.35em] hover:opacity-70 md:inline-block"
              style={{ color: "var(--naga)" }}
            >
              Read all five →
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-12 gap-4 md:gap-6">
            {[
              {
                src: storyJapfu,
                to: "/stories/japfu",
                span: "col-span-7 row-span-2",
                aspect: "3 / 4",
                caption: "Japfü · the breathing peak",
                alt: "Japfü Peak in Nagaland at dawn",
              },
              {
                src: storyKonyak,
                to: "/stories/konyak",
                span: "col-span-5",
                aspect: "4 / 3",
                caption: "Mon · the marked elders",
                alt: "Konyak Naga elder portrait",
              },
              {
                src: storyFalcons,
                to: "/stories/the-falcons",
                span: "col-span-5",
                aspect: "4 / 3",
                caption: "Wokha · a million wings",
                alt: "Amur falcons in flight at sunset",
              },
              {
                src: storyMorung,
                to: "/stories/morung",
                span: "col-span-12",
                aspect: "21 / 9",
                caption: "Kohima · a fire that never learns to die",
                alt: "Interior of a Naga morung with central fire",
              },
            ].map((p) => (
              <Link
                key={p.caption}
                to={p.to}
                className={
                  "group relative overflow-hidden rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brass)] " +
                  p.span
                }
                aria-label={`Read story: ${p.caption}`}
              >
                <figure className="h-full" style={{ aspectRatio: p.aspect }}>
                  <ParallaxImage
                    src={p.src}
                    alt={p.alt}
                    className="transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
                  />
                  <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[oklch(0.18_0.04_30/0.85)] via-[oklch(0.18_0.04_30/0.4)] to-transparent p-4 font-journal text-xs uppercase tracking-[0.3em] text-[oklch(0.95_0.03_75)]">
                    {p.caption}
                  </figcaption>
                </figure>
              </Link>
            ))}
          </div>

          <div className="mt-8 md:hidden">
            <Link
              to="/stories"
              className="font-journal text-xs uppercase tracking-[0.35em]"
              style={{ color: "var(--naga)" }}
            >
              Read all five →
            </Link>
          </div>
        </div>
      </section>

      {/* CLOSING MARK */}
      <section className="px-8 py-32 text-center md:px-16">
        <p className="font-journal text-xs uppercase tracking-[0.45em] text-muted-foreground">
          Continue the journey
        </p>
        <h3 className="mt-4 font-journal text-4xl md:text-5xl">
          Check <span style={{ color: "var(--naga)" }}>availability</span>.
        </h3>
        <p className="mx-auto mt-3 max-w-md font-journal italic text-foreground/70">
          See which lofts the hills have left for your dates.
        </p>
      </section>
    </>
  );
}
