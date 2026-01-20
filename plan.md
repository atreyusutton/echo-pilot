# EchoPilot Credential & Launch Plan

This guide walks through the exact order of operations required to ship the marketing site, build credibility, and secure every API credential (with an emphasis on Google Business Profile approval).

**Last Updated:** December 10, 2025

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

**Goal:** Build the complete product with mock/test APIs so we're ready to launch when GBP API approval arrives.

**Status:** ⏳ PENDING (Start after Phase 0 complete)

**Timeline:** Dec 10, 2025 → Feb 8, 2026 (parallel with Phase 1)

### 2.1 Database & Schema Setup
- [ ] **Supabase Setup**
  - [ ] Create Supabase project `echopilot-db`
  - [ ] Choose region near target users
  - [ ] Copy `DATABASE_URL` connection string
  - [ ] Enable daily backups
  - [ ] Store anon + service role keys securely
- [ ] **Prisma Schema Design**
  - [ ] Users table (id, email, name, created_at)
  - [ ] Accounts table (NextAuth integration)
  - [ ] Sessions table (NextAuth integration)
  - [ ] BusinessProfiles table (google_account_id, location_ids, connected_at)
  - [ ] BrandBriefs table (user_id, tone, signature, taboo_phrases, usp_snippets)
  - [ ] Reviews table (review_id, location_id, rating, text, author, created_at)
  - [ ] Replies table (review_id, reply_text, status, sent_at)
  - [ ] Subscriptions table (user_id, stripe_customer_id, plan, status)
- [ ] **Run Migrations**
  - [ ] `npx prisma migrate dev`
  - [ ] Test with sample data
  - [ ] Set up Prisma Client

### 2.2 Authentication & User Management
- [ ] **NextAuth Setup**
  - [ ] Install NextAuth in `app.echopilot.me`
  - [ ] Configure Google OAuth provider (test mode)
  - [ ] Configure email provider (magic links)
  - [ ] Set up session strategy (JWT)
  - [ ] Create protected API routes
- [ ] **User Onboarding Flow**
  - [ ] Sign up / Sign in pages
  - [ ] Email verification
  - [ ] Profile setup
  - [ ] Dashboard redirect after login

### 2.3 Google Business Profile Integration (Mock Mode)
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
  - [ ] Mock reply posting
  - [ ] Feature flag to switch between mock/real API

### 2.4 Brand Brief Capture
- [ ] **Brand Brief Form**
  - [ ] Tone sliders (formal ↔ casual, empathetic ↔ professional)
  - [ ] Signature input (e.g., "- Sarah, Owner")
  - [ ] Taboo phrases textarea
  - [ ] USP snippets (what makes business unique)
  - [ ] Preferred openings/closings
  - [ ] Save to database
- [ ] **Brand Brief Editor**
  - [ ] View current brand brief
  - [ ] Edit and update
  - [ ] Preview sample AI responses

### 2.5 OpenAI Integration
- [ ] **OpenAI Setup**
  - [ ] Create OpenAI account / project
  - [ ] Note `OPENAI_ORG_ID` and `OPENAI_PROJECT_ID`
  - [ ] Generate API key (`OPENAI_API_KEY`)
  - [ ] Confirm billing is enabled
  - [ ] Test with sample curl to `/v1/chat/completions`
- [ ] **Reply Generation Service**
  - [ ] Create prompt template using brand brief
  - [ ] Build function to generate replies
  - [ ] Include review context (rating, text, author)
  - [ ] Handle errors and retries
  - [ ] Add response validation
  - [ ] Test with various review scenarios

### 2.6 Stripe Integration
- [ ] **Stripe Setup**
  - [ ] Create Stripe account
  - [ ] Switch to Test mode
  - [ ] Copy publishable + secret keys
  - [ ] Store as `NEXT_PUBLIC_STRIPE_KEY` and `STRIPE_SECRET_KEY`
- [ ] **Product & Pricing Setup**
  - [ ] Create Product: "Starter" - $9/month
  - [ ] Create Product: "Standard" - $19/month
  - [ ] Create Product: "Pro" - $29/month
  - [ ] Capture price IDs for each
  - [ ] Define feature limits per plan
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

### 2.7 Dashboard UI
- [ ] **Main Dashboard**
  - [ ] Overview stats (reviews, replies, response rate)
  - [ ] Recent reviews list
  - [ ] Pending replies queue
  - [ ] Subscription status widget
- [ ] **Review Management**
  - [ ] List all reviews with filters (rating, date, location)
  - [ ] View individual review details
  - [ ] Edit AI-generated reply before sending
  - [ ] Manual reply composer
  - [ ] Reply history
- [ ] **Settings Pages**
  - [ ] Connected Business Profiles
  - [ ] Brand Brief editor
  - [ ] Automation toggle (on/off)
  - [ ] Notification preferences
  - [ ] Billing & subscription management
  - [ ] Account settings

### 2.8 Queue & Background Jobs
- [ ] **Choose Queue Solution**
  - [ ] Evaluate: Cloudflare Queues vs BullMQ (Redis) vs Inngest
  - [ ] Make decision based on hosting choice
- [ ] **Review Processing Queue**
  - [ ] Job: Fetch new reviews
  - [ ] Job: Generate AI reply
  - [ ] Job: Post reply to GBP
  - [ ] Job: Update database
  - [ ] Handle job failures and retries
  - [ ] Add job monitoring/logging

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
STRIPE_PRICE_ID_STARTER=
STRIPE_PRICE_ID_STANDARD=
STRIPE_PRICE_ID_PRO=

# OpenAI
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
ENABLE_AUTO_REPLY=true
ENABLE_MOCK_GBP_API=false
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
  - [ ] Start Supabase setup
  - [ ] Start NextAuth implementation
  - [ ] GBP: Post 1st weekly update
- Week 2 (Dec 17-23):
  - [ ] Complete database schema
  - [ ] Build authentication flow
  - [ ] Start brand brief capture UI
  - [ ] GBP: Post 2nd weekly update, get first review
- Week 3 (Dec 24-31):
  - [ ] OpenAI integration
  - [ ] Mock GBP API provider
  - [ ] Dashboard UI foundations
  - [ ] GBP: Post 3rd weekly update

**January 2026 (Weeks 4-7)**
- Week 4 (Jan 1-7):
  - [ ] Stripe integration
  - [ ] Checkout flow
  - [ ] GBP: Post 4th weekly update
- Week 5 (Jan 8-14):
  - [ ] Review management UI
  - [ ] Reply generation & editing
  - [ ] GBP: Post 5th weekly update, get 2nd review
- Week 6 (Jan 15-21):
  - [ ] Queue setup
  - [ ] Background job processing
  - [ ] GBP: Post 6th weekly update
- Week 7 (Jan 22-28):
  - [ ] Settings pages
  - [ ] Automation toggle
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

### Phase 7 (Beta)
- [ ] 10+ beta users signed up
- [ ] 5+ paid conversions
- [ ] 50+ reviews processed
- [ ] 4.5+ star average for AI replies (user rating)
- [ ] < 5% churn rate

### Phase 8 (Growth)
- [ ] 100+ paying customers
- [ ] $10K+ MRR
- [ ] 1000+ reviews processed/month
- [ ] < 3% churn rate
- [ ] 4.8+ star average for AI replies

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

## Appendix A – Business Profile API Approval Notes

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

## Appendix B – Important Links

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

## Appendix C – Troubleshooting

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

## Appendix D – Weekly GBP Activity Checklist

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