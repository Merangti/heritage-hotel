import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="relative z-10 ml-0 border-t border-border/60 bg-vellum/80 px-8 py-16 backdrop-blur-md md:ml-16 md:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <span className="block font-journal text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              A living journal
            </span>
            <span
              className="mt-2 block font-journal text-2xl font-semibold tracking-tight"
              style={{ color: "var(--naga)" }}
            >
              The Heritage Hearth
            </span>
            <p className="mt-4 max-w-xs font-journal text-sm italic text-foreground/70">
              A hearth kept warm on the ridge above Kohima. Mist, memory, and the slow drum of the
              hills.
            </p>
          </div>

          <div>
            <h4 className="font-journal text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Support
            </h4>
            <ul className="mt-4 space-y-3 font-journal text-sm uppercase tracking-[0.1em]">
              <li>
                <Link to="/contact" className="text-foreground/80 transition-colors hover:text-foreground">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-foreground/80 transition-colors hover:text-foreground">
                  Help & FAQ
                </Link>
              </li>
              <li>
                <Link to="/booking-policies" className="text-foreground/80 transition-colors hover:text-foreground">
                  Booking Policies
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-journal text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Legal
            </h4>
            <ul className="mt-4 space-y-3 font-journal text-sm uppercase tracking-[0.1em]">
              <li>
                <Link to="/terms-and-conditions" className="text-foreground/80 transition-colors hover:text-foreground">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-foreground/80 transition-colors hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="text-foreground/80 transition-colors hover:text-foreground">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 font-journal text-xs uppercase tracking-[0.2em] text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} The Heritage Hearth. All rights reserved.</p>
          <p>Kohima, Nagaland</p>
        </div>
      </div>
    </footer>
  );
}
