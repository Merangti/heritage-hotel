import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import shopDao from "@/assets/shop-dao-spear.jpg";
import shopMugs from "@/assets/shop-bamboo-mugs.jpg";
import shopArtifacts from "@/assets/shop-artifacts.jpg";
import shopShawl from "@/assets/shop-shawl.jpg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/heritage")({
  head: () => ({
    meta: [
      { title: "Heritage Bazaar — The Heritage Hearth" },
      {
        name: "description",
        content:
          "The hearth's bazaar — Naga dao, spears, bamboo mugs, artifacts and handwoven shawls. Reserve a piece to take home.",
      },
    ],
  }),
  component: HeritagePage,
});

type Product = {
  id: string;
  name: string;
  region: string;
  price: number;
  blurb: string;
  img: string;
  aspect: string;
};

const PRODUCTS: Product[] = [
  {
    id: "dao-spear",
    name: "Naga Dao & Ceremonial Spear",
    region: "Forged in Khonoma · iron, teak, horsehair",
    price: 8400,
    blurb:
      "A working dao paired with a tasselled spear — the warrior's pair, kept above every morung door.",
    img: shopDao,
    aspect: "4 / 5",
  },
  {
    id: "bamboo-mugs",
    name: "Hearth Bamboo Mugs · set of six",
    region: "Turned in Mokokchung · river bamboo, beeswax",
    price: 1800,
    blurb: "Hand-turned tankards, charred and waxed, for rice-beer and morning kettle smoke.",
    img: shopMugs,
    aspect: "4 / 5",
  },
  {
    id: "artifacts",
    name: "Curator's Tray of Artifacts",
    region: "Mon & Phek · brass, cowrie, hornwood",
    price: 12600,
    blurb:
      "A curated tray — necklaces, carved figures, a hornbill quill — chosen from the lodge's own collection.",
    img: shopArtifacts,
    aspect: "4 / 5",
  },
  {
    id: "shawl",
    name: "Handwoven Heritage Shawl",
    region: "Loomed in Wokha · cotton, plant dyes",
    price: 4200,
    blurb: "Warp and weft on a back-strap loom — six weeks of work, three generations of pattern.",
    img: shopShawl,
    aspect: "4 / 5",
  },
];

const todayISO = () => new Date().toISOString().slice(0, 10);

const checkoutSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(80),
  email: z.string().trim().email("Enter a valid email").max(160),
  phone: z.string().trim().min(6, "Enter a valid phone").max(24),
  visitDate: z.string().min(1, "Pick a visit date"),
  quantity: z.number().int().min(1).max(10),
  notes: z.string().max(400).optional(),
});

function HeritagePage() {
  const [reserved, setReserved] = useState<Set<string>>(new Set());
  const [active, setActive] = useState<Product | null>(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    visitDate: todayISO(),
    quantity: 1,
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmation, setConfirmation] = useState<null | {
    code: string;
    product: Product;
    total: number;
    visitDate: string;
    quantity: number;
    fullName: string;
  }>(null);

  const openCheckout = (p: Product) => {
    setActive(p);
    setErrors({});
    setForm((f) => ({ ...f, quantity: 1, notes: "" }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!active) return;
    const parsed = checkoutSchema.safeParse(form);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        errs[String(i.path[0])] = i.message;
      });
      setErrors(errs);
      return;
    }
    const code =
      "HH-" +
      Math.random().toString(36).slice(2, 6).toUpperCase() +
      "-" +
      Math.random().toString(36).slice(2, 5).toUpperCase();
    const total = active.price * parsed.data.quantity;
    setReserved((prev) => new Set(prev).add(active.id));
    setConfirmation({
      code,
      product: active,
      total,
      visitDate: parsed.data.visitDate,
      quantity: parsed.data.quantity,
      fullName: parsed.data.fullName,
    });
    setActive(null);
    toast.success(`Reservation confirmed · ${code}`, {
      description: `${active.name} · ₹${total.toLocaleString("en-IN")}`,
    });
  };

  return (
    <div className="relative px-8 py-24 md:px-16">
      <div className="mx-auto max-w-6xl">
        <p
          className="font-journal text-xs uppercase tracking-[0.45em]"
          style={{ color: "var(--naga)" }}
        >
          Folio · Heritage Bazaar
        </p>
        <h1
          className="mt-4 font-journal text-5xl leading-[1.05] md:text-7xl"
          style={{ color: "var(--naga-deep)" }}
        >
          Take a piece of the hills home.
        </h1>
        <p className="mt-6 max-w-2xl font-journal text-lg italic text-foreground/80">
          A small bazaar kept beside the hearth — dao and spear, bamboo mugs blackened by smoke,
          brass and shell artifacts, and shawls still warm from the loom. Reserve any piece and we
          will set it aside for you at the front desk.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2">
          {PRODUCTS.map((p, i) => {
            const isReserved = reserved.has(p.id);
            return (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 0.61, 0.36, 1] }}
                className="vellum-card group flex flex-col overflow-hidden rounded-sm"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="h-full w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-[1.04]"
                    style={{ aspectRatio: p.aspect }}
                  />
                  <div className="pointer-events-none absolute right-3 top-3 rounded-sm bg-[oklch(0.18_0.04_30/0.85)] px-3 py-1 font-journal text-[10px] uppercase tracking-[0.3em] text-[oklch(0.95_0.03_75)]">
                    Plate № {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <p className="font-journal text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
                    {p.region}
                  </p>
                  <h3
                    className="mt-2 font-journal text-2xl md:text-3xl"
                    style={{ color: "var(--naga-deep)" }}
                  >
                    {p.name}
                  </h3>
                  <p className="mt-3 font-journal italic text-foreground/75">{p.blurb}</p>
                  <div className="mt-6 flex items-end justify-between gap-4 border-t border-border/60 pt-4">
                    <div>
                      <p className="font-journal text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
                        Hearth price
                      </p>
                      <p
                        className="font-journal text-2xl tabular-nums"
                        style={{ color: "var(--naga-deep)" }}
                      >
                        ₹{p.price.toLocaleString("en-IN")}
                      </p>
                    </div>
                    <Link
                      to="/heritage-products/$productId"
                      params={{ productId: p.id }}
                      className="font-journal text-xs uppercase tracking-[0.3em] transition-opacity"
                      style={{
                        background: "var(--naga)",
                        color: "oklch(0.97 0.02 75)",
                        padding: "0.85rem 1.5rem",
                        borderRadius: "2px",
                      }}
                    >
                      {isReserved ? "Reserve again" : "Reserve · Book"}
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <p className="mt-16 font-journal text-xs uppercase tracking-[0.35em] text-muted-foreground">
          Pieces are dispatched from the lodge or held for you at check-in. Custom commissions on
          request.
        </p>
      </div>

      {/* Checkout dialog */}
      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-lg bg-vellum">
          {active && (
            <>
              <DialogHeader>
                <DialogDescription className="font-journal text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                  Reserve · {active.region}
                </DialogDescription>
                <DialogTitle
                  className="font-journal text-3xl"
                  style={{ color: "var(--naga-deep)" }}
                >
                  {active.name}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={submit} className="mt-2 space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Full name" error={errors.fullName}>
                    <input
                      className="input-line w-full bg-transparent font-journal"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      maxLength={80}
                      required
                    />
                  </Field>
                  <Field label="Phone" error={errors.phone}>
                    <input
                      type="tel"
                      className="input-line w-full bg-transparent font-journal"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      maxLength={24}
                      required
                    />
                  </Field>
                </div>
                <Field label="Email" error={errors.email}>
                  <input
                    type="email"
                    className="input-line w-full bg-transparent font-journal"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    maxLength={160}
                    required
                  />
                </Field>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Visit / pickup date" error={errors.visitDate}>
                    <input
                      type="date"
                      min={todayISO()}
                      className="input-line w-full bg-transparent font-journal"
                      value={form.visitDate}
                      onChange={(e) => setForm({ ...form, visitDate: e.target.value })}
                      required
                    />
                  </Field>
                  <Field label="Quantity" error={errors.quantity}>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      className="input-line w-full bg-transparent font-journal"
                      value={form.quantity}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          quantity: Math.max(1, Math.min(10, Number(e.target.value) || 1)),
                        })
                      }
                      required
                    />
                  </Field>
                </div>
                <Field label="Notes (optional)" error={errors.notes}>
                  <textarea
                    rows={2}
                    className="input-line w-full resize-none bg-transparent font-journal"
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    maxLength={400}
                  />
                </Field>

                <div className="flex items-center justify-between border-t border-border/60 pt-4">
                  <div>
                    <p className="font-journal text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
                      Total
                    </p>
                    <p
                      className="font-journal text-2xl tabular-nums"
                      style={{ color: "var(--naga-deep)" }}
                    >
                      ₹{(active.price * form.quantity).toLocaleString("en-IN")}
                    </p>
                  </div>
                  <DialogFooter className="m-0">
                    <button
                      type="submit"
                      className="font-journal text-xs uppercase tracking-[0.3em]"
                      style={{
                        background: "var(--naga)",
                        color: "oklch(0.97 0.02 75)",
                        padding: "0.85rem 1.5rem",
                        borderRadius: "2px",
                      }}
                    >
                      Confirm reservation →
                    </button>
                  </DialogFooter>
                </div>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Confirmation dialog */}
      <Dialog open={!!confirmation} onOpenChange={(o) => !o && setConfirmation(null)}>
        <DialogContent className="max-w-md bg-vellum">
          {confirmation && (
            <>
              <DialogHeader>
                <DialogDescription
                  className="font-journal text-[10px] uppercase tracking-[0.4em]"
                  style={{ color: "var(--naga)" }}
                >
                  Reservation confirmed
                </DialogDescription>
                <DialogTitle
                  className="font-journal text-3xl"
                  style={{ color: "var(--naga-deep)" }}
                >
                  Thank you, {confirmation.fullName.split(" ")[0]}.
                </DialogTitle>
              </DialogHeader>
              <div className="mt-2 space-y-3 font-journal text-sm">
                <Row k="Booking code" v={confirmation.code} />
                <Row k="Piece" v={confirmation.product.name} />
                <Row k="Quantity" v={String(confirmation.quantity)} />
                <Row k="Visit date" v={confirmation.visitDate} />
                <Row k="Total due at desk" v={`₹${confirmation.total.toLocaleString("en-IN")}`} />
                <p className="pt-3 italic text-foreground/70">
                  A note has been logged at the hearth desk. We'll have your piece wrapped and
                  waiting.
                </p>
              </div>
              <DialogFooter>
                <button
                  onClick={() => setConfirmation(null)}
                  className="font-journal text-xs uppercase tracking-[0.3em]"
                  style={{ color: "var(--naga)" }}
                >
                  Close ✕
                </button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="font-journal text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
        {label}
      </span>
      <div className="mt-2">{children}</div>
      {error && (
        <span className="mt-1 block font-journal text-[11px] italic text-destructive">{error}</span>
      )}
    </label>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-dashed border-border/60 pb-2">
      <span className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">{k}</span>
      <span className="text-right tabular-nums" style={{ color: "var(--naga-deep)" }}>
        {v}
      </span>
    </div>
  );
}
