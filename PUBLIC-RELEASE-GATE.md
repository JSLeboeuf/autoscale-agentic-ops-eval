# Public Release Gate

Status: mandatory gate before any publication or provider submission
External action: none

This repository can support provider review, startup-credit applications, and trusted-preview conversations only if every public claim stays precise and provider-safe.

## Current Publication State

- Repository: local draft with a public remote.
- Provider sample run: local artifact unless explicitly pushed.
- Provider relationships: no official OpenAI or Anthropic partnership is claimed.
- Restricted model access: no restricted or preview model access is claimed.
- Customer data: none.
- Employee or HR data: none.
- Inbox exports: none.
- Credentials: none.

## Actions That Require Explicit Approval

Do not perform any of these actions without explicit JS approval in the current thread:

- push model-result commits to the public repository;
- publish provider sample reports;
- submit this repository to OpenAI, Anthropic, or any cloud/startup program;
- upload raw model outputs to a provider form;
- claim official benchmark status;
- claim partnership, certification, sponsorship, or restricted-model access;
- enable provider data-sharing, model-training contribution, or preview-program opt-in.

## Required Checks Before Public Push

Run:

```bash
python3 scripts/validate_dataset.py dataset/synthetic_tasks.jsonl
python3 scripts/validate_metadata.py dataset/synthetic_tasks.jsonl metadata/task_failure_modes.jsonl
python3 scripts/validate_run.py dataset/synthetic_tasks.jsonl runs/example_run.jsonl
python3 scripts/validate_run.py dataset/synthetic_tasks.jsonl runs/provider_sample_run_20260630T231012Z.jsonl
(cd security-demo && ./scripts/run-checks.sh)
```

Run a repository secret scan for common API keys, OAuth secrets, JWTs, and private keys.

## Required Human Review Before Submission

Before this repo is sent to a provider, confirm:

- the exact recipient or program route;
- the exact files being shared;
- the exact claims made in the submission;
- whether model-result disclosure is allowed by provider terms;
- whether customer-story claims have written customer approval;
- whether the submission is private, public, or semi-public.

## Approved Positioning

Use:

> AutoScale AI maintains a synthetic SMB operations eval for source-grounded, privacy-safe, human-approved business agents. It is designed to support provider feedback and trusted-preview discussions without exposing customer data.

Do not use:

> Official OpenAI benchmark.

Do not use:

> Official Anthropic benchmark.

Do not use:

> Partner-approved results.

Do not use:

> Restricted-model performance.

