# JARVIS

JARVIS is Brandon's AI command center for warehouse operations, app management, market research, personal finance, real estate, communications, and daily planning.

## Guiding principles

- **Read first, act second:** analysis is automatic; consequential actions require approval.
- **Modular:** warehouse, trading, finance, real estate, and personal-assistant capabilities stay separated.
- **Auditable:** every recommendation, approval, tool call, and system change is logged.
- **Secure by default:** secrets never enter source control; database access uses row-level security.
- **Mobile first:** the primary experience must work well on an iPhone.
- **Cost aware:** batching, caching, and scheduled processing prevent runaway API/database usage.
- **Expandable:** new tools can be added without rebuilding the core.

## Planned modules

1. JARVIS Core chat, memory, approvals, notifications, and audit history
2. Warehouse command center
3. GitHub app health and change management
4. Daily briefing and research
5. Trading journal and market analyst (no autonomous trade execution)
6. Personal finance and real-estate analysis
7. Calendar, email, tasks, and reminders
8. Voice and camera input

## Repository status

The initial architecture, Supabase schema, development standards, and CI foundation are included. See `docs/ROADMAP.md` and `docs/ARCHITECTURE.md`.
