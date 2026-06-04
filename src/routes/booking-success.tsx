import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect } from "react";

// Allow booking details to be passed via URL search parameters
export const Route = createFileRoute("/booking-success")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      ref: (search.ref as string) || "",
      name: (search.name as string) || "",
      checkIn: (search.checkIn as string) || "",
      checkOut: (search.checkOut as string) || "",
      amount: (search.amount as number) || 0,
      nights: (search.nights as number) || 0,
    };
  },
  head: () => ({
    meta: [{ title: "Reservation Confirmed — The Heritage Hearth" }],
  }),
  component: BookingSuccessPage,
});

function BookingSuccessPage() {
  const { ref, name, checkIn, checkOut, amount, nights } = Route.useSearch();
  const navigate = useNavigate();

  // Redirect home if accessed without a booking reference
  useEffect(() => {
    if (!ref) {
      navigate({ to: "/" });
    }
  }, [ref, navigate]);

  if (!ref) return null; // Prevent flash before redirect

  return (
    <section className="relative px-6 py-24 md:px-16 min-h-[80vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-2xl text-center w-full"
      >
        <p
          className="font-journal text-xs uppercase tracking-[0.45em]"
          style={{ color: "var(--naga)" }}
        >
          Reservation Confirmed
        </p>
        <h1
          className="mt-4 font-journal text-5xl leading-[1.05] md:text-6xl"
          style={{ color: "var(--naga-deep)" }}
        >
          Your sanctuary awaits, {name.split(" ")[0]}.
        </h1>
        <p className="mt-6 mx-auto max-w-lg font-journal text-lg italic text-foreground/80">
          The fire will be lit for your arrival. We have inscribed your name into the ledger. A
          confirmation has been sent to your emissary (email).
        </p>

        <div className="vellum-card mt-12 grid gap-6 rounded-sm p-8 text-left md:grid-cols-2 shadow-sm border border-border/60 mx-auto max-w-md bg-vellum/60">
          <div>
            <p className="font-journal text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Reference
            </p>
            <p className="mt-1 font-journal text-xl" style={{ color: "var(--naga-deep)" }}>
              {ref}
            </p>
          </div>
          <div>
            <p className="font-journal text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Dates
            </p>
            <p className="mt-1 font-journal text-lg text-foreground/80">
              {checkIn} to {checkOut}
            </p>
          </div>
          <div>
            <p className="font-journal text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Stay
            </p>
            <p className="mt-1 font-journal text-lg text-foreground/80">
              {nights} {nights === 1 ? "night" : "nights"}
            </p>
          </div>
          <div>
            <p className="font-journal text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Total Ledger
            </p>
            <p className="mt-1 font-journal text-xl" style={{ color: "var(--naga-deep)" }}>
              ₹{amount.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-center gap-8">
          <Link
            to="/availability"
            className="font-journal text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground"
          >
            ← Back to Lofts
          </Link>
          <Link
            to="/"
            className="font-journal text-xs uppercase tracking-[0.3em]"
            style={{ color: "var(--naga)" }}
          >
            Return to the Hearth →
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
