# EchoPilot Credential & Launch Plan

This guide walks through the exact order of operations required to ship the marketing site, build credibility, and secure every API credential (with an emphasis on Google Business Profile approval).

**Last Updated:** January 19, 2026

**🎯 NEW PRODUCT VISION:** EchoPilot brings business management to text. Business owners manage their Google Business Profile entirely via SMS—respond to reviews, update hours, post updates, request reviews from customers—all without opening a dashboard. AI is an optional helper for reply suggestions, not the core feature.

---

## Product Experience & Hosting Snapshot
1. `echopilot.me` (Vercel, static Next.js build) serves the marketing story and funnels traffic to `https://app.echopilot.me`.
2. `app.echopilot.me` (Vercel, Next.js 15) handles signup/login via NextAuth (email + Google) before any Google connection screens appear.
3. **SMS Onboarding:** Users verify their phone number via SMS and connect their Google Business Profile.
4. **Text-Based Management:** Business owners receive review notifications via SMS and can respond with simple commands (A/E/S). They can also manage hours, post updates, and request reviews—all via text.
5. **AI as Helper:** When responding to reviews, AI suggests a reply but owners can approve (A), edit (E), or skip (S). AI is optional and conversational, not automated.
6. Stripe Checkout starts a trial. SMS features are available to paying accounts.
7. The Fastify API on Railway ingests Google Pub/Sub review events, sends SMS notifications via Twilio, processes SMS responses, and posts to GBP API.
8. The dashboard is a secondary interface for power users who want analytics and bulk actions.

---

## Phase 0 – Public Presence Prep

**Goal:** Prove EchoPilot is a real product before talking to Google.

**Status:** ✅ COMPLETE

**Checklist**
- [x] **Ship the marketing site**
  - [x] Launch the Next.js landing page on `https://echopilot.me`
  - [x] Include hero, how-it-works, pricing, and real contact info
  - [x] Link privacy policy + terms
  - [x] Primary CTA → `https://app.echopilot.me`
- [x] **Capture artifacts**
  - [x] Take screenshots of hero, pricing, and contact sections
  - [x] Export a one-pager using copy from `brand.md`
- [x] **Publish brand assets**
  - [x] Upload the logo/icon everywhere (site + socials) for consistency
- [ ] **Provision hosting + auth** (partial - can complete during Phase 1)
  - [ ] Create Vercel project for `app.echopilot.me` (authenticated app)
  - [ ] Wire NextAuth Google provider in test mode
  - [ ] Confirm login flow works with mocked data
  - [ ] Set up preview deployments

**Deliverables:** ✅ Live marketing site + screenshots + brand asset pack

---

## Phase 1 – Google Business Profile Setup & Maintenance

**Goal:** Operate a verified, healthy GBP for 60+ days before API application.

**Status:** 🔄 IN PROGRESS (Day 0 - Started Dec 10, 2025)

**Timeline:** Dec 10, 2025 → Feb 8, 2026 (60 days)

**Checklist**
- [x] **Create/verify the profile**
  - [x] Go to https://business.google.com/ and claim or create HQ
  - [x] Add accurate address, phone, website (point to `echopilot.me`), hours, and logo
  - [x] Complete verification (postcard, phone, or video)
- [ ] **Keep it active for 60+ days** (Target: Feb 6, 2026)
  - [ ] Week 1-4: Post weekly updates (4 posts)
  - [ ] Week 5-8: Post weekly updates (4 posts)
  - [ ] Get reviews from Bill, Dad, Mom, Granne
  - [ ] Respond to all reviews within 24 hours
  - [ ] Upload real photos (at least 10 total)
  - [ ] Keep business info up-to-date
- [ ] **Document everything**
  - [ ] Screenshot the dashboard proving verification + activity
  - [ ] Save the public profile URL for the API form
  - [ ] Track engagement metrics (views, clicks, reviews)

**Exit criteria:** Verified GBP active for 60+ days with consistent engagement, linked to marketing site, with proof-of-activity screenshots.

**Note:** Google Cloud project `echopilot-prod` created with `admin@echopilot.me` ✅ (No organization needed - this is fine!)

---

## Phase 2 – Build Core Product (During 60-Day Wait)

**Goal:** Build the SMS-first business management interface with Twilio. Make it work with mock GBP APIs so we're ready to launch when GBP API approval arrives.

**Status:** ⏳ PENDING (Start after Phase 0 complete)

**Timeline:** Dec 10, 2025 → Feb 8, 2026 (parallel with Phase 1)

**Priority Order:** Twilio SMS → Database → Auth → Mock GBP API → AI (optional helper) → Dashboard → Stripe

---

### 🔄 KEY PRODUCT PIVOT (Jan 2026)

**FROM:** AI-powered review automation tool
**TO:** Text-based business management platform

**What Changed:**
1. **SMS is now the PRIMARY interface** (not dashboard)
2. **AI is now OPTIONAL** (suggestion helper, not automation)
3. **More features via SMS:** Hours management, posts, business info, stats
4. **Review requests from POS/booking systems** to generate more reviews
5. **Dashboard is SECONDARY** (for power users who want analytics)

**Why This Works Better:**
- ✅ Business owners always have their phone
- ✅ Text is faster than opening a dashboard
- ✅ Less reliance on AI (which can be hit-or-miss)
- ✅ More value beyond just reviews (hours, posts, etc.)
- ✅ Sticky: Once they rely on SMS management, hard to leave
- ✅ Review request automation = more reviews = more value

**Development Impact:**
- Twilio integration moves to Week 1 (immediate priority)
- Can test entire SMS experience with mock GBP data before API approval
- OpenAI becomes optional dependency
- Dashboard can be minimal MVP

---

### 2.1 Twilio SMS Setup (PRIORITY #1) 🔥

**Goal:** Get SMS working immediately so you can test the core text-based experience.

- [ ] **Create Twilio Account**
  - [ ] Sign up at https://www.twilio.com/
  - [ ] Verify email and phone
  - [ ] Add payment method (removes trial limitations)
  - [ ] Buy phone number ($1.15/month)
  - [ ] Test SMS to your own phone
- [ ] **Start A2P 10DLC Registration**
  - [ ] Register business brand (1-2 business days approval)
  - [ ] Create "Customer Care" campaign (1-2 business days approval)
  - [ ] Total timeline: 2-5 business days
  - [ ] Cost: $4/month (brand) + $10-15/month (campaign)
- [ ] **Install Twilio SDK & Test**
  ```bash
  npm install twilio
  ```
  - [ ] Create test endpoint to send SMS
  - [ ] Send yourself a test message
  - [ ] Confirm it works
- [ ] **Store Credentials**
  ```bash
  TWILIO_ACCOUNT_SID=
  TWILIO_AUTH_TOKEN=
  TWILIO_PHONE_NUMBER=
  ```

**Why First?** You can test the entire SMS experience with mock review data before Google API is ready.

---

### 2.2 Database & Schema Setup
- [ ] **Supabase Setup**
  - [ ] Create Supabase project `echopilot-db`
  - [ ] Choose region near target users
  - [ ] Copy `DATABASE_URL` connection string
  - [ ] Enable daily backups
  - [ ] Store anon + service role keys securely
- [ ] **Prisma Schema Design**
  - [ ] Users table (id, email, name, phone_number, sms_verified, created_at)
  - [ ] Accounts table (NextAuth integration)
  - [ ] Sessions table (NextAuth integration)
  - [ ] BusinessProfiles table (google_account_id, location_ids, connected_at)
  - [ ] Reviews table (review_id, location_id, rating, text, author, sms_sent_at, sms_response, created_at)
  - [ ] Replies table (review_id, reply_text, status, sent_at)
  - [ ] SmsLogs table (user_id, review_id, direction, from_number, to_number, body, status)
  - [ ] Subscriptions table (user_id, stripe_customer_id, plan, status)
  - [ ] Integrations table (user_id, platform, access_token, settings) - for POS/booking systems
  - [ ] ReviewRequests table (user_id, integration_id, customer_email, scheduled_send_at, status)
- [ ] **Run Migrations**
  - [ ] `npx prisma migrate dev`
  - [ ] Test with sample data
  - [ ] Set up Prisma Client

### 2.3 Authentication & User Management
- [ ] **NextAuth Setup**
  - [ ] Install NextAuth in `app.echopilot.me`
  - [ ] Configure Google OAuth provider (test mode)
  - [ ] Configure email provider (magic links)
  - [ ] Set up session strategy (JWT)
  - [ ] Create protected API routes
- [ ] **User Onboarding Flow**
  - [ ] Sign up / Sign in pages
  - [ ] Email verification
  - [ ] **SMS Phone Verification** 🔥 (NEW - CRITICAL)
    - [ ] Phone number input with country code
    - [ ] Send 6-digit verification code via Twilio
    - [ ] Code expires after 10 minutes
    - [ ] Confirm code and mark SMS as verified
    - [ ] Enable SMS notifications by default after verification
  - [ ] Profile setup
  - [ ] Dashboard redirect after login

### 2.4 Google Business Profile Integration (Mock Mode)
- [ ] **OAuth Flow**
  - [ ] Create OAuth consent screen in Google Cloud
  - [ ] Add scope: `https://www.googleapis.com/auth/business.manage`
  - [ ] Create OAuth client credentials
  - [ ] Store `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
  - [ ] Build "Connect Google Business Profile" button
  - [ ] Handle OAuth callback and token storage
- [ ] **Mock API Provider**
  - [ ] Create mock GBP API responses for testing
  - [ ] Mock location listing
  - [ ] Mock review fetching
  - [ ] Mock reply posting (via SMS commands)
  - [ ] Mock business info updates (hours, phone, description)
  - [ ] Mock post creation
  - [ ] Feature flag to switch between mock/real API

---

### 2.5 SMS Review Notification & Response Flow 🔥

**Goal:** Build the core SMS experience for review management.

- [ ] **SMS Service Module**
  - [ ] Create `lib/sms-service.ts`
  - [ ] Function: `sendReviewNotification(userId, reviewId)`
  - [ ] Format notification message with review details
  - [ ] Include AI-suggested reply (optional)
  - [ ] Include commands: A=Approve, E=Edit, S=Skip
  - [ ] Log all outbound SMS to database
- [ ] **Twilio Webhook Handler**
  - [ ] Create `/api/twilio/webhook` endpoint
  - [ ] Verify Twilio signature
  - [ ] Parse incoming SMS body
  - [ ] Identify user by phone number
  - [ ] Find most recent pending review
  - [ ] Process commands:
    - [ ] "A" → Post AI reply to GBP (or mock)
    - [ ] "E [text]" → Post custom reply to GBP (or mock)
    - [ ] "S" → Mark as skipped
  - [ ] Send confirmation SMS
  - [ ] Handle errors gracefully
- [ ] **Review Processing Pipeline**
  - [ ] When new review arrives (mock or real):
    1. Save to database
    2. Generate AI suggestion (optional)
    3. Send SMS notification
  - [ ] Wait for SMS response
  - [ ] Post reply based on command
  - [ ] Update review status
- [ ] **Test End-to-End**
  - [ ] Create mock review
  - [ ] Receive SMS notification
  - [ ] Reply with "A", "E", "S" commands
  - [ ] Verify mock GBP API receives reply

### 2.6 OpenAI Integration (Optional Helper) 💡

**Note:** AI is now an **optional suggestion tool**, not the core feature. Business owners can skip it entirely and write their own replies via SMS.

- [ ] **OpenAI Setup**
  - [ ] Create OpenAI account / project
  - [ ] Note `OPENAI_ORG_ID` and `OPENAI_PROJECT_ID`
  - [ ] Generate API key (`OPENAI_API_KEY`)
  - [ ] Confirm billing is enabled
  - [ ] Test with sample curl to `/v1/chat/completions`
- [ ] **Reply Suggestion Service**
  - [ ] Create simple prompt template
  - [ ] Build function to generate reply suggestions
  - [ ] Include review context (rating, text, author, business name)
  - [ ] Keep it conversational and brief (2-3 sentences)
  - [ ] Handle errors gracefully (fall back to no suggestion)
  - [ ] **Make it optional** - if OpenAI fails, still send SMS without suggestion
  - [ ] Test with various review scenarios
- [ ] **Settings Toggle**
  - [ ] Allow users to disable AI suggestions entirely
  - [ ] If disabled, send SMS without suggestion, let owner write from scratch

---

### 2.7 SMS-Based Business Management Features 🔥

**Goal:** Let business owners manage their GBP entirely via text.

- [ ] **Hours Management via SMS**
  - [ ] Command: `HOURS CLOSED TODAY`
  - [ ] Command: `HOURS 9-5 [date]`
  - [ ] Command: `HOURS NORMAL` (revert to default)
  - [ ] Command: `HOURS SHOW` (display current hours)
  - [ ] Parse natural language dates (today, tomorrow, Monday, Dec 25)
  - [ ] Update via mock GBP API (or real when approved)
  - [ ] Send confirmation SMS
- [ ] **Post Updates via SMS**
  - [ ] Command: `POST [message]`
  - [ ] Create GBP post with message content
  - [ ] Confirmation with preview
  - [ ] Post to GBP API
- [ ] **Business Info Updates via SMS**
  - [ ] Command: `PHONE [number]` - Update business phone
  - [ ] Command: `WEBSITE [url]` - Update website
  - [ ] Each command updates GBP and confirms via SMS
- [ ] **Quick Stats via SMS**
  - [ ] Command: `STATS` - Get profile views, calls, reviews
  - [ ] Format as friendly SMS response
  - [ ] Pull from GBP Performance API
- [ ] **Help System**
  - [ ] Command: `HELP` - Show all available commands
  - [ ] Command: `HELP [command]` - Specific help
  - [ ] Send as SMS response

---

### 2.8 Review Request Integration (POS/Booking Systems)

**Goal:** Automatically request reviews after customer visits.

- [ ] **Integration Architecture**
  - [ ] Database schema for integrations (user_id, platform, tokens, settings)
  - [ ] Database schema for review_requests (customer_email, scheduled_send_at, status)
- [ ] **Square Integration (Priority #1)**
  - [ ] OAuth flow for Square
  - [ ] Webhook handler for `payment.created`
  - [ ] Extract customer email/phone from payment
  - [ ] Queue review request (2-24 hour delay)
  - [ ] Send review request email or SMS
  - [ ] Include Google review link
  - [ ] Track clicks and conversions
- [ ] **Zapier Integration (Priority #2)**
  - [ ] Create Zapier webhook trigger
  - [ ] Accept standardized payload
  - [ ] Queue review request
  - [ ] Allows users to connect ANY Zapier-supported app
- [ ] **Review Request Templates**
  - [ ] Email template with Google review link
  - [ ] SMS template with shortened link
  - [ ] Personalization (customer name, business name)
  - [ ] Opt-out handling (STOP commands)
- [ ] **Settings & Configuration**
  - [ ] Delay before sending (2-24 hours)
  - [ ] Minimum transaction amount
  - [ ] Frequency limits (max 1 per customer per 30 days)
  - [ ] Message customization

### 2.9 Stripe Integration

**Updated Pricing Strategy:** SMS-based value proposition

- [ ] **Stripe Setup**
  - [ ] Create Stripe account
  - [ ] Switch to Test mode
  - [ ] Copy publishable + secret keys
  - [ ] Store as `NEXT_PUBLIC_STRIPE_KEY` and `STRIPE_SECRET_KEY`
- [ ] **Product & Pricing Setup**
  - [ ] Create Product: "Starter" - $19/month (1 location, SMS notifications, AI suggestions)
  - [ ] Create Product: "Standard" - $39/month (3 locations, SMS management, review requests, stats)
  - [ ] Create Product: "Pro" - $79/month (10 locations, all SMS features, integrations, team access)
  - [ ] Capture price IDs for each
  - [ ] Define feature limits per plan:
    - Starter: SMS review responses only
    - Standard: + Hours/posts via SMS, basic integrations
    - Pro: + All SMS commands, priority support, multiple integrations
- [ ] **Checkout Flow**
  - [ ] Create pricing page in app
  - [ ] Build Stripe Checkout session creation
  - [ ] Handle successful checkout redirect
  - [ ] Update user subscription in database
- [ ] **Webhook Handling**
  - [ ] Create webhook endpoint `/api/stripe/webhook`
  - [ ] Subscribe to events:
    - [ ] `checkout.session.completed`
    - [ ] `customer.subscription.updated`
    - [ ] `customer.subscription.deleted`
    - [ ] `invoice.payment_failed`
  - [ ] Store webhook signing secret
  - [ ] Test with Stripe CLI

### 2.10 Dashboard UI (Secondary Interface)

**Note:** Dashboard is now a **secondary interface** for power users. Most users manage everything via SMS.

- [ ] **Main Dashboard**
  - [ ] Overview stats (reviews, replies, response rate)
  - [ ] SMS activity log (messages sent/received)
  - [ ] Recent reviews list (read-only view)
  - [ ] Subscription status widget
- [ ] **Settings Pages (Minimal)**
  - [ ] Phone verification status
  - [ ] Connected Business Profiles
  - [ ] SMS preferences (enable/disable by notification type)
  - [ ] Integration connections (Square, Zapier, etc.)
  - [ ] Billing & subscription management
  - [ ] SMS command reference (help guide)
- [ ] **Optional: Manual Reply Interface**
  - [ ] For users who want to reply from desktop
  - [ ] View pending reviews
  - [ ] Compose replies with AI suggestions
  - [ ] Post to GBP

**Design Philosophy:** Keep dashboard minimal. SMS is the primary interface.

---

### 2.11 Queue & Background Jobs
- [ ] **Choose Queue Solution**
  - [ ] Evaluate: Cloudflare Queues vs BullMQ (Redis) vs Inngest
  - [ ] Make decision based on hosting choice
- [ ] **Review Processing Queue**
  - [ ] Job: Fetch new reviews
  - [ ] Job: Generate AI suggestion (optional)
  - [ ] Job: Send SMS notification
  - [ ] Job: Wait for SMS response
  - [ ] Job: Post reply to GBP based on command
  - [ ] Job: Update database
  - [ ] Handle job failures and retries
  - [ ] Add job monitoring/logging
- [ ] **Review Request Queue**
  - [ ] Job: Process scheduled review requests
  - [ ] Job: Send review request email/SMS
  - [ ] Job: Track clicks and conversions
  - [ ] Handle opt-outs
- [ ] **Business Info Update Queue**
  - [ ] Job: Process SMS commands for hours/posts/info
  - [ ] Job: Update GBP via API
  - [ ] Job: Send confirmation SMS

**Exit criteria:** Fully functional app with mock GBP API, ready to swap in real credentials.

---

## Phase 3 – Apply for Business Profile API Access

**Goal:** Gain access to the core Business Profile API (not just Performance).

**Status:** ⏳ PENDING (Start after 60 days - Feb 8, 2026)

**Checklist**
- [ ] **Collect required info**
  - [ ] Cloud project name: `echopilot-prod`
  - [ ] Cloud project number (from Google Cloud Console)
  - [ ] Business Profile public URL
  - [ ] Verification screenshots showing 60+ days of activity
  - [ ] Website URL: `https://echopilot.me`
- [ ] **Fill out the GBP API contact form**
  - [ ] Go to: https://developers.google.com/my-business/content/prereqs
  - [ ] Find "GBP API contact form" link
  - [ ] Select "Application for Basic API Access"
  - [ ] Use-case description: "EchoPilot is a SaaS platform that helps business owners automate review responses. Users OAuth-connect their own Google Business Profiles to our app. EchoPilot generates human-grade replies using OpenAI, stores data securely in Supabase, and complies with all Google policies."
  - [ ] Submit using `admin@echopilot.me` (the account that owns the Cloud project)
- [ ] **Monitor the approval**
  - [ ] Check email daily for follow-up questions (reply within 24 hours)
  - [ ] Watch Google Cloud Console → APIs & Services → Dashboard
  - [ ] Check quota: 0 QPM = not approved, 300 QPM = approved ✅
  - [ ] Expected timeline: 3-7 business days
- [ ] **Enable APIs after approval**
  - [ ] Enable "Business Profile API" in Cloud Console
  - [ ] Enable "Business Profile Performance API" in Cloud Console
  - [ ] Create service account `echopilot-review-bot`
  - [ ] Grant role: "Business Profile API User"
  - [ ] Download service account JSON key
  - [ ] Store as `GOOGLE_APPLICATION_CREDENTIALS_JSON`

**Exit criteria:** API enabled with quota 300 QPM, service account permissioned.

**Important Notes:**
- Do NOT apply before 60 days of GBP activity
- Use the same email (`admin@echopilot.me`) that owns the Cloud project
- No "Organization Account" or "Agency Account" needed - you're building a SaaS product, not managing clients

---

## Phase 4 – Google Pub/Sub & Real-Time Review Notifications

**Goal:** Set up real-time notifications when new reviews arrive.

**Status:** ⏳ PENDING (Start after Phase 3 approval)

**Checklist**
- [ ] **Enable Pub/Sub API**
  - [ ] Go to Google Cloud Console → APIs & Services
  - [ ] Enable "Cloud Pub/Sub API"
- [ ] **Create Pub/Sub Topic**
  - [ ] Create topic: `reviews-events`
  - [ ] Note topic name for configuration
- [ ] **Create Push Subscription**
  - [ ] Create subscription: `reviews-events-sub`
  - [ ] Type: Push
  - [ ] Endpoint: `https://api.echopilot.me/reviews/pubsub`
  - [ ] For local testing: use ngrok tunnel
  - [ ] Grant subscriber access to service account
- [ ] **Configure GBP Notifications**
  - [ ] Link Business Profile API to Pub/Sub topic
  - [ ] Subscribe to review events
  - [ ] Test with sample review
- [ ] **Build Webhook Handler**
  - [ ] Create `/reviews/pubsub` endpoint
  - [ ] Verify Pub/Sub message signature
  - [ ] Parse review payload
  - [ ] Queue review for processing
  - [ ] Return 200 OK quickly (< 10s)
- [ ] **Test End-to-End**
  - [ ] Publish test message to topic
  - [ ] Verify webhook receives it
  - [ ] Confirm review enters queue
  - [ ] Validate reply generation works

**Exit criteria:** Real-time review notifications flowing from GBP → Pub/Sub → Your API → Queue.

---

## Phase 5 – Backend API & Processing Engine

**Goal:** Build the Fastify API that processes reviews and posts replies.

**Status:** ⏳ PENDING

**Checklist**
- [ ] **API Setup**
  - [ ] Initialize Fastify project
  - [ ] Set up TypeScript
  - [ ] Configure environment variables
  - [ ] Add logging (Pino)
  - [ ] Add error handling
- [ ] **Review Processing Pipeline**
  - [ ] Queue consumer (pulls from review queue)
  - [ ] Fetch review details from GBP API
  - [ ] Load user's brand brief from database
  - [ ] Generate reply via OpenAI
  - [ ] Save reply to database (pending approval)
  - [ ] If auto-reply enabled + paid: post to GBP
  - [ ] Update review status
  - [ ] Handle errors and retries
- [ ] **GBP API Integration**
  - [ ] List user's locations
  - [ ] Fetch reviews for location
  - [ ] Post reply to review
  - [ ] Update reply
  - [ ] Delete reply
  - [ ] Handle rate limits (300 QPM)
- [ ] **API Endpoints**
  - [ ] `POST /reviews/pubsub` - Pub/Sub webhook
  - [ ] `GET /reviews` - List reviews for user
  - [ ] `POST /reviews/:id/reply` - Generate/post reply
  - [ ] `PUT /reviews/:id/reply` - Edit reply
  - [ ] `DELETE /reviews/:id/reply` - Delete reply
  - [ ] `GET /locations` - List connected locations
  - [ ] `POST /auth/google/callback` - OAuth callback
- [ ] **Deploy to Railway/Fly**
  - [ ] Choose hosting platform
  - [ ] Set up deployment pipeline
  - [ ] Configure environment variables
  - [ ] Set up custom domain: `api.echopilot.me`
  - [ ] Enable SSL/TLS
  - [ ] Configure health checks

**Exit criteria:** Deployed API that can receive reviews, generate replies, and post to GBP.

---

## Phase 6 – Testing & Quality Assurance

**Goal:** Ensure everything works reliably before launch.

**Status:** ⏳ PENDING

**Checklist**
- [ ] **Unit Tests**
  - [ ] OpenAI reply generation
  - [ ] Brand brief parsing
  - [ ] GBP API client
  - [ ] Stripe webhook handling
  - [ ] Queue job processing
- [ ] **Integration Tests**
  - [ ] End-to-end review flow (mock)
  - [ ] OAuth flow
  - [ ] Subscription flow
  - [ ] Webhook handling
- [ ] **Manual Testing**
  - [ ] Sign up new user
  - [ ] Connect Google Business Profile
  - [ ] Complete brand brief
  - [ ] Subscribe to plan
  - [ ] Simulate incoming review
  - [ ] Verify reply generation
  - [ ] Test manual edit
  - [ ] Test auto-reply toggle
  - [ ] Cancel subscription
- [ ] **Load Testing**
  - [ ] Simulate 100 concurrent users
  - [ ] Test queue under load
  - [ ] Verify rate limit handling
  - [ ] Check database performance
- [ ] **Security Audit**
  - [ ] Review OAuth implementation
  - [ ] Check API authentication
  - [ ] Validate webhook signatures
  - [ ] Test SQL injection prevention
  - [ ] Review secrets management
  - [ ] Enable HTTPS everywhere
  - [ ] Add rate limiting to API

**Exit criteria:** All tests passing, no critical bugs, security validated.

---

## Phase 7 – Beta Launch & First Customers

**Goal:** Get 10-20 beta users to validate product-market fit.

**Status:** ⏳ PENDING

**Checklist**
- [ ] **Pre-Launch Prep**
  - [ ] Switch Stripe to live mode
  - [ ] Update all live API keys
  - [ ] Set up error monitoring (Sentry)
  - [ ] Set up uptime monitoring
  - [ ] Create onboarding email sequence
  - [ ] Prepare support documentation
- [ ] **Beta Recruitment**
  - [ ] Reach out to waitlist (from marketing site)
  - [ ] Offer 50% off for first 3 months
  - [ ] Personal onboarding calls
  - [ ] Create private Slack/Discord for feedback
- [ ] **Launch Checklist**
  - [ ] Announce on social media
  - [ ] Email waitlist
  - [ ] Post on relevant communities (Reddit, Indie Hackers)
  - [ ] Reach out to local businesses
- [ ] **Monitor & Support**
  - [ ] Daily check-ins with beta users
  - [ ] Track key metrics:
    - [ ] Sign-ups
    - [ ] Activation rate (connected GBP)
    - [ ] Paid conversions
    - [ ] Churn rate
    - [ ] Reviews processed
    - [ ] Replies posted
  - [ ] Collect feedback
  - [ ] Fix critical bugs within 24 hours
- [ ] **Iterate Based on Feedback**
  - [ ] Prioritize feature requests
  - [ ] Improve onboarding based on drop-off
  - [ ] Refine AI prompts based on reply quality
  - [ ] Optimize pricing if needed

**Exit criteria:** 10+ paying customers, positive feedback, stable product.

---

## Phase 8 – Scale & Growth

**Goal:** Grow to 100+ customers and $10K+ MRR.

**Status:** ⏳ PENDING

**Checklist**
- [ ] **Marketing & Growth**
  - [ ] SEO optimization
  - [ ] Content marketing (blog posts)
  - [ ] Google/Facebook ads
  - [ ] Partnerships with review platforms
  - [ ] Affiliate program
  - [ ] Case studies from beta users
- [ ] **Product Enhancements**
  - [ ] Multi-location support
  - [ ] Team collaboration features
  - [ ] Advanced analytics dashboard
  - [ ] Custom AI training per business
  - [ ] Sentiment analysis
  - [ ] Competitor review monitoring
  - [ ] Mobile app (iOS/Android)
- [ ] **Infrastructure Scaling**
  - [ ] Database optimization
  - [ ] Caching layer (Redis)
  - [ ] CDN for static assets
  - [ ] Horizontal scaling of API
  - [ ] Queue optimization
  - [ ] Cost optimization
- [ ] **Customer Success**
  - [ ] Automated onboarding
  - [ ] In-app tutorials
  - [ ] Knowledge base
  - [ ] Email support SLA
  - [ ] Success metrics dashboard
  - [ ] Proactive churn prevention

**Exit criteria:** Sustainable growth, positive unit economics, happy customers.

---

## Environment Variables Reference

Complete list of required environment variables:

```bash
# Database
DATABASE_URL=postgresql://postgres:<pwd>@db.<hash>.supabase.co:6543/postgres
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# NextAuth
NEXTAUTH_URL=https://app.echopilot.me
NEXTAUTH_SECRET=

# Twilio (Priority #1) 🔥
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=+15551234567

# Google Cloud & OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GCP_PROJECT_ID=echopilot-prod
GCP_PROJECT_NUMBER=
GOOGLE_APPLICATION_CREDENTIALS_JSON=

# Google Pub/Sub
GCP_PUBSUB_TOPIC=reviews-events
GCP_PUBSUB_SUBSCRIPTION=reviews-events-sub

# Stripe
NEXT_PUBLIC_STRIPE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_ID_STARTER=price_xxx (for $19/mo plan)
STRIPE_PRICE_ID_STANDARD=price_xxx (for $39/mo plan)
STRIPE_PRICE_ID_PRO=price_xxx (for $79/mo plan)

# OpenAI (Optional Helper)
OPENAI_API_KEY=
OPENAI_ORG_ID=
OPENAI_PROJECT_ID=

# App URLs
APP_WEB_ORIGIN=https://echopilot.me
APP_DASHBOARD_ORIGIN=https://app.echopilot.me
APP_API_ORIGIN=https://api.echopilot.me

# Monitoring & Logging
LOG_LEVEL=info
SENTRY_DSN=

# Feature Flags
ENABLE_AI_SUGGESTIONS=true
ENABLE_MOCK_GBP_API=false
ENABLE_SMS_HOURS_MANAGEMENT=true
ENABLE_SMS_POSTS=true
ENABLE_REVIEW_REQUESTS=true
```

---

## Secrets Management Checklist

- [ ] Store every key in password manager (1Password, Bitwarden, etc.)
- [ ] Add to environment-specific stores:
  - [ ] GitHub Actions secrets
  - [ ] Vercel project environment vars (app.echopilot.me)
  - [ ] Vercel project environment vars (echopilot.me)
  - [ ] Railway/Fly project variables (API)
- [ ] Create `.env.example` with placeholder names only (no real values)
- [ ] Add `.env*` to `.gitignore`
- [ ] Document key rotation schedule (annually)
- [ ] Set up alerts for expiring keys

---

## Project Timeline & Milestones

### Current Status (Dec 10, 2025)
- ✅ Phase 0: Complete
- 🔄 Phase 1: Day 0 of 60 (In Progress)
- ⏳ Phase 2: Building in parallel with Phase 1
- ⏳ Phase 3: Apply on Feb 8, 2026

### Detailed Timeline

**December 2025 (Weeks 1-3)**
- Week 1 (Dec 10-16):
  - [x] Marketing site live
  - [ ] **🔥 Create Twilio account & buy phone number**
  - [ ] **🔥 Start A2P 10DLC registration (2-5 day approval)**
  - [ ] Start Supabase setup
  - [ ] GBP: Post 1st weekly update
- Week 2 (Dec 17-23):
  - [ ] **🔥 Build SMS phone verification flow**
  - [ ] **🔥 Test sending/receiving SMS**
  - [ ] Complete database schema (with SMS tables)
  - [ ] Build authentication flow
  - [ ] GBP: Post 2nd weekly update, get first review
- Week 3 (Dec 24-31):
  - [ ] **🔥 Build SMS review notification system**
  - [ ] **🔥 Build Twilio webhook handler (A/E/S commands)**
  - [ ] Mock GBP API provider
  - [ ] Test full SMS review flow with mock data
  - [ ] GBP: Post 3rd weekly update

**January 2026 (Weeks 4-7)**
- Week 4 (Jan 1-7):
  - [ ] **🔥 Add SMS hours management (HOURS commands)**
  - [ ] **🔥 Add SMS posts (POST commands)**
  - [ ] Optional: Add OpenAI suggestions
  - [ ] GBP: Post 4th weekly update
- Week 5 (Jan 8-14):
  - [ ] **🔥 Build Square integration for review requests**
  - [ ] **🔥 Build Zapier webhook integration**
  - [ ] Stripe integration & checkout flow
  - [ ] GBP: Post 5th weekly update, get 2nd review
- Week 6 (Jan 15-21):
  - [ ] Queue setup & background jobs
  - [ ] Review request automation
  - [ ] SMS stats commands
  - [ ] GBP: Post 6th weekly update
- Week 7 (Jan 22-28):
  - [ ] Minimal dashboard UI (secondary interface)
  - [ ] Settings pages (SMS preferences, integrations)
  - [ ] SMS help system
  - [ ] GBP: Post 7th weekly update, get 3rd review

**February 2026 (Weeks 8-10)**
- Week 8 (Jan 29 - Feb 4):
  - [ ] Testing & bug fixes
  - [ ] Documentation
  - [ ] GBP: Post 8th weekly update
- Week 9 (Feb 5-11):
  - [ ] **Feb 8: Submit GBP API application** 🎯
  - [ ] Continue testing while waiting
  - [ ] GBP: Post 9th weekly update
- Week 10 (Feb 12-18):
  - [ ] Expect API approval
  - [ ] Enable real GBP APIs
  - [ ] Switch from mock to real provider
  - [ ] End-to-end testing with real API

**March 2026 (Weeks 11-14)**
- Week 11 (Feb 19-25):
  - [ ] Pub/Sub setup
  - [ ] Real-time review notifications
  - [ ] Backend API deployment
- Week 12 (Feb 26 - Mar 4):
  - [ ] Final testing & QA
  - [ ] Security audit
  - [ ] Switch Stripe to live mode
- Week 13 (Mar 5-11):
  - [ ] **Beta launch** 🚀
  - [ ] Onboard first 5 beta users
- Week 14 (Mar 12-18):
  - [ ] Support beta users
  - [ ] Collect feedback
  - [ ] Iterate on issues

**April 2026+ (Growth Phase)**
- Continue onboarding beta users
- Reach 10+ paying customers
- Iterate based on feedback
- Plan public launch

---

## Key Dates to Remember

- **Dec 10, 2025:** Phase 1 started (GBP activity begins)
- **Feb 8, 2026:** Submit GBP API application (after 60 days)
- **Feb 15, 2026:** Expected API approval
- **Mar 5, 2026:** Beta launch target
- **Apr 1, 2026:** Public launch target

---

## Success Metrics

### Phase 1-3 (Building)
- [ ] GBP active for 60+ days with 8+ posts
- [ ] 3+ reviews received and responded to
- [ ] Marketing site getting 100+ visitors/month
- [ ] Waitlist: 50+ signups
- [ ] **SMS system tested end-to-end with mock data**
- [ ] **A2P 10DLC registration approved**

### Phase 7 (Beta)
- [ ] 10+ beta users signed up with verified phone numbers
- [ ] 5+ paid conversions
- [ ] **100+ SMS messages sent/received**
- [ ] **80%+ of reviews responded to via SMS (not dashboard)**
- [ ] 50+ reviews processed
- [ ] 3+ users using SMS hours/posts features
- [ ] < 5% churn rate
- [ ] User feedback: "SMS is faster than dashboard"

### Phase 8 (Growth)
- [ ] 100+ paying customers
- [ ] $10K+ MRR ($19-79/month per customer)
- [ ] 1000+ reviews processed/month
- [ ] **10,000+ SMS messages/month**
- [ ] **5+ POS/booking integrations generating review requests**
- [ ] 50+ review requests sent daily
- [ ] 15-25% review request conversion rate
- [ ] < 3% churn rate
- [ ] 90%+ of interactions happen via SMS

---

## Ready to Move Forward

With this updated plan, you have:
- ✅ Clear checkboxes to track progress
- ✅ Realistic timeline (60-day GBP requirement accounted for)
- ✅ Detailed phases from now through growth
- ✅ Weekly milestones to stay on track
- ✅ Success metrics to measure progress

**Next Actions:**
1. Continue Phase 1: Keep GBP active (weekly posts, get reviews)
2. Start Phase 2: Begin building the product with mock APIs
3. Mark items complete as you finish them
4. Submit API application on Feb 8, 2026

---

## Appendix A – Twilio Implementation Reference

### Detailed Implementation Guides

For comprehensive implementation details, see these companion documents:

1. **`twilio-integration-plan.md`**
   - Complete implementation guide for SMS review responses
   - Database schema with SMS tables
   - Phone verification flow (6-digit code)
   - SMS webhook handler (A/E/S commands)
   - Code examples for Twilio SDK
   - Testing checklist
   - Security considerations

2. **`sms-feature-ideas.md`**
   - Extensive list of SMS features beyond reviews
   - Hours management commands
   - Post updates via SMS
   - Photo uploads (MMS)
   - Stats commands
   - Q&A management
   - Competitor monitoring
   - Team coordination
   - Command reference sheet
   - Pricing strategy by feature tier

3. **`twilio-approval-process.md`**
   - A2P 10DLC registration guide
   - Step-by-step approval timeline (2-5 business days)
   - Campaign type selection ("Customer Care")
   - Cost breakdown ($15-20/month setup)
   - Compliance requirements
   - Message throughput limits
   - Troubleshooting common issues

4. **`review-request-integrations.md`**
   - POS/booking system integrations
   - Square integration (easiest, highest priority)
   - Toast, Clover, Mindbody, Vagaro guides
   - Zapier universal integration
   - Webhook architecture
   - Database schema for review requests
   - Email/SMS templates
   - Compliance (CAN-SPAM, TCPA)
   - ROI calculations

### Quick Start: Twilio Setup (Week 1)

**Day 1: Account Setup**
```bash
1. Go to https://www.twilio.com/try-twilio
2. Sign up (get $15 free credit)
3. Verify email and phone
4. Add payment method (instant upgrade)
5. Buy phone number ($1.15/month)
6. Test SMS to your own phone
```

**Day 2-5: A2P Registration**
```bash
1. Register business brand (1-2 business days)
   - Business name: EchoPilot
   - EIN: [your tax ID]
   - Website: echopilot.me
   - Cost: $4/month

2. Create "Customer Care" campaign (1-2 business days)
   - Campaign: "Review Response Notifications"
   - Use case: Customer Care (two-way SMS)
   - Sample messages: [review notification format]
   - Cost: $10-15/month
```

**Credentials:**
```bash
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+15551234567
```

### Cost Summary

**Setup Costs:**
- Phone number: $1.15/month
- A2P Brand registration: $4/month
- A2P Campaign: $10-15/month
- **Total setup: ~$15-20/month**

**Usage Costs:**
- SMS sent: $0.0079 each
- SMS received: $0.0079 each

**Example for 100 customers:**
- 100 reviews/month/customer = 10,000 reviews total
- 10,000 SMS sent = $79
- 10,000 SMS received = $79
- Setup fees = $20
- **Total: ~$178/month**

**Revenue (charging $10-79/month per customer):**
- 100 customers × $39 average = $3,900/month
- Costs = $178
- **Profit: $3,722/month**

### Implementation Priority

**Phase 1 (Week 1-2):** Core SMS
- ✅ Phone verification
- ✅ Review notifications
- ✅ A/E/S commands
- ✅ Mock GBP integration

**Phase 2 (Week 3-4):** Business Management
- ✅ Hours management
- ✅ Post updates
- ✅ Stats commands

**Phase 3 (Week 5-6):** Review Requests
- ✅ Square integration
- ✅ Zapier integration
- ✅ Email/SMS templates

**Phase 4 (Later):** Advanced Features
- ⏳ Photo uploads (MMS)
- ⏳ Q&A management
- ⏳ Competitor monitoring
- ⏳ Team coordination

---

## Appendix B – Business Profile API Approval Notes

### Understanding the API Landscape
- **By default:** You only see the Performance API (metrics, insights)
- **Gated since 2023:** The core Business Profile API (read/write reviews, locations) requires manual approval
- **Why it's gated:** Google wants to prevent spam and ensure quality integrations

### Requirements Checklist
- [ ] Google Business Profile verified and active for 60+ days
- [ ] Business website listed on the GBP
- [ ] Google Cloud project created
- [ ] Clear use-case that benefits business owners
- [ ] Compliance with Google's policies

### Application Process
1. **Prepare your materials:**
   - Cloud project name and number
   - GBP public URL
   - Screenshots showing 60+ days of activity
   - Website URL
   - Use-case description

2. **Submit the form:**
   - Go to: https://developers.google.com/my-business/content/prereqs
   - Find "GBP API contact form" link
   - Select "Application for Basic API Access"
   - Use the email that owns the Cloud project (`admin@echopilot.me`)

3. **Use-case talking points:**
   - "EchoPilot is a SaaS platform that helps business owners automate review responses"
   - "Users OAuth-connect their own Google Business Profiles to our app"
   - "We generate human-grade replies using OpenAI with custom brand guidelines"
   - "All data is stored securely (Supabase + encrypted secrets)"
   - "We comply with all Google policies and rate limits"
   - "Replies can be reviewed/edited before posting"

4. **After submission:**
   - Expect 3-7 business days for review
   - Check email daily for follow-up questions
   - Reply within 24 hours to any questions
   - Monitor quota in Google Cloud Console

5. **Checking approval status:**
   - Go to: Google Cloud Console → APIs & Services → Dashboard
   - Search for "Business Profile API"
   - Check the quota:
     - **0 QPM = Not approved yet**
     - **300 QPM = Approved! ✅**

6. **After approval:**
   - Enable "Business Profile API" in Cloud Console
   - Enable "Business Profile Performance API" in Cloud Console
   - Create service account `echopilot-review-bot`
   - Grant role: "Business Profile API User"
   - Download JSON key and store securely
   - No new OAuth scopes needed (`business.manage` already covers it)

### While Waiting for Approval
- Build against the Performance API (available immediately)
- Create mock providers for review payloads
- Implement the entire flow with mocks
- Test end-to-end with fake data
- When approval arrives, just swap mock provider for real API client

### Common Rejection Reasons (and how to avoid them)
- ❌ GBP not active for 60+ days → **Wait the full 60 days**
- ❌ No website or incomplete website → **Have a professional site with privacy/terms**
- ❌ Unclear use-case → **Be specific about OAuth flow and user consent**
- ❌ Looks like spam/automation → **Emphasize human review and quality**
- ❌ Wrong email used → **Use the Cloud project owner email**

### If Rejected
- Read the rejection email carefully
- Address all concerns mentioned
- Wait 30 days before reapplying
- Improve GBP activity and website
- Clarify use-case in reapplication

---

## Appendix C – Important Links

### Google Business Profile
- GBP Dashboard: https://business.google.com/
- GBP Help Center: https://support.google.com/business/
- API Prerequisites: https://developers.google.com/my-business/content/prereqs
- API Documentation: https://developers.google.com/my-business/reference/rest
- OAuth Scopes: https://developers.google.com/my-business/content/scopes

### Google Cloud Platform
- Cloud Console: https://console.cloud.google.com/
- APIs & Services: https://console.cloud.google.com/apis/dashboard
- Service Accounts: https://console.cloud.google.com/iam-admin/serviceaccounts
- Pub/Sub: https://console.cloud.google.com/cloudpubsub

### Third-Party Services
- Vercel Dashboard: https://vercel.com/dashboard
- Supabase Dashboard: https://app.supabase.com/
- Stripe Dashboard: https://dashboard.stripe.com/
- OpenAI Platform: https://platform.openai.com/
- Railway Dashboard: https://railway.app/dashboard

### Development Tools
- Next.js Docs: https://nextjs.org/docs
- NextAuth Docs: https://next-auth.js.org/
- Prisma Docs: https://www.prisma.io/docs
- Fastify Docs: https://www.fastify.io/docs/latest/
- Tailwind CSS: https://tailwindcss.com/docs

---

## Appendix D – Troubleshooting

### GBP API Not Working
- **Check quota:** 0 QPM means not approved yet
- **Check service account:** Must have "Business Profile API User" role
- **Check OAuth scope:** Must include `business.manage`
- **Check rate limits:** 300 QPM max
- **Check credentials:** Service account JSON must be valid

### OAuth Flow Issues
- **Redirect URI mismatch:** Must exactly match what's in Google Cloud Console
- **Invalid client:** Check `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
- **Scope not granted:** User must approve `business.manage` scope
- **Token expired:** Implement refresh token logic

### Pub/Sub Not Receiving Events
- **Check subscription:** Must be push type with correct endpoint
- **Check service account:** Must have Pub/Sub Subscriber role
- **Check webhook:** Must return 200 OK within 10 seconds
- **Check GBP notifications:** Must be configured in Business Profile settings

### Stripe Webhook Failures
- **Check signature:** Use `STRIPE_WEBHOOK_SECRET` to verify
- **Check endpoint:** Must be publicly accessible
- **Check events:** Must subscribe to correct event types
- **Check response:** Must return 200 OK quickly

### OpenAI API Errors
- **Check billing:** Must have payment method on file
- **Check quota:** May hit rate limits on free tier
- **Check model:** Ensure using correct model name
- **Check prompt:** May be triggering content policy

### Database Connection Issues
- **Check URL:** Must include password and correct host
- **Check SSL:** Supabase requires SSL connection
- **Check migrations:** Run `npx prisma migrate deploy`
- **Check permissions:** Service role key for admin operations

---

## Appendix E – Weekly GBP Activity Checklist

Use this to stay consistent during the 60-day waiting period:

### Every Monday (Weekly Post)
- [ ] Create a post about your business/product
- [ ] Add a photo or video
- [ ] Include a call-to-action
- [ ] Use relevant keywords

### Every Day (Quick Check)
- [ ] Check for new reviews (respond within 24 hours)
- [ ] Check for questions (answer promptly)
- [ ] Check analytics (views, clicks)

### Every 2 Weeks (Content Refresh)
- [ ] Upload new photos (products, team, office)
- [ ] Update business hours if needed
- [ ] Add/update services
- [ ] Check competitors' profiles for ideas

### Monthly (Deep Maintenance)
- [ ] Review all business information for accuracy
- [ ] Update seasonal hours/services
- [ ] Analyze performance metrics
- [ ] Plan next month's content

### Track Your Progress
| Week | Date | Post | Reviews | Photos | Notes |
|------|------|------|---------|--------|-------|
| 1 | Dec 10 | ☐ | ☐ | ☐ | |
| 2 | Dec 17 | ☐ | ☐ | ☐ | |
| 3 | Dec 24 | ☐ | ☐ | ☐ | |
| 4 | Dec 31 | ☐ | ☐ | ☐ | |
| 5 | Jan 7 | ☐ | ☐ | ☐ | |
| 6 | Jan 14 | ☐ | ☐ | ☐ | |
| 7 | Jan 21 | ☐ | ☐ | ☐ | |
| 8 | Jan 28 | ☐ | ☐ | ☐ | |
| 9 | Feb 4 | ☐ | ☐ | ☐ | Ready to apply! |