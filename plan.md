# EchoPilot Credential & Launch Plan

This guide walks through the exact order of operations required to ship the marketing site, build credibility, and secure every API credential (with an emphasis on Google Business Profile approval).

---

## Product Experience & Hosting Snapshot
1. `echopilot.me` (Vercel, static Next.js build) serves the marketing story and funnels traffic to `https://app.echopilot.me`.
2. `app.echopilot.me` (Vercel, Next.js 15) handles signup/login via NextAuth (email + Google) before any Google connection screens appear.
3. Onboarding connects Google Business Profile, lets the user pick locations, and captures their brand brief (tone sliders, signature, taboo phrases, USP snippets).
4. Stripe Checkout starts a trial and gates the automation toggle so auto-replies only run for paying accounts.
5. The Fastify API on Railway ingests Google Pub/Sub review events, calls OpenAI with the stored brand brief, and posts replies back via the GBP API.
6. The dashboard shows queue status, allows manual edits, and keeps subscription state in sync with Stripe.

---

## Phase 0 – Public Presence Prep

**Goal:** Prove EchoPilot is a real product before talking to Google.

**Checklist**
1. **Ship the marketing site**
   - Launch the Next.js landing page on `https://echopilot.me`.
   - Include hero, how-it-works, pricing, and real contact info.
   - Link privacy policy + terms; reviewers always check for these.
   - Primary CTA → `https://app.echopilot.me` so reviewers see the authenticated experience.
2. **Capture artifacts**
   - Take screenshots of hero, pricing, and contact sections.
   - Export a one-pager using copy from `brand.md`.
3. **Publish brand assets**
   - Upload the logo/icon everywhere (site + socials) for consistency.
4. **Provision hosting + auth**
   - Create two Vercel projects: `app.echopilot.me` for the authenticated app (NextAuth + API routes) and `echopilot.me` for the marketing site.
   - Wire NextAuth Google provider in test mode, confirm login flow works even with mocked data, and set up preview deployments for both surfaces.

**Deliverables:** live marketing site + screenshots + brand asset pack.

---

## Phase 1 – Google Business Profile Setup

**Goal:** Operate a verified, healthy GBP that matches the new site.

**Checklist**
1. **Create/verify the profile**
   - Go to https://business.google.com/ and claim or create HQ.
   - Add accurate address, phone, website (point to `echopilot.me`), hours, and logo.
   - Complete verification (postcard, phone, or video) — expect a few days.
2. **Keep it active for 60+ days**
   - Post weekly updates, upload real photos, and respond to any review.
3. **Create an Organization Account**
   - Follow https://support.google.com/business/answer/9570286.
   - Invite your main Google account as an owner; this will submit the API app.
4. **Document everything**
   - Screenshot the dashboard proving verification + activity.
   - Save the public profile URL for the API form.

**Exit criteria:** Verified GBP that clearly links to the marketing site with proof-of-activity screenshots.

---

## Phase 2 – Apply for Business Profile API Access

**Goal:** Gain access to the core Business Profile API (not just Performance).

**Checklist**
1. **Collect required info**
   - Cloud project: `echopilot-prod` (note project number too).
   - Business Profile URL + verification screenshots.
2. **Fill out the GBP API contact form**
   - https://developers.google.com/my-business/content/prereqs → “GBP API contact form”.
   - Select “Application for Basic API Access”.
   - Use-case description: EchoPilot obtains user OAuth consent, automates human-grade replies, stores data securely, and complies with policies.
   - Submit using the Google account that owns the Business Profile.
3. **Monitor the approval**
   - Expect a few business days; reply quickly to any follow-up email.
   - Watch APIs & Services → Dashboard; “Business Profile API” jumps from 0 QPM to 300 QPM when approved.
4. **Enable APIs after approval**
   - Enable both “Business Profile API” and “Business Profile Performance API”.
   - Grant the service account the “Business Profile API User” role.

**Exit criteria:** API enabled with quota >0, service account permissioned.

---

## Phase 3 – Provision Platform Credentials

**Goal:** Have every integration ready the moment API access lands.

### 3.1 Google Cloud OAuth + Pub/Sub
- Confirm project `echopilot-prod`.
- Enable: Business Profile API, Business Profile Performance API, Pub/Sub.
- OAuth consent screen: External, scope `https://www.googleapis.com/auth/business.manage`, add test users.
- OAuth client (Web):
  - Redirect URIs: `https://api.echopilot.me/auth/google/callback`, `http://localhost:4000/auth/google/callback`.
  - Store as `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`.
- Service account `echopilot-review-bot`:
  - Roles: Business Profile API User, Business Profile Performance API User, Pub/Sub Subscriber.
  - Download JSON key (`GOOGLE_APPLICATION_CREDENTIALS_JSON`).
- Pub/Sub:
  - Topic `reviews-events`.
  - Push subscription `reviews-events-sub` → `https://api.echopilot.me/reviews/pubsub` (ngrok locally).
  - Grant subscriber access to the service account.
- Testing: publish sample messages to confirm the webhook + queue pipeline.

```
DATABASE_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GCP_PROJECT_ID=
GCP_PUBSUB_TOPIC=reviews-events
GCP_PUBSUB_SUBSCRIPTION=reviews-events-sub
GOOGLE_APPLICATION_CREDENTIALS_JSON=
STRIPE_SECRET_KEY=
OPENAI_API_KEY=
APP_WEB_ORIGIN=
APP_API_ORIGIN=
LOG_LEVEL=info
```

### 3.2 Stripe Keys & Products
- Switch Stripe dashboard to “Test mode”.
- Copy publishable + secret keys (`NEXT_PUBLIC_STRIPE_KEY`, `STRIPE_SECRET_KEY`).
- Create Products “Starter/Standard/Pro” with $9/$19/$29 monthly prices; capture price IDs.
- Webhook endpoint `https://api.echopilot.me/api/stripe/webhook` (use ngrok locally).
- Subscribe to `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`.
- Store signing secret as `STRIPE_WEBHOOK_SECRET`.

### 3.3 OpenAI Responses API
- In platform.openai.com, note `OPENAI_ORG_ID`.
- Create project “EchoPilot Production”, note `OPENAI_PROJECT_ID`.
- Generate project-scoped key (`OPENAI_API_KEY`), confirm billing is enabled.
- Test with a sample `curl` to `/v1/responses`.

### 3.4 Supabase Postgres
- Create Supabase project `echopilot-db`, choose region near target users.
- Use generated password in `DATABASE_URL=postgresql://postgres:<pwd>@db.<hash>.supabase.co:6543/postgres`.
- Copy anon + service role keys for future features (store securely).
- Enable daily backups.
- Test via `npx prisma migrate dev`.
- Extend the schema with a `brand_brief` JSON column (tone, signature, taboo phrases, preferred openings/closings) so OpenAI replies always reference customer-specific guidance.

### 3.5 Cloudflare Queues (preferred queue)
- In Cloudflare dashboard, create queue `review-processing`.
- Bind to Workers/Pages via `wrangler`:
  ```
  wrangler queues create review-processing
  ```
  Add binding in `wrangler.toml`:
  ```
  [[queues.producers]]
  binding = "REVIEW_QUEUE"
  queue = "review-processing"
  ```
- Decide on consumer:
  - Option A: Cloudflare Worker that calls Fastify.
  - Option B: Railway/Fly worker pulling from the queue API.

### 3.6 Secrets Management Checklist
- Store every key in your password manager + environment-specific stores:
  - GitHub Actions secrets.
  - Railway/Fly project variables.
  - Vercel project environment vars.
- Maintain `.env.example` with placeholder names only.
- Rotate keys annually or when collaborators change.

---

## Project Execution Milestones

1. **Week 1**
   - Finalize brand assets, ship marketing site, start Supabase/Stripe/OpenAI setup.
2. **Week 2**
   - Create/verify Google Business Profile + Organization account.
3. **Week 3**
   - Submit Business Profile API application; continue backend/frontend scaffolding with mock provider.
4. **Week 4**
   - Expect approval; enable APIs, wire real Google integrations, run end-to-end tests.

---

## Ready to Move Forward

With this plan, we know exactly what to do—and in what order—to secure GBP access and every other credential. Once Phase 0 (site live) and Phase 1 (profile verified) are done, we can submit the API application and continue building the product in parallel.

---

## Appendix A – Business Profile API Approval Notes

- By default you only see the Performance API; the core Business Profile API is hidden until Google approves your project (gated since 2023).
- Submit the access form at https://developers.google.com/my-business/content/prereqs using the account tied to `echopilot-prod`.
- Use-case talking points:
  - EchoPilot obtains OAuth consent from verified business owners.
  - Replies are human-style, reviewed, and policy compliant.
  - Data is stored securely (Supabase + encrypted secrets).
- After approval:
  - Go to Google Cloud Console → APIs & Services → Library, search for “Business Profile API”, and click Enable.
  - Grant the service account the “Business Profile API User” role; no new OAuth scopes needed (`business.manage` already covers it).
- While waiting:
  - You can still build against the Performance API for metrics and mocks for review payloads.
  - Implement the end-to-end flow with mock providers so launching is just a credential swap once approval arrives.