import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — The Heritage Hearth" },
      {
        name: "description",
        content: "Reach out to The Heritage Hearth in Kohima, Nagaland.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="relative px-6 py-24 md:px-16">
      <div className="mx-auto max-w-6xl">
        <p
          className="font-journal text-xs uppercase tracking-[0.45em]"
          style={{ color: "var(--naga)" }}
        >
          Folio · Contact
        </p>
        <h1
          className="mt-4 font-journal text-5xl leading-[1.05] md:text-7xl"
          style={{ color: "var(--naga-deep)" }}
        >
          Send a word.
        </h1>
        <p className="mt-6 max-w-2xl font-journal text-lg italic text-foreground/80">
          Reach out for inquiries, reservations, or simply to leave a message at the hearth.
        </p>

        <div className="mt-16 grid gap-16 md:grid-cols-2">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {submitted ? (
              <div className="vellum-card flex h-full min-h-[300px] flex-col items-center justify-center rounded-sm p-8 text-center border border-border/60 bg-vellum/40">
                <p className="font-journal text-2xl" style={{ color: "var(--naga)" }}>
                  Message Received.
                </p>
                <p className="mt-4 font-journal text-muted-foreground">
                  Your word has reached the hearth. We will write back soon.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 font-journal text-xs uppercase tracking-[0.3em] transition-opacity hover:opacity-80"
                  style={{ color: "var(--naga)" }}
                >
                  ← Send another
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="vellum-card space-y-6 rounded-sm border border-border/60 bg-vellum/40 p-8"
              >
                <label className="block">
                  <span className="font-journal text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                    Name
                  </span>
                  <input
                    type="text"
                    required
                    className="input-line mt-2 w-full bg-transparent font-journal text-lg"
                    placeholder="Your name"
                  />
                </label>
                
                <label className="block">
                  <span className="font-journal text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                    Email
                  </span>
                  <input
                    type="email"
                    required
                    className="input-line mt-2 w-full bg-transparent font-journal text-lg"
                    placeholder="Your email address"
                  />
                </label>

                <label className="block">
                  <span className="font-journal text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                    Subject
                  </span>
                  <input
                    type="text"
                    required
                    className="input-line mt-2 w-full bg-transparent font-journal text-lg"
                    placeholder="What is this regarding?"
                  />
                </label>

                <label className="block">
                  <span className="font-journal text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                    Message
                  </span>
                  <textarea
                    required
                    rows={4}
                    className="input-line mt-2 w-full resize-none bg-transparent font-journal text-lg"
                    placeholder="Write your message here..."
                  />
                </label>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="font-journal text-sm uppercase tracking-[0.3em] transition-colors hover:opacity-80"
                    style={{ color: "var(--naga)" }}
                  >
                    Send to the hearth →
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-12"
          >
            <div>
              <h2 className="font-journal text-xs uppercase tracking-[0.4em] text-muted-foreground">
                Location
              </h2>
              <div className="mt-4 space-y-1 font-journal text-xl">
                <p>The Heritage Hearth</p>
                <p>Officer's Hill, Kohima</p>
                <p>Nagaland 797001, India</p>
              </div>
            </div>

            <div>
              <h2 className="font-journal text-xs uppercase tracking-[0.4em] text-muted-foreground">
                Direct Line
              </h2>
              <div className="mt-4 space-y-2 font-journal text-xl">
                <p>
                  <a href="mailto:hello@heritagehearth.com" className="hover:opacity-80 transition-opacity" style={{ color: "var(--naga)" }}>
                    hello@heritagehearth.com
                  </a>
                </p>
                <p>+91 98765 43210</p>
              </div>
            </div>

            <div className="rounded-sm border border-border/60 bg-vellum/20 p-6">
              <h3 className="font-journal text-lg" style={{ color: "var(--naga)" }}>
                Visiting Hours
              </h3>
              <p className="mt-2 font-journal italic text-muted-foreground">
                Our hearth is always warm, but for specific inquiries, our reception is open from 8:00 AM to 8:00 PM IST.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
