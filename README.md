# EchoPilot Documentation Guide

**Last Updated:** January 19, 2026

---

## 🎯 Product Vision (Updated Jan 2026)

**EchoPilot brings business management to text.**

Business owners manage their entire Google Business Profile via SMS—respond to reviews, update hours, post updates, request reviews from customers—all without opening a dashboard.

**Key Principle:** SMS is the PRIMARY interface. AI is an optional helper. Dashboard is secondary.

---

## 📁 Documentation Structure

### Core Planning Documents (START HERE)

**1. `plan.md` - Master Implementation Plan** 🔥
- **Purpose:** Step-by-step launch plan from now through growth
- **What's inside:**
  - Phase 0-8: Complete launch timeline
  - 60-day GBP verification requirement
  - Google API approval process
  - SMS-first product architecture
  - Twilio integration (priority #1)
  - Database schema, auth, integrations
  - Environment variables
  - Success metrics
- **Status:** ✅ Updated with SMS-first vision
- **Who uses it:** YOU (primary reference for building the product)

**2. `brand.md` - Brand Style Guide**
- **Purpose:** Visual identity, voice, messaging, tone
- **What's inside:**
  - Logo system & colors
  - Typography & iconography
  - Voice & tone (SMS-first, conversational)
  - Taglines ("Manage your business by text")
  - SMS message formats
  - Onboarding inputs (simplified)
- **Status:** ✅ Updated with SMS-first positioning
- **Who uses it:** Design, marketing, product copy

**3. `stack.md` - Technical Architecture**
- **Purpose:** Tech stack, hosting, infrastructure decisions
- **What's inside:**
  - Frontend: Next.js 15 (Vercel)
  - Backend: Fastify (Railway)
  - Database: Supabase (Prisma)
  - Twilio for SMS
  - Google Business Profile API
  - OpenAI (optional)
  - Stripe billing
  - Hosting strategy & costs
- **Status:** ✅ Current (no changes needed)
- **Who uses it:** Engineering, DevOps

---

### Twilio Implementation Guides (REFERENCE)

**4. `twilio-integration-plan.md` - SMS Review Response Implementation**
- **Purpose:** Complete technical guide for core SMS review functionality
- **What's inside:**
  - User experience flow (A/E/S commands)
  - Database schema (SMS tables)
  - Phone verification (6-digit code)
  - Twilio webhook handler
  - SMS service module
  - Code examples (TypeScript)
  - Testing checklist
  - Security considerations
- **Status:** ✅ Complete reference guide
- **When to use:** Week 1-2 of Phase 2 (building SMS review responses)

**5. `sms-feature-ideas.md` - Extended SMS Features**
- **Purpose:** Comprehensive list of SMS features beyond basic review responses
- **What's inside:**
  - Hours management commands
  - Post updates via SMS
  - Photo uploads (MMS)
  - Stats commands
  - Business info updates
  - Q&A management
  - Competitor monitoring
  - Review request campaigns
  - Team coordination
  - Command reference
  - Feature prioritization (Phase 1-5)
  - Pricing tiers by feature
- **Status:** ✅ Complete feature catalog
- **When to use:** Week 3-4 of Phase 2 (adding advanced SMS features)

**6. `twilio-approval-process.md` - A2P 10DLC Registration**
- **Purpose:** Step-by-step guide for Twilio SMS approval
- **What's inside:**
  - Trial vs paid account
  - A2P 10DLC registration (2-5 day timeline)
  - Brand registration ($4/month)
  - Campaign registration ($10-15/month)
  - "Customer Care" use case
  - Sample messages for approval
  - Cost breakdown
  - Compliance requirements
  - Troubleshooting
- **Status:** ✅ Complete approval guide
- **When to use:** Week 1 of Phase 2 (starting Twilio setup)

**7. `review-request-integrations.md` - POS/Booking System Integrations**
- **Purpose:** Automate review requests after customer visits
- **What's inside:**
  - Square integration (priority #1)
  - Toast, Clover, Mindbody, Vagaro
  - Zapier universal integration
  - Webhook architecture
  - Database schema for review_requests
  - Email/SMS templates
  - Compliance (CAN-SPAM, TCPA)
  - Cost analysis & ROI
  - Integration priority order
  - Development timeline
- **Status:** ✅ Complete integration guide
- **When to use:** Week 5-6 of Phase 2 (adding review request automation)

---

### Marketing & Business Documents

**8. `marketing_site_full.md` - Marketing Website Content**
- **Purpose:** Copy and content for echopilot.me marketing site
- **What's inside:**
  - Hero copy
  - How it works
  - Pricing (needs update for SMS-first)
  - Features
  - Privacy policy
  - Terms of service
- **Status:** ⚠️ Needs update for SMS-first positioning
- **Action needed:** Update hero, features, pricing to highlight SMS
- **Who uses it:** Marketing, web development

**9. `boulder-business-outreach.md` - Local Marketing Strategy**
- **Purpose:** Outreach strategy for Boulder, CO businesses
- **What's inside:**
  - Target business types
  - Outreach templates
  - Local partnerships
  - Beta recruitment
- **Status:** 📋 Reference (for later)
- **When to use:** Phase 7 (beta launch)

---

### Developer & AI Guides

**10. `ai_runbook.md` - AI Assistant Instructions**
- **Purpose:** Instructions for AI assistants (like me!) working on the codebase
- **What's inside:**
  - Project overview
  - Architecture decisions
  - Coding standards
  - Common tasks
  - Troubleshooting
- **Status:** ✅ Current
- **Who uses it:** AI assistants, new developers

---

## 🗂️ Recommended File Organization

### Keep These (Core Documents)
✅ `plan.md` - Master plan
✅ `brand.md` - Brand guide
✅ `stack.md` - Tech stack
✅ `ai_runbook.md` - AI instructions

### Keep These (Twilio Reference)
✅ `twilio-integration-plan.md` - Core SMS implementation
✅ `sms-feature-ideas.md` - Feature catalog
✅ `twilio-approval-process.md` - Approval guide
✅ `review-request-integrations.md` - Integration guide

### Update These
⚠️ `marketing_site_full.md` - Update for SMS-first messaging

### Keep for Later
📋 `boulder-business-outreach.md` - Beta/launch phase

---

## 🚀 Getting Started (New Team Member)

**If you're starting work on EchoPilot:**

1. **Read `plan.md` first** - Understand the overall timeline and architecture
2. **Read `brand.md`** - Understand the positioning and voice
3. **Review `stack.md`** - Understand the tech stack
4. **Week 1-2:** Follow `twilio-approval-process.md` and `twilio-integration-plan.md`
5. **Week 3-4:** Reference `sms-feature-ideas.md` for additional features
6. **Week 5-6:** Reference `review-request-integrations.md` for integrations

---

## 📝 Quick Reference: What Changed (Jan 2026)

### Product Pivot
- **FROM:** AI-powered review automation tool
- **TO:** Text-based business management platform

### Key Changes
1. SMS is PRIMARY interface (not dashboard)
2. AI is OPTIONAL (helper, not core feature)
3. More features via SMS: hours, posts, stats, review requests
4. Dashboard is SECONDARY (for analytics and power users)
5. Review request automation via POS/booking integrations

### Impact on Docs
- ✅ `plan.md` - Updated with SMS-first architecture
- ✅ `brand.md` - Updated with new positioning and taglines
- ⚠️ `marketing_site_full.md` - Needs update
- ✅ Twilio docs - Now core reference (not optional feature)

---

## 💡 Document Maintenance

**When to update docs:**
- ✅ `plan.md` - Update checkboxes as you complete tasks
- ✅ `brand.md` - Update if messaging or visual identity changes
- ✅ `stack.md` - Update if tech stack changes
- ✅ `ai_runbook.md` - Update as you learn new patterns

**When to archive docs:**
- If a doc becomes outdated or irrelevant, move to `/archive/` folder
- Add a note at the top: `# [ARCHIVED - Date - Reason]`

---

## 🎯 Next Actions

**For YOU (Builder):**
1. ✅ Review updated `plan.md` - Phase 2 priorities
2. ✅ Start Week 1 of Phase 2:
   - [ ] Create Twilio account
   - [ ] Buy phone number
   - [ ] Start A2P 10DLC registration
   - [ ] Set up Supabase database
3. ✅ Follow `twilio-integration-plan.md` for implementation details
4. ⚠️ Update `marketing_site_full.md` with SMS-first messaging (when ready)

**For Marketing/Copy:**
- Update marketing site copy to highlight SMS-first value prop
- New taglines: "Manage your business by text"
- Emphasize speed, convenience, no dashboard needed

---

## 📞 Questions?

**If you're confused about:**
- **Overall timeline & phases** → Read `plan.md`
- **What to build first** → Read Phase 2 in `plan.md`
- **How to implement SMS** → Read `twilio-integration-plan.md`
- **What features to add** → Read `sms-feature-ideas.md`
- **How to get Twilio approved** → Read `twilio-approval-process.md`
- **POS integrations** → Read `review-request-integrations.md`
- **Brand voice & tone** → Read `brand.md`
- **Tech stack decisions** → Read `stack.md`

---

**Ready to build? Start with `plan.md` Phase 2! 🚀**
