import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import roomSuite from "@/assets/room-suite.jpg";
import roomDeluxe from "@/assets/room-deluxe.jpg";
import roomDouble from "@/assets/room-double.jpg";
import roomTwin from "@/assets/room-twin.jpg";
import roomSingle from "@/assets/room-single.jpg";

export const Route = createFileRoute("/availability")({
  head: () => ({
    meta: [
      { title: "Availability — Check the Sleeping Lofts" },
      {
        name: "description",
        content:
          "Check live availability across the five lofts of The Heritage Hearth, Kohima — Suite, Deluxe, Double, Twin and Single.",
      },
      { property: "og:title", content: "Availability · The Heritage Hearth" },
    ],
  }),
  component: AvailabilityPage,
});

type Room = {
  key: string;
  name: string;
  type: string;
  capacity: number;
  rate: number; // INR / night
  total: number;
  booked: number; // current booked count (mock seed)
  img: string;
  note: string;
};

const ROOMS: Room[] = [
  {
    key: "suite",
    name: "The Japfü Suite",
    type: "Heritage Suite",
    capacity: 2,
    rate: 18500,
    total: 2,
    booked: 1,
    img: roomSuite,
    note: "King bed · private hearth · valley view",
  },
  {
    key: "deluxe",
    name: "Saramati Deluxe",
    type: "Deluxe Room",
    capacity: 2,
    rate: 12500,
    total: 4,
    booked: 2,
    img: roomDeluxe,
    note: "Carved headboard · copper tub",
  },
  {
    key: "double",
    name: "Dzükou Double",
    type: "Double Room",
    capacity: 2,
    rate: 8500,
    total: 6,
    booked: 3,
    img: roomDouble,
    note: "Queen bed · pinewood floor",
  },
  {
    key: "twin",
    name: "Dzüleke Twin",
    type: "Twin Room",
    capacity: 2,
    rate: 7500,
    total: 5,
    booked: 4,
    img: roomTwin,
    note: "Two singles · garden window",
  },
  {
    key: "single",
    name: "Khonoma Single",
    type: "Single Room",
    capacity: 1,
    rate: 4500,
    total: 4,
    booked: 1,
    img: roomSingle,
    note: "Solo loft · reading nook",
  },
];

function nights(a: string, b: string) {
  if (!a || !b) return 0;
  const ms = new Date(b).getTime() - new Date(a).getTime();
  return Math.max(0, Math.round(ms / 86400000));
}

function todayISO(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
}

// Deterministic pseudo-availability based on date + room key, so the same
// search returns the same answer between renders without a backend.
function availableFor(room: Room, checkIn: string): number {
  if (!checkIn) return room.total - room.booked;
  let h = 0;
  const s = checkIn + room.key;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  const variance = Math.abs(h) % (room.total + 1);
  return Math.max(0, room.total - variance);
}

function AvailabilityPage() {
  const [checkIn, setCheckIn] = useState(todayISO(0));
  const [checkOut, setCheckOut] = useState(todayISO(1));
  const [guests, setGuests] = useState(2);
  const [submitted, setSubmitted] = useState(false);

  const stay = nights(checkIn, checkOut);

  const results = useMemo(() => {
    return ROOMS.map((r) => {
      const avail = availableFor(r, checkIn);
      const fits = r.capacity >= guests;
      const status: "open" | "limited" | "full" | "toosmall" = !fits
        ? "toosmall"
        : avail === 0
          ? "full"
          : avail === 1
            ? "limited"
            : "open";
      return { room: r, avail, status };
    });
  }, [checkIn, guests]);

  return (
    <section className="relative px-6 py-24 md:px-16">
      <div className="mx-auto max-w-6xl">
        <p
          className="font-journal text-xs uppercase tracking-[0.45em]"
          style={{ color: "var(--naga)" }}
        >
          Folio · Availability
        </p>
        <h1
          className="mt-4 font-journal text-5xl leading-[1.05] md:text-7xl"
          style={{ color: "var(--naga-deep)" }}
        >
          Check the lofts.
        </h1>
        <p className="mt-6 max-w-2xl font-journal text-lg italic text-foreground/80">
          The morung holds five sleeping lofts above the central fire. Choose your dates — the
          ledger will show what the hills have left for you.
        </p>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="vellum-card mt-12 grid gap-6 rounded-sm p-6 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end md:p-8"
        >
          <label className="block">
            <span className="font-journal text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Arrival
            </span>
            <input
              type="date"
              value={checkIn}
              min={todayISO(0)}
              onChange={(e) => {
                setCheckIn(e.target.value);
                setSubmitted(false);
              }}
              className="input-line mt-2 w-full bg-transparent font-journal text-lg"
            />
          </label>
          <label className="block">
            <span className="font-journal text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Departure
            </span>
            <input
              type="date"
              value={checkOut}
              min={checkIn || todayISO(1)}
              onChange={(e) => {
                setCheckOut(e.target.value);
                setSubmitted(false);
              }}
              className="input-line mt-2 w-full bg-transparent font-journal text-lg"
            />
          </label>
          <label className="block">
            <span className="font-journal text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Guests
            </span>
            <input
              type="number"
              min={1}
              max={4}
              value={guests}
              onChange={(e) => {
                setGuests(Math.max(1, Math.min(4, Number(e.target.value) || 1)));
                setSubmitted(false);
              }}
              className="input-line mt-2 w-full bg-transparent font-journal text-lg"
            />
          </label>
          <button
            type="submit"
            className="font-journal text-sm uppercase tracking-[0.3em] transition-colors hover:opacity-80"
            style={{ color: "var(--naga)" }}
          >
            {submitted ? "Refresh ↻" : "Check ledger →"}
          </button>
        </form>

        {stay > 0 && (
          <p className="mt-4 font-journal text-xs uppercase tracking-[0.35em] text-muted-foreground">
            {stay} {stay === 1 ? "night" : "nights"} · {guests} {guests === 1 ? "guest" : "guests"}
          </p>
        )}

        {/* Results */}
        <ol className="mt-10 space-y-6">
          {results.map(({ room, avail, status }, i) => {
            const total = stay > 0 ? room.rate * stay : room.rate;
            const label =
              status === "toosmall"
                ? "Too few beds"
                : status === "full"
                  ? "Fully booked"
                  : status === "limited"
                    ? `Last ${avail} loft`
                    : `${avail} of ${room.total} open`;
            const accent =
              status === "open" ? "var(--naga)" : status === "limited" ? "#c97a2a" : "#7a4a4a";
            return (
              <motion.li
                key={room.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.05 }}
                className="grid grid-cols-1 gap-6 overflow-hidden rounded-sm border border-border/60 bg-vellum/40 md:grid-cols-[200px_1fr_auto] md:items-center"
              >
                <figure className="h-40 w-full md:h-32 overflow-hidden">
                  <Link
                    to="/rooms/$roomId"
                    params={{ roomId: room.key }}
                    className="block h-full w-full"
                  >
                    <img
                      src={room.img}
                      alt={room.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out hover:scale-105"
                    />
                  </Link>
                </figure>
                <div className="px-6 md:px-2">
                  <p className="font-journal text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                    {room.type}
                  </p>
                  <Link
                    to="/rooms/$roomId"
                    params={{ roomId: room.key }}
                    className="transition-opacity hover:opacity-80"
                  >
                    <h3
                      className="mt-1 font-journal text-2xl"
                      style={{ color: "var(--naga-deep)" }}
                    >
                      {room.name}
                    </h3>
                  </Link>
                  <p className="mt-1 font-journal text-sm italic text-foreground/70">{room.note}</p>
                  <p
                    className="mt-2 font-journal text-xs uppercase tracking-[0.3em]"
                    style={{ color: accent }}
                  >
                    ● {label}
                  </p>
                </div>
                <div className="px-6 pb-6 text-left md:px-6 md:pb-0 md:text-right">
                  <p className="font-journal text-xs uppercase tracking-[0.35em] text-muted-foreground">
                    {stay > 0 ? `${stay} × ₹${room.rate.toLocaleString("en-IN")}` : "per night"}
                  </p>
                  <p className="mt-1 font-journal text-2xl" style={{ color: "var(--naga-deep)" }}>
                    ₹{total.toLocaleString("en-IN")}
                  </p>
                  <button
                    disabled={status === "full" || status === "toosmall" || stay === 0}
                    className="mt-3 font-journal text-xs uppercase tracking-[0.3em] disabled:opacity-40"
                    style={{ color: "var(--naga)" }}
                    onClick={() => {
                      document.dispatchEvent(
                        new CustomEvent("ledger:open", {
                          detail: { roomKey: room.key, checkIn, checkOut, guests },
                        }),
                      );
                    }}
                  >
                    Reserve →
                  </button>
                </div>
              </motion.li>
            );
          })}
        </ol>

        <div className="mt-16 flex items-center justify-between">
          <Link
            to="/event-planning"
            className="font-journal text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground"
          >
            ← Explore event spaces
          </Link>
          <Link
            to="/the-hearth"
            className="font-journal text-xs uppercase tracking-[0.3em]"
            style={{ color: "var(--naga)" }}
          >
            The Hearth →
          </Link>
        </div>
      </div>
    </section>
  );
}
