# JARVIS Architecture

## System map

```text
Mobile/Web UI
   |
JARVIS API and Agent Router
   |-- Approval Engine
   |-- Memory Service
   |-- Notification Service
   |-- Module Registry
   |-- Audit Logger
   |
Supabase (Auth, Postgres, Storage, Realtime)
   |
Integrations (GitHub, warehouse apps, email, calendar, market data, automation workflows)
```

## Core services

### Agent router
Classifies each request, selects the smallest appropriate module, and returns a structured plan before any action.

### Approval engine
Action classes:
- `read`: may run automatically.
- `prepare`: may create drafts, reports, or proposed code changes.
- `approve`: requires Brandon's confirmation before sending, deleting, changing records, deploying, or executing financial actions.
- `blocked`: prohibited or unsupported actions.

### Memory service
Stores durable preferences, project facts, module context, and user-approved memories. Temporary conversations should expire or be summarized.

### Audit logger
Records actor, module, action, target, input summary, result summary, approval state, timestamps, and error details.

### Module registry
Every module declares:
- capabilities
- required permissions
- tools
- read/write risk level
- schedules
- health checks
- cost limits

## Initial modules

- `core`: chat, tasks, notifications, approvals, settings
- `warehouse`: reports, production, receiving, cycle count, inventory exceptions
- `github`: repo health, issues, proposed fixes, CI status
- `briefing`: daily news and priority briefings
- `trading`: market analysis and trade journaling; never autonomous execution
- `finance`: personal financial analysis with explicit data permissions
- `real_estate`: deal analysis and property pipeline
- `communications`: email/calendar drafts and summaries

## Reliability rules

- Idempotency keys for writes
- Retry only safe operations
- Rate limits per module
- Caching for repeated reads
- Batched database writes
- Background jobs for document processing
- Feature flags for unfinished modules
- Health endpoint and structured logs
- No secret values in browser code or logs
