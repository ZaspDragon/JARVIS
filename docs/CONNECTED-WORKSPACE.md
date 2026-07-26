# Connected Workspace Architecture

JARVIS should answer questions across the user's apps, spreadsheets, links, and uploaded reports without requiring the user to manually merge the data first.

## Core principle

Every source is treated as a connector that produces normalized records with:

- source name
- source type
- branch or workspace
- employee identity
- business date
- item, location, PO, batch, or transaction identifiers
- quantity or production value
- timestamps
- confidence and reconciliation notes
- original evidence link or file reference

JARVIS can then compare multiple sources and explain where numbers agree, disagree, or are missing.

## Initial connectors

1. Cycle Count Detail workbook
2. Already Cycle Counted workbook or shared link
3. Putaway Log workbook
4. Warehouse Ops app
5. Cycle Count Production app
6. QR TimeClock
7. GitHub repositories
8. Supabase tables
9. Uploaded PDF, CSV, XLSX, image, and text files
10. Future email, calendar, finance, and web connectors

## Example question

> Take the Cycle Count Detail file I just downloaded, the Already Cycle Counted link, and the Putaway Log spreadsheet. Show everyone's current productivity and identify extra work that is not represented in their production.

## Processing flow

1. Resolve the requested date and branch.
2. Read all supplied sources.
3. Normalize employee names and initials without case sensitivity.
4. Determine count ownership using explicit initials first, then approved aisle-assignment rules.
5. Expand already-counted item numbers to every credited location where the business rule requires it.
6. Exclude non-production batch labels when configured.
7. Separate cycle counts, variance work, batch work, putaways, truck work, checking, and downtime.
8. Detect duplicate rows across repeated uploads.
9. Compare source totals with report control totals.
10. Produce an employee productivity ledger with evidence and reconciliation warnings.

## Productivity output

For each employee, return:

- standard cycle counts completed
- already-counted credit
- adjustment or variance work
- putaway lines completed
- extra work not included in the formal production report
- credited production total
- standard goal
- productivity percentage
- source coverage
- missing or disputed work
- explanation of how each total was calculated

JARVIS must not silently combine unlike tasks. It should show both raw units and an optional weighted-equivalent score.

## Weighted production

Weights must be branch-configurable and visible. Example only:

- 1 cycle-count location = 1 production unit
- 1 putaway line = configurable fraction or separate KPI
- truck unloading = separate KPI based on pallets and truck type
- variance research = separate credited work category
- downtime = explanatory context, never hidden

No weight should be invented by the AI. JARVIS may recommend a weighting model, but a manager must approve the policy before it affects official productivity.

## Evidence and trust

Every result should include:

- filenames or source links used
- report date interpreted
- rows included and excluded
- duplicate handling
- unmatched employee names or initials
- control-total reconciliation
- confidence level

## Connection methods

### Best method: API or Supabase

Existing apps should write normalized activity events to Supabase. This gives JARVIS current data without repeatedly downloading complete files.

### File upload fallback

Users can upload XLSX, CSV, PDF, or images directly. JARVIS parses them for one-time analysis and optionally stores a normalized import batch.

### Shared-link import

For stable downloadable links, JARVIS stores the source configuration and retrieves the latest file on request or schedule. Authentication must remain server-side.

### GitHub app integration

JARVIS can inspect application code, issues, deployments, schemas, and release status. Application business data should not be scraped from GitHub unless it is intentionally stored there.

## Cost and performance

- import once, query normalized rows many times
- hash uploaded files to prevent duplicate imports
- use incremental sync timestamps
- avoid reading every historical row for a current-day question
- keep source files in storage and structured rows in database tables
- archive old import batches according to retention rules

## Safety

Read-only comparisons may run automatically. Any change to employee credit, timesheets, official production, inventory, permissions, or payroll requires an approval record and audit log.
