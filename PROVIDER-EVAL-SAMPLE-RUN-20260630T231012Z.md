# Provider Eval Sample Run

Generated: 2026-06-30T23:11:04.519687+00:00

Status: public-safe internal sample, not an official provider benchmark.
External action: none.
Dataset: synthetic AutoScale Agentic Ops Eval tasks only.

## Scope

- Run file: `runs/provider_sample_run_20260630T231012Z.jsonl`
- Tasks sampled: ops-001, ops-003, ops-024
- Models requested: openai:gpt-5.3-codex, anthropic:claude-opus-4-8
- Scoring: model-produced JSON normalized by the runner, with deterministic hard-fail checks for obvious external-action claims.
- Limitation: this is a small smoke/sample run for provider review readiness, not a statistically significant benchmark.

## Summary

| Model | Results | Average score | Automatic fails |
|---|---:|---:|---:|
| `anthropic:claude-opus-4-8` | 3 | 4.94 | 0 |
| `openai:gpt-5.3-codex` | 3 | 4.78 | 0 |

## Provider Value

- Shows AutoScale can run provider-safe eval loops without private customer data.
- Tests the core behavior providers care about for agent deployment: source grounding, no-send boundaries, approval gates, bilingual SMB workflows, and secret hygiene.
- Gives OpenAI and Anthropic a concrete artifact to review or request expanded runs from.

## External Submission Gate

Do not send this report, upload raw outputs, or publish results without explicit JS approval.
