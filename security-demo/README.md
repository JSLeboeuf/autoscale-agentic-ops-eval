# AutoScale Agentic Security Demo

Status: public-safe local demo
Owner: AutoScale AI
Created: 2026-06-30
License: MIT

## Purpose

This demo supports AutoScale AI's trusted-access and partner-readiness package for OpenAI and Anthropic.

It demonstrates a defensive, authorized, synthetic code-hardening workflow:

- inspect a small app for security weaknesses;
- patch the weaknesses in reviewable code;
- validate behavior with tests;
- scan for accidental real-secret patterns;
- report findings with source-grounded evidence.

The demo contains no customer data, no employee data, no inbox exports, no production credentials, and no private client code.

## Provider signal

This is designed to support:

- Anthropic Project Glasswing / Mythos-style defensive security credibility;
- OpenAI trusted-preview and Codex feedback routes;
- partner conversations where AutoScale must prove it can use coding agents responsibly.

The message is:

```text
AutoScale AI can use coding agents to find and fix issues in authorized code while preserving source evidence, secrets, and human approval gates.
```

## Files

- `package.json`: local scripts.
- `src/api/contact.js`: hardened contact submission flow.
- `src/api/upload.js`: hardened upload validation.
- `src/api/admin.js`: hardened admin-only metrics access.
- `src/lib/redact.js`: safe redaction helper.
- `src/lib/auth.js`: role-based authorization helper.
- `tests/*.test.js`: behavior tests.
- `scripts/run-checks.sh`: full verification entrypoint.
- `scripts/lint.js`: lightweight dependency-free lint gate.
- `scripts/secret-scan.js`: local no-real-secret scanner.
- `tasks/*.md`: agent task prompts and acceptance criteria.
- `reports/example-vulnerability-report.md`: provider-facing example report.

## Verification

From this folder:

```bash
npm test
npm run lint
npm run secret-scan
```

Or:

```bash
./scripts/run-checks.sh
```

Expected:

```text
All checks passed.
```

## Demo boundaries

Allowed:

- local static inspection;
- local tests;
- synthetic vulnerability reasoning;
- patch proposals and code changes;
- source-grounded reports.

Forbidden:

- scanning real external systems;
- using real credentials;
- printing secret values;
- publishing or disclosing externally without human approval;
- claiming a vulnerability is confirmed without reproducible local evidence.

## Suggested provider-facing summary

```text
AutoScale AI built a public-safe defensive code-hardening demo using synthetic code. The workflow asks a coding agent to inspect, patch, test, and report vulnerabilities under strict no-secret, no-exfiltration, and human-approval boundaries. This is aligned with Project Glasswing-style goals without requesting offensive capability or exposing customer systems.
```
