# Review Request Integration Guide

## Overview
Automatically request Google reviews from customers after they visit your business by integrating with POS systems, booking software, and other platforms.

**The Goal:** Customer checks out → Automatic review request sent → More reviews → Better local SEO

---

## Why This is Valuable

### For Business Owners:
- ✅ **More reviews = higher rankings** in Google Maps
- ✅ **Automated** - No manual follow-up needed
- ✅ **Perfect timing** - Request sent right after positive experience
- ✅ **Higher response rate** - Strike while iron is hot

### For EchoPilot:
- 🔥 **Sticky feature** - Hard to leave once integrated
- 🔥 **Competitive moat** - Most review tools don't do this
- 🔥 **Upsell opportunity** - Premium feature
- 🔥 **Network effects** - More reviews = more value

---

## Integration Difficulty Levels

### ⭐ Easy (Webhook-based)
**Time to build:** 1-2 weeks
- Square
- Stripe
- Calendly
- Acuity Scheduling
- Mindbody (fitness/wellness)

### ⭐⭐ Medium (API-based)
**Time to build:** 2-4 weeks
- Toast (restaurants)
- Clover (retail/restaurants)
- Shopify (retail)
- OpenTable (restaurants)
- Vagaro (salons/spas)

### ⭐⭐⭐ Hard (Complex APIs)
**Time to build:** 4-8 weeks
- Oracle Micros (enterprise restaurants)
- Aloha POS (restaurants)
- Lightspeed (retail/restaurants)
- Resy (high-end restaurants)

### ⭐⭐⭐⭐ Very Hard (No API)
**Time to build:** 8+ weeks or not feasible
- Legacy POS systems
- Custom-built systems
- Systems without APIs

---

## Top Integration Targets by Industry

### 🍽️ Restaurants

#### 1. **Square** (⭐ Easy)
**Market Share:** 30%+ of small restaurants
**API Quality:** Excellent
**Webhook Support:** Yes

**How It Works:**
```
Customer pays → Square webhook fires → EchoPilot receives:
- Customer email/phone
- Order total
- Timestamp
- Location

→ Wait 2 hours → Send review request
```

**Integration Effort:** 1 week
**Documentation:** https://developer.squareup.com/

---

#### 2. **Toast** (⭐⭐ Medium)
**Market Share:** 20%+ of restaurants (growing fast)
**API Quality:** Good
**Webhook Support:** Yes

**How It Works:**
```
Check closed → Toast webhook → EchoPilot:
- Guest info (if captured)
- Check total
- Server name
- Table number

→ Send review request next day
```

**Integration Effort:** 2-3 weeks
**Documentation:** https://doc.toasttab.com/

**Note:** Toast requires partnership application (not hard to get)

---

#### 3. **Clover** (⭐⭐ Medium)
**Market Share:** 15%+ of restaurants
**API Quality:** Good
**Webhook Support:** Yes

**Integration Effort:** 2-3 weeks
**Documentation:** https://docs.clover.com/

---

#### 4. **OpenTable** (⭐⭐ Medium)
**Market Share:** High-end restaurants
**API Quality:** Good (but restricted)
**Webhook Support:** Limited

**How It Works:**
```
Reservation completed → OpenTable API → EchoPilot:
- Guest email
- Reservation time
- Party size

→ Send review request 24 hours after reservation
```

**Integration Effort:** 3-4 weeks
**Documentation:** https://platform.opentable.com/

**Note:** OpenTable API requires partnership (harder to get)

---

### 💇 Salons & Spas

#### 5. **Vagaro** (⭐⭐ Medium)
**Market Share:** #1 for salons/spas
**API Quality:** Good
**Webhook Support:** Yes

**How It Works:**
```
Appointment completed → Vagaro webhook → EchoPilot:
- Client email/phone
- Service type
- Stylist name
- Appointment time

→ Send review request 2 hours later
```

**Integration Effort:** 2-3 weeks
**Documentation:** https://developers.vagaro.com/

---

#### 6. **Mindbody** (⭐ Easy)
**Market Share:** Large (fitness + wellness)
**API Quality:** Excellent
**Webhook Support:** Yes

**How It Works:**
```
Class/appointment ends → Mindbody webhook → EchoPilot:
- Client info
- Service/class name
- Instructor name

→ Send review request same day
```

**Integration Effort:** 1-2 weeks
**Documentation:** https://developers.mindbodyonline.com/

---

### 🏋️ Gyms & Fitness

#### 7. **Mindbody** (see above)

#### 8. **Zen Planner** (⭐⭐ Medium)
**Market Share:** CrossFit & martial arts gyms
**API Quality:** Decent
**Webhook Support:** Limited

**Integration Effort:** 3-4 weeks

---

#### 9. **Glofox** (⭐⭐ Medium)
**Market Share:** Boutique fitness studios
**API Quality:** Good
**Webhook Support:** Yes

**Integration Effort:** 2-3 weeks

---

### 🚗 Auto Shops

#### 10. **Shopmonkey** (⭐⭐ Medium)
**Market Share:** Growing fast
**API Quality:** Good
**Webhook Support:** Yes

**How It Works:**
```
Work order completed → Shopmonkey webhook → EchoPilot:
- Customer email/phone
- Service performed
- Invoice total

→ Send review request next day
```

**Integration Effort:** 2-3 weeks

---

#### 11. **Tekmetric** (⭐⭐ Medium)
**Market Share:** Modern auto shops
**API Quality:** Good
**Webhook Support:** Yes

**Integration Effort:** 2-3 weeks

---

### 🏠 Airbnb & Hospitality

#### 12. **Airbnb** (⭐⭐⭐ Hard)
**API Quality:** Restricted (requires approval)
**Webhook Support:** Limited

**Challenge:** Airbnb doesn't share guest emails easily

**Alternative Approach:**
- Property managers use their own booking systems
- Integrate with those instead (Guesty, Hostfully, etc.)

---

#### 13. **Guesty** (⭐⭐ Medium)
**Market Share:** Property management software
**API Quality:** Good
**Webhook Support:** Yes

**Integration Effort:** 3-4 weeks

---

## Universal Integration: Zapier

### ⭐ Easiest Option (but limited)

**How It Works:**
```
Any Zapier-connected app → Zapier → EchoPilot webhook
```

**Pros:**
- ✅ 5,000+ apps supported
- ✅ No coding needed for users
- ✅ Quick to set up

**Cons:**
- ❌ Requires users to set up Zaps
- ❌ Less seamless than native integration
- ❌ Costs extra ($20-50/mo for users)

**Best For:** 
- MVP/testing
- Long-tail integrations
- Custom setups

**Example Zaps:**
- Square → EchoPilot
- Calendly → EchoPilot
- Acuity → EchoPilot
- Typeform → EchoPilot

---

## Technical Architecture

### How Review Requests Work:

```
┌─────────────┐
│   POS/CRM   │
│  (Square,   │
│   Toast)    │
└──────┬──────┘
       │
       │ Webhook: "Transaction completed"
       │ Data: {email, phone, amount, timestamp}
       │
       ▼
┌─────────────────┐
│   EchoPilot     │
│   Webhook       │
│   Handler       │
└────────┬────────┘
         │
         │ 1. Validate webhook signature
         │ 2. Extract customer info
         │ 3. Check if customer exists
         │ 4. Queue review request job
         │
         ▼
┌─────────────────┐
│  Review Request │
│     Queue       │
└────────┬────────┘
         │
         │ Wait configured delay (2-24 hours)
         │
         ▼
┌─────────────────┐
│  Send Review    │
│    Request      │
│  (Email/SMS)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Customer      │
│   Clicks Link   │
│   → Google      │
│   Review Form   │
└─────────────────┘
```

---

## Database Schema

### New Tables Needed:

```sql
-- Integrations table
CREATE TABLE integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  platform VARCHAR(50), -- 'square', 'toast', 'mindbody', etc.
  platform_account_id VARCHAR(255),
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at TIMESTAMP,
  webhook_secret VARCHAR(255),
  settings JSONB, -- delay, message template, etc.
  status VARCHAR(20) DEFAULT 'active', -- active, paused, error
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Review requests table
CREATE TABLE review_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  integration_id UUID REFERENCES integrations(id),
  customer_email VARCHAR(255),
  customer_phone VARCHAR(20),
  customer_name VARCHAR(255),
  transaction_id VARCHAR(255), -- POS transaction ID
  transaction_amount DECIMAL(10,2),
  transaction_date TIMESTAMP,
  scheduled_send_at TIMESTAMP,
  sent_at TIMESTAMP,
  clicked_at TIMESTAMP,
  reviewed_at TIMESTAMP,
  review_id VARCHAR(255), -- Google review ID if we can track it
  status VARCHAR(20) DEFAULT 'scheduled', -- scheduled, sent, clicked, reviewed, bounced
  delivery_method VARCHAR(10), -- 'email' or 'sms'
  created_at TIMESTAMP DEFAULT NOW()
);

-- Integration webhooks log (for debugging)
CREATE TABLE integration_webhooks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  integration_id UUID REFERENCES integrations(id),
  platform VARCHAR(50),
  event_type VARCHAR(100),
  payload JSONB,
  processed BOOLEAN DEFAULT false,
  error TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Review Request Flow

### Step 1: OAuth Connection

**User Experience:**
```
EchoPilot Dashboard → Integrations → Connect Square

→ Redirect to Square OAuth
→ User authorizes
→ Redirect back to EchoPilot
→ ✅ Connected!
```

**What EchoPilot Stores:**
- Access token
- Refresh token
- Square merchant ID
- Webhook secret

---

### Step 2: Configure Settings

**Settings UI:**
```
┌─────────────────────────────────────┐
│ Square Integration Settings         │
├─────────────────────────────────────┤
│                                     │
│ ⏱️ Delay before sending request:    │
│   ○ 2 hours (recommended)           │
│   ○ 24 hours                        │
│   ○ Custom: [__] hours              │
│                                     │
│ 📧 Delivery method:                 │
│   ☑ Email (if available)            │
│   ☑ SMS (if available)              │
│                                     │
│ 💵 Minimum transaction amount:      │
│   $[10] (skip small orders)         │
│                                     │
│ 📝 Message template:                │
│   [Hi {name}! Thanks for visiting   │
│    {business}. We'd love your       │
│    feedback: {review_link}]         │
│                                     │
│ 🚫 Don't send if:                   │
│   ☑ Customer left review in last    │
│      30 days                        │
│   ☑ Customer opted out              │
│                                     │
│         [Save Settings]             │
└─────────────────────────────────────┘
```

---

### Step 3: Transaction Happens

**Square sends webhook:**
```json
{
  "merchant_id": "MLQR2N8XQFG7E",
  "type": "payment.created",
  "event_id": "abc123",
  "created_at": "2026-01-15T18:30:00Z",
  "data": {
    "object": {
      "payment": {
        "id": "payment_123",
        "amount_money": {
          "amount": 4500,
          "currency": "USD"
        },
        "customer_id": "cust_456",
        "receipt_email": "sarah@example.com",
        "receipt_number": "4567"
      }
    }
  }
}
```

---

### Step 4: EchoPilot Processes Webhook

```typescript
// /api/webhooks/square
export async function POST(req: Request) {
  // 1. Verify webhook signature
  const signature = req.headers.get('x-square-signature');
  const isValid = verifySquareSignature(signature, await req.text());
  
  if (!isValid) {
    return Response.json({ error: 'Invalid signature' }, { status: 403 });
  }

  // 2. Parse webhook data
  const webhook = await req.json();
  
  // 3. Find integration
  const integration = await prisma.integration.findFirst({
    where: {
      platform: 'square',
      platform_account_id: webhook.merchant_id,
    },
    include: { user: true },
  });

  if (!integration) {
    return Response.json({ error: 'Integration not found' }, { status: 404 });
  }

  // 4. Extract customer info
  const payment = webhook.data.object.payment;
  const customerEmail = payment.receipt_email;
  const amount = payment.amount_money.amount / 100; // Convert cents to dollars

  // 5. Check minimum amount
  if (amount < integration.settings.minimumAmount) {
    return Response.json({ status: 'skipped', reason: 'below_minimum' });
  }

  // 6. Get customer details from Square API
  const customer = await getSquareCustomer(
    integration.access_token,
    payment.customer_id
  );

  // 7. Check if customer already reviewed recently
  const recentRequest = await prisma.reviewRequest.findFirst({
    where: {
      user_id: integration.user_id,
      customer_email: customerEmail,
      created_at: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }, // 30 days
    },
  });

  if (recentRequest) {
    return Response.json({ status: 'skipped', reason: 'recent_request' });
  }

  // 8. Schedule review request
  const delayHours = integration.settings.delayHours || 2;
  const scheduledSendAt = new Date(Date.now() + delayHours * 60 * 60 * 1000);

  await prisma.reviewRequest.create({
    data: {
      user_id: integration.user_id,
      integration_id: integration.id,
      customer_email: customerEmail,
      customer_phone: customer.phone_number,
      customer_name: `${customer.given_name} ${customer.family_name}`,
      transaction_id: payment.id,
      transaction_amount: amount,
      transaction_date: new Date(webhook.created_at),
      scheduled_send_at: scheduledSendAt,
      status: 'scheduled',
      delivery_method: customerEmail ? 'email' : 'sms',
    },
  });

  // 9. Log webhook
  await prisma.integrationWebhook.create({
    data: {
      integration_id: integration.id,
      platform: 'square',
      event_type: webhook.type,
      payload: webhook,
      processed: true,
    },
  });

  return Response.json({ status: 'scheduled', send_at: scheduledSendAt });
}
```

---

### Step 5: Send Review Request (Background Job)

```typescript
// Background job runs every 5 minutes
async function processScheduledReviewRequests() {
  const now = new Date();

  // Find requests ready to send
  const requests = await prisma.reviewRequest.findMany({
    where: {
      status: 'scheduled',
      scheduled_send_at: { lte: now },
    },
    include: {
      user: {
        include: {
          businessProfiles: true,
        },
      },
    },
    limit: 100,
  });

  for (const request of requests) {
    try {
      // Get Google review link
      const businessProfile = request.user.businessProfiles[0];
      const reviewLink = `https://search.google.com/local/writereview?placeid=${businessProfile.google_place_id}`;

      // Personalize message
      const message = personalizeMessage(
        request.user.reviewRequestTemplate,
        {
          name: request.customer_name,
          business: businessProfile.name,
          review_link: reviewLink,
        }
      );

      // Send via email or SMS
      if (request.delivery_method === 'email' && request.customer_email) {
        await sendReviewRequestEmail(
          request.customer_email,
          request.customer_name,
          message,
          reviewLink
        );
      } else if (request.delivery_method === 'sms' && request.customer_phone) {
        await sendReviewRequestSMS(
          request.customer_phone,
          message
        );
      }

      // Mark as sent
      await prisma.reviewRequest.update({
        where: { id: request.id },
        data: {
          status: 'sent',
          sent_at: now,
        },
      });

    } catch (error) {
      console.error('Failed to send review request:', error);
      
      await prisma.reviewRequest.update({
        where: { id: request.id },
        data: { status: 'error' },
      });
    }
  }
}
```

---

## Review Request Templates

### Email Template:

```html
Subject: Thanks for visiting {business_name}!

Hi {customer_name},

Thank you for choosing {business_name}! We hope you had a 
great experience.

Would you mind taking 30 seconds to share your feedback on 
Google? Your review helps us improve and helps other customers 
find us.

[Leave a Review Button]

Thanks again!
{business_owner_name}
{business_name}

---
Don't want these emails? [Unsubscribe]
```

---

### SMS Template:

```
Hi {name}! Thanks for visiting {business}. 

Mind leaving us a quick review? It takes 30 seconds:
{short_link}

Reply STOP to opt out.
```

---

## Tracking & Analytics

### Dashboard Metrics:

```
┌─────────────────────────────────────┐
│ Review Request Performance          │
├─────────────────────────────────────┤
│                                     │
│ 📤 Sent this month: 47              │
│ 👁️  Clicked: 23 (49%)               │
│ ⭐ Reviews received: 12 (26%)       │
│                                     │
│ 📊 Conversion funnel:               │
│   Sent ████████████████ 100% (47)  │
│   Clicked ████████ 49% (23)        │
│   Reviewed ████ 26% (12)           │
│                                     │
│ 💡 Tip: 26% is great! Industry     │
│    average is 15-20%.               │
│                                     │
│ [View Detailed Report]              │
└─────────────────────────────────────┘
```

---

## Recommended Integration Priority

### Phase 1 (MVP - Month 1):
1. **Square** (⭐ Easy, huge market share)
2. **Zapier** (⭐ Easy, covers long tail)

**Rationale:** Square covers 30%+ of small businesses, Zapier covers the rest.

---

### Phase 2 (Month 2-3):
3. **Toast** (⭐⭐ Medium, restaurants love it)
4. **Mindbody** (⭐ Easy, fitness/wellness)
5. **Vagaro** (⭐⭐ Medium, salons/spas)

**Rationale:** Industry-specific leaders with good APIs.

---

### Phase 3 (Month 4-6):
6. **Clover** (⭐⭐ Medium, restaurants/retail)
7. **Calendly** (⭐ Easy, service businesses)
8. **Acuity** (⭐ Easy, service businesses)

---

### Phase 4 (Month 7-12):
9. **OpenTable** (⭐⭐ Medium, high-end restaurants)
10. **Shopmonkey** (⭐⭐ Medium, auto shops)
11. **Guesty** (⭐⭐ Medium, property managers)

---

## Compliance & Best Practices

### Legal Requirements:

1. **CAN-SPAM Act (Email):**
   - ✅ Include unsubscribe link
   - ✅ Honor opt-outs within 10 days
   - ✅ Include physical address
   - ✅ Don't use deceptive subject lines

2. **TCPA (SMS):**
   - ✅ Get prior express consent
   - ✅ Include opt-out instructions (STOP)
   - ✅ Honor opt-outs immediately
   - ✅ Don't send to numbers on Do Not Call list

3. **Google's Review Policies:**
   - ✅ Don't incentivize reviews (no discounts/freebies)
   - ✅ Don't gate requests (don't only ask happy customers)
   - ✅ Don't write fake reviews
   - ✅ Don't solicit bulk reviews

---

### Best Practices:

1. **Timing:**
   - ⏰ Wait 2-24 hours after transaction
   - ⏰ Send during business hours (9am-7pm)
   - ⏰ Avoid weekends for B2B

2. **Frequency:**
   - 🚫 Max 1 request per customer per 30 days
   - 🚫 Don't spam repeat customers

3. **Personalization:**
   - ✅ Use customer name
   - ✅ Reference specific service/product
   - ✅ Keep it short (< 100 words)

4. **Opt-out:**
   - ✅ Make it easy to unsubscribe
   - ✅ Honor immediately
   - ✅ Sync across email + SMS

---

## Cost Analysis

### Per-Request Costs:

**Email (via SendGrid/Mailgun):**
- $0.001 per email (1,000 emails = $1)
- Very cheap at scale

**SMS (via Twilio):**
- $0.0079 per SMS
- 1,000 SMS = $7.90
- More expensive but higher open rate

### ROI for Business Owner:

**Example Restaurant:**
- 100 customers/day = 3,000/month
- Send request to 50% = 1,500 requests
- 20% click through = 300 clicks
- 10% leave review = 150 new reviews/month

**Cost to business:**
- Email: 1,500 × $0.001 = $1.50/month
- SMS: 1,500 × $0.0079 = $11.85/month

**Value:**
- 150 reviews/month
- Better local SEO ranking
- More customers from Google Maps
- **ROI: Massive**

---

## Pricing Strategy

### How to Charge:

**Option 1: Per Request**
- $0.10 per review request sent
- Simple, usage-based
- Customer pays for what they use

**Option 2: Tiered Plans**
- Starter: 50 requests/month included
- Standard: 200 requests/month
- Pro: Unlimited requests

**Option 3: Integration Fee**
- $10-20/month per integration
- Unlimited requests
- Predictable revenue

**Recommended:** Option 3 (integration fee) + Option 2 (tiered limits)

---

## Development Timeline

### Phase 1: Square Integration (2 weeks)

**Week 1:**
- [ ] Set up Square developer account
- [ ] Build OAuth flow
- [ ] Create webhook endpoint
- [ ] Test with Square sandbox

**Week 2:**
- [ ] Build review request queue
- [ ] Create email/SMS templates
- [ ] Build settings UI
- [ ] Test end-to-end
- [ ] Launch to beta users

---

### Phase 2: Zapier Integration (1 week)

**Week 1:**
- [ ] Create Zapier developer account
- [ ] Build Zapier app
- [ ] Create webhook trigger
- [ ] Test with popular Zaps
- [ ] Submit for Zapier approval

---

### Phase 3: Additional Integrations (2-3 weeks each)

Repeat for Toast, Mindbody, Vagaro, etc.

---

## Next Steps

1. [ ] **Start with Square** - Easiest, biggest impact
2. [ ] **Add Zapier** - Covers long tail
3. [ ] **Measure results** - Track conversion rates
4. [ ] **Add industry-specific** - Toast, Mindbody, Vagaro
5. [ ] **Scale based on demand** - Let customers vote on next integration

---

## Competitive Analysis

### What Competitors Do:

**Podium ($299/mo):**
- ✅ Has POS integrations
- ✅ Automated review requests
- ❌ Very expensive

**Birdeye ($299/mo):**
- ✅ Has POS integrations
- ✅ Multi-platform reviews
- ❌ Very expensive

**Grade.us ($99/mo):**
- ✅ Review requests
- ❌ Limited integrations
- ❌ Manual process

**Your Advantage:**
- ✅ Cheaper ($39-79/mo)
- ✅ SMS management interface
- ✅ Focus on Google (not diluted)
- ✅ Better UX

---

## Summary

### Difficulty: ⭐⭐ Medium (but totally doable!)

**Start with:**
1. Square (2 weeks) - Covers 30%+ of market
2. Zapier (1 week) - Covers the rest

**Total time to MVP:** 3 weeks

**Impact:** 🔥🔥🔥 HUGE
- More reviews for customers
- Sticky feature (hard to leave)
- Competitive differentiation
- Upsell opportunity

**This could be THE feature that makes EchoPilot a must-have!**

---

Want me to create a detailed implementation plan for the Square integration specifically?
