import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { useReviews, useCreateReview, type ReviewEntry } from "@/hooks/use-api";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "The Guest Journal — Reviews & Experiences" },
      {
        name: "description",
        content:
          "Read traveller reviews of The Heritage Hearth, Kohima, and write your own folio entry into the guest journal.",
      },
      { property: "og:title", content: "The Guest Journal" },
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  const { data: entries = [], isLoading } = useReviews();
  const { mutate: createReview, isPending } = useCreateReview();
  const [newEntries, setNewEntries] = useState<ReviewEntry[]>([]);

  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [stars, setStars] = useState(5);
  const [body, setBody] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !body.trim()) return;

    const entry = {
      name: name.trim(),
      origin: origin.trim() || "Traveller",
      stars,
      body: body.trim(),
    };

    createReview(
      {
        ...entry,
      },
      {
        onSuccess: (created) => {
          setNewEntries((current) => [
            {
              id: created?.id || `local_${Date.now()}`,
              name: created?.name || entry.name,
              origin: created?.origin || entry.origin,
              date:
                created?.date ||
                new Date().toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                }),
              stars: created?.stars || entry.stars,
              body: created?.body || entry.body,
            },
            ...current,
          ]);
          setName("");
          setOrigin("");
          setBody("");
          setStars(5);
          setSubmitted(true);
          setTimeout(() => setSubmitted(false), 4000);
        },
      },
    );
  }

  const visibleEntries = [...newEntries, ...entries].map((entry) => ({
    id: entry.id,
    name: entry.name,
    origin: entry.origin || "Traveller",
    date: entry.date,
    stars: entry.stars || entry.rating || 5,
    body: entry.body || entry.content || "",
  }));

  return (
    <section className="relative px-6 py-24 md:px-16">
      <div className="mx-auto max-w-6xl">
        <p
          className="font-journal text-xs uppercase tracking-[0.45em]"
          style={{ color: "var(--naga)" }}
        >
          Folio · The Guest Journal
        </p>
        <h1
          className="mt-4 font-journal text-5xl leading-[1.05] md:text-7xl"
          style={{ color: "var(--naga-deep)" }}
        >
          Write your stay into the journal.
        </h1>
        <p className="mt-6 max-w-2xl font-journal text-lg italic text-foreground/80">
          Every guest leaves a folio. Read what travellers have written by firelight — then add your
          own entry. The page keeps your words beside the others, in order of arrival.
        </p>

        <div className="mt-20 grid gap-12 md:grid-cols-12 md:gap-16">
          {/* WRITE FORM */}
          <aside className="md:col-span-5">
            <div className="vellum-card sticky top-28 rounded-sm p-6 md:p-8">
              <p
                className="font-journal text-xs uppercase tracking-[0.4em]"
                style={{ color: "var(--naga)" }}
              >
                A new entry
              </p>
              <h2
                className="mt-2 font-journal text-2xl md:text-3xl"
                style={{ color: "var(--naga-deep)" }}
              >
                Share your experience
              </h2>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <Field label="Your name">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    maxLength={60}
                    className="input-line"
                    placeholder="e.g. Mira K."
                  />
                </Field>
                <Field label="From">
                  <input
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    maxLength={60}
                    className="input-line"
                    placeholder="e.g. Kolkata, Berlin, Tokyo"
                  />
                </Field>
                <Field label="Rating">
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        type="button"
                        key={n}
                        onClick={() => setStars(n)}
                        aria-label={`${n} stars`}
                        className="text-2xl leading-none transition-transform hover:scale-110"
                        style={{
                          color: n <= stars ? "var(--naga)" : "oklch(0.7 0.02 70)",
                        }}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </Field>
                <Field label="Your story">
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                    maxLength={600}
                    rows={5}
                    className="input-line resize-none"
                    placeholder="Write in the voice of a journal — what fire warmed you, what story you carried home."
                  />
                  <span className="mt-1 block text-right text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    {body.length}/600
                  </span>
                </Field>

                <button
                  type="submit"
                  disabled={isPending}
                  className="group flex w-full items-center justify-between border border-current px-5 py-3 font-journal text-xs uppercase tracking-[0.35em] transition-colors hover:bg-[var(--naga)] hover:text-[oklch(0.96_0.02_75)] disabled:opacity-50"
                  style={{ color: "var(--naga)" }}
                >
                  <span>{isPending ? "Posting..." : "Post review"}</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </button>

                {submitted && (
                  <p className="font-journal text-xs italic" style={{ color: "var(--naga)" }}>
                    Entry inscribed. The drum has carried it.
                  </p>
                )}
              </form>
            </div>
          </aside>

          {/* ENTRIES */}
          <div className="md:col-span-7">
            {isLoading ? (
              <p className="text-muted-foreground">Loading entries...</p>
            ) : visibleEntries.length === 0 ? (
              <p className="text-muted-foreground">No entries yet. Be the first to share!</p>
            ) : (
              <ul className="space-y-10">
                {visibleEntries.map((e, i) => (
                  <motion.li
                    key={e.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="vellum-card rounded-sm p-6 md:p-8"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <div>
                        <p className="font-journal text-lg" style={{ color: "var(--naga-deep)" }}>
                          {e.name}
                        </p>
                        <p className="font-journal text-xs uppercase tracking-[0.3em] text-muted-foreground">
                          {e.origin} · {e.date}
                        </p>
                      </div>
                      <p
                        className="font-journal text-lg tracking-widest"
                        style={{ color: "var(--naga)" }}
                        aria-label={`${e.stars} of 5 stars`}
                      >
                        {"★".repeat(e.stars)}
                        <span className="opacity-30">{"★".repeat(5 - e.stars)}</span>
                      </p>
                    </div>
                    <p className="mt-4 font-journal text-base italic leading-relaxed text-foreground/85">
                      “{e.body}”
                    </p>
                    <p className="mt-4 font-journal text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                      Folio entry No. {String(visibleEntries.length - i).padStart(3, "0")}
                    </p>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block font-journal text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
