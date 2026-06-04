import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import dishAxone from "@/assets/dish-axone.jpg";
import dishAnishi from "@/assets/dish-anishi.jpg";
import dishBamboo from "@/assets/dish-bamboo.jpg";
import dishBeans from "@/assets/dish-beans.jpg";

export const Route = createFileRoute("/the-hearth")({
  head: () => ({
    meta: [
      { title: "The Hearth — Naga Specials" },
      {
        name: "description",
        content:
          "Tribal Naga specials served around the central fire — axone, anishi, bamboo shoot, and kidney bean stews with smoked pork.",
      },
    ],
  }),
  component: HearthPage,
});

const DISHES = [
  {
    tribe: "Sumi",
    name: "Axone with Pork & Rice",
    body: "Fermented soybean (axone) slow-cooked with fatty pork belly, ginger and king chilli — ladled over hot sticky rice. The signature Sumi table.",
    img: dishAxone,
    note: "House special · served family-style",
  },
  {
    tribe: "Ao",
    name: "Smoked Pork with Anishi",
    body: "Hearth-smoked pork simmered with anishi — patties of fermented colocasia leaves — for an earthy, deeply umami stew the Ao keep on the fire all day.",
    img: dishAnishi,
    note: "Smoked over the morung fire",
  },
  {
    tribe: "Lotha",
    name: "Bamboo Shoot with Pork",
    body: "Tender bamboo shoot fermented in clay pots, cooked down with pork and a single Raja Mircha for a bright, sour-hot Lotha favourite.",
    img: dishBamboo,
    note: "Fermented seven days",
  },
  {
    tribe: "Naga House",
    name: "Kidney Beans with Pork",
    body: "Hill-grown red kidney beans braised with pork, garlic, and smoked salt — a warming bowl from the cold Kohima evenings.",
    img: dishBeans,
    note: "Slow-braised three hours",
  },
];

function HearthPage() {
  return (
    <section className="relative px-6 py-24 md:px-16">
      <div className="mx-auto max-w-6xl">
        <p
          className="font-journal text-xs uppercase tracking-[0.45em]"
          style={{ color: "var(--naga)" }}
        >
          Folio · The Hearth
        </p>
        <h1
          className="mt-4 font-journal text-5xl leading-[1.05] md:text-7xl"
          style={{ color: "var(--naga-deep)" }}
        >
          A central fire.
        </h1>
        <p className="mt-6 max-w-2xl font-journal text-lg italic text-foreground/80">
          The dining chapter. Smoked meats, axone, bamboo-shoot — served in courses around the
          morung's central fire. Four tribal specials, plated for the journal.
        </p>

        <div className="mt-20 space-y-24">
          {DISHES.map((d, i) => (
            <motion.article
              key={d.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className={
                "grid items-center gap-10 md:grid-cols-12 md:gap-14 " +
                (i % 2 === 1 ? "md:[&>figure]:order-2" : "")
              }
            >
              <figure className="md:col-span-7 overflow-hidden rounded-sm">
                <img
                  src={d.img}
                  alt={`${d.name} — ${d.tribe} Naga dish`}
                  loading="lazy"
                  width={1280}
                  height={960}
                  className="h-full w-full object-cover transition-transform duration-[1.6s] ease-out hover:scale-[1.03]"
                  style={{ aspectRatio: "4 / 3" }}
                />
              </figure>

              <div className="md:col-span-5">
                <p
                  className="font-journal text-xs uppercase tracking-[0.4em]"
                  style={{ color: "var(--naga)" }}
                >
                  {d.tribe} Tribe · No. {String(i + 1).padStart(2, "0")}
                </p>
                <h2
                  className="mt-3 font-journal text-3xl md:text-4xl"
                  style={{ color: "var(--naga-deep)" }}
                >
                  {d.name}
                </h2>
                <p className="mt-4 font-journal text-base italic text-foreground/80">{d.body}</p>
                <div className="mt-6 flex items-center gap-3 font-journal text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  <span className="h-px w-8 bg-current" />
                  {d.note}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-28 border-t border-border/60 pt-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p
                className="font-journal text-xs uppercase tracking-[0.45em]"
                style={{ color: "var(--naga)" }}
              >
                The Restaurant · Full Carte
              </p>
              <h2
                className="mt-3 font-journal text-4xl md:text-5xl"
                style={{ color: "var(--naga-deep)" }}
              >
                The Hearth Menu.
              </h2>
              <p className="mt-3 max-w-xl font-journal italic text-foreground/75">
                Served all day around the central fire — from morning rice cakes to slow-stewed
                evening pots. Prices in INR, plated for two unless noted.
              </p>
            </div>
            <span className="font-journal text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Carte · 2025 · Vol. I
            </span>
          </div>

          <div className="mt-12 grid gap-12 md:grid-cols-2">
            {[
              {
                section: "From the Smokehouse",
                items: [
                  ["Smoked Pork with Anishi", "Ao classic, fermented colocasia leaf", "640"],
                  ["Axone with Pork Belly", "Sumi fermented soybean, sticky rice", "680"],
                  ["Bamboo Shoot & Pork", "Lotha fermented bamboo, raja chilli", "620"],
                  ["Kidney Beans with Pork", "Slow-braised three hours", "560"],
                  ["Smoked Beef with Akhuni", "Hearth-smoked, dry-roasted", "720"],
                ],
              },
              {
                section: "From the Hills",
                items: [
                  ["Galho — One-Pot Rice", "Rice, leafy greens, smoked meat", "380"],
                  ["Bamboo Steamed Fish", "River fish in banana leaf", "540"],
                  ["Pork with Perilla Seeds", "Toasted perilla, ginger broth", "600"],
                  ["Chicken with Yongchak", "Stinky-bean stew, mountain herbs", "520"],
                  ["Mixed Vegetable Galho", "Vegetarian one-pot", "320"],
                ],
              },
              {
                section: "Sides & Sauces",
                items: [
                  ["Sticky Red Rice", "Local Chakhao varietal", "120"],
                  ["Steamed Mountain Rice", "Per bowl", "90"],
                  ["Boiled Greens of the Day", "Foraged from village gardens", "180"],
                  ["Raja Mircha Chutney", "House-made, very hot", "60"],
                  ["Tomato & Bamboo Tathu", "Roasted, smoky, mild", "80"],
                ],
              },
              {
                section: "From the Kettle",
                items: [
                  ["Naga Black Tea", "Wokha estate, served hot", "90"],
                  ["Ginger & Lemongrass Brew", "Fresh from the herb terrace", "110"],
                  ["Rice Beer · Zutho", "Traditional fermented rice", "180"],
                  ["Hill Coffee · Pour-over", "Single-origin Nagaland", "140"],
                  ["Honey-Plum Cooler", "Cold, foraged plum", "150"],
                ],
              },
              {
                section: "Sweet Plates",
                items: [
                  ["Sticky Rice with Jaggery", "Warm, with sesame", "180"],
                  ["Banana Fritters", "Crisp, with wild honey", "160"],
                  ["Black Sesame Pudding", "Cold-set, lightly sweet", "200"],
                ],
              },
              {
                section: "Morning Plates · 7–11",
                items: [
                  ["Rice Cakes & Pork", "Steamed, with chilli oil", "260"],
                  ["Eggs over Galho", "Two eggs, leafy rice pot", "240"],
                  ["Bamboo Pickle Toast", "Sourdough, hill butter", "180"],
                ],
              },
            ].map((cat) => (
              <div key={cat.section}>
                <h3
                  className="font-journal text-xl uppercase tracking-[0.28em]"
                  style={{ color: "var(--naga)" }}
                >
                  {cat.section}
                </h3>
                <span className="mt-2 block h-px w-12" style={{ background: "var(--naga)" }} />
                <ul className="mt-5 divide-y divide-border/50">
                  {cat.items.map(([name, note, price]) => (
                    <li key={name} className="flex items-baseline gap-3 py-3">
                      <div className="flex-1">
                        <p className="font-journal text-base" style={{ color: "var(--naga-deep)" }}>
                          {name}
                        </p>
                        <p className="mt-0.5 font-journal text-xs italic text-foreground/60">
                          {note}
                        </p>
                      </div>
                      <span
                        className="flex-1 self-end border-b border-dotted border-border/70"
                        aria-hidden
                      />
                      <span
                        className="font-journal text-sm tabular-nums"
                        style={{ color: "var(--naga-deep)" }}
                      >
                        ₹{price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-10 font-journal text-xs italic text-muted-foreground">
            Many dishes contain fermented soy, bamboo, or king chilli — please tell our host of
            allergies. Vegetarian preparations available for most pots; ask the kitchen.
          </p>
        </div>

        <div className="mt-24 vellum-card flex max-w-md items-center justify-between rounded-sm p-5">
          <span className="font-journal text-xs uppercase tracking-[0.35em] text-muted-foreground">
            Next chapter
          </span>
          <Link
            to="/event-planning"
            className="font-journal text-base uppercase tracking-[0.25em]"
            style={{ color: "var(--naga)" }}
          >
            Event Planning →
          </Link>
        </div>
      </div>
    </section>
  );
}
