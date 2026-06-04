import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — The Heritage Hearth" },
      {
        name: "description",
        content: "Learn how we collect, use, and protect your personal information at The Heritage Hearth.",
      },
    ],
  }),
  component: PrivacyPolicyPage,
});

const policies = [
  {
    title: "1. Information We Collect",
    content: (
      <>
        <p>
          When you make a reservation, subscribe to our newsletter, or contact us, we may collect personal information such as your name, email address, phone number, payment details, and any special requests you provide.
        </p>
        <p className="mt-2">
          We may also automatically collect non-identifiable information when you visit our website, including your IP address, browser type, and interaction data via cookies.
        </p>
      </>
    ),
  },
  {
    title: "2. How We Use Your Information",
    content: (
      <ul className="list-inside list-disc space-y-1">
        <li>To process and confirm your reservations.</li>
        <li>To communicate with you regarding your stay and respond to inquiries.</li>
        <li>To personalize and improve your experience at our property.</li>
        <li>To send you promotional offers and newsletters (only if you have opted in).</li>
        <li>To comply with legal and regulatory obligations.</li>
      </ul>
    ),
  },
  {
    title: "3. Information Sharing & Disclosure",
    content: (
      <p>
        We do not sell, trade, or rent your personal information to third parties. We may share your data with trusted service providers who assist us in operating our website, processing payments, or delivering services to you, provided they agree to keep this information confidential.
      </p>
    ),
  },
  {
    title: "4. Data Security",
    content: (
      <p>
        We implement a variety of security measures to maintain the safety of your personal information. However, please be aware that no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute absolute security.
      </p>
    ),
  },
  {
    title: "5. Your Rights",
    content: (
      <p>
        You have the right to access, correct, or delete your personal information held by us. You may also withdraw your consent for marketing communications at any time. To exercise these rights, please contact our support team.
      </p>
    ),
  },
  {
    title: "6. Changes to this Policy",
    content: (
      <p>
        We may update our Privacy Policy periodically. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy occasionally to stay informed about how we are protecting your information.
      </p>
    ),
  },
];

function PrivacyPolicyPage() {
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
          Privacy Policy.
        </h1>
        <p className="mt-6 max-w-2xl font-journal text-lg italic text-foreground/80">
          Your privacy is important to us. Learn how we handle your personal data with care.
        </p>
        <p className="mt-2 font-journal text-sm text-muted-foreground">
          Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <div className="mt-16 space-y-12">
          {policies.map((policy, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h2 className="font-journal text-2xl" style={{ color: "var(--naga-deep)" }}>
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
            Questions about our privacy practices?
          </p>
          <a
            href="mailto:privacy@heritagehearth.com"
            className="mt-4 inline-block font-journal text-sm uppercase tracking-[0.3em] transition-colors hover:opacity-80"
            style={{ color: "var(--naga)" }}
          >
            privacy@heritagehearth.com →
          </a>
        </div>
      </div>
    </section>
  );
}
