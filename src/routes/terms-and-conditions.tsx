import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — The Heritage Hearth" },
      {
        name: "description",
        content: "Read the Terms and Conditions for using The Heritage Hearth website and services.",
      },
    ],
  }),
  component: TermsAndConditionsPage,
});

const terms = [
  {
    title: "1. Agreement to Terms",
    content: (
      <p>
        By accessing our website and utilizing our services, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to these terms, please do not use our services.
      </p>
    ),
  },
  {
    title: "2. Use of Services",
    content: (
      <>
        <p>
          You agree to use our website and services only for lawful purposes and in a manner that does not infringe the rights of, or restrict or inhibit the use and enjoyment of, this site by any third party.
        </p>
        <p className="mt-2">
          Prohibited behavior includes harassing or causing distress or inconvenience to any person, transmitting obscene or offensive content, or disrupting the normal flow of dialogue within our services.
        </p>
      </>
    ),
  },
  {
    title: "3. Intellectual Property",
    content: (
      <p>
        All content included on the website, such as text, graphics, logos, images, audio clips, and software, is the property of The Heritage Hearth or its content suppliers and is protected by Indian and international copyright laws.
      </p>
    ),
  },
  {
    title: "4. Limitation of Liability",
    content: (
      <p>
        The Heritage Hearth will not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to, or use of, our website or services. All information is provided "as is" without warranty of any kind.
      </p>
    ),
  },
  {
    title: "5. Governing Law",
    content: (
      <p>
        These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes relating to these terms shall be subject to the exclusive jurisdiction of the courts of Kohima, Nagaland.
      </p>
    ),
  },
  {
    title: "6. Changes to Terms",
    content: (
      <p>
        We reserve the right to update or modify these Terms and Conditions at any time without prior notice. Your continued use of the website following any changes constitutes your acceptance of the new Terms.
      </p>
    ),
  },
];

function TermsAndConditionsPage() {
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
          Terms & Conditions.
        </h1>
        <p className="mt-6 max-w-2xl font-journal text-lg italic text-foreground/80">
          Please read these terms carefully before using our website and services.
        </p>
        <p className="mt-2 font-journal text-sm text-muted-foreground">
          Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <div className="mt-16 space-y-12">
          {terms.map((term, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h2 className="font-journal text-2xl" style={{ color: "var(--naga-deep)" }}>
                {term.title}
              </h2>
              <div className="mt-4 font-journal text-lg text-foreground/80 leading-relaxed">
                {term.content}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 border-t border-border/40 pt-16 text-center">
          <p className="font-journal text-lg text-muted-foreground">
            For any legal inquiries or clarifications:
          </p>
          <a
            href="mailto:legal@heritagehearth.com"
            className="mt-4 inline-block font-journal text-sm uppercase tracking-[0.3em] transition-colors hover:opacity-80"
            style={{ color: "var(--naga)" }}
          >
            legal@heritagehearth.com →
          </a>
        </div>
      </div>
    </section>
  );
}
