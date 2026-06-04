import { Link } from "@tanstack/react-router";

export function ChapterStub({
  eyebrow,
  title,
  body,
  next,
}: {
  eyebrow: string;
  title: string;
  body: string;
  next: { to: string; label: string };
}) {
  return (
    <section className="relative mx-auto flex min-h-[80vh] max-w-5xl flex-col justify-center px-8 py-24 md:px-16">
      <p
        className="font-journal text-xs uppercase tracking-[0.45em] text-naga"
        style={{ color: "var(--naga)" }}
      >
        {eyebrow}
      </p>
      <h1
        className="mt-4 font-journal text-5xl leading-[1.05] md:text-7xl"
        style={{ color: "var(--naga-deep)" }}
      >
        {title}
      </h1>
      <p className="mt-6 max-w-2xl font-journal text-lg italic text-foreground/80">{body}</p>

      <div className="mt-16 vellum-card inline-flex max-w-md items-center justify-between rounded-sm p-5">
        <span className="font-journal text-xs uppercase tracking-[0.35em] text-muted-foreground">
          Next chapter
        </span>
        <Link
          to={next.to}
          className="font-journal text-base uppercase tracking-[0.25em]"
          style={{ color: "var(--naga)" }}
        >
          {next.label} →
        </Link>
      </div>

      <p className="mt-12 font-journal text-xs uppercase tracking-[0.4em] text-muted-foreground">
        Folio in progress · woven into the journal soon
      </p>
    </section>
  );
}
