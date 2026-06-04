import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/cookie-policy")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — The Heritage Hearth" },
      {
        name: "description",
        content: "Understand how The Heritage Hearth uses cookies to improve your browsing experience.",
      },
    ],
  }),
  component: CookiePolicyPage,
});

const policies = [
  {
    title: "1. What Are Cookies?",
    content: (
      <p>
        Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide a better, more personalized experience for the user.
      </p>
    ),
  },
  {
    title: "2. How We Use Cookies",
    content: (
      <>
        <p>We use cookies for several purposes, including:</p>
        <ul className="mt-2 list-inside list-disc space-y-1">
          <li><strong>Essential Cookies:</strong> Required for the basic operation of our website, such as secure login and booking processes.</li>
          <li><strong>Performance Cookies:</strong> Allow us to analyze how visitors use our site, helping us to improve website performance and functionality.</li>
          <li><strong>Functional Cookies:</strong> Used to recognize you when you return to our website and remember your preferences (like language or region selection).</li>
          <li><strong>Targeting Cookies:</strong> These cookies record your visit, the pages you have visited, and the links you have followed, to make our advertising more relevant to your interests.</li>
        </ul>
      </>
    ),
  },
  {
    title: "3. Third-Party Cookies",
    content: (
      <p>
        In some special cases, we also use cookies provided by trusted third parties, such as Google Analytics, to help us understand how you use the site and ways we can improve your experience. These third parties may track things such as how long you spend on the site and the pages that you visit.
      </p>
    ),
  },
  {
    title: "4. Managing Your Cookie Preferences",
    content: (
      <>
        <p>
          You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website, but your access to some functionality and areas of our site may be restricted.
        </p>
        <p className="mt-2">
          As the means by which you can refuse cookies through your web browser controls vary from browser to browser, you should visit your browser's help menu for more information.
        </p>
      </>
    ),
  },
  {
    title: "5. Updates to This Policy",
    content: (
      <p>
        We may update this Cookie Policy from time to time to reflect changes to the cookies we use or for other operational, legal, or regulatory reasons. Please revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
      </p>
    ),
  },
];

function CookiePolicyPage() {
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
          Cookie Policy.
        </h1>
        <p className="mt-6 max-w-2xl font-journal text-lg italic text-foreground/80">
          Information on how we use cookies and similar technologies to enhance your visit.
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
            Still have questions about our use of cookies?
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
