# SMS Feature Ideas for EchoPilot

## Overview
Once you have Google Business Profile API + Twilio integrated, you can turn SMS into a powerful business management interface. Business owners can manage their entire Google presence via text message.

---

## Core Features (Phase 1)

### 1. ✅ Review Response Management (Already Planned)
```
📊 New 5⭐ review from Sarah M.
"Amazing service!..."

Suggested reply:
"Thank you, Sarah!..."

Reply:
A = Approve & post
E [text] = Edit & post
S = Skip
```

---

## Business Hours Management

### 2. Update Hours via Text

**Use Case:** "We're closing early today" or "Open special hours on NYE"

**How It Works:**

**Option A: Quick Commands**
```
Business owner texts: HOURS CLOSED TODAY
Response: ✅ Marked as closed today. Reopening tomorrow at 9am.

Business owner texts: HOURS 9-2 NYE
Response: ✅ Updated hours for Dec 31: 9am-2pm

Business owner texts: HOURS NORMAL
Response: ✅ Reverted to normal hours (Mon-Fri 9-5, Sat 10-4)
```

**Option B: Conversational**
```
Business owner texts: We're closing at 2pm today for a staff party
Response: Got it! Should I:
A = Close at 2pm today only
B = Close at 2pm all week
C = Cancel

Owner replies: A
Response: ✅ Updated hours: Closing at 2pm today. Back to normal tomorrow.
```

**Option C: Special Dates**
```
Business owner texts: HOURS THANKSGIVING CLOSED
Response: ✅ Marked as closed on Thanksgiving (Nov 28)

Business owner texts: HOURS NYE 9-2
Response: ✅ Updated NYE hours (Dec 31): 9am-2pm

Business owner texts: HOURS SHOW NYE
Response: 
📅 Your hours for Dec 31:
9:00am - 2:00pm
(Custom hours set)
```

---

## Posts & Updates

### 3. Post Updates to Google Business Profile

**Use Case:** Quick announcements, specials, events

**Examples:**

```
Business owner texts: POST New happy hour! 4-6pm daily, $5 drinks

Response: Preview:
-----
🍹 New Happy Hour!
Join us daily 4-6pm for $5 drinks
-----
A = Post now
E = Edit
C = Cancel

Owner replies: A
Response: ✅ Posted! View at: g.page/[your-business]/posts
```

```
Business owner texts: POST We're hiring! Server positions available

Response: ✅ Posted to Google! 
Pro tip: Add a link next time (e.g., "Apply: website.com/jobs")
```

**Advanced:**
```
Business owner texts: POST EVENT Live music Friday 7pm, $10 cover

Response: I'll create an event post. What's the date?
Owner replies: This Friday
Response: ✅ Event posted for Dec 15, 7pm!
```

---

## Photos & Media

### 4. Add Photos via MMS

**Use Case:** Just took a great photo, want it on Google immediately

```
Business owner sends photo via MMS with caption: "New menu item!"

Response: Great photo! Where should I post it?
1 = Menu section
2 = Food & Drink
3 = Inside
4 = Outside
5 = Team

Owner replies: 2
Response: ✅ Added to Food & Drink photos on Google!
```

**Alternative:**
```
Business owner sends photo: "Our new patio is finally done!"

Response: ✅ Photo added to Google Business Profile (Outside section)
Pro tip: Text PHOTO DELETE to remove recent uploads
```

---

## Review Management Advanced

### 5. Review Alerts with Priority Levels

**Critical Reviews (1-2 stars):**
```
🚨 URGENT: 1⭐ review from John D.
"Worst experience ever. Manager was rude and food was cold."

This needs your attention! Reply:
A = Approve AI response
E [text] = Write custom apology
CALL = I'll call them (we'll provide #)
```

**Bulk Actions:**
```
📊 Daily Review Digest (3 new reviews)

5⭐ Sarah M. - "Amazing!"
4⭐ Mike K. - "Good food, slow service"  
5⭐ Lisa P. - "Best brunch!"

Reply:
ALL = Approve all AI responses
SHOW = See each individually
SKIP = I'll do it later
```

---

## Business Information Updates

### 6. Update Business Info via Text

**Phone Number:**
```
Business owner texts: PHONE UPDATE (720) 555-1234
Response: ✅ Updated business phone to (720) 555-1234
```

**Website:**
```
Business owner texts: WEBSITE www.newdomain.com
Response: ✅ Updated website to www.newdomain.com
```

**Description:**
```
Business owner texts: BIO Family-owned Italian restaurant serving authentic pasta since 1995
Response: ✅ Updated business description. 
Preview: g.page/[your-business]
```

**Special Hours:**
```
Business owner texts: HOLIDAY CLOSED Christmas, New Years
Response: ✅ Marked as closed:
- Dec 25 (Christmas)  
- Jan 1 (New Year's Day)
```

---

## Menu Management (for Restaurants)

### 7. Quick Menu Updates

**Add Item:**
```
Business owner texts: MENU ADD Truffle Burger $18 - Grass-fed beef, truffle aioli, arugula

Response: ✅ Added to menu:
🍔 Truffle Burger - $18
"Grass-fed beef, truffle aioli, arugula"

Category: Entrees
```

**Update Price:**
```
Business owner texts: MENU PRICE Caesar Salad $12
Response: ✅ Updated Caesar Salad to $12 (was $10)
```

**Mark Item Unavailable:**
```
Business owner texts: MENU OUT Lobster Roll
Response: ✅ Marked "Lobster Roll" as temporarily unavailable
Text MENU IN [item] when it's back!
```

---

## Services Management (for Service Businesses)

### 8. Service Availability

**For Salons, Auto Shops, etc:**
```
Business owner texts: SERVICE PAUSE Brake Repair
Response: ✅ "Brake Repair" marked as unavailable. Reason?
Owner replies: Parts on backorder
Response: ✅ Updated. I'll note "Temporarily unavailable"
```

```
Business owner texts: SERVICE ADD Oil Change $39.99
Response: ✅ Added service:
🔧 Oil Change - $39.99
Should I add a description? (Reply with details or SKIP)
```

---

## Messaging & Customer Interaction

### 9. Respond to Customer Messages

**When customer messages via Google:**
```
📩 New message from Emily R.
"Are you open on Christmas Eve?"

Suggested reply:
"Yes! We're open 9am-3pm on Christmas Eve. Hope to see you!"

Reply:
A = Approve
E [text] = Custom reply
```

**Bulk Messaging:**
```
Business owner texts: MESSAGE ALL Happy holidays! We're open NYE 9-2pm

Response: This will message ALL customers who've contacted you (47 people)
A = Send to all
C = Cancel
```

---

## Analytics & Insights

### 10. Get Stats via Text

**Daily Digest:**
```
Business owner texts: STATS

Response:
📊 Last 7 days:
👀 1,247 profile views (+12%)
📞 89 calls (+5%)
🗺️ 234 direction requests
⭐ 4 new reviews (avg 4.8★)

Your profile is trending up! 📈
```

**Custom Queries:**
```
Business owner texts: STATS REVIEWS
Response:
⭐ Review Summary (Last 30 days):
- 12 new reviews
- Avg rating: 4.6★
- 92% response rate
- 2.3hr avg response time

Business owner texts: STATS CALLS
Response:
📞 Call Activity (Last 7 days):
- 89 calls from Google
- Peak: Fri 2-4pm (18 calls)
- 67% called during business hours
```

---

## Q&A Management

### 11. Answer Customer Questions

**When customer asks question on Google:**
```
❓ New question from Local User:
"Do you have vegan options?"

Reply with your answer (or SKIP):
```

**Business owner replies:**
```
Yes! We have 5 vegan entrees and can modify most dishes
```

**Response:**
```
✅ Answer posted publicly on Google!
This will help future customers too.
```

---

## Competitor Monitoring

### 12. Track Competitor Reviews

**Setup:**
```
Business owner texts: WATCH COMPETITOR Thai Basil Boulder
Response: ✅ Now monitoring "Thai Basil Boulder" reviews
You'll get weekly summaries of their new reviews.
```

**Weekly Alert:**
```
📊 Competitor Update: Thai Basil Boulder
🆕 3 new reviews this week (avg 4.3★)

Top complaint: "Slow service on weekends"
Top praise: "Amazing Pad Thai"

Your advantage: Your avg response time is 3x faster!
```

---

## Automated Responses & Rules

### 13. Set Up Auto-Response Rules

**Based on Rating:**
```
Business owner texts: RULE 5-STAR Always thank them and mention our rewards program

Response: ✅ Rule created!
All 5⭐ reviews will mention rewards program.
Preview: "Thank you! Don't forget to join our rewards program..."
```

**Based on Keywords:**
```
Business owner texts: RULE KEYWORD "wait time" Acknowledge wait and mention staffing efforts

Response: ✅ Rule created!
Reviews mentioning "wait time" will address staffing.
```

**Based on Time:**
```
Business owner texts: RULE AFTER-HOURS Reply to reviews received after 5pm the next morning

Response: ✅ Rule created!
Late reviews will be replied to by 9am next day.
```

---

## Team Management

### 14. Multi-User SMS Coordination

**For businesses with multiple locations/managers:**

```
Manager texts: ASSIGN REVIEW 123 to Mike
Response: ✅ Review #123 assigned to Mike
He'll receive notification to respond.

Manager texts: TEAM STATUS
Response:
👥 Team Response Stats (Today):
- Mike: 5 reviews, 100% response
- Sarah: 3 reviews, 66% response  
- Lisa: 2 reviews, 100% response
```

---

## Reputation Management

### 15. Review Generation Campaigns

**Request Reviews:**
```
Business owner texts: REQUEST REVIEW sarah@email.com
Response: ✅ Review request sent to sarah@email.com
I'll notify you if they leave a review!
```

**Bulk Campaign:**
```
Business owner texts: CAMPAIGN REVIEW This Week's Customers
Response: 
📧 Review request campaign ready
- 23 customers from this week
- Email template: "Thanks for visiting..."

A = Send now
E = Edit template
C = Cancel
```

---

## Appointment/Reservation Integration

### 16. Manage Bookings (if applicable)

```
Business owner texts: BOOK Sarah tmrw 2pm haircut
Response: ✅ Appointment created:
Sarah - Tomorrow 2pm - Haircut
Confirmation sent to customer.

Business owner texts: CANCEL appt Sarah tmrw
Response: Appointment cancelled. Should I:
A = Send cancellation notice
B = Offer reschedule options
C = Just cancel quietly
```

---

## Special Offers & Promotions

### 17. Create & Post Offers

```
Business owner texts: OFFER 20% off lunch Mon-Wed this week

Response: 📢 Offer created!
-----
20% Off Lunch Special
Valid Mon-Wed this week
-----

A = Post to Google now
B = Schedule for Monday morning
C = Edit offer
```

```
Business owner texts: OFFER STATUS
Response:
📢 Active Offers:
1. "20% off lunch" (3 days left)
2. "Happy hour $5 drinks" (ongoing)

Reply with # to edit/delete
```

---

## Emergency/Crisis Management

### 18. Handle Emergencies

```
Business owner texts: EMERGENCY CLOSED Pipe burst, closed today

Response: 🚨 Emergency closure activated!
✅ Marked as closed today
✅ Updated all platforms
✅ Auto-reply set for calls: "Temporarily closed due to maintenance"

I'll check back tomorrow at 9am to reopen.
```

```
Business owner texts: EMERGENCY MESSAGE We're OK after the storm, open normal hours

Response: ✅ Posted emergency update to Google
✅ Sent message to recent customers (47 people)
✅ Normal hours confirmed

Stay safe! 🌟
```

---

## Voice Commands (Future: Twilio Voice API)

### 19. Call Instead of Text

**For owners who prefer calling:**

```
Business owner calls Twilio number

Voice prompt: "Hi! Say a command like 'check reviews' or 'update hours'"

Owner says: "What are today's stats?"

Voice response: "You have 89 profile views, 12 calls, and 2 new reviews today..."
```

---

## Smart Suggestions

### 20. AI-Powered Recommendations

**Proactive Suggestions:**
```
💡 Smart Tip:
I noticed you haven't posted in 2 weeks. 

Posting regularly boosts visibility by 30%.

Reply POST with your update, or IDEA for suggestions.

Owner replies: IDEA
Response:
📝 Post ideas based on your business:
1. Behind-the-scenes photo
2. Staff spotlight  
3. New menu item tease
4. Customer thank you

Reply 1-4 or write your own!
```

---

## Integration Ideas

### 21. Connect to Other Tools

**POS Integration:**
```
(When Square/Toast sends "Busy night!" alert)

SMS to owner:
📈 Traffic Alert: 40% more orders than usual!

Consider posting: "Packed house tonight! Come join us 🎉"

A = Post update
S = Skip
```

**Email Integration:**
```
(When customer emails complaint)

SMS to owner:
📧 Email complaint from john@email.com
"Food was cold last night"

Should I:
A = Send apology email + coupon
B = Flag for personal follow-up
C = Skip
```

---

## Command Reference Sheet

### Quick Command List for Owners:

```
📋 EchoPilot SMS Commands

REVIEWS:
- STATS = Show review stats
- SHOW = Show pending reviews
- ALL = Approve all pending

HOURS:
- HOURS [time] [date] = Update hours
- HOURS CLOSED [date] = Mark closed
- HOURS NORMAL = Revert to normal

POSTS:
- POST [message] = Create post
- POST EVENT [details] = Create event

PHOTOS:
- Send photo via MMS (auto-posted)
- PHOTO DELETE = Remove last photo

INFO:
- PHONE [number] = Update phone
- WEBSITE [url] = Update website
- BIO [text] = Update description

MENU:
- MENU ADD [item] [price] = Add item
- MENU PRICE [item] [price] = Update
- MENU OUT [item] = Mark unavailable

STATS:
- STATS = Overall stats
- STATS REVIEWS = Review stats only
- STATS CALLS = Call stats only

HELP:
- HELP = Show all commands
- HELP [command] = Specific help
```

---

## Pricing Strategy for Features

### Tiered Feature Access:

**Starter ($19/mo):**
- ✅ Review response management
- ✅ Basic stats
- ❌ No hours/post updates

**Standard ($39/mo):**
- ✅ Everything in Starter
- ✅ Hours management via SMS
- ✅ Post updates
- ✅ Photo uploads
- ✅ Advanced stats

**Pro ($79/mo):**
- ✅ Everything in Standard
- ✅ Menu/services management
- ✅ Competitor monitoring
- ✅ Team coordination
- ✅ Custom rules
- ✅ Voice commands
- ✅ Priority support via SMS

**Enterprise ($199/mo):**
- ✅ Everything in Pro
- ✅ Multi-location management
- ✅ API access
- ✅ Custom integrations
- ✅ Dedicated account manager

---

## Technical Implementation Notes

### Google Business Profile API Endpoints Needed:

1. **Reviews:**
   - `accounts.locations.reviews.list` ✅
   - `accounts.locations.reviews.reply` ✅

2. **Business Info:**
   - `accounts.locations.patch` (update hours, phone, website)
   - `accounts.locations.get` (read current info)

3. **Posts:**
   - `accounts.locations.localPosts.create`
   - `accounts.locations.localPosts.list`
   - `accounts.locations.localPosts.delete`

4. **Media:**
   - `accounts.locations.media.create` (upload photos)
   - `accounts.locations.media.list`

5. **Q&A:**
   - `locations.questions.list`
   - `locations.questions.answers.list`
   - `locations.answers.create`

6. **Insights:**
   - `accounts.locations.reportInsights` (stats)

### Twilio Features Needed:

1. **SMS (already planned)**
2. **MMS** (for photo uploads)
3. **Voice API** (optional, for voice commands)
4. **Programmable Messaging** (for bulk campaigns)

---

## User Onboarding

### Teaching Owners the Commands:

**Day 1 Welcome Message:**
```
Welcome to EchoPilot! 🎉

You can now manage your Google Business Profile via text.

Try these:
• Text STATS for insights
• Text POST [message] to post updates  
• Text HELP for all commands

Got a review? I'll notify you automatically!
```

**Weekly Tips:**
```
💡 EchoPilot Tip:
Did you know you can update hours via text?

Example: "HOURS CLOSED Thanksgiving"

Try it next time you have special hours!
```

---

## ROI for Business Owners

### Time Saved:

**Without EchoPilot:**
- Review responses: 2 hrs/week
- Updating hours: 15 min/week
- Posting updates: 30 min/week
- Checking stats: 20 min/week
- **Total: ~3 hrs/week**

**With EchoPilot SMS:**
- Review responses: 5 min/week (approve via text)
- Updating hours: 1 min (text command)
- Posting updates: 2 min (text to post)
- Checking stats: 1 min (text STATS)
- **Total: ~10 min/week**

**Savings: 2.5 hours/week = 130 hours/year = $2,600/year** (at $20/hr)

---

## Next Steps

1. [ ] Start with **Phase 1** (review responses) ✅ Already planned
2. [ ] Add **Hours management** in Phase 2 (high value, easy to build)
3. [ ] Add **Posts** in Phase 3 (high engagement)
4. [ ] Add **Stats** in Phase 4 (easy win)
5. [ ] Add **Photos (MMS)** in Phase 5 (requires MMS setup)
6. [ ] Add **Advanced features** based on user feedback

---

## Most Valuable Features (Priority Order)

Based on user impact and technical complexity:

### Phase 1 (Launch):
1. ✅ Review response management (already planned)

### Phase 2 (Month 2-3):
2. 🔥 **Hours management** - Super useful, easy to build
3. 🔥 **Daily stats** - Quick dopamine hit for owners
4. 🔥 **Post updates** - High engagement

### Phase 3 (Month 4-6):
5. **Photo uploads (MMS)**
6. **Menu management** (for restaurants)
7. **Bulk review actions**

### Phase 4 (Month 7-12):
8. **Competitor monitoring**
9. **Team coordination**
10. **Custom rules/automation**

### Phase 5 (Year 2):
11. **Voice commands**
12. **Multi-location management**
13. **Advanced integrations**

---

**Your NYE example is perfect! Start with hours management - it's simple but incredibly useful. Business owners will love it.** 🚀
