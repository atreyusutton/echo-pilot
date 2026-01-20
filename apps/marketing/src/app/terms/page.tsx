import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
};

const sections = [
  {
    heading: "1. Service Description",
    content:
      "EchoPilot provides tools to help business owners draft and manage responses to customer reviews. During early access, functionality may be limited or require manual approval before replies are posted.",
  },
  {
    heading: "2. Beta Use",
    content:
      "EchoPilot is currently in a pre-launch or beta phase. Features may change, be unavailable, or require review before deployment. No uptime guarantees are provided during this stage.",
  },
  {
    heading: "3. Eligibility",
    content:
      "You must connect a verified Google Business Profile you own or administrate. You may not use EchoPilot to manage businesses you do not legally control.",
  },
  {
    heading: "4. Google Data & Permissions",
    content:
      "EchoPilot only requests permissions needed to view and respond to your business reviews. We never modify or access unrelated account data. You may disconnect access at any time.",
  },
  {
    heading: "5. Content Responsibility",
    content:
      "You are responsible for the final content of replies posted through EchoPilot. You may enable or disable autopilot at any time.",
  },
  {
    heading: "6. Payment & Billing",
    content:
      "Pricing is published on the EchoPilot site. No charges will be made until EchoPilot receives Google Business Profile API approval and general access begins. Subscriptions renew monthly and can be canceled anytime.",
  },
  {
    heading: "7. Acceptable Use",
    content:
      "You agree not to post harmful, offensive, or deceptive content, attempt to bypass Google API restrictions, or use EchoPilot for businesses you do not manage.",
  },
  {
    heading: "8. Limitation of Liability",
    content:
      "EchoPilot is provided “as-is” during beta. We are not liable for lost business, reputational harm, or integration failures.",
  },
  {
    heading: "9. Termination",
    content:
      "We may suspend or terminate accounts that violate these terms.",
  },
  {
    heading: "10. Changes",
    content:
      "We may update these Terms and will notify users when changes occur.",
  },
];

export default function TermsPage() {
  return (
    <div className="bg-white text-navy">
      <div className="container space-y-8 py-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-teal">
            Terms of Service
          </p>
          <h1 className="mt-4 text-4xl font-semibold">
            EchoPilot Terms of Service
          </h1>
          <p className="mt-4 text-sm text-navy/70">Last updated: January 2025</p>
          <p className="mt-6 text-lg text-navy/80">
            Welcome to EchoPilot. By accessing or using EchoPilot, you agree to
            the following Terms of Service.
          </p>
        </div>
        <div className="space-y-6 text-base text-navy/80">
          {sections.map((section) => (
            <section key={section.heading} className="space-y-2">
              <h2 className="text-xl font-semibold">{section.heading}</h2>
              <p>{section.content}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}


