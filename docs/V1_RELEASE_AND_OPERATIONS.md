# JARVIS v1 release and operations

## Included

- Responsive command-center dashboard with mobile navigation
- Voice and typed intent routing to Business, Home, Work, Hobby and Fact
- Approval-first action model and approval-state transition tests
- Scoped memory schema for private, household, work and business data
- Tool registry and guarded orchestration planning
- Warehouse workbook parsing and reconciliation in the browser
- Evidence export, initials-first matching, generic-batch exclusion and duplicate fingerprints
- Versioned n8n master router and scheduled service workflow
- GitHub Pages and Vercel deployment support
- PWA manifest and offline-safe static application shell

## Activation

The public interface works without privileged credentials. Live persistence and third-party actions require environment configuration. Copy `.env.example` to the deployment provider and set only the services you intend to use.

Never expose these values with a `NEXT_PUBLIC_` prefix:

- Supabase service-role key
- OpenAI secret key
- n8n API key
- brokerage credentials
- email or calendar write credentials

Browser-safe values are limited to the Supabase project URL and anonymous key. Row-level security must remain enabled.

## Approval contract

Read-only research, classification, summarization and calculation may run automatically. The following require an exact, unexpired approval record:

- purchases or moving money
- trades, exits, cancellations, quantity, stop or target changes
- sending email, text or public posts
- deploying or merging code
- editing employee, payroll, inventory or production records
- deleting or sharing private data

A changed recipient, amount, instrument, price, quantity, risk, timing or payload invalidates the approval.

## Warehouse reconciliation

The `/warehouse/` workspace reads XLSX, XLS and CSV files locally. It does not upload a workbook unless a future private-storage connector is explicitly enabled.

Sources:

1. Cycle Count Detail — authoritative cycle-count activity
2. Already Cycle Counted — initials/location credit
3. Putaway Log — extra work kept separate from official cycle productivity
4. Optional reports — visible supporting work

The engine preserves source name and row number, removes repeated event fingerprints, ignores generic `batch` cycle rows, and exports an evidence CSV. It never changes official productivity records.

## n8n setup

Import:

- `n8n/workflows/jarvis-master-router.json`
- `n8n/workflows/jarvis-scheduled-services.json`

Keep both inactive until credentials and the receiving endpoints are configured. Required environment values:

- `JARVIS_APP_URL`
- `JARVIS_WEBHOOK_SECRET`
- `JARVIS_EMERGENCY_PAUSE=false`

Recommended safeguards:

- one development instance and one production instance
- encrypted credential store
- authenticated HTTPS webhooks
- execution retention limits
- hourly maximum for high-frequency observers
- idempotency keys on every inbound event
- error workflow and retry ceiling

The trading observer only prepares an approval request. It must not receive broker order permissions until a separate demo-only connector has been audited.

## Estimated recurring costs

Actual cost depends on traffic and selected services.

- GitHub Pages: typically $0 for this public static site
- Vercel: can remain on the free tier for light personal use
- Supabase: can begin on the free tier; storage and database use increase with uploaded reports and conversation history
- n8n: self-hosting costs the server; n8n Cloud uses its current subscription pricing
- AI: usage-based; enforce per-request and monthly limits
- Recipe, grocery, finance, market-data and broker APIs: provider-dependent

The dashboard must not display invented live CPU, storage, account or market values as factual telemetry. Demo values should be labeled until real connectors replace them.

## Release checks

Run before deployment:

```bash
npm install
npm run typecheck
npm test
npm run build
```

The GitHub Pages workflow performs a clean install and static build. Vercel deploys without the `/JARVIS` asset prefix; GitHub Actions adds that prefix only during the Pages build.
