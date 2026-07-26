# JARVIS n8n Always-On Automation

## Purpose
n8n runs approved background workflows while the user is away. It gathers information, normalizes it, detects meaningful changes, prepares recommendations, and places consequential actions into an approval queue.

It must never interpret "always on" as permission to act without limits.

## Core workflow
1. Scheduled Trigger or approved webhook receives an event.
2. Resolve user, household/workspace, mode, branch and timezone.
3. Retrieve only the minimum required credentials from encrypted n8n credentials.
4. Fetch approved sources.
5. Normalize data into JARVIS events.
6. Run deterministic validation and policy checks.
7. Ask the reasoning service for analysis and a proposed response.
8. Store evidence, confidence, source timestamps and audit information in Supabase.
9. If read-only and low risk, send a briefing or update the dashboard.
10. If consequential, create an approval request and stop.
11. Execute only after a valid, single-use approval token is received.

## Initial workflows

### Morning command briefing
- Calendar and reminders
- Important messages
- Work priorities
- Warehouse exceptions when connected
- Household tasks
- Market summary without placing trades

### Warehouse report watcher
- Detect newly uploaded Cycle Count Detail, Already Cycle Counted and Putaway Log files
- Parse and reconcile productivity
- Flag missing employee credit and control-total discrepancies
- Prepare a manager summary
- Never alter official production records automatically

### App health watcher
- Check GitHub Actions, open issues, deployment health and error signals
- Group repeated failures
- Prepare a safe repair plan or draft PR
- Require approval before deployment or risky merge

### Household assistant
- Upcoming appointments, bills, shopping reminders and maintenance
- Shared household profile with explicit permissions
- No private work data visible to household members

### Trading observer
- Market data and sentiment monitoring
- Fear-regime analysis and strategy validation
- Prepare trade proposals
- Every order entry, modification, cancellation or exit requires explicit approval

## Approval rules
Approval is required for:
- Sending messages or emails
- Creating, modifying or deleting calendar events unless pre-authorized by a narrow rule
- Changing employee or productivity records
- Deploying applications or merging risky changes
- Spending money or making purchases
- Placing, changing, cancelling or closing trades
- Unlocking doors, changing security settings or controlling safety-critical devices
- Deleting data

Approvals must be action-specific, expire quickly, be single use, and include the exact payload, risk, evidence and rollback plan.

## Privacy architecture
- Separate `work`, `personal`, and `household` scopes
- Row-level security in Supabase
- Private storage buckets and signed URLs
- Encrypt n8n credentials; never expose service-role keys to the browser
- Prefer local wake-word detection and local speech processing where practical
- Do not continuously store raw room audio
- Record only explicit commands or short user-approved clips needed to fulfill them
- Provide a hardware microphone mute indicator and an activity log
- Never claim a system is impossible to monitor; document which vendors and cloud services receive data

## Reliability controls
- Idempotency keys prevent duplicate actions
- Dead-letter queue for failed jobs
- Retries with exponential backoff
- Source freshness checks
- Cost and rate-limit budgets
- Health heartbeat
- Emergency pause switch
- Audit log for every read, recommendation, approval and action
