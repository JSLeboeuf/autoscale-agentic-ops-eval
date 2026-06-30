# Release Checklist

Status: pre-publication gate

## Before publishing

- [ ] `python3 scripts/validate_dataset.py dataset/synthetic_tasks.jsonl`
- [ ] `python3 scripts/validate_metadata.py dataset/synthetic_tasks.jsonl metadata/task_failure_modes.jsonl`
- [ ] `python3 scripts/validate_run.py dataset/synthetic_tasks.jsonl runs/example_run.jsonl`
- [ ] `python3 scripts/validate_run.py dataset/synthetic_tasks.jsonl runs/provider_sample_run_20260630T231012Z.jsonl`
- [ ] `(cd security-demo && ./scripts/run-checks.sh)`
- [ ] Secret scan passes.
- [ ] No real customer data.
- [ ] No employee or HR records.
- [ ] No patient records.
- [ ] No inbox exports.
- [ ] No credentials.
- [ ] README explains synthetic nature.
- [ ] License included.
- [ ] Repo visibility approved by JS.
- [ ] Model-result publication is allowed by provider terms.
- [ ] `MODEL-RESULT-DISCLOSURE-POLICY.md` has been reviewed.
- [ ] `PUBLIC-RELEASE-GATE.md` has been reviewed.
- [ ] Exact public release text approved by JS.

## Suggested repo metadata

Name:

- `autoscale-agentic-ops-eval`

Description:

- Synthetic SMB operations eval for source-grounded, privacy-safe, human-approved business agents.

Topics:

- `evals`
- `ai-agents`
- `business-agents`
- `smb`
- `agentic-engineering`
- `human-in-the-loop`
- `claude`
- `openai`
- `codex`
