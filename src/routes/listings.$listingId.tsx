import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import hotelFacade from "@/assets/hotel-facade.jpg";
import hotelAerial from "@/assets/hotel-aerial.jpg";
import hotelHearthRoom from "@/assets/hotel-hearth-room.jpg";
import hotelLoft from "@/assets/hotel-loft.jpg";
import dishAxone from "@/assets/dish-axone.jpg";
import dishAnishi from "@/assets/dish-anishi.jpg";
import dishBamboo from "@/assets/dish-bamboo.jpg";
import dishBeans from "@/assets/dish-beans.jpg";
import roomSuite from "@/assets/room-suite.jpg";
import roomDouble from "@/assets/room-double.jpg";
import { Magnetic } from "@/components/Magnetic";

type Offering = {
  name: string;
  note: string;
  price: number;
  unit: string;
};

type Listing = {
  id: string;
  label: string;
  title: string;
  category: string;
  location: string;
  hero: string;
  alt: string;
  body: string;
  commissionRate: number;
  capacity: string;
  partner: string;
  inclusions: string[];
  gallery: Array<{ src: string; alt: string }>;
  offerings: Offering[];
};

const LISTINGS: Listing[] = [
  {
    id: "ridge-dawn-table",
    label: "Place Partner",
    title: "The Ridge Dawn Table",
    category: "Viewpoint breakfast",
    location: "Above Kohima",
    hero: hotelAerial,
    alt: "Aerial view of the lodge and ridge at dawn",
    body: "A sunrise table on the ridge with local tea, breakfast plates, and optional guide service. Built for guests who want a bookable place experience before the city wakes.",
    commissionRate: 0.15,
    capacity: "2-10 guests",
    partner: "Ridge Hosts Collective",
    inclusions: [
      "Reserved ridge table",
      "Weather-window confirmation",
      "Guide coordination",
      "Hotel pickup option",
    ],
    gallery: [
      { src: hotelFacade, alt: "The lodge facade before dawn" },
      { src: hotelLoft, alt: "Morning mist from the loft" },
      { src: dishBeans, alt: "Warm hill breakfast bowl" },
    ],
    offerings: [
      {
        name: "Dawn Breakfast Table",
        note: "Tea, rice cakes, eggs, fruit, and preserves",
        price: 1800,
        unit: "guest",
      },
      {
        name: "Guided Ridge Walk",
        note: "Local host, village stories, photo stops",
        price: 2400,
        unit: "group",
      },
      {
        name: "Picnic Hamper",
        note: "Packed tea, snacks, and woven mat",
        price: 1200,
        unit: "hamper",
      },
      { name: "Private Driver Hold", note: "Two-hour waiting window", price: 2200, unit: "car" },
    ],
  },
  {
    id: "hearth-room-dining",
    label: "Restaurant Partner",
    title: "The Hearth Room Dining",
    category: "Naga restaurant",
    location: "Central Morung Fire",
    hero: hotelHearthRoom,
    alt: "The central hearth room lit by fire",
    body: "A dedicated dining page for the restaurant inside the hotel. Guests can reserve a table, pre-order dishes, and the hotel ledger can retain commission on each confirmed reservation.",
    commissionRate: 0.1,
    capacity: "2-18 guests",
    partner: "The Hearth Kitchen",
    inclusions: [
      "Table reservation",
      "Pre-order sent to kitchen",
      "Diet note capture",
      "Ledger commission tracking",
    ],
    gallery: [
      { src: dishAxone, alt: "Axone with pork and rice" },
      { src: dishAnishi, alt: "Smoked pork with anishi" },
      { src: dishBamboo, alt: "Bamboo shoot with pork" },
    ],
    offerings: [
      {
        name: "Axone with Pork and Rice",
        note: "Sumi fermented soybean, sticky rice",
        price: 680,
        unit: "plate",
      },
      {
        name: "Smoked Pork with Anishi",
        note: "Ao fermented colocasia leaf stew",
        price: 640,
        unit: "plate",
      },
      {
        name: "Bamboo Shoot with Pork",
        note: "Lotha bamboo, smoked pork, chilli",
        price: 620,
        unit: "plate",
      },
      {
        name: "Chef's Fire Table",
        note: "Four-course shared Naga tasting menu",
        price: 2200,
        unit: "guest",
      },
    ],
  },
  {
    id: "the-smokehouse-terrace",
    label: "Restaurant Partner",
    title: "The Smokehouse Terrace",
    category: "Barbecue & Smoked Meats",
    location: "Eastern Ridge Terrace",
    hero: dishAxone,
    alt: "Smoked meats and Axone served on the terrace",
    body: "An open-air terrace dining experience focusing on traditional Naga smokehouse techniques. Reserve a table for slow-roasted pork belly, fermented soybean specials, and house-made zutho (rice beer).",
    commissionRate: 0.1,
    capacity: "2-12 guests",
    partner: "The Smokehouse Collective",
    inclusions: [
      "Terrace seating",
      "Zutho tasting",
      "Diet note capture",
      "Ledger commission tracking",
    ],
    gallery: [
      { src: dishAxone, alt: "Axone with pork and rice" },
      { src: hotelAerial, alt: "Terrace view" },
      { src: dishBeans, alt: "Kidney beans with smoked pork" },
    ],
    offerings: [
      {
        name: "Smoked Pork Belly Board",
        note: "Served with Raja Mircha chutney and sticky rice",
        price: 850,
        unit: "board",
      },
      {
        name: "Axone & Smoked Beef",
        note: "Traditional fermented soybean stew",
        price: 920,
        unit: "plate",
      },
      {
        name: "Rice Beer Tasting",
        note: "Three varieties of local Zutho",
        price: 450,
        unit: "flight",
      },
      {
        name: "Terrace Fire Pit",
        note: "Private fire pit reservation for the evening",
        price: 1500,
        unit: "evening",
      },
    ],
  },
  {
    id: "hill-foragers-table",
    label: "Restaurant Partner",
    title: "Hill Forager's Table",
    category: "Plant-based Naga Cuisine",
    location: "Garden Pavilion",
    hero: dishAnishi,
    alt: "Plant-based Naga stews and foraged greens",
    body: "A lighter, plant-forward dining chapter. Featuring ingredients foraged daily from the village gardens — from perilla seeds and bamboo shoots to bitter eggplant and wild mushrooms.",
    commissionRate: 0.12,
    capacity: "2-8 guests",
    partner: "Khonoma Foragers",
    inclusions: [
      "Garden seating",
      "Daily harvest introduction",
      "Herbal tea pairing",
      "Ledger commission tracking",
    ],
    gallery: [
      { src: dishBamboo, alt: "Bamboo shoot stew" },
      { src: hotelFacade, alt: "Garden pavilion exterior" },
      { src: dishBeans, alt: "Kidney beans stew" },
    ],
    offerings: [
      {
        name: "Mixed Vegetable Galho",
        note: "Hearty one-pot rice with leafy greens",
        price: 320,
        unit: "bowl",
      },
      {
        name: "Bamboo Steamed Fish",
        note: "Fresh river catch wrapped in banana leaf",
        price: 540,
        unit: "plate",
      },
      {
        name: "Perilla Seed Soup",
        note: "Toasted perilla and ginger broth",
        price: 280,
        unit: "bowl",
      },
      {
        name: "Forager's Tasting Menu",
        note: "Five-course vegetarian seasonal journey",
        price: 1600,
        unit: "guest",
      },
    ],
  },
  {
    id: "morning-kettle-nook",
    label: "Cafe Partner",
    title: "Morning Kettle Nook",
    category: "Tea & Breakfast",
    location: "Western Veranda",
    hero: dishBeans,
    alt: "Warm breakfast bowl by the morning light",
    body: "A quiet corner for early risers. Featuring single-origin Nagaland coffee, Wokha estate black teas, and warm morning plates from the kitchen before the main hearth wakes.",
    commissionRate: 0.08,
    capacity: "1-6 guests",
    partner: "The Hearth Kitchen",
    inclusions: [
      "Veranda seating",
      "Sunrise view",
      "Unlimited kettle refills",
      "Ledger commission tracking",
    ],
    gallery: [
      { src: hotelLoft, alt: "Morning light in the loft" },
      { src: hotelFacade, alt: "Western veranda" },
      { src: dishAxone, alt: "Morning rice cakes" },
    ],
    offerings: [
      {
        name: "Wokha Estate Black Tea",
        note: "Served hot in a hand-turned bamboo mug",
        price: 120,
        unit: "pot",
      },
      {
        name: "Rice Cakes & Pork",
        note: "Steamed morning cakes with mild chilli oil",
        price: 260,
        unit: "plate",
      },
      {
        name: "Hill Coffee Pour-over",
        note: "Single-origin Nagaland roast",
        price: 180,
        unit: "cup",
      },
      {
        name: "Breakfast Galho",
        note: "Warm rice and leafy green porridge",
        price: 240,
        unit: "bowl",
      },
    ],
  },
];

export const Route = createFileRoute("/listings/$listingId")({
  loader: ({ params: { listingId } }) => {
    const listing = LISTINGS.find((item) => item.id === listingId);
    if (!listing) throw notFound();
    return listing;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    return {
      meta: [
        { title: `${loaderData.title} - Bookings` },
        { name: "description", content: loaderData.body },
      ],
    };
  },
  component: ListingPage,
});

function formatMoney(value: number) {
  return `Rs. ${value.toLocaleString("en-IN")}`;
}

function ListingPage() {
  const listing = Route.useLoaderData();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [time, setTime] = useState("19:00");
  const [guests, setGuests] = useState(2);

  const subtotal = listing.offerings.reduce((sum, item) => {
    return sum + (quantities[item.name] || 0) * item.price;
  }, 0);
  const commission = useMemo(
    () => Math.round(subtotal * listing.commissionRate),
    [listing.commissionRate, subtotal],
  );
  const partnerPayout = subtotal - commission;
  const totalItems = Object.values(quantities).reduce((a, b) => a + b, 0);

  return (
    <section className="relative px-6 py-16 md:px-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <Button
          asChild
          variant="ghost"
          className="mb-10 font-journal uppercase tracking-[0.25em] text-muted-foreground"
        >
          <Link to="/">Back home</Link>
        </Button>

        <div className="flex flex-col gap-12 md:grid md:grid-cols-12 md:gap-x-12 md:gap-y-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-1 md:col-span-7 md:order-none"
          >
            <p
              className="font-journal text-xs uppercase tracking-[0.45em]"
              style={{ color: "var(--naga)" }}
            >
              {listing.label} · {listing.category}
            </p>
            <h1
              className="mt-4 font-journal text-5xl leading-[1.03] md:text-7xl"
              style={{ color: "var(--naga-deep)" }}
            >
              {listing.title}
            </h1>
            <p className="mt-6 max-w-2xl font-journal text-lg italic leading-relaxed text-foreground/80">
              {listing.body}
            </p>

            <figure className="mt-10 overflow-hidden rounded-sm">
              <img
                src={listing.hero}
                alt={listing.alt}
                width={1600}
                height={1000}
                className="h-full w-full object-cover"
                style={{ aspectRatio: "16 / 10" }}
              />
            </figure>
          </motion.div>

          <aside className="order-3 md:col-span-5 md:col-start-8 md:row-span-3 md:row-start-1 md:order-none">
            <div className="sticky top-28 rounded-sm border border-border/60 bg-background/85 p-6 shadow-[0_24px_70px_-45px_oklch(0.18_0.05_30/0.65)] backdrop-blur">
              <p className="font-journal text-xs uppercase tracking-[0.35em] text-muted-foreground">
                Reservation Ledger
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3 font-journal text-sm">
                <span className="text-muted-foreground">Location</span>
                <span className="text-right">{listing.location}</span>
                <span className="text-muted-foreground">Capacity</span>
                <span className="text-right">{listing.capacity}</span>
                <span className="text-muted-foreground">Host</span>
                <span className="text-right">{listing.partner}</span>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block font-journal text-xs uppercase tracking-[0.28em] text-muted-foreground">
                    Reservation Time
                  </label>
                  <input
                    type="time"
                    value={time}
                    onChange={(event) => {
                      setTime(event.target.value);
                    }}
                    className="mt-2 h-11 w-full rounded-sm border border-input bg-background px-3 font-journal text-sm"
                  />
                </div>
                <div>
                  <label className="block font-journal text-xs uppercase tracking-[0.28em] text-muted-foreground">
                    Number of Guests
                  </label>
                  <div className="mt-2 flex h-11 items-center justify-between rounded-sm border border-input bg-background px-3 font-journal text-sm">
                    <button
                      type="button"
                      className="flex h-8 w-8 items-center justify-center rounded-sm transition-colors hover:bg-muted/30"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                    >
                      -
                    </button>
                    <span>{guests}</span>
                    <button
                      type="button"
                      className="flex h-8 w-8 items-center justify-center rounded-sm transition-colors hover:bg-muted/30"
                      onClick={() => setGuests(guests + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <label className="mt-5 block font-journal text-xs uppercase tracking-[0.28em] text-muted-foreground">
                Order
              </label>
              <div className="mt-2 space-y-3">
                {listing.offerings.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between font-journal text-sm"
                  >
                    <span className="flex-1 pr-4">
                      {item.name} <br />{" "}
                      <span className="text-muted-foreground text-xs">
                        {formatMoney(item.price)} / {item.unit}
                      </span>
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        className="flex h-8 w-8 items-center justify-center rounded-sm border border-border/60 transition-colors hover:bg-muted/30"
                        onClick={() =>
                          setQuantities({
                            ...quantities,
                            [item.name]: Math.max(0, (quantities[item.name] || 0) - 1),
                          })
                        }
                      >
                        -
                      </button>
                      <span className="w-4 text-center">{quantities[item.name] || 0}</span>
                      <button
                        className="flex h-8 w-8 items-center justify-center rounded-sm border border-border/60 transition-colors hover:bg-muted/30"
                        onClick={() =>
                          setQuantities({
                            ...quantities,
                            [item.name]: (quantities[item.name] || 0) + 1,
                          })
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3 border-t border-border/60 pt-5 font-journal text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Guest total</span>
                  <span>{formatMoney(subtotal)}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Hotel commission</span>
                  <span>{formatMoney(commission)}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Partner payout</span>
                  <span>{formatMoney(partnerPayout)}</span>
                </div>
              </div>

              <div className="mt-6 w-full">
                <Magnetic>
                  <Button
                    asChild
                    className={`w-full font-journal uppercase tracking-[0.22em] ${totalItems === 0 ? "opacity-50 pointer-events-none" : ""}`}
                  >
                    <Link
                      disabled={totalItems === 0}
                      to="/checkout"
                      search={{
                        kind: "listing",
                        title: listing.title,
                        itemId: listing.id,
                        description:
                          `Guests: ${guests}. Time: ${time}. ` +
                          Object.entries(quantities)
                            .filter(([_, q]) => q > 0)
                            .map(([k, q]) => `${q}x ${k}`)
                            .join(", "),
                        quantity: totalItems || 1,
                        amount: subtotal,
                        commission,
                        returnTo: `/listings/${listing.id}`,
                      }}
                    >
                      Reserve through ledger
                    </Link>
                  </Button>
                </Magnetic>
              </div>
            </div>
          </aside>

          <section className="order-2 md:col-span-7 md:order-none">
            <p
              className="font-journal text-xs uppercase tracking-[0.45em]"
              style={{ color: "var(--naga)" }}
            >
              Listings
            </p>
            <h2 className="mt-3 font-journal text-4xl" style={{ color: "var(--naga-deep)" }}>
              Services and dishes.
            </h2>
            <div className="mt-8 divide-y divide-border/60">
              {listing.offerings.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => {
                    setQuantities({ ...quantities, [item.name]: (quantities[item.name] || 0) + 1 });
                  }}
                  className="grid w-full gap-3 py-5 text-left transition-colors hover:bg-muted/30 md:grid-cols-[1fr_auto]"
                >
                  <span>
                    <span
                      className="block font-journal text-2xl"
                      style={{ color: "var(--naga-deep)" }}
                    >
                      {item.name}
                    </span>
                    <span className="mt-1 block font-journal text-sm italic text-foreground/65">
                      {item.note}
                    </span>
                  </span>
                  <span className="font-journal text-lg tabular-nums">
                    {formatMoney(item.price)} / {item.unit}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="order-4 md:col-span-7 md:order-none">
            <p
              className="font-journal text-xs uppercase tracking-[0.45em]"
              style={{ color: "var(--naga)" }}
            >
              Included
            </p>
            <ul className="mt-7 space-y-3">
              {listing.inclusions.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 font-journal text-base text-foreground/80"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: "var(--naga)" }}
                  />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10 block md:hidden">
              <Carousel className="w-full">
                <CarouselContent>
                  {listing.gallery.map((image) => (
                    <CarouselItem key={image.alt} className="basis-4/5">
                      <img
                        src={image.src}
                        alt={image.alt}
                        loading="lazy"
                          className="h-full w-full rounded-sm object-cover transition-transform duration-1000 ease-out hover:scale-[1.03]"
                        style={{ aspectRatio: "1 / 1" }}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
            <div className="mt-10 hidden grid-cols-3 gap-3 md:grid">
              {listing.gallery.map((image) => (
                <img
                  key={image.alt}
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                className="h-full w-full rounded-sm object-cover transition-transform duration-1000 ease-out hover:scale-[1.03]"
                  style={{ aspectRatio: "1 / 1" }}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
