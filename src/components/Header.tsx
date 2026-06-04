import { Link, useRouterState } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";

const LINKS = [
  { to: "/", label: "Entrance" },
  { to: "/availability", label: "Availability" },
  { to: "/stories", label: "Stories" },
  { to: "/heritage", label: "Heritage" },
  { to: "/explore", label: "Explore" },
  { to: "/the-hearth", label: "Hearth" },
  { to: "/event-planning", label: "Event Planning" },
  { to: "/reviews", label: "Journal" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-30 flex items-center justify-between border-b border-border/50 bg-vellum/60 px-6 py-4 backdrop-blur-md md:left-16 md:px-8">
      <Link to="/" className="font-journal text-lg leading-none">
        <span className="block text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          A living journal
        </span>
        <span
          className="text-naga text-2xl font-semibold tracking-tight"
          style={{ color: "var(--naga)" }}
        >
          The Heritage Hearth
        </span>
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden gap-7 font-journal text-sm uppercase tracking-[0.22em] lg:flex">
        {LINKS.map((l) => {
          const active = path === l.to;
          return (
            <Link
              key={l.to}
              to={l.to}
              className={
                "relative transition-colors " +
                (active ? "text-naga" : "text-foreground/70 hover:text-foreground")
              }
              style={active ? { color: "var(--naga)" } : undefined}
            >
              {l.label}
              {active && (
                <span
                  className="absolute -bottom-1 left-0 h-px w-full"
                  style={{ background: "var(--naga)" }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Mobile Nav */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="lg:hidden">
          <Menu className="h-6 w-6 text-foreground" />
          <span className="sr-only">Toggle Menu</span>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="bg-vellum/95 backdrop-blur-xl border-border/50 w-[300px]"
        >
          <SheetHeader className="text-left mb-8">
            <SheetTitle className="font-journal text-2xl" style={{ color: "var(--naga)" }}>
              Navigation
            </SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-6 font-journal text-lg uppercase tracking-[0.2em]">
            {LINKS.map((l) => {
              const active = path === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={
                    "transition-colors " +
                    (active ? "text-naga" : "text-foreground/80 hover:text-foreground")
                  }
                  style={active ? { color: "var(--naga)" } : undefined}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
