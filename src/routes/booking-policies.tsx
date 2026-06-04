import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/booking-policies")({
  head: () => ({
    meta: [
      { title: "Booking Policies — The Heritage Hearth" },
      {
        name: "description",
        content: "Read the reservation, cancellation, and stay policies for The Heritage Hearth.",
      },
    ],
  }),
  component: BookingPoliciesPage,
});

const policies = [
  {
    title: "Check-in & Check-out",
    content: (
      <>
        <p>
          <strong>Check-in:</strong> 2:00 PM onwards<br />
          <strong>Check-out:</strong> 11:00 AM
        </p>
        <p className="mt-2">
          Early check-in and late check-out are subject to availability and may incur additional charges. Please inform us in advance if you plan to arrive outside of standard hours so we can prepare the hearth for you.
        </p>
      </>
    ),
  },
  {
    title: "Payment & Reservation",
    content: (
      <>
        <p>
          A 50% advance payment of the total booking amount is required to confirm your reservation. The remaining balance must be settled upon arrival during check-in.
        </p>
        <p className="mt-2">
          We accept major credit cards, debit cards, UPI, and bank transfers. All rates are subject to applicable government taxes.
        </p>
      </>
    ),
  },
  {
    title: "Cancellation & Modifications",
    content: (
      <>
        <ul className="list-inside list-disc space-y-1">
          <li><strong>Up to 7 days before arrival:</strong> Cancellations or modifications are free of charge. Full refund of the advance payment.</li>
          <li><strong>Within 7 days of arrival:</strong> Cancellations will incur a penalty equal to a one-night stay charge.</li>
          <li><strong>No-shows or Early Departures:</strong> 100% of the total booking amount will be charged.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Identification Requirements",
    content: (
      <>
        <p>
          As per government regulations, a valid original photo ID is mandatory for all guests (including children) at the time of check-in.
        </p>
        <ul className="mt-2 list-inside list-disc space-y-1">
          <li><strong>Indian Nationals:</strong> Aadhaar Card, Driving License, Voter ID, or Passport. (PAN Cards are not accepted as valid ID for check-in).</li>
          <li><strong>Foreign Nationals:</strong> Valid Passport and Visa are mandatory.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Children & Extra Beds",
    content: (
      <>
        <p>
          Children under 6 years of age stay free of charge when using existing bedding. For children aged 6 to 12 years, an extra bed can be provided at 50% of the standard extra bed rate. Guests above 12 years are considered adults.
        </p>
        <p className="mt-2">
          Please request extra beds at the time of booking to ensure availability.
        </p>
      </>
    ),
  },
  {
    title: "Property Guidelines",
    content: (
      <>
        <ul className="list-inside list-disc space-y-1">
          <li><strong>Smoking:</strong> All rooms and enclosed public areas are strictly non-smoking. Designated smoking areas are available on the grounds.</li>
          <li><strong>Pets:</strong> To ensure a quiet and pristine environment, pets are currently not allowed.</li>
          <li><strong>Damages:</strong> Guests are liable for any damage or loss caused to the hotel property during their stay.</li>
        </ul>
      </>
    ),
  },
];

function BookingPoliciesPage() {
  return (
    <section className="relative px-6 py-24 md:px-16">
      <div className="mx-auto max-w-4xl">
        <p
          className="font-journal text-xs uppercase tracking-[0.45em]"
          style={{ color: "var(--naga)" }}
        >
          Legal & Support
        </p>
        <h1
          className="mt-4 font-journal text-5xl leading-[1.05] md:text-7xl"
          style={{ color: "var(--naga-deep)" }}
        >
          Booking Policies.
        </h1>
        <p className="mt-6 max-w-2xl font-journal text-lg italic text-foreground/80">
          Our guidelines ensure that every guest experiences the tranquility and warmth of The Heritage Hearth.
        </p>

        <div className="mt-16 space-y-12">
          {policies.map((policy, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="vellum-card border border-border/60 bg-vellum/40 p-8 rounded-sm"
            >
              <h2 className="font-journal text-2xl" style={{ color: "var(--naga)" }}>
                {policy.title}
              </h2>
              <div className="mt-4 font-journal text-lg text-foreground/80 leading-relaxed">
                {policy.content}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 border-t border-border/40 pt-16 text-center">
          <p className="font-journal text-lg text-muted-foreground">
            Have questions about our policies?
          </p>
          <a
            href="/contact"
            className="mt-4 inline-block font-journal text-sm uppercase tracking-[0.3em] transition-colors hover:opacity-80"
            style={{ color: "var(--naga)" }}
          >
            Contact the Hearth →
          </a>
        </div>
      </div>
    </section>
  );
}
