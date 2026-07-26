# n8n Build Prompt — JARVIS Master Orchestrator

Use this prompt with an n8n AI workflow builder or coding agent. Build production-ready workflows rather than a single giant fragile canvas. Create one master router plus versioned sub-workflows.

## Mission

Build an always-on, privacy-conscious JARVIS operating system with five divisions:

1. **JARVIS Business** — business planning, opportunities, documents, costs, revenue, customers, projects and approval-ready operations.
2. **JARVIS Home** — recipes, meals, groceries, store-price comparison, legitimate coupons, household routines, family calendar, bills, errands and maintenance.
3. **JARVIS Work** — warehouse files and reports, productivity reconciliation, missing employee credit, putaways, variances, downtime, leadership evidence and GitHub app health.
4. **JARVIS Hobby** — trading research, fitness, technology projects, collecting, creative work and personalized learning.
5. **JARVIS Fact** — web research, source comparison, fact verification, uncertainty, citations and plain-language explanations.

JARVIS may independently research, reason, compare, classify, calculate, summarize, detect patterns and prepare actions. It must never complete a consequential action without explicit, current approval from the authorized user.

## Architecture

Create these workflows:

### 00 — JARVIS Master Router
Triggers:
- Authenticated webhook from the JARVIS app
- Chat trigger
- Schedule trigger for recurring jobs
- Optional approved voice transcript webhook

Responsibilities:
- Authenticate user and resolve profile, household, branch and permission scope.
- Assign a correlation ID and idempotency key.
- Classify the request into Business, Home, Work, Hobby or Fact.
- Identify whether the request is read-only, preparatory or consequential.
- Call the correct sub-workflow with Execute Sub-workflow.
- Merge results into one response envelope.
- Store a minimal audit record in Supabase.
- Route proposed consequential actions to the Approval Gateway.
- Never place credentials, service-role keys or raw secrets in workflow output.

### 01 — Identity, Memory and Context
- Read user profile and permissions from Supabase.
- Keep work, business, household and private-user memory logically separated.
- Retrieve only context required for the current task.
- Support Brandon and his girlfriend as separate users with shared household data only where permitted.
- Write useful decisions, preferences and outcomes back to scoped memory.
- Do not store raw room audio. Store an approved transcript only when needed.

### 02 — JARVIS Home: Recipe, Meal and Deal Engine
Inputs:
- Number of people
- Dietary needs, allergies and disliked foods
- Budget
- Available ingredients
- Preferred cooking time and equipment
- Location or approved ZIP code
- Preferred stores and maximum travel radius

Behavior:
1. Search reputable recipe sources online.
2. Extract ingredients, quantities, servings, preparation time and instructions.
3. Normalize ingredient names and units.
4. Check pantry inventory when available.
5. Build the missing-ingredient shopping list.
6. Search approved retailer sites, public weekly ads, loyalty offers, digital coupons and reputable coupon sources.
7. Do not bypass logins, paywalls, anti-bot systems or retailer terms.
8. Distinguish confirmed prices from estimated prices.
9. Record store, package size, unit price, coupon requirements, expiration, pickup/delivery limitations and timestamp.
10. Compare total basket cost, not just isolated sale prices.
11. Include travel distance or delivery fees when available.
12. Avoid recommending a farther store when the savings are likely erased by travel cost.
13. Return three options when possible: cheapest, fastest and healthiest.
14. Show estimated cost per meal and per serving.
15. Create a grouped shopping list by store and aisle/category.
16. Ask for approval before adding items to a cart, placing an order, activating an account-specific offer or spending money.
17. Save selected meals and anonymized price history for future comparisons.

Required output:
- Meal choices
- Recipe source links and timestamps
- Pantry items used
- Items required
- Store-by-store basket comparison
- Coupons and eligibility requirements
- Estimated subtotal, fees and total
- Savings versus the next-best option
- Confidence and missing-data warnings
- Approval card for any cart or purchase action

### 03 — JARVIS Work: Warehouse Intelligence
- Accept Cycle Count Detail XLSX as the authoritative cycle-count source.
- Accept Already Cycle Counted XLSX or an approved downloadable link.
- Accept Putaway Log XLSX and optional variance, downtime, checking, receiving and timeclock data.
- Do not depend on or connect the separate Cycle Count app.
- Normalize employee names and initials case-insensitively.
- Use explicit initials before aisle ownership.
- Reconcile totals and identify missing or duplicated credit.
- Keep cycle counts, already-counted credit, putaways and extra tasks separately visible.
- Produce evidence-backed productivity summaries and export-ready ledgers.
- Never modify official employee records automatically.

### 04 — JARVIS Business
- Evaluate business ideas, operating costs, potential revenue, risks and next steps.
- Track projects, decisions, deadlines and follow-ups.
- Prepare customer communications, proposals, SOPs and reports.
- Research competitors and opportunities using current public sources.
- Separate facts, assumptions and estimates.
- Require approval before sending messages, publishing, purchasing, signing, deploying or changing records.

### 05 — JARVIS Hobby
- Support personal technology projects, fitness, safe Spider-inspired training, collecting and learning.
- Trading functionality is research and proposal only unless an explicit approval gateway is passed.
- Every trade entry, exit, cancellation, quantity change, stop change and target change requires a fresh approval.
- Adjust market analysis for human fear, panic, herd behavior, liquidity withdrawal, capitulation and the user's emotional state.
- Never coach dangerous rooftop activity, unauthorized climbing, fighting or weapon creation.

### 06 — JARVIS Fact
- Search the web for current claims.
- Prefer primary and authoritative sources.
- Compare multiple sources for disputed or high-impact facts.
- Return citations, publication dates and confidence.
- Clearly label inference, estimate, uncertainty and conflicting evidence.
- Do not invent a source or pretend an inaccessible page was read.

### 07 — Approval Gateway
Consequential actions include:
- Purchases or cart checkout
- Sending email, text or workplace communication
- Trades or broker changes
- Deployments or production database changes
- Deleting or modifying records
- Changing employee, payroll or schedule data
- Publishing content
- Sharing private documents
- Creating paid subscriptions

Approval rules:
- Generate a structured approval request with exact action, target, cost/risk, data affected and expiration time.
- Approval must be tied to the user, correlation ID and immutable action hash.
- Materially changed information invalidates approval.
- No blanket approval for future trades or purchases.
- Reconfirm destructive or high-dollar actions.
- Denial ends the action cleanly and logs the result.

### 08 — Scheduler and Proactive Monitor
Run selected sub-workflows on schedules:
- Morning personal and work briefing
- Grocery-price refresh for saved meal plans
- Coupon-expiration watch
- Household reminders
- Warehouse report intake checks
- GitHub/app health checks
- Trading-market observation and proposal preparation
- Weekly business opportunity review

Only notify when the result is new, meaningful and relevant. Suppress duplicate or low-value alerts.

### 09 — Health, Error and Cost Control
- Use Error Trigger workflows.
- Retry transient failures with exponential backoff and limits.
- Send failed jobs to a dead-letter table.
- Record external API cost, AI token use, rate limits and execution time.
- Add circuit breakers for failing or expensive sources.
- Run a recurring n8n security audit.
- Provide an emergency pause that stops all schedules and consequential tools.

## Data model in Supabase
Create migrations for:
- profiles
- households
- memberships
- scopes
- connected_sources
- workflow_runs
- workflow_events
- memory_items
- tasks
- notifications
- approval_requests
- approval_decisions
- audit_events
- recipes
- recipe_ingredients
- pantry_items
- meal_plans
- retailer_locations
- product_price_observations
- coupons
- shopping_lists
- shopping_list_items
- work_imports
- work_events
- productivity_results
- business_projects
- research_sources

Add row-level security. Users may access their private scope and explicitly shared household scope. Work data must remain isolated from household members unless separately authorized.

## Security and privacy
- Design for self-hosted n8n.
- Store secrets in n8n credentials or environment-backed secret management, never in workflow JSON.
- Validate webhook signatures and reject replayed requests.
- Use least-privilege API credentials.
- Redact sensitive values from logs.
- Disable dangerous community nodes unless reviewed.
- Do not expose n8n directly without TLS and authentication.
- Do not continuously upload or retain ambient audio.
- Add retention policies for executions, files and transcripts.
- Run the built-in n8n security audit on a schedule and notify only on meaningful findings.

## Implementation standards
- Use sub-workflows instead of one unmaintainable canvas.
- Each workflow must have input/output schemas, version tags and test fixtures.
- Add idempotency for file imports, scheduled checks and purchase/trade proposals.
- Use HTTP Request only against approved domains or APIs.
- Validate all AI-generated tool arguments before execution.
- Keep deterministic calculations outside the language model when possible.
- Preserve evidence and timestamps for web prices, coupons and warehouse calculations.
- Build development and production workflow exports separately.
- Produce importable n8n JSON files plus a setup guide.

## First release acceptance tests
1. A user asks for three dinners under a stated budget. JARVIS finds recipes, compares available store prices/coupons, shows cost per meal, and prepares—not purchases—the best basket.
2. The same request rerun within the freshness window reuses valid observations and avoids duplicate searches.
3. A coupon with uncertain eligibility is clearly marked and is not counted as guaranteed savings.
4. A purchase request pauses at approval with an exact itemized total.
5. A Cycle Count Detail, Already Cycle Counted and Putaway Log set produces reconciled employee productivity without using the Cycle Count app.
6. Work data is not visible to a household-only user.
7. A trading proposal cannot reach a broker action without a fresh approval.
8. A failed retailer source does not fail the entire meal plan; the result shows incomplete coverage.
9. Every answer includes evidence timestamps and separates confirmed facts from estimates.
10. Emergency pause disables schedules and action tools.

## Deliverables
- Master router workflow JSON
- All sub-workflow JSON exports
- Supabase SQL migrations
- `.env.example` without secrets
- Credential setup guide
- Approved-domain configuration
- Test fixtures
- Failure-path tests
- Deployment guide for self-hosted n8n
- Operations guide covering backups, updates, audits, retries and emergency pause
