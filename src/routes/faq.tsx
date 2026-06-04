import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — The Heritage Hearth" },
      {
        name: "description",
        content: "Frequently asked questions about The Heritage Hearth.",
      },
    ],
  }),
  component: FAQPage,
});

const faqs = [
  {
    question: "What are the check-in and check-out times?",
    answer:
      "Check-in is from 2:00 PM onwards, and check-out is until 11:00 AM. If you require early check-in or late check-out, please contact us in advance, and we will do our best to accommodate your request based on availability.",
  },
  {
    question: "Do you offer airport transportation?",
    answer:
      "Yes, we offer airport transfers from Dimapur Airport. Please contact our concierge at least 48 hours before your arrival to arrange your pickup. Additional charges may apply.",
  },
  {
    question: "Is breakfast included in the room rate?",
    answer:
      "Yes, a complimentary traditional Naga or Continental breakfast is included with all room reservations.",
  },
  {
    question: "Are pets allowed at The Heritage Hearth?",
    answer:
      "While we love animals, to maintain the tranquility and specific heritage standards of our property, we do not allow pets at this time.",
  },
  {
    question: "Do you accommodate dietary restrictions?",
    answer:
      "Absolutely. Our kitchen is well-equipped to handle various dietary requirements, including vegetarian, vegan, and gluten-free. Please let us know your preferences when booking or upon arrival.",
  },
  {
    question: "What is the cancellation policy?",
    answer:
      "Reservations can be cancelled free of charge up to 7 days prior to arrival. Cancellations made within 7 days of arrival will be subject to a one-night room charge.",
  },
  {
    question: "Do you offer guided tours of Kohima?",
    answer:
      "Yes, we organize bespoke cultural and historical tours, including visits to the Kohima War Cemetery, local villages, and the Kisama Heritage Village. Please speak with our reception to book a tour.",
  },
];

function FAQPage() {
  return (
    <section className="relative px-6 py-24 md:px-16">
      <div className="mx-auto max-w-4xl">
        <p
          className="font-journal text-xs uppercase tracking-[0.45em]"
          style={{ color: "var(--naga)" }}
        >
          Information
        </p>
        <h1
          className="mt-4 font-journal text-5xl leading-[1.05] md:text-7xl"
          style={{ color: "var(--naga-deep)" }}
        >
          Help & FAQ.
        </h1>
        <p className="mt-6 max-w-2xl font-journal text-lg italic text-foreground/80">
          Find answers to the most common questions about staying at The Heritage Hearth.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="vellum-card border border-border/60 bg-vellum/40 px-6 py-2 rounded-sm"
              >
                <AccordionTrigger className="font-journal text-xl hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-journal text-lg italic text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <div className="mt-24 border-t border-border/40 pt-16">
          <h2
            className="text-center font-journal text-3xl"
            style={{ color: "var(--naga-deep)" }}
          >
            Need further assistance?
          </h2>
          <p className="mt-4 text-center font-journal text-lg text-muted-foreground">
            Select the nature of your query below.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="vellum-card flex flex-col items-center justify-between border border-border/60 bg-vellum/40 p-8 text-center rounded-sm">
              <div>
                <h3 className="font-journal text-xl" style={{ color: "var(--naga)" }}>
                  Booking Queries
                </h3>
                <p className="mt-4 font-journal text-sm text-muted-foreground">
                  Questions about new or existing room reservations.
                </p>
              </div>
              <a
                href="mailto:reservations@heritagehearth.com"
                className="mt-6 inline-block font-journal text-xs uppercase tracking-[0.2em] transition-opacity hover:opacity-80"
                style={{ color: "var(--naga)" }}
              >
                Click here →
              </a>
            </div>

            <div className="vellum-card flex flex-col items-center justify-between border border-border/60 bg-vellum/40 p-8 text-center rounded-sm">
              <div>
                <h3 className="font-journal text-xl" style={{ color: "var(--naga)" }}>
                  Event Planning
                </h3>
                <p className="mt-4 font-journal text-sm text-muted-foreground">
                  Inquiries about hosting weddings, conferences, or private gatherings.
                </p>
              </div>
              <a
                href="mailto:events@heritagehearth.com"
                className="mt-6 inline-block font-journal text-xs uppercase tracking-[0.2em] transition-opacity hover:opacity-80"
                style={{ color: "var(--naga)" }}
              >
                Click here →
              </a>
            </div>

            <div className="vellum-card flex flex-col items-center justify-between border border-border/60 bg-vellum/40 p-8 text-center rounded-sm">
              <div>
                <h3 className="font-journal text-xl" style={{ color: "var(--naga)" }}>
                  General Support
                </h3>
                <p className="mt-4 font-journal text-sm text-muted-foreground">
                  Other questions, feedback, or special requests during your stay.
                </p>
              </div>
              <a
                href="/contact"
                className="mt-6 inline-block font-journal text-xs uppercase tracking-[0.2em] transition-opacity hover:opacity-80"
                style={{ color: "var(--naga)" }}
              >
                Click here →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
