# Twilio SMS Integration Plan

## Overview
Enable business owners to approve, edit, or skip AI-generated review replies via SMS. This provides a mobile-first workflow for busy owners who want control without opening the dashboard.

---

## User Experience Flow

### 1. New Review Notification
When a new review arrives, the owner receives an SMS like:

```
📊 New 5⭐ review from Sarah M.
"Amazing service! The staff was so helpful..."

Suggested reply:
"Thank you, Sarah! We're thrilled you had a great experience. Hope to see you again soon! - Mike"

Reply:
A = Approve & post
E [your text] = Edit & post
S = Skip (manual later)
```

### 2. Owner Response Options

**Option A: Approve**
```
Owner texts: A
Response: ✅ Reply posted to Google! View: app.echopilot.me/reviews/abc123
```

**Option B: Edit**
```
Owner texts: E Thanks Sarah! Really appreciate your kind words.
Response: ✅ Your custom reply posted! View: app.echopilot.me/reviews/abc123
```

**Option C: Skip**
```
Owner texts: S
Response: ⏭️ Skipped. You can reply later in the dashboard.
```

---

## Technical Architecture

### Components Needed

1. **Twilio Account Setup**
   - Phone number for sending/receiving SMS
   - API credentials (Account SID + Auth Token)
   - Webhook for incoming messages

2. **Database Schema Updates**
   ```sql
   -- Add to Users table
   ALTER TABLE users ADD COLUMN phone_number VARCHAR(20);
   ALTER TABLE users ADD COLUMN sms_notifications_enabled BOOLEAN DEFAULT false;
   ALTER TABLE users ADD COLUMN sms_verified BOOLEAN DEFAULT false;

   -- Add to Reviews table
   ALTER TABLE reviews ADD COLUMN sms_sent_at TIMESTAMP;
   ALTER TABLE reviews ADD COLUMN sms_response VARCHAR(10); -- 'APPROVED', 'EDITED', 'SKIPPED'
   ALTER TABLE reviews ADD COLUMN sms_responded_at TIMESTAMP;

   -- Create SMS log table for tracking
   CREATE TABLE sms_logs (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID REFERENCES users(id),
     review_id UUID REFERENCES reviews(id),
     direction VARCHAR(10), -- 'OUTBOUND' or 'INBOUND'
     message_sid VARCHAR(100),
     from_number VARCHAR(20),
     to_number VARCHAR(20),
     body TEXT,
     status VARCHAR(20),
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

3. **API Endpoints**
   ```
   POST /api/twilio/webhook          - Receive incoming SMS
   POST /api/users/phone/verify      - Send verification code
   POST /api/users/phone/confirm     - Confirm verification code
   PUT  /api/users/settings          - Update SMS preferences
   ```

4. **Background Jobs**
   - Send review notification via SMS
   - Process SMS responses
   - Handle retry logic for failed messages

---

## Implementation Steps

### Phase 1: Twilio Setup (Week 1)

- [ ] **Create Twilio Account**
  - Go to https://www.twilio.com/
  - Sign up (get $15 credit for testing)
  - Verify your email and phone

- [ ] **Purchase Phone Number**
  - Buy a number (≈$1/month)
  - Enable SMS capabilities
  - Choose local number in your target market

- [ ] **Get API Credentials**
  - Account SID
  - Auth Token
  - Phone Number (E.164 format: +15551234567)
  - Store in environment variables:
    ```bash
    TWILIO_ACCOUNT_SID=
    TWILIO_AUTH_TOKEN=
    TWILIO_PHONE_NUMBER=
    ```

- [ ] **Install Twilio SDK**
  ```bash
  npm install twilio
  ```

### Phase 2: Database & Schema (Week 1)

- [ ] **Update Prisma Schema**
  ```prisma
  model User {
    id                      String   @id @default(cuid())
    email                   String   @unique
    name                    String?
    phoneNumber             String?  @map("phone_number")
    smsNotificationsEnabled Boolean  @default(false) @map("sms_notifications_enabled")
    smsVerified             Boolean  @default(false) @map("sms_verified")
    smsVerificationCode     String?  @map("sms_verification_code")
    smsVerificationExpiry   DateTime? @map("sms_verification_expiry")
    reviews                 Review[]
    smsLogs                 SmsLog[]
    createdAt               DateTime @default(now()) @map("created_at")
    updatedAt               DateTime @updatedAt @map("updated_at")

    @@map("users")
  }

  model Review {
    id              String    @id @default(cuid())
    userId          String    @map("user_id")
    user            User      @relation(fields: [userId], references: [id])
    googleReviewId  String    @unique @map("google_review_id")
    locationId      String    @map("location_id")
    rating          Int
    reviewText      String?   @map("review_text")
    authorName      String    @map("author_name")
    aiReply         String?   @map("ai_reply")
    finalReply      String?   @map("final_reply")
    status          String    @default("pending") // pending, approved, posted, skipped
    smsSentAt       DateTime? @map("sms_sent_at")
    smsResponse     String?   @map("sms_response") // APPROVED, EDITED, SKIPPED
    smsRespondedAt  DateTime? @map("sms_responded_at")
    postedAt        DateTime? @map("posted_at")
    createdAt       DateTime  @default(now()) @map("created_at")
    updatedAt       DateTime  @updatedAt @map("updated_at")
    smsLogs         SmsLog[]

    @@map("reviews")
  }

  model SmsLog {
    id         String   @id @default(cuid())
    userId     String   @map("user_id")
    user       User     @relation(fields: [userId], references: [id])
    reviewId   String?  @map("review_id")
    review     Review?  @relation(fields: [reviewId], references: [id])
    direction  String   // OUTBOUND, INBOUND
    messageSid String?  @map("message_sid")
    fromNumber String   @map("from_number")
    toNumber   String   @map("to_number")
    body       String
    status     String
    createdAt  DateTime @default(now()) @map("created_at")

    @@map("sms_logs")
  }
  ```

- [ ] **Run Migration**
  ```bash
  npx prisma migrate dev --name add_twilio_sms_support
  ```

### Phase 3: Phone Verification Flow (Week 2)

- [ ] **Create Phone Settings UI**
  - Add "SMS Notifications" section to settings page
  - Phone number input with country code dropdown
  - "Send Verification Code" button
  - 6-digit code input field

- [ ] **Send Verification Code Endpoint**
  ```typescript
  // /api/users/phone/verify
  import twilio from 'twilio';

  export async function POST(req: Request) {
    const { phoneNumber } = await req.json();
    const userId = req.user.id; // from session

    // Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save to database
    await prisma.user.update({
      where: { id: userId },
      data: {
        phoneNumber,
        smsVerificationCode: code,
        smsVerificationExpiry: expiry,
        smsVerified: false,
      },
    });

    // Send SMS via Twilio
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    await client.messages.create({
      body: `Your EchoPilot verification code is: ${code}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });

    return Response.json({ success: true });
  }
  ```

- [ ] **Confirm Verification Code Endpoint**
  ```typescript
  // /api/users/phone/confirm
  export async function POST(req: Request) {
    const { code } = await req.json();
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user?.smsVerificationCode || !user?.smsVerificationExpiry) {
      return Response.json({ error: 'No verification pending' }, { status: 400 });
    }

    if (new Date() > user.smsVerificationExpiry) {
      return Response.json({ error: 'Code expired' }, { status: 400 });
    }

    if (user.smsVerificationCode !== code) {
      return Response.json({ error: 'Invalid code' }, { status: 400 });
    }

    // Mark as verified
    await prisma.user.update({
      where: { id: userId },
      data: {
        smsVerified: true,
        smsNotificationsEnabled: true,
        smsVerificationCode: null,
        smsVerificationExpiry: null,
      },
    });

    return Response.json({ success: true });
  }
  ```

### Phase 4: Send Review Notifications (Week 2-3)

- [ ] **Create SMS Service**
  ```typescript
  // lib/sms-service.ts
  import twilio from 'twilio';
  import { prisma } from './prisma';

  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  export async function sendReviewNotification(
    userId: string,
    reviewId: string
  ) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user?.smsVerified || !user?.smsNotificationsEnabled || !user?.phoneNumber) {
      return; // User doesn't have SMS enabled
    }

    const review = await prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!review) return;

    // Format the message
    const stars = '⭐'.repeat(review.rating);
    const truncatedReview = review.reviewText?.substring(0, 100) + '...';
    
    const message = `
📊 New ${review.rating}${stars} review from ${review.authorName}
"${truncatedReview}"

Suggested reply:
"${review.aiReply}"

Reply:
A = Approve & post
E [text] = Edit & post
S = Skip
`.trim();

    // Send SMS
    try {
      const twilioMessage = await client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: user.phoneNumber,
      });

      // Log to database
      await prisma.smsLog.create({
        data: {
          userId,
          reviewId,
          direction: 'OUTBOUND',
          messageSid: twilioMessage.sid,
          fromNumber: process.env.TWILIO_PHONE_NUMBER!,
          toNumber: user.phoneNumber,
          body: message,
          status: twilioMessage.status,
        },
      });

      // Update review
      await prisma.review.update({
        where: { id: reviewId },
        data: { smsSentAt: new Date() },
      });

      return twilioMessage;
    } catch (error) {
      console.error('Failed to send SMS:', error);
      throw error;
    }
  }
  ```

- [ ] **Integrate with Review Processing Pipeline**
  ```typescript
  // When new review is processed:
  async function processNewReview(reviewData: any) {
    // 1. Save review to database
    const review = await prisma.review.create({
      data: {
        userId: reviewData.userId,
        googleReviewId: reviewData.id,
        locationId: reviewData.locationId,
        rating: reviewData.rating,
        reviewText: reviewData.text,
        authorName: reviewData.author,
        status: 'pending',
      },
    });

    // 2. Generate AI reply
    const aiReply = await generateAIReply(review);
    await prisma.review.update({
      where: { id: review.id },
      data: { aiReply },
    });

    // 3. Send SMS notification
    await sendReviewNotification(reviewData.userId, review.id);
  }
  ```

### Phase 5: Receive & Process SMS Responses (Week 3)

- [ ] **Set up Twilio Webhook**
  - In Twilio Console → Phone Numbers → Click your number
  - Under "Messaging", set webhook URL to:
    `https://api.echopilot.me/api/twilio/webhook`
  - Method: HTTP POST

- [ ] **Create Webhook Handler**
  ```typescript
  // /api/twilio/webhook/route.ts
  import { NextRequest } from 'next/server';
  import twilio from 'twilio';
  import { prisma } from '@/lib/prisma';
  import { postReplyToGoogle } from '@/lib/gbp-api';

  export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const body = Object.fromEntries(formData);

    // Verify request is from Twilio
    const twilioSignature = req.headers.get('x-twilio-signature') || '';
    const isValid = twilio.validateRequest(
      process.env.TWILIO_AUTH_TOKEN!,
      twilioSignature,
      'https://api.echopilot.me/api/twilio/webhook',
      body
    );

    if (!isValid) {
      return Response.json({ error: 'Invalid signature' }, { status: 403 });
    }

    const from = body.From as string;
    const messageBody = (body.Body as string).trim();
    const messageSid = body.MessageSid as string;

    // Find user by phone number
    const user = await prisma.user.findFirst({
      where: { phoneNumber: from, smsVerified: true },
    });

    if (!user) {
      return new Response('', { status: 200 }); // Ignore unknown numbers
    }

    // Log incoming message
    await prisma.smsLog.create({
      data: {
        userId: user.id,
        direction: 'INBOUND',
        messageSid,
        fromNumber: from,
        toNumber: body.To as string,
        body: messageBody,
        status: 'received',
      },
    });

    // Find most recent pending review for this user
    const review = await prisma.review.findFirst({
      where: {
        userId: user.id,
        status: 'pending',
        smsSentAt: { not: null },
        smsRespondedAt: null,
      },
      orderBy: { smsSentAt: 'desc' },
    });

    if (!review) {
      await sendSMS(from, '❌ No pending review found. Check your dashboard.');
      return new Response('', { status: 200 });
    }

    // Process response
    const command = messageBody.charAt(0).toUpperCase();
    
    if (command === 'A') {
      // Approve AI reply
      await prisma.review.update({
        where: { id: review.id },
        data: {
          finalReply: review.aiReply,
          status: 'approved',
          smsResponse: 'APPROVED',
          smsRespondedAt: new Date(),
        },
      });

      // Post to Google
      await postReplyToGoogle(review.googleReviewId, review.aiReply!);

      await prisma.review.update({
        where: { id: review.id },
        data: { status: 'posted', postedAt: new Date() },
      });

      await sendSMS(
        from,
        `✅ Reply posted to Google! View: app.echopilot.me/reviews/${review.id}`
      );
    } else if (command === 'E') {
      // Edit reply
      const customReply = messageBody.substring(1).trim();
      
      if (!customReply) {
        await sendSMS(from, '❌ Please include your reply after "E". Example: E Thanks for your feedback!');
        return new Response('', { status: 200 });
      }

      await prisma.review.update({
        where: { id: review.id },
        data: {
          finalReply: customReply,
          status: 'approved',
          smsResponse: 'EDITED',
          smsRespondedAt: new Date(),
        },
      });

      // Post to Google
      await postReplyToGoogle(review.googleReviewId, customReply);

      await prisma.review.update({
        where: { id: review.id },
        data: { status: 'posted', postedAt: new Date() },
      });

      await sendSMS(
        from,
        `✅ Your custom reply posted! View: app.echopilot.me/reviews/${review.id}`
      );
    } else if (command === 'S') {
      // Skip
      await prisma.review.update({
        where: { id: review.id },
        data: {
          status: 'skipped',
          smsResponse: 'SKIPPED',
          smsRespondedAt: new Date(),
        },
      });

      await sendSMS(
        from,
        `⏭️ Skipped. You can reply later in the dashboard: app.echopilot.me/reviews/${review.id}`
      );
    } else {
      // Invalid command
      await sendSMS(
        from,
        '❌ Invalid command. Reply:\nA = Approve\nE [text] = Edit\nS = Skip'
      );
    }

    return new Response('', { status: 200 });
  }

  async function sendSMS(to: string, body: string) {
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    return await client.messages.create({
      body,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    });
  }
  ```

### Phase 6: Settings & UI (Week 3-4)

- [ ] **Settings Page Updates**
  ```tsx
  // app/settings/page.tsx
  export default function SettingsPage() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [step, setStep] = useState<'input' | 'verify' | 'verified'>('input');

    const handleSendCode = async () => {
      await fetch('/api/users/phone/verify', {
        method: 'POST',
        body: JSON.stringify({ phoneNumber }),
      });
      setStep('verify');
    };

    const handleConfirmCode = async () => {
      const res = await fetch('/api/users/phone/confirm', {
        method: 'POST',
        body: JSON.stringify({ code: verificationCode }),
      });
      if (res.ok) {
        setStep('verified');
      }
    };

    return (
      <div className="space-y-6">
        <h2>SMS Notifications</h2>
        <p>Get review alerts via text and respond on-the-go.</p>

        {step === 'input' && (
          <div>
            <input
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button onClick={handleSendCode}>Send Verification Code</button>
          </div>
        )}

        {step === 'verify' && (
          <div>
            <input
              type="text"
              placeholder="6-digit code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <button onClick={handleConfirmCode}>Verify</button>
          </div>
        )}

        {step === 'verified' && (
          <div className="text-green-600">
            ✅ Phone number verified! You'll receive SMS notifications for new reviews.
          </div>
        )}
      </div>
    );
  }
  ```

---

## Cost Estimation

### Twilio Pricing (US)
- **Phone number:** $1.15/month
- **SMS sent (outbound):** $0.0079 per message
- **SMS received (inbound):** $0.0079 per message

### Example Monthly Cost for 1 Business:
- 100 reviews/month
- 100 SMS sent (notifications) = $0.79
- 100 SMS received (responses) = $0.79
- Phone number = $1.15
- **Total: ~$2.73/month per active business**

### Scaling:
- 100 businesses = ~$273/month
- You can charge $5-10/month per business for SMS feature
- Profit margin: ~$2-7 per business

---

## Environment Variables

Add to your `.env`:

```bash
# Twilio
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+15551234567
```

---

## Testing Checklist

- [ ] Send verification code to your phone
- [ ] Verify phone number successfully
- [ ] Trigger a test review notification
- [ ] Reply with "A" (approve)
- [ ] Reply with "E Custom reply text" (edit)
- [ ] Reply with "S" (skip)
- [ ] Test invalid commands
- [ ] Test when no pending review exists
- [ ] Test with unverified phone number
- [ ] Check SMS logs in database
- [ ] Verify Google Business Profile receives reply

---

## Security Considerations

1. **Webhook Signature Validation**
   - Always verify Twilio signatures to prevent spoofing

2. **Phone Number Verification**
   - Require 6-digit code verification
   - Expire codes after 10 minutes
   - Limit verification attempts

3. **Rate Limiting**
   - Limit SMS sends per user (prevent spam)
   - Max 5 verification attempts per hour

4. **Privacy**
   - Store phone numbers encrypted (optional)
   - Allow users to opt-out anytime
   - Include "Reply STOP to unsubscribe" in messages

5. **Data Retention**
   - Keep SMS logs for audit purposes
   - Clean up old logs after 90 days

---

## Future Enhancements

### Phase 2 Features:
- [ ] MMS support (send review screenshots)
- [ ] Multiple reply suggestions (A, B, C)
- [ ] Quick reply templates
- [ ] Sentiment alerts ("⚠️ 1-star review needs attention")
- [ ] Daily digest SMS ("5 new reviews today")
- [ ] WhatsApp support (via Twilio)
- [ ] Voice call option for urgent reviews

### Advanced Features:
- [ ] AI learns from SMS edits to improve suggestions
- [ ] Bulk actions via SMS ("Reply ALL to approve all pending")
- [ ] Schedule replies ("Schedule for 2pm")
- [ ] Multi-language support

---

## Integration with Your Plan

This feature fits into:
- **Phase 2.7** (Dashboard UI) - Add SMS settings page
- **Phase 5** (Backend API) - Add Twilio endpoints
- **Phase 7** (Beta Launch) - Offer as premium feature

### Pricing Strategy:
- **Starter Plan:** No SMS
- **Standard Plan (+$10):** SMS notifications + responses
- **Pro Plan (included):** SMS + daily digest + priority delivery

---

## Next Steps

1. [ ] Create Twilio account and get credentials
2. [ ] Update plan.md with Twilio integration phase
3. [ ] Add to Phase 2 checklist under "2.9 Twilio SMS Integration"
4. [ ] Budget for Twilio costs in your financial model
5. [ ] Build phone verification flow first (can test immediately)
6. [ ] Then build webhook handler once reviews are flowing
