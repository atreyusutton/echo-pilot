
# EchoPilot – Technical & Business Blueprint

EchoPilot is a dual-surface product: a Vercel-hosted marketing funnel that pushes qualified traffic into a Vercel-hosted Next.js app, backed by a Fastify API and Supabase. This file maps the moving pieces so engineering, GTM, and ops stay aligned.

## Quick Links
- `plan.md` – step-by-step credential + launch plan.
- `brand.md` – visual system, messaging, onboarding inputs.
- `marketing_site_full.md` – content worksheet + legal copy for the public site.

## How EchoPilot Runs (End-to-End)
1. **Marketing visit** – Prospects land on the Vercel-hosted Next.js marketing page at `echopilot.me`, learn how the autopilot works, and hit the primary CTA that deep-links into the app.
2. **Login & account creation** – Users authenticate via email magic link or Google (NextAuth), which creates a user + subscription shell in Supabase.
3. **Connect Google Business Profile** – The app walks them through OAuth, requests the `business.manage` scope, lists available locations, and stores tokens & location metadata.
4. **Teach EchoPilot the brand** – Onboarding captures tone, signature, and any do/don’t rules. We also sync public GBP profile data so replies inherit the correct voice automatically.
5. **Activate billing** – Stripe Checkout starts a 14-day trial, then converts to one of the Starter/Standard/Pro plans before automated replies are enabled.
6. **Ingestion & reply pipeline** – Google review events hit Pub/Sub → Fastify → queue processor, which calls OpenAI, posts replies via the GBP API, and logs outcomes.
7. **Dashboard & notifications** – The dashboard shows status, allows manual overrides, and emails/slacks users when attention is required.

---

## Stack Overview

### Frontend
- **Next.js 15 (App Router)**
- TailwindCSS + shadcn/ui
- Authentication via NextAuth (Google + email magic link)
- Stripe Billing + customer portal
- Hosting: Two Vercel projects — `echopilot.me` (marketing) and `app.echopilot.me` (authenticated app) — so previews, server actions, and routing stay consistent.

### Backend
- **Fastify** (Node)
- Prisma ORM
- PostgreSQL (Supabase or Railway)
- Google Business Profile API integration
- Google Pub/Sub webhook
- OpenAI Responses API
- Stripe Webhooks
- Deployed on Railway or Fly.io

### Repository Structure
```
echo-pilot/
  apps/
    web/        # Next.js frontend
    api/        # Fastify backend
  prisma/
    schema.prisma
  package.json
  turbo.json (optional)
  .env
```

---

## Hosting Strategy & Cost Guardrails

| Scenario | What runs where | Est. monthly cost @ 250 paying users (≈$5k MRR) | Notes |
| --- | --- | --- | --- |
| **All on Vercel (chosen)** | Marketing + authenticated Next.js apps | ~$190–$220 (Vercel bandwidth + seats) | Fastest path to ship, unified previews, no Cloudflare deployment drift. |
| **Split (legacy)** | Marketing on Cloudflare Pages, app on Vercel | ~$60–$80 (Vercel) + $0–$10 (Cloudflare) | Kept for historical context; retired after Cloudflare Pages deploy issues. |

- Unified Vercel hosting keeps previews, routing, and server actions consistent and avoids Cloudflare Pages regressions.
- Lean on Vercel Edge/Serverless for marketing interactivity; keep Fastify API on Railway/Fly for long-lived workloads.
- Supabase continues to manage Postgres + Prisma migrations regardless of frontend hosting.

---

## 2. Prisma Schema
(Full schema included for Users, Accounts, Businesses, Locations, Reviews, Replies, Subscriptions)

```
<schema content abbreviated here>
(Use full schema from the design step)
```

---

## 3. Backend Flows

### Google OAuth Flow
1. User connects via Google OAuth
2. App requests `business.manage` scope
3. Backend fetches business locations
4. Saves tokens + locations in DB

### Review Auto-Reply Pipeline
1. Customer posts Google review  
2. Google Pub/Sub triggers backend  
3. Backend fetches review  
4. AI generates reply  
5. Backend posts reply via Google API  
6. Logs result + shows in dashboard  

### Testing Without Real Business Accounts
- Use **MockProvider** abstraction
- Use fixture data for Google review payloads
- Simulate Pub/Sub by POSTing sample JSON
- One real test business for integration testing

---

## 4. Next.js Frontend

### Pages
- `/` – Marketing site
- `/onboarding` – Google connection flow
- `/dashboard` – Reviews & replies
- `/settings` – Tone, preferences, billing

### Onboarding Steps
1. Create account
2. Connect Google Business
3. Select locations
4. Choose tone & preferences
5. Start trial → Stripe checkout

---

## 5. OpenAI Prompt Templates

### Base System Prompt
(As included in the design phase)

### Tone Modifiers
- NEUTRAL
- FRIENDLY
- PROFESSIONAL
- PLAYFUL
- APOLOGETIC
- FORMAL
- ENTHUSIASTIC

Each adds 1–2 lines modifying output style.

---

## 6. Landing Page Copy

See `marketing-content-outline.md` for a fillable worksheet with placeholders for every section below.

### Hero
**Never Ignore a Review Again.**  
Automatic, human-sounding replies to your Google reviews — posted in minutes.

CTA: **Start Free 14‑Day Trial**

You need 3 tiers:

🟢 Starter — $19/mo

Target: solo-owner businesses, small salons, barbers, coaches, cleaners
Includes:
	•	1 location
	•	Automated reply generation
	•	Tone customization
	•	Dashboard
	•	Unlimited replies

Why $19?
It’s the sweet spot where churn stays low but adoption stays high.

⸻

🔵 Standard — $39/mo

Target: restaurants, gyms, auto shops, dentists
Includes everything in Starter, plus:
	•	3 locations
	•	Scheduled weekly reports
	•	Keyword / sentiment tagging
	•	Priority posting speed
	•	Review volume analytics

Why $39?
SMBs paying close attention to reviews will justify $39/mo if they save hours/month.

⸻

🔶 Pro / Multi-Location — $79/mo (or $99/mo)

Target:
	•	Multi-location businesses
	•	Restaurants with multiple stores
	•	Property managers
	•	Franchise groups

Includes:
	•	10 locations
	•	Unified multi-location dashboard
	•	Bulk reports
	•	Advanced analytics
	•	Better SLA for posting
	•	Team members access

Why $79–$99?
This is where your MRR multiplies.
Multi-location is where the real money in SMB SaaS lives.

---

## 9. Architecture Diagram (Textual)

1. Google Review →  
2. Google Pub/Sub →  
3. Fastify `/reviews/pubsub` →  
4. DB (save review) →  
5. ReviewProcessor job →  
6. OpenAI →  
7. Google API `accounts.locations.reviews.updateReply` →  
8. Dashboard displays results  

---

# EchoPilot – Full Technical Blueprint

## 1️⃣ Prisma Schema
```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id             String         @id @default(cuid())
  email          String         @unique
  name           String?
  createdAt      DateTime       @default(now())
  updatedAt      DateTime       @updatedAt

  accounts       Account[]
  businesses     Business[]
  subscriptions  Subscription[]
}

model Account {
  id                String   @id @default(cuid())
  userId            String
  provider          String
  providerAccountId String

  accessToken       String?
  refreshToken      String?
  expiresAt         Int?
  tokenType         String?
  scope             String?

  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Business {
  id             String      @id @default(cuid())
  userId         String
  name           String
  businessType   String?
  defaultTone    Tone        @default(NEUTRAL)
  timezone       String      @default("America/Denver")

  createdAt      DateTime    @default(now())
  updatedAt      DateTime    @updatedAt

  user           User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  locations      Location[]
}

model Location {
  id                 String     @id @default(cuid())
  businessId         String
  provider           Provider
  providerLocationId String
  displayName        String
  address            String?
  isActive           Boolean    @default(true)

  createdAt          DateTime   @default(now())
  updatedAt          DateTime   @updatedAt

  business           Business   @relation(fields: [businessId], references: [id], onDelete: Cascade)
  reviews            Review[]

  @@index([provider, providerLocationId])
}

model Review {
  id               String       @id @default(cuid())
  locationId       String
  providerReviewId String
  authorName       String?
  rating           Int?
  text             String?
  languageCode     String?
  publishedAt      DateTime

  replied          Boolean      @default(false)
  replyId          String?      @unique

  createdAt        DateTime     @default(now())
  updatedAt        DateTime     @updatedAt

  location         Location     @relation(fields: [locationId], references: [id], onDelete: Cascade)
  reply            Reply?       @relation(fields: [replyId], references: [id])
}

model Reply {
  id              String       @id @default(cuid())
  reviewId        String       @unique
  content         String
  status          ReplyStatus  @default(PENDING)
  errorMessage    String?
  postedAt        DateTime?

  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt

  review          Review       @relation(fields: [reviewId], references: [id], onDelete: Cascade)
}

model Subscription {
  id                String      @id @default(cuid())
  userId            String
  stripeCustomerId  String
  stripeSubId       String?
  plan              Plan        @default(STARTER)
  status            SubStatus   @default(TRIALING)
  currentPeriodEnd  DateTime?

  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt

  user              User        @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([stripeCustomerId])
  @@index([stripeSubId])
}

enum Provider {
  GOOGLE
}

enum Tone {
  NEUTRAL
  FRIENDLY
  PROFESSIONAL
  PLAYFUL
  APOLOGETIC
  FORMAL
  ENTHUSIASTIC
}

enum ReplyStatus {
  PENDING
  POSTED
  FAILED
}

enum Plan {
  STARTER
  STANDARD
  PRO
}

enum SubStatus {
  TRIALING
  ACTIVE
  PAST_DUE
  CANCELED
}
```

---

## 2️⃣ OAuth + API Credential Setup

### Google Cloud
- Project: `echopilot-prod`
- APIs enabled: Business Profile API, Pub/Sub, OAuth consent
- OAuth Redirect URIs:
  - `https://api.echopilot.me/auth/google/callback`
  - `http://localhost:4000/auth/google/callback`
- Scope:
```
https://www.googleapis.com/auth/business.manage
```
- Pub/Sub:
  - Topic: `reviews-events`
  - Subscription: `reviews-events-sub`

### Stripe
Environment variables:
```
STRIPE_SECRET_KEY=
STRIPE_PUBLIC_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_STARTER_PRICE_ID=
STRIPE_STANDARD_PRICE_ID=
STRIPE_PRO_PRICE_ID=
```

### OpenAI
Environment variables:
```
OPENAI_API_KEY=
OPENAI_ORG_ID=
OPENAI_PROJECT_ID=
```

---

## 3️⃣ Pub/Sub Payload Normalization

### Example Google Pub/Sub message
```json
{
  "message": {
    "data": "eyJldmVudFR5cGUiOiAiUkVWSUVXX0NSRUFURUQiLCAiYWNjb3VudElkIjogImFjY291bnRzLzEyMyIsICJsb2NhdGlvbklkIjogImFjY291bnRzLzEyMy9sb2NhdGlvbnMvNDU2IiwgInJldmlld0lkIjogImFjY291bnRzLzEyMy9sb2NhdGlvbnMvNDU2L3Jldmlld3MvYWJjIn0="
  }
}
```

### Normalized internal event
```ts
export type ReviewEvent = {
  provider: 'GOOGLE';
  providerLocationId: string;
  providerReviewId: string;
};
```

---

## 4️⃣ Prompt Templates

### System Prompt
```text
You are EchoPilot, an assistant that writes concise, on-brand owner replies to customer reviews.
Keep replies to 2–4 sentences. Do not invent details or mention AI.
```

### User Prompt
```text
Business: {{businessName}}
Type: {{businessType}}
Tone: {{toneLabel}}

Reviewer: {{reviewerName}}
Rating: {{rating}}
Review: "{{reviewText}}"

Preferences:
{{preferencesBlock}}

Write ONE reply. No quotes.
```

### Tone Modifiers
- Neutral — calm, factual  
- Friendly — warm, 1 emoji allowed  
- Professional — polished  
- Playful — light, 1 emoji  
- Apologetic — empathetic  
- Formal — corporate tone  
- Enthusiastic — upbeat  

---

## 5️⃣ Deployment / DevOps

### Infra
- Frontend (marketing + authenticated app) → Vercel  
- Backend → Railway / Fly.io  
- DB → Supabase Postgres  
- Queue → Cloudflare Queues or Upstash Redis  

### CI/CD (GitHub Actions)
- `ci.yml` – lint, test  
- `deploy-web.yml` – Vercel marketing build  
- `deploy-api.yml` – deploy Docker image  

### Env Vars
```
DATABASE_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GCP_PROJECT_ID=
GCP_PUBSUB_TOPIC=
GCP_PUBSUB_SUBSCRIPTION=
GOOGLE_APPLICATION_CREDENTIALS_JSON=
STRIPE_SECRET_KEY=
OPENAI_API_KEY=
APP_WEB_ORIGIN=
APP_API_ORIGIN=
LOG_LEVEL=info
```

### Observability
- `pino` for logs  
- Sentry for errors  
- Metrics: reviews processed, replies posted, failures  

