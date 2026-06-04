import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

type CheckoutKind = "stay" | "listing" | "product" | "reservation";

export const Route = createFileRoute("/checkout")({
  validateSearch: (search: Record<string, unknown>) => ({
    kind: ((search.kind as CheckoutKind) || "reservation") as CheckoutKind,
    title: (search.title as string) || "Heritage Hearth Reservation",
    itemId: (search.itemId as string) || "",
    description: (search.description as string) || "",
    quantity: Number(search.quantity) || 1,
    amount: Number(search.amount) || 0,
    commission: Number(search.commission) || 0,
    checkIn: (search.checkIn as string) || "",
    checkOut: (search.checkOut as string) || "",
    returnTo: (search.returnTo as string) || "/",
  }),
  head: () => ({
    meta: [
      { title: "Checkout - The Heritage Hearth" },
      {
        name: "description",
        content:
          "Complete payment for rooms, reservations, services, dining, and heritage products at The Heritage Hearth.",
      },
    ],
  }),
  component: CheckoutPage,
});

function money(value: number) {
  return `Rs. ${value.toLocaleString("en-IN")}`;
}

function CheckoutPage() {
  const order = Route.useSearch();
  const navigate = useNavigate();
  const [paid, setPaid] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    payment: "card",
  });

  const tax = useMemo(() => Math.round(order.amount * 0.05), [order.amount]);
  const grandTotal = order.amount + tax;
  const payableCommission =
    order.commission > 0 ? order.commission : Math.round(order.amount * 0.1);

  const canPay = order.amount > 0 && form.name.trim() && form.email.trim() && form.phone.trim();

  function completePayment(event: React.FormEvent) {
    event.preventDefault();
    if (!canPay) return;

    const ref =
      "HH-PAY-" +
      Math.random().toString(36).slice(2, 6).toUpperCase() +
      "-" +
      Math.random().toString(36).slice(2, 5).toUpperCase();

    setPaid(true);
    window.setTimeout(() => {
      navigate({
        to: "/booking-success",
        search: {
          ref,
          name: form.name,
          checkIn: order.checkIn,
          checkOut: order.checkOut,
          amount: grandTotal,
          nights: order.quantity,
        },
      });
    }, 650);
  }

  if (order.amount <= 0) {
    return (
      <section className="relative flex min-h-[70vh] items-center justify-center px-6 py-24 text-center md:px-16">
        <div className="max-w-xl">
          <p
            className="font-journal text-xs uppercase tracking-[0.45em]"
            style={{ color: "var(--naga)" }}
          >
            Checkout
          </p>
          <h1 className="mt-4 font-journal text-5xl" style={{ color: "var(--naga-deep)" }}>
            No order selected.
          </h1>
          <p className="mt-4 font-journal text-lg italic text-foreground/75">
            Choose a room, service, restaurant table, or heritage product first.
          </p>
          <Button asChild className="mt-8 font-journal uppercase tracking-[0.2em]">
            <Link to="/">Return home</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="relative px-6 py-16 md:px-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <Button
          asChild
          variant="ghost"
          className="mb-10 font-journal uppercase tracking-[0.25em] text-muted-foreground"
        >
          <a href={order.returnTo}>Back</a>
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
              Secure Checkout · {order.kind}
            </p>
            <h1
              className="mt-4 font-journal text-5xl leading-[1.03] md:text-7xl"
              style={{ color: "var(--naga-deep)" }}
            >
              Complete your ledger.
            </h1>
            <p className="mt-6 max-w-2xl font-journal text-lg italic leading-relaxed text-foreground/80">
              Pay for stays, table reservations, local services, and heritage products from one
              checkout.
            </p>

            <form onSubmit={completePayment} className="mt-10 grid gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Full name">
                  <input
                    value={form.name}
                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                    className="input-line w-full bg-transparent font-journal text-lg"
                    required
                  />
                </Field>
                <Field label="Phone">
                  <input
                    value={form.phone}
                    onChange={(event) => setForm({ ...form, phone: event.target.value })}
                    className="input-line w-full bg-transparent font-journal text-lg"
                    required
                  />
                </Field>
              </div>
              <Field label="Email">
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  className="input-line w-full bg-transparent font-journal text-lg"
                  required
                />
              </Field>
              <Field label="Address or arrival note">
                <textarea
                  rows={3}
                  value={form.address}
                  onChange={(event) => setForm({ ...form, address: event.target.value })}
                  className="input-line w-full resize-none bg-transparent font-journal text-lg"
                  placeholder="Shipping address, pickup note, or arrival detail"
                />
              </Field>

              <div>
                <p className="font-journal text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                  Payment method
                </p>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {[
                    ["card", "Card"],
                    ["upi", "UPI"],
                    ["desk", "Pay at desk"],
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setForm({ ...form, payment: value })}
                      className={
                        "rounded-sm border px-4 py-3 font-journal text-sm uppercase tracking-[0.22em] transition-colors " +
                        (form.payment === value
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-input bg-background")
                      }
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                disabled={!canPay || paid}
                className="mt-3 font-journal uppercase tracking-[0.22em]"
              >
                {paid ? "Payment recorded..." : `Pay ${money(grandTotal)}`}
              </Button>
            </form>
          </motion.div>

          <aside className="md:col-span-5">
            <div className="sticky top-28 rounded-sm border border-border/60 bg-background/85 p-6 shadow-[0_24px_70px_-45px_oklch(0.18_0.05_30/0.65)] backdrop-blur">
              <p className="font-journal text-xs uppercase tracking-[0.35em] text-muted-foreground">
                Order Summary
              </p>
              <h2 className="mt-4 font-journal text-3xl" style={{ color: "var(--naga-deep)" }}>
                {order.title}
              </h2>
              {order.description && (
                <p className="mt-3 font-journal text-sm italic text-foreground/70">
                  {order.description}
                </p>
              )}

              <div className="mt-6 space-y-3 border-t border-border/60 pt-5 font-journal text-sm">
                <Row label="Item ID" value={order.itemId || "HH-ledger"} />
                <Row label="Quantity" value={String(order.quantity)} />
                {order.checkIn && <Row label="Arrival" value={order.checkIn} />}
                {order.checkOut && <Row label="Departure" value={order.checkOut} />}
                <Row label="Subtotal" value={money(order.amount)} />
                <Row label="Taxes & fees" value={money(tax)} />
                <Row label="Hotel commission" value={money(payableCommission)} />
              </div>

              <div className="mt-6 flex items-baseline justify-between border-t border-border/60 pt-5">
                <span className="font-journal text-xs uppercase tracking-[0.35em] text-muted-foreground">
                  Total due
                </span>
                <span
                  className="font-journal text-3xl tabular-nums"
                  style={{ color: "var(--naga-deep)" }}
                >
                  {money(grandTotal)}
                </span>
              </div>

              <p className="mt-5 font-journal text-xs italic text-muted-foreground">
                This checkout records the payment request and routes fulfilment to the correct desk:
                rooms, partners, restaurant, or bazaar.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="font-journal text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
        {label}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right">{value}</span>
    </div>
  );
}
