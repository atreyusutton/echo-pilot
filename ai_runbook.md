# AI Runbook & Developer Guidelines (Solo Developer Mode)

This is the AI operator manual for EchoPilot. Run through the pre-flight flow before touching files so every change ties back to the source docs.

## 0. Runbook Purpose & Cross-Doc Map
- `plan.md` – canonical launch + credential sequencing; follow this when prioritizing work.
- `marketing_site_full.md` – marketing IA, copy, FAQ, and legal terms; keeps wording + promises aligned.
- `brand.md` – visual + voice system, including “marketing backgrounds stay predominantly white” and the tone sliders/taboo fields captured in-product.
- `stack.md` – technical + hosting strategy, schema snapshots, integration checklists.
- `ai_runbook.md` – this file; capture decision rationale, commit cadence, and cross-document pointers.

## 1. AI Prompt Flow (run before big prompts)
1. Clarify the ask and success criteria. Skim the relevant phase in `plan.md` to understand sequencing/dependencies.
2. Refresh go-to-market context from `marketing_site_full.md` so UI copy, CTAs, and legal statements stay consistent.
3. Load voice/visual constraints from `brand.md` (tone sliders, signatures, taboo phrases, white/light backgrounds, CTA colors).
4. Validate architecture + hosting constraints in `stack.md`: both `echopilot.me` and `app.echopilot.me` deploy via Vercel (Next.js 15 App Router + shadcn/Tailwind), Fastify runs on Railway/Fly, Supabase + Prisma own persistence, and Google/Stripe/OpenAI integrations are required.
5. Draft a step-by-step plan citing the files you’ll touch, data/model impacts, and tests or migrations you’ll run; raise blockers before editing.
6. Define the commit plan up front. Target a commit every focused slice (~30 minutes of work or each feature flag) and commit/push before switching contexts or running long operations.

If documents conflict, prefer `plan.md` for sequencing, `brand.md` for UX, and `stack.md` for implementation details, then note the discrepancy.

## 2. Stack Execution Priorities
- Ship speed > platform cost; pick the least-friction tooling even if Vercel or Railway bills tick up.
- Marketing (`echopilot.me`) and the authenticated app (`app.echopilot.me`) are both Vercel-hosted Next.js 15 projects so we share components, server actions, and preview builds. Cloudflare Pages was retired after repeated deploy issues.
- Backend: Fastify + Prisma targeting Supabase Postgres, deployed on Railway or Fly. Keep Google Pub/Sub ingestion for review events and use Cloudflare Queues/Upstash only when it accelerates delivery.
- Integrations: Stripe Checkout/Customer Portal, OpenAI Responses API, Google Business Profile OAuth + Pub/Sub, NextAuth (email + Google). Favor official SDKs over bespoke HTTP calls.
- Update `stack.md` whenever you add infra, environment variables, or change hosting assumptions.

## 3. General Philosophy
- Ship clean, minimal, production-ready code.
- Prefer boring, reliable patterns over clever abstractions.
- Everything should be self-explanatory, type-safe, and easy to extend.
- Main goal is ease of code and readability.
- Always refer back to the core docs (`brand.md`, `marketing_site_full.md`, `plan.md`, `stack.md`) so scope stays intact.

## 4. Code Quality Rules
- Write code as if another developer will maintain it tomorrow.
- No magic numbers, hidden side effects, or global hacks.
- Use clear naming: `verbNoun()` for functions, `PascalCase` for components/classes, `camelCase` for variables.
- Keep functions pure whenever possible.
- Max file length: ~300 lines; split if needed.

## 5. Architecture
- Use feature-based organization.
- Use service modules for business logic.
- Use DTOs/schemas for input validation.
- Backend controllers stay thin; push logic to services.
- Frontend components contain UI logic only.

## 6. Types & Safety
- Never use `any`. Prefer `unknown`, validators, or tighter types.
- Export all interfaces/types from a `types.ts` per domain.
- Keep types exact and minimal.

## 7. Error Handling
- Every async function must:
  - Catch expected errors.
  - Throw or return structured error objects.
  - Never swallow errors silently.
- Use a global backend error handler.

## 8. Logging
- No console spam.
- Use structured logs (`info`, `warn`, `error`).
- Log user intent points only.

## 9. Performance Mindset
- Avoid unnecessary rerenders or re-fetches.
- Cache thoughtfully.
- Optimize after correctness unless an inefficiency is obvious.

## 10. API Design
- Choose REST or RPC and stay consistent.
- Every response follows:
  ```json
  { "ok": true/false, "data": ..., "error": ... }
  ```
- Version endpoints (`/api/v1/...`).
- Validate every request at boundaries.

## 11. Security
- Treat all external input as hostile.
- Never trust client-sent IDs.
- Use parameterized queries.
- Sanitize outputs.
- Add auth + rate limiting before launch.

## 12. Git & Commit Cadence
- Commit early and often: aim for one commit per isolated change (~30 minutes of work, per component, or per config surface).
- Never mix unrelated concerns; schema changes, UI tweaks, and infra edits each get their own commit.
- Follow conventional commits: `feat`, `fix`, `refactor`, `chore`, `docs`.
- Push frequently and keep PRs short, scoped, and easy to review.
- Summaries back to the user must mention what shipped and what remains.

## 13. Testing
- Minimum: unit tests for core logic + integration tests for APIs.
- Stub remote calls.
- Aim for confidence over coverage numbers.

## 14. UX & Frontend Guidelines
- Accessibility first.
- Small, predictable components.
- Use Tailwind or CSS modules.
- No giant inline CSS or duplicated styles.

## 15. Documentation
- Each module gets a top-of-file purpose comment.
- Root README includes: setup, run, deploy, and `.env` example.

## 16. AI-Interpretation Rules
- Ask clarifying questions when needed.
- Resolve conflicts using the simplest correct interpretation.
- Propose minimal sane defaults.
- Do not invent features unless requested.

## 17. Output Rules (When Writing Code)
- Output complete files only.
- No placeholders unless specified.
- Code must run as-is with correct imports.
- Provide reasoning only if asked.

## One-Sentence Ethos
Build simple, predictable, well-typed, maintainable code with zero surprises.
