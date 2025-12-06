import type { Metadata } from "next";

type PrivacySection = {
  heading: string;
  content?: string;
  items?: { title: string; body: string }[];
};

export const metadata: Metadata = {
  title: "Privacy Policy",
};

const sections: PrivacySection[] = [
  {
    heading: "1. Information We Collect",
    items: [
      {
        title: "Waitlist Information",
        body: "If you join the waitlist, we collect your email address only.",
      },
      {
        title: "Google OAuth Data",
        body: "When connecting your Google Business Profile, we may access your business locations, reviews for those locations, and authorization tokens needed to post replies. We do not access emails, contacts, calendars, or unrelated Google data.",
      },
      {
        title: "Usage Information",
        body: "We collect basic analytics such as page views and reply counts.",
      },
    ],
  },
  {
    heading: "2. How We Use Your Information",
    content:
      "We use your information to generate and post review replies, provide onboarding and support, improve product performance, and communicate important updates. We do not sell or share your data with third parties.",
  },
  {
    heading: "3. AI Processing",
    content:
      "Review content and draft replies may be transmitted to OpenAI for language generation. No personally identifiable user data is included beyond review text.",
  },
  {
    heading: "4. Data Storage & Security",
    content:
      "Data is stored securely with industry-standard encryption. Access is limited to authorized systems and personnel.",
  },
  {
    heading: "5. Disconnecting Your Account",
    content:
      "You may revoke EchoPilot’s Google access at any time from your Google Account settings.",
  },
  {
    heading: "6. Your Rights",
    content:
      "You may request data deletion, access to stored information, or termination of your account by emailing privacy@echopilot.me.",
  },
  {
    heading: "7. Changes",
    content:
      "We will update this policy if our data practices change and will note the effective date above.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="bg-white text-navy">
      <div className="container space-y-8 py-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-teal">
            Privacy Policy
          </p>
          <h1 className="mt-4 text-4xl font-semibold">EchoPilot Privacy Policy</h1>
          <p className="mt-4 text-sm text-navy/70">Last updated: January 2025</p>
          <p className="mt-6 text-lg text-navy/80">
            EchoPilot respects your privacy and handles data responsibly.
          </p>
        </div>

        <div className="space-y-6 text-base text-navy/80">
          {sections.map((section) => (
            <section key={section.heading} className="space-y-3">
              <div>
                <h2 className="text-xl font-semibold">{section.heading}</h2>
                {section.content && <p className="mt-2">{section.content}</p>}
              </div>
              {section.items && (
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <div key={item.title}>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-navy/80">{item.body}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

