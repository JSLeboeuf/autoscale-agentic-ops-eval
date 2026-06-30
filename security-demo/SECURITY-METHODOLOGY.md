# Defensive Security Methodology

Status: public-safe methodology
Owner: AutoScale AI
Created: 2026-06-30

## Purpose

This methodology explains how AutoScale AI uses coding agents for defensive code-hardening work without turning the workflow into offensive security, data exposure, or unsupervised disclosure.

It supports provider review for:

- OpenAI Codex / trusted defensive cyber feedback routes;
- Anthropic Glasswing-style defensive credibility;
- startup and partner programs where safety, logging, and approval boundaries matter.

## Scope

Allowed targets:

- synthetic demo code in this repository;
- code owned by AutoScale AI;
- code AutoScale AI is explicitly authorized to test;
- local-only test harnesses;
- reviewed pull requests and patch proposals.

Out of scope:

- external systems without written authorization;
- customer production environments without explicit scope;
- credentialed scans against third-party services;
- exploit development beyond what is needed to understand and patch a local issue;
- public vulnerability disclosure without owner approval;
- model prompts or tool output that reveal secrets.

## Operating principles

1. Authorization first.
   - Every assessment must identify who owns the system and whether AutoScale has permission to test it.

2. Local evidence first.
   - Claims must be backed by source lines, tests, or reproducible local behavior.

3. Patch before publicity.
   - The preferred output is a small patch with tests, not a dramatic vulnerability claim.

4. Secrets stay hidden.
   - Agents must not print, copy, summarize, or transmit secret values.
   - Secret scanners are used as a pre-share and pre-commit gate.

5. Human approval before external action.
   - No issue filing, disclosure, email, customer message, or provider submission happens automatically.

6. Minimize capability transfer.
   - Reports focus on impact, reproduction boundaries, and remediation.
   - Avoid step-by-step exploit instructions when a safer patch-oriented explanation is enough.

## Workflow

### 1. Define authorization

Record:

- target repository or codebase;
- owner;
- authorization basis;
- systems explicitly excluded;
- data classes that must not be touched;
- reviewer responsible for approval.

### 2. Inspect locally

Use:

- static source review;
- tests;
- local fixtures;
- dependency-free linting where possible;
- no network scans unless explicitly approved.

### 3. Classify findings

Use clear categories:

- missing authorization;
- weak input validation;
- unsafe file handling;
- sensitive data exposure;
- missing audit or review gate;
- unsafe external action.

### 4. Patch with tests

Every code change should include:

- the smallest practical remediation;
- tests proving the vulnerable path is blocked;
- tests proving legitimate behavior still works;
- secret scan result.

### 5. Produce a source-grounded report

Reports should include:

- finding summary;
- affected file/function;
- evidence;
- impact;
- remediation;
- validation commands;
- residual risk;
- what was not tested.

Reports should not include:

- real secrets;
- customer data;
- exploit chain details beyond local proof;
- unsupported severity claims.

### 6. Review before sharing

Before sharing any report externally:

- verify authorization;
- run tests;
- run secret scan;
- remove sensitive paths or identifiers;
- obtain human approval.

## Required local checks

From `security-demo/`:

```bash
./scripts/run-checks.sh
```

Expected:

```text
tests 10
pass 10
Lint check passed.
Secret scan passed.
All checks passed.
```

## Provider-safe summary

```text
AutoScale AI uses coding agents for authorized defensive code-hardening: inspect local source, identify bounded issues, patch with tests, scan for secrets, and produce source-grounded reports. The workflow is designed to improve security while preserving approval gates, customer privacy, and responsible disclosure boundaries.
```

## Current demo evidence

- Demo README: `README.md`
- Example report: `reports/example-vulnerability-report.md`
- Agent task prompts: `tasks/`
- Tests: `tests/`
- Verification entrypoint: `scripts/run-checks.sh`
