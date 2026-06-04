import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

import roomSuite from "@/assets/room-suite.jpg";
import roomDeluxe from "@/assets/room-deluxe.jpg";
import roomDouble from "@/assets/room-double.jpg";
import roomTwin from "@/assets/room-twin.jpg";
import roomSingle from "@/assets/room-single.jpg";
import hotelLoft from "@/assets/hotel-loft.jpg";
import hotelHearthRoom from "@/assets/hotel-hearth-room.jpg";
import hotelFacade from "@/assets/hotel-facade.jpg";

const ROOMS = [
  {
    id: "suite",
    name: "The Japfü Suite",
    type: "Heritage Suite",
    rate: 18500,
    capacity: 2,
    size: "450 sq ft",
    bed: "King Bed",
    hero: roomSuite,
    gallery: [
      { src: roomSuite, alt: "The Japfü Suite" },
      { src: hotelLoft, alt: "Loft view" },
      { src: hotelHearthRoom, alt: "Private hearth" },
      { src: hotelFacade, alt: "Hotel exterior" },
    ],
    description:
      "The highest loft of the morung. A four-poster bed under a thatched gable, a private hearth, and a window that opens onto the Japfü ridge at first light. Enjoy unparalleled luxury with a private viewing deck and bespoke amenities.",
    amenities: [
      "Private Hearth",
      "Valley View",
      "En-suite Bathroom",
      "Mini Bar",
      "Air Conditioning",
      "Free WiFi",
    ],
  },
  {
    id: "deluxe",
    name: "Saramati Deluxe",
    type: "Deluxe Room",
    rate: 12500,
    capacity: 2,
    size: "350 sq ft",
    bed: "King Bed",
    hero: roomDeluxe,
    gallery: [
      { src: roomDeluxe, alt: "Saramati Deluxe" },
      { src: hotelLoft, alt: "Room details" },
      { src: hotelHearthRoom, alt: "Hotel interior" },
    ],
    description:
      "Hand-carved hornbill headboard, copper soaking tub, and lantern-lit pine. A room for travellers who want the journal whispered, not shouted. Intimate luxury wrapped in traditional craftsmanship.",
    amenities: [
      "Copper Tub",
      "Mountain Window",
      "En-suite Bathroom",
      "Air Conditioning",
      "Free WiFi",
    ],
  },
  {
    id: "double",
    name: "Dzükou Double",
    type: "Double Room",
    rate: 8500,
    capacity: 2,
    size: "280 sq ft",
    bed: "Queen Bed",
    hero: roomDouble,
    gallery: [
      { src: roomDouble, alt: "Dzükou Double" },
      { src: hotelHearthRoom, alt: "Warm interior" },
      { src: hotelLoft, alt: "Room space" },
    ],
    description:
      "A queen bed dressed in red Lotha weave, a single brass lamp, and a Konyak portrait keeping watch. Mist arrives at the window before the sun.",
    amenities: ["Valley Window", "Writing Desk", "En-suite Bathroom", "Free WiFi"],
  },
  {
    id: "twin",
    name: "Dzüleke Twin",
    type: "Twin Room",
    rate: 7500,
    capacity: 2,
    size: "280 sq ft",
    bed: "Two Single Beds",
    hero: roomTwin,
    gallery: [
      { src: roomTwin, alt: "Dzüleke Twin" },
      { src: hotelLoft, alt: "Twin beds" },
      { src: hotelFacade, alt: "Exterior view" },
    ],
    description:
      "Two singles dressed in matching Ao striped throws, a woven bamboo wall behind, a brass lamp between. For two travellers writing the same chapter, separately.",
    amenities: ["Bamboo Wall", "Garden Window", "En-suite Bathroom", "Free WiFi"],
  },
  {
    id: "single",
    name: "Khonoma Single",
    type: "Single Room",
    rate: 4500,
    capacity: 1,
    size: "200 sq ft",
    bed: "Single Bed",
    hero: roomSingle,
    gallery: [
      { src: roomSingle, alt: "Khonoma Single" },
      { src: hotelLoft, alt: "Quiet corner" },
      { src: hotelHearthRoom, alt: "Common area" },
    ],
    description:
      "A scholar's loft. One bed, one desk, one inkwell, one window of warm light over Khonoma's terraced fields. The smallest, quietest chamber of the house.",
    amenities: ["Writing Desk", "Journal Provided", "Reading Nook", "Free WiFi"],
  },
];

export const Route = createFileRoute("/rooms/$roomId")({
  loader: ({ params }) => {
    const room = ROOMS.find((r) => r.id === params.roomId);
    if (!room) throw notFound();
    return room;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    return {
      meta: [
        { title: `${loaderData.name} - Heritage Hearth` },
        { name: "description", content: loaderData.description },
      ],
    };
  },
  component: RoomPage,
});

function todayISO(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
}

function RoomPage() {
  const room = Route.useLoaderData();
  const [checkIn, setCheckIn] = useState(todayISO(0));
  const [checkOut, setCheckOut] = useState(todayISO(1));
  const [guests, setGuests] = useState(room.capacity > 1 ? 2 : 1);

  const handleBook = () => {
    document.dispatchEvent(
      new CustomEvent("ledger:open", {
        detail: { roomKey: room.id, checkIn, checkOut, guests },
      }),
    );
  };

  return (
    <section className="relative px-6 py-16 md:px-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/availability"
          className="mb-10 inline-block font-journal text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to Availability
        </Link>

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
              {room.type}
            </p>
            <h1
              className="mt-4 font-journal text-5xl leading-[1.03] md:text-7xl"
              style={{ color: "var(--naga-deep)" }}
            >
              {room.name}
            </h1>
            <p className="mt-6 max-w-2xl font-journal text-lg italic leading-relaxed text-foreground/80">
              {room.description}
            </p>

            <figure className="mt-10 overflow-hidden rounded-sm">
              <img
                src={room.hero}
                alt={room.name}
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
                Reservation
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3 font-journal text-sm border-b border-border/60 pb-5">
                <span className="text-muted-foreground">Size</span>
                <span className="text-right">{room.size}</span>
                <span className="text-muted-foreground">Bed</span>
                <span className="text-right">{room.bed}</span>
                <span className="text-muted-foreground">Capacity</span>
                <span className="text-right">Up to {room.capacity} Guests</span>
                <span className="text-muted-foreground mt-2">Rate</span>
                <span className="text-right mt-2 text-lg" style={{ color: "var(--naga-deep)" }}>
                  ₹{room.rate.toLocaleString("en-IN")}{" "}
                  <span className="text-xs text-muted-foreground">/ night</span>
                </span>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="block font-journal text-xs uppercase tracking-[0.28em] text-muted-foreground">
                    Check-in
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    min={todayISO(0)}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="mt-2 h-11 w-full rounded-sm border border-input bg-background px-3 font-journal text-sm"
                  />
                </div>
                <div>
                  <label className="block font-journal text-xs uppercase tracking-[0.28em] text-muted-foreground">
                    Check-out
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    min={checkIn || todayISO(1)}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="mt-2 h-11 w-full rounded-sm border border-input bg-background px-3 font-journal text-sm"
                  />
                </div>
                <div>
                  <label className="block font-journal text-xs uppercase tracking-[0.28em] text-muted-foreground">
                    Guests
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
                      onClick={() => setGuests(Math.min(room.capacity, guests + 1))}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={handleBook}
                className="mt-8 w-full py-3 font-journal uppercase tracking-[0.22em] transition-colors rounded-sm bg-naga text-white hover:opacity-90"
              >
                Book Now →
              </button>
            </div>
          </aside>

          <section className="order-2 md:col-span-7 md:order-none">
            <p
              className="font-journal text-xs uppercase tracking-[0.45em]"
              style={{ color: "var(--naga)" }}
            >
              Amenities
            </p>
            <ul className="mt-7 grid grid-cols-2 gap-4">
              {room.amenities.map((item) => (
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

            <div className="mt-16">
              <p
                className="font-journal text-xs uppercase tracking-[0.45em]"
                style={{ color: "var(--naga)" }}
              >
                Gallery
              </p>

              <div className="mt-8 block md:hidden">
                <Carousel className="w-full">
                  <CarouselContent>
                    {room.gallery.map((image) => (
                      <CarouselItem key={image.alt} className="basis-4/5">
                        <img
                          src={image.src}
                          alt={image.alt}
                          loading="lazy"
                          className="h-full w-full rounded-sm object-cover transition-transform duration-1000 ease-out hover:scale-[1.03]"
                          style={{ aspectRatio: "4 / 3" }}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
              <div className="mt-8 hidden grid-cols-2 gap-4 md:grid">
                {room.gallery.map((image) => (
                  <img
                    key={image.alt}
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                  className="h-full w-full rounded-sm object-cover transition-transform duration-1000 ease-out hover:scale-[1.03]"
                    style={{ aspectRatio: "4 / 3" }}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
