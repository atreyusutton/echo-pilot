import Image from "next/image";
import Link from "next/link";
import { WaitlistForm } from "@/components/waitlist-form";

const industries = [
  "Restaurants",
  "Salons",
  "Gyms",
  "Automotive",
  "Airbnb Operators",
];

const credibilityIndicators = [
  "Built with Google Business Profile API requirements in mind",
  "Privacy-first architecture",
  "Owner-controlled approvals during review periods",
];

const workflowSteps = [
  {
    title: "Step 1 — Connect",
    description:
      "Securely sign in with Google, pick your verified locations, and grant the single scope we need: business.manage.",
  },
  {
    title: "Step 2 — Set tone",
    description:
      "Choose from tone presets (Friendly, Professional, Neutral, Playful, Apologetic), drop in your signature, and add any taboo phrases we should avoid.",
  },
  {
    title: "Step 3 — Autopilot",
    description:
      "EchoPilot drafts thoughtful owner replies, lets you require manual approvals during verification periods, and posts via Google’s approved API workflow.",
  },
];

const featureBlocks = [
  {
    title: "Human-quality replies",
    bullets: [
      "Learns your tone and writing style",
      "Keeps replies under four sentences",
      "Never references AI",
    ],
  },
  {
    title: "Real-time monitoring",
    bullets: [
      "Listens for new reviews instantly",
      "Sends optional alerts before posting",
      "Works around the clock",
    ],
  },
  {
    title: "Analytics built for owners",
    bullets: [
      "Review feed you can triage quickly",
      "Sentiment tagging and keyword insights",
      "Activity log to support Google API verification",
    ],
  },
  {
    title: "Compliance-first workflow",
    bullets: [
      "Full transparency across every reply",
      "Manual approval mode when you need it",
      "Detailed logs to back up verification",
    ],
  },
];

const plans = [
  {
    name: "Starter",
    price: "$19/mo",
    tagline: "For solo owners",
    includes: [
      "1 location",
      "Unlimited replies",
      "Tone controls + signature",
      "Manual approval mode",
    ],
  },
  {
    name: "Standard",
    price: "$39/mo",
    tagline: "For SMBs",
    includes: [
      "Up to 3 locations",
      "Weekly review digest",
      "Sentiment & keyword tagging",
      "Priority posting speed",
    ],
    featured: true,
  },
  {
    name: "Pro",
    price: "$79/mo",
    tagline: "For multi-location teams",
    includes: [
      "Up to 10 locations",
      "Multi-user dashboard",
      "Priority processing",
      "Exportable audit logs",
    ],
  },
];

const faqs = [
  {
    question: "Do I need a Google Business Profile?",
    answer:
      "Yes. EchoPilot only connects to verified Google Business Profiles so we can meet the Business Profile API requirements.",
  },
  {
    question: "Can I edit replies?",
    answer:
      "Absolutely. You can require manual approval for every reply until you’re ready to enable full autopilot.",
  },
  {
    question: "Will my account be charged before launch?",
    answer:
      "No. We won’t charge anything until Google grants Business Profile API access and the beta rollout begins.",
  },
  {
    question: "Does EchoPilot support Yelp or Facebook?",
    answer:
      "Not yet. The initial launch focuses exclusively on Google so we can stay compliant during the approval process.",
  },
];

export default function Home() {
  return (
    <div className="bg-white text-navy">
      <header className="border-b border-soft-gray/70 bg-white/90 backdrop-blur">
        <div className="container">
          <nav className="flex flex-wrap items-center justify-between gap-4 py-6 text-sm font-medium text-navy/80">
            <div className="flex items-center gap-3">
              <Image
                src="/assets/logo.png"
                alt="EchoPilot"
                width={160}
                height={42}
                priority
              />
              <span className="hidden text-sm uppercase tracking-widest text-teal md:inline">
                Review Autopilot
              </span>
            </div>
            <div className="hidden items-center gap-8 md:flex">
              <a href="#workflow" className="hover:text-navy">
                How it works
              </a>
              <a href="#features" className="hover:text-navy">
                Features
              </a>
              <a href="#pricing" className="hover:text-navy">
                Pricing
              </a>
              <a href="#faq" className="hover:text-navy">
                FAQ
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/privacy"
                className="hidden text-xs text-navy/60 hover:text-navy/90 lg:inline"
              >
                Privacy
              </Link>
              <Link
                href="https://app.echopilot.me"
                className="inline-flex items-center rounded-full border border-teal/40 px-4 py-2 text-sm font-semibold text-navy transition hover:border-teal hover:bg-teal/10"
              >
                Go to app →
              </Link>
            </div>
          </nav>

          <div className="grid gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_500px] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-soft-gray px-4 py-1 text-xs font-semibold uppercase tracking-widest text-teal">
                Human replies on autopilot
              </p>
              <h1 className="mt-6 text-4xl font-semibold leading-tight text-navy md:text-5xl">
                Human replies for every Google review.
              </h1>
              <p className="mt-4 text-lg text-navy/80">
                EchoPilot connects to your verified Google Business Profile,
                learns your tone, and keeps every reviewer acknowledged—so your
                business stays active, responsive, and trustworthy.
              </p>
              <ul className="mt-6 space-y-3 text-base text-navy/80">
                {[
                  "Connects in minutes with secure Google OAuth",
                  "Under-four-sentence replies that sound like you",
                  "Manual approval controls whenever you need them",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-teal" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10 max-w-2xl">
                <WaitlistForm />
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-navy/70">
                <Link
                  href="#workflow"
                  className="inline-flex items-center gap-2 font-semibold text-teal"
                >
                  See how it works
                  <span aria-hidden>↘︎</span>
                </Link>
                <span>Or head straight to the app at app.echopilot.me</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-3xl bg-soft-gray blur-3xl" />
              <div className="relative overflow-hidden rounded-3xl border border-white/60 shadow-card">
                <video
                  src="/assets/process.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section id="social-proof" className="border-b border-soft-gray/70 py-16">
          <div className="container text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-navy/70">
              Trusted by early testers in
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-base font-medium text-navy/80">
              {industries.map((industry, index) => (
                <div key={industry} className="flex items-center gap-4">
                  <span>{industry}</span>
                  {index !== industries.length - 1 && (
                    <Image
                      src="/assets/icon_only_logo.png"
                      alt=""
                      width={20}
                      height={20}
                      className="opacity-60"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {credibilityIndicators.map((indicator) => (
                <div
                  key={indicator}
                  className="rounded-2xl border border-soft-gray bg-white px-6 py-5 text-sm text-navy/80 shadow-sm"
                >
                  {indicator}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="workflow" className="py-20">
          <div className="container grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <Image
                src="/assets/stacked_logo.png"
                alt="EchoPilot stacked logo"
                width={120}
                height={120}
              />
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-teal">
                  How it works
                </p>
                <h2 className="mt-4 text-4xl font-semibold leading-tight">
                  Always-on autopilot with human warmth.
                </h2>
                <p className="mt-4 text-lg text-navy/80">
                  Every step is built around Google’s policies so you can prove
                  compliance while delivering the fast, thoughtful replies
                  customers expect.
                </p>
              </div>
              <div className="space-y-6">
                {workflowSteps.map((step) => (
                  <div
                    key={step.title}
                    className="rounded-2xl border border-soft-gray bg-white/90 p-6 shadow-sm"
                  >
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <p className="mt-2 text-navy/80">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6 rounded-3xl border border-soft-gray bg-soft-gray/60 p-8 shadow-inner">
              <Image
                src="/assets/flow.png"
                alt="EchoPilot workflow diagram"
                width={640}
                height={520}
                className="w-full rounded-2xl border border-white shadow"
              />
              <div className="rounded-2xl bg-white/90 p-6 text-sm text-navy/80 shadow-card">
                <p className="font-semibold uppercase tracking-[0.3em] text-teal">
                  Tone presets
                </p>
                <p className="mt-3">
                  Choose the tone that mirrors your brand voice and tweak it at
                  any time. We blend your signature, taboo phrases, and service
                  recovery preferences into every reply.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Friendly", "Professional", "Neutral", "Playful", "Apologetic"].map(
                    (tone) => (
                      <span
                        key={tone}
                        className="rounded-full border border-soft-gray px-3 py-1 text-xs font-semibold text-navy/80"
                      >
                        {tone}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="bg-soft-gray/60 py-20">
          <div className="container">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-teal">
                Features
              </p>
              <h2 className="mt-3 text-4xl font-semibold">
                Built for owners who never want to miss a review.
              </h2>
              <p className="mt-4 text-lg text-navy/80">
                Everything in EchoPilot is designed to keep your Google
                Business Profile healthy, responsive, and ready for API
                approval.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {featureBlocks.map((feature) => (
                <div key={feature.title} className="rounded-2xl bg-white p-8 shadow-card">
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <ul className="mt-4 space-y-2 text-navy/80">
                    {feature.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-6 rounded-full bg-teal" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20">
          <div className="container">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-teal">
                Pricing
              </p>
              <h2 className="mt-4 text-4xl font-semibold">Pick the plan that fits today.</h2>
              <p className="mt-3 text-lg text-navy/80">
                No billing until Google Business Profile API approval is complete.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`flex h-full flex-col rounded-2xl border bg-white p-8 shadow-sm ${
                    plan.featured ? "border-teal shadow-card" : "border-soft-gray"
                  }`}
                >
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-navy/60">
                      {plan.tagline}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold">{plan.name}</h3>
                    <p className="mt-1 text-3xl font-bold">{plan.price}</p>
                  </div>
                  <ul className="mt-6 flex-1 space-y-3 text-navy/80">
                    {plan.includes.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-teal" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <span className="text-sm text-navy/60">
                      Cancel anytime. Charges begin post-approval.
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="border-y border-soft-gray/70 bg-white py-20">
          <div className="container">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-teal">
                FAQ
              </p>
              <h2 className="mt-3 text-4xl font-semibold">Answers for reviewers and owners.</h2>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-2xl border border-soft-gray p-6 shadow-sm">
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  <p className="mt-3 text-navy/80">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container grid gap-10 rounded-3xl border border-soft-gray bg-soft-gray/50 p-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-teal">
                Final call
              </p>
              <h2 className="mt-4 text-4xl font-semibold">
                Ready to put your review replies on autopilot?
              </h2>
              <p className="mt-3 text-lg text-navy/80">
                Join the waitlist and we’ll invite you as soon as the Google Business
                Profile team unlocks our production access.
              </p>
              <div className="mt-8 max-w-xl">
                <WaitlistForm />
              </div>
              <p className="mt-4 text-sm text-navy/70">
                Prefer to talk to a human? Email{" "}
                <a
                  className="font-semibold text-teal"
                  href="mailto:hello@echopilot.me"
                >
                  hello@echopilot.me
                </a>
                .
              </p>
            </div>
            <div className="rounded-3xl bg-white/90 p-8 shadow-card">
              <h3 className="text-lg font-semibold text-teal">Your autopilot pledge</h3>
              <p className="mt-3 text-sm text-navy/80">
                EchoPilot blends warm human replies with trustworthy automation:
              </p>
              <ul className="mt-4 space-y-3 text-sm text-navy/80">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-accent-lime" />
                  <span>Replies stay under four sentences and never mention AI.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-accent-lime" />
                  <span>Manual approval mode plus a full audit trail for reviewers.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-accent-lime" />
                  <span>Privacy-first architecture across app, API, and data storage.</span>
                </li>
              </ul>
              <p className="mt-6 text-sm text-navy/70">
                Contact:{" "}
                <a
                  href="mailto:hello@echopilot.me"
                  className="font-semibold text-teal"
                >
                  hello@echopilot.me
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-soft-gray/70 bg-white py-10 text-sm text-navy/70">
        <div className="container flex flex-col gap-4 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <p>© {new Date().getFullYear()} EchoPilot. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/terms" className="hover:text-navy">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-navy">
              Privacy Policy
            </Link>
            <Link
              href="https://app.echopilot.me"
              className="font-semibold text-teal"
            >
              Launch the app →
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
