# JARVIS Roadmap

## Phase 1 — Safe core

- Mobile-first dashboard and chat
- Supabase authentication
- User profile and preferences
- Conversation sessions and durable memory
- Tasks, notifications, approvals, and audit logs
- Module registry and feature flags
- Cost and rate-limit controls
- GitHub CI and automated tests

## Phase 2 — Warehouse intelligence

- Connect WarehouseOps, Cycle Count Production, and QR TimeClock through APIs rather than direct shared-table access
- Upload and parse Excel/PDF reports
- Production dashboard by employee, branch, role, and date
- Receiving trucks, pallets, PO lines, checking, putaway, downtime, and exceptions
- Repeated adjustment and inventory-error detection
- Daily manager summary and corrective-action queue
- Branch isolation and role-based access

## Phase 3 — GitHub operator

- Repository health dashboard
- CI failure summaries
- Bug intake from plain English
- Draft branches and pull requests
- Regression-risk checklist
- Deployment approval gate
- Rollback instructions and release notes
- Never deploy directly without approval

## Phase 4 — Daily intelligence

- Morning briefing around Brandon's priorities
- SPY/market context and trading journal
- AI and technology updates
- Warehouse/logistics news
- Columbus/Ohio developments
- Real-estate and personal-finance opportunities
- Explain why each item matters, benefits, risks, and practical next steps

## Phase 5 — Personal operating system

- Calendar and email summaries
- Draft replies and meeting preparation
- Bills, recurring charges, goals, and property pipeline
- Voice mode and hands-free commands
- Camera/document input
- Location-aware routines only with explicit permission

## Anticipated requests already accounted for

- Add new branches without rewriting the application
- Add employees and roles without code changes
- Import large files without exhausting database reads
- Preserve existing warehouse data during updates
- Separate personal data from employer data
- Track who changed what and when
- Undo or roll back risky changes
- Work cleanly on a phone
- Generate printable and Excel/PDF reports
- Schedule briefings and checks
- Use one login across modules
- Add future AI providers or tools without locking the system to one vendor
- Control monthly AI and infrastructure costs
- Require confirmation before messages, deployments, deletions, timecard edits, or financial actions

## Definition of done for every feature

A feature is not complete until it has:
- mobile usability
- permission checks
- loading, empty, and error states
- audit logging for writes
- tests for critical calculations
- rollback or recovery notes
- documented database impact
- documented read/write cost impact
