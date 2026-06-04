import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import shopDao from "@/assets/shop-dao-spear.jpg";
import shopMugs from "@/assets/shop-bamboo-mugs.jpg";
import shopArtifacts from "@/assets/shop-artifacts.jpg";
import shopShawl from "@/assets/shop-shawl.jpg";
import storyTextile from "@/assets/story-textile.jpg";

type Product = {
  id: string;
  name: string;
  region: string;
  price: number;
  blurb: string;
  hero: string;
  details: string[];
  specs: Array<[string, string]>;
  reviews: Array<{ name: string; place: string; rating: number; quote: string }>;
};

const gallery = [
  { src: shopDao, alt: "Naga dao and ceremonial spear on parchment" },
  { src: shopMugs, alt: "Hand-turned bamboo mugs" },
  { src: shopArtifacts, alt: "Curated brass, cowrie, and carved artifacts" },
  { src: shopShawl, alt: "Handwoven heritage shawl" },
  { src: storyTextile, alt: "Red and black Naga textile detail" },
];

const PRODUCTS: Product[] = [
  {
    id: "dao-spear",
    name: "Naga Dao & Ceremonial Spear",
    region: "Forged in Khonoma · iron, teak, horsehair",
    price: 8400,
    blurb:
      "A working dao paired with a tasselled ceremonial spear, finished for display above a doorway or hearth wall.",
    hero: shopDao,
    details: [
      "Hand-forged iron dao with a dark oil finish",
      "Teak handle wrapped for grip and display",
      "Ceremonial spear with red horsehair tassel",
      "Packed with a signed craft note from the bazaar desk",
    ],
    specs: [
      ["Set", "Dao and ceremonial spear"],
      ["Material", "Iron, teak, horsehair"],
      ["Origin", "Khonoma craft cluster"],
      ["Care", "Wipe dry, oil the blade monthly"],
    ],
    reviews: [
      {
        name: "Anirban D.",
        place: "Kolkata",
        rating: 5,
        quote:
          "Beautifully finished and properly packed. It feels like a real hearth piece, not a souvenir.",
      },
      {
        name: "Nei-u T.",
        place: "Kohima",
        rating: 5,
        quote: "The tassel and handle work are excellent. The craft note made it feel personal.",
      },
    ],
  },
  {
    id: "bamboo-mugs",
    name: "Hearth Bamboo Mugs · set of six",
    region: "Turned in Mokokchung · river bamboo, beeswax",
    price: 1800,
    blurb:
      "Six hand-turned bamboo tankards, charred and waxed for rice beer, black tea, or a breakfast table by the fire.",
    hero: shopMugs,
    details: [
      "Set of six matching bamboo mugs",
      "Charred exterior with beeswax polish",
      "Lightweight, stackable, and easy to carry",
      "Best for cool or warm drinks, not boiling liquids",
    ],
    specs: [
      ["Set", "Six mugs"],
      ["Material", "River bamboo, beeswax"],
      ["Origin", "Mokokchung workshop"],
      ["Care", "Hand wash only, dry upright"],
    ],
    reviews: [
      {
        name: "Meren L.",
        place: "Dimapur",
        rating: 5,
        quote: "The mugs look even better in person. The wax finish has a lovely soft shine.",
      },
      {
        name: "Rhea S.",
        place: "Delhi",
        rating: 4,
        quote: "Perfect for serving tea. I liked that the set arrived with care instructions.",
      },
    ],
  },
  {
    id: "artifacts",
    name: "Curator's Tray of Artifacts",
    region: "Mon & Phek · brass, cowrie, hornwood",
    price: 12600,
    blurb:
      "A curated tray of small heritage objects selected by the lodge desk for collectors and styled interiors.",
    hero: shopArtifacts,
    details: [
      "Curated mix of brass, cowrie, and carved objects",
      "Each tray is assembled as a one-of-one composition",
      "Includes object labels and display notes",
      "Ideal for shelves, study tables, and reception displays",
    ],
    specs: [
      ["Set", "Curated tray with 6-8 objects"],
      ["Material", "Brass, cowrie, hornwood"],
      ["Origin", "Mon and Phek sourcing desk"],
      ["Care", "Dust with dry cloth, avoid water"],
    ],
    reviews: [
      {
        name: "Vikram P.",
        place: "Mumbai",
        rating: 5,
        quote: "The tray became the centre of our reading room. The object labels are thoughtful.",
      },
      {
        name: "Aienla K.",
        place: "Mokokchung",
        rating: 5,
        quote: "Tastefully selected. Nothing felt random or overdone.",
      },
    ],
  },
  {
    id: "shawl",
    name: "Handwoven Heritage Shawl",
    region: "Loomed in Wokha · cotton, plant dyes",
    price: 4200,
    blurb:
      "A red and black heritage shawl woven on a back-strap loom, made for wearing, gifting, or wall display.",
    hero: shopShawl,
    details: [
      "Handwoven cotton with plant-dye inspired tones",
      "Traditional stripe and field composition",
      "Soft enough to wear, structured enough to display",
      "Includes a pattern card and maker note",
    ],
    specs: [
      ["Size", "Approx. 190 cm x 90 cm"],
      ["Material", "Cotton, plant-dye palette"],
      ["Origin", "Wokha loom collective"],
      ["Care", "Cold wash separately, dry in shade"],
    ],
    reviews: [
      {
        name: "Ira M.",
        place: "Bengaluru",
        rating: 5,
        quote: "The weave is substantial and the colors are rich without looking new and flat.",
      },
      {
        name: "Ketholeno S.",
        place: "Kohima",
        rating: 5,
        quote: "Good weight, clean edges, and a respectful pattern card.",
      },
    ],
  },
];

export const Route = createFileRoute("/heritage-products/$productId")({
  loader: ({ params: { productId } }) => {
    const product = PRODUCTS.find((item) => item.id === productId);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    return {
      meta: [
        { title: `${loaderData.name} - Heritage Bazaar` },
        { name: "description", content: loaderData.blurb },
      ],
    };
  },
  component: ProductPage,
});

function money(value: number) {
  return `Rs. ${value.toLocaleString("en-IN")}`;
}

function ProductPage() {
  const product = Route.useLoaderData();
  const [quantity, setQuantity] = useState(1);
  const [delivery, setDelivery] = useState<"desk" | "ship">("desk");

  const shipping = delivery === "ship" ? 450 : 0;
  const total = useMemo(
    () => product.price * quantity + shipping,
    [product.price, quantity, shipping],
  );

  const productGallery = [
    { src: product.hero, alt: product.name },
    ...gallery.filter((item) => item.src !== product.hero),
  ].slice(0, 5);

  return (
    <section className="relative px-6 py-16 md:px-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <Button
          asChild
          variant="ghost"
          className="mb-10 font-journal uppercase tracking-[0.25em] text-muted-foreground"
        >
          <Link to="/heritage">Back to bazaar</Link>
        </Button>

        <div className="grid gap-12 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:col-span-7"
          >
            <p
              className="font-journal text-xs uppercase tracking-[0.45em]"
              style={{ color: "var(--naga)" }}
            >
              {product.region}
            </p>
            <h1
              className="mt-4 font-journal text-5xl leading-[1.03] md:text-7xl"
              style={{ color: "var(--naga-deep)" }}
            >
              {product.name}
            </h1>
            <p className="mt-6 max-w-2xl font-journal text-lg italic leading-relaxed text-foreground/80">
              {product.blurb}
            </p>

            <div className="mt-10 grid grid-cols-2 gap-3">
              {productGallery.map((image, index) => (
                <figure
                  key={`${image.alt}-${index}`}
                  className={
                    index === 0
                      ? "col-span-2 overflow-hidden rounded-sm"
                      : "overflow-hidden rounded-sm"
                  }
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading={index === 0 ? "eager" : "lazy"}
                    className="h-full w-full object-cover transition-transform duration-[1.2s] hover:scale-[1.03]"
                    style={{ aspectRatio: index === 0 ? "16 / 10" : "1 / 1" }}
                  />
                </figure>
              ))}
            </div>
          </motion.div>

          <aside className="md:col-span-5">
            <div className="sticky top-28 rounded-sm border border-border/60 bg-background/85 p-6 shadow-[0_24px_70px_-45px_oklch(0.18_0.05_30/0.65)] backdrop-blur">
              <p className="font-journal text-xs uppercase tracking-[0.35em] text-muted-foreground">
                Hearth Price
              </p>
              <p
                className="mt-2 font-journal text-4xl tabular-nums"
                style={{ color: "var(--naga-deep)" }}
              >
                {money(product.price)}
              </p>

              <label className="mt-6 block font-journal text-xs uppercase tracking-[0.28em] text-muted-foreground">
                Quantity
              </label>
              <input
                type="number"
                min={1}
                max={10}
                value={quantity}
                onChange={(event) => {
                  setQuantity(Math.max(1, Math.min(10, Number(event.target.value) || 1)));
                }}
                className="mt-2 h-11 w-full rounded-sm border border-input bg-background px-3 font-journal text-sm"
              />

              <label className="mt-5 block font-journal text-xs uppercase tracking-[0.28em] text-muted-foreground">
                Fulfilment
              </label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {[
                  ["desk", "Pickup at desk"],
                  ["ship", "Ship to me"],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => {
                      setDelivery(value as "desk" | "ship");
                    }}
                    className={
                      "rounded-sm border px-3 py-2 font-journal text-sm transition-colors " +
                      (delivery === value
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-input bg-background")
                    }
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="mt-6 space-y-3 border-t border-border/60 pt-5 font-journal text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{money(product.price * quantity)}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping ? money(shipping) : "Desk pickup"}</span>
                </div>
                <div className="flex justify-between gap-4 text-lg">
                  <span>Total</span>
                  <span>{money(total)}</span>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Button asChild className="font-journal uppercase tracking-[0.2em]">
                  <Link
                    to="/checkout"
                    search={{
                      kind: "product",
                      title: product.name,
                      itemId: product.id,
                      description: product.blurb,
                      quantity,
                      amount: total,
                      commission: Math.round(total * 0.08),
                      returnTo: `/heritage-products/${product.id}`,
                    }}
                  >
                    Buy now
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="font-journal uppercase tracking-[0.2em]"
                >
                  <Link
                    to="/checkout"
                    search={{
                      kind: "product",
                      title: product.name,
                      itemId: product.id,
                      description: `Reserve for ${delivery === "ship" ? "shipping" : "desk pickup"}`,
                      quantity,
                      amount: total,
                      commission: Math.round(total * 0.08),
                      returnTo: `/heritage-products/${product.id}`,
                    }}
                  >
                    Reserve
                  </Link>
                </Button>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-20 grid gap-12 md:grid-cols-12">
          <section className="md:col-span-7">
            <p
              className="font-journal text-xs uppercase tracking-[0.45em]"
              style={{ color: "var(--naga)" }}
            >
              Product Details
            </p>
            <ul className="mt-7 grid gap-3">
              {product.details.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 font-journal text-lg text-foreground/80"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: "var(--naga)" }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="md:col-span-5">
            <p
              className="font-journal text-xs uppercase tracking-[0.45em]"
              style={{ color: "var(--naga)" }}
            >
              Specifications
            </p>
            <div className="mt-7 divide-y divide-border/60 rounded-sm border border-border/60">
              {product.specs.map(([key, value]) => (
                <div
                  key={key}
                  className="grid grid-cols-[120px_1fr] gap-4 p-4 font-journal text-sm"
                >
                  <span className="uppercase tracking-[0.25em] text-muted-foreground">{key}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="mt-20">
          <p
            className="font-journal text-xs uppercase tracking-[0.45em]"
            style={{ color: "var(--naga)" }}
          >
            Guest Reviews
          </p>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {product.reviews.map((review) => (
              <article
                key={review.name}
                className="rounded-sm border border-border/60 bg-background/70 p-5"
              >
                <div
                  className="font-journal text-sm uppercase tracking-[0.25em]"
                  style={{ color: "var(--naga-deep)" }}
                >
                  {"★".repeat(review.rating)}
                </div>
                <p className="mt-4 font-journal text-lg italic text-foreground/80">
                  "{review.quote}"
                </p>
                <p className="mt-4 font-journal text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  {review.name} · {review.place}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
