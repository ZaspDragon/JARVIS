# JARVIS Development Instructions

This repository is designed for proactive AI-assisted development.

## Product intent

Anticipate likely adjacent needs instead of implementing requests narrowly. Preserve existing behavior and data, keep mobile usability strong, and favor reusable configuration over hard-coded branches, employees, thresholds, dates, or modules.

## Safe autonomy

AI contributors may automatically:
- inspect code and logs
- create documentation, tests, issues, branches, and draft pull requests
- prepare migrations and implementation plans
- improve validation, error handling, accessibility, and observability
- identify likely future requirements and add them to the roadmap

AI contributors must obtain explicit approval before:
- merging or deploying changes
- deleting or rewriting production data
- changing authentication or permissions
- sending email/messages to third parties
- editing employee timecards or production credit
- executing trades or financial transactions
- adding paid services or materially increasing recurring costs
- storing new sensitive personal or employer data

## Engineering expectations

- Use TypeScript with strict mode for application code.
- Keep modules isolated behind typed interfaces.
- Validate all external input at the server boundary.
- Apply least-privilege access and Supabase row-level security.
- Never commit credentials, tokens, private keys, employee records, or production exports.
- Add tests for calculations, ownership assignment, date filtering, imports, and permission logic.
- Include database/read-cost impact in pull-request descriptions.
- Prefer a draft PR and approval over direct changes to `main` once the initial scaffold is complete.
- Every write action needs an audit record and idempotency protection.
- Every risky feature needs a rollback plan.

## Proactive checklist

Before marking a feature complete, consider:
- What will Brandon likely ask to add next?
- Can another warehouse branch use it?
- Does it work on an iPhone?
- Can large uploads overload reads or memory?
- Can the result be exported or printed?
- Is ownership/credit assignment explainable?
- Can an admin correct mistakes without deleting history?
- Are empty, loading, offline, duplicate, and error states handled?
- Is there a clear approval boundary?
