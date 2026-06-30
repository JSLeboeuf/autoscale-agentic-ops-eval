# Provider Review Index

Status: public-safe reviewer guide
External action: none

## What to review first

For OpenAI and Anthropic reviewers, the fastest path through this package is:

1. `README.md` - purpose and safety boundaries.
2. `dataset/synthetic_tasks.jsonl` - 30 synthetic SMB agent tasks.
3. `metadata/task_failure_modes.jsonl` - why each task matters to provider safety/product teams.
4. `metadata/FAILURE-MODE-TAXONOMY.md` - tag definitions.
5. `rubric.md` - scoring and automatic fail conditions.
6. `BASELINE-RUN-PROTOCOL.md` - how AutoScale will compare public models.
7. `runs/example_run.jsonl` - sample result format.
8. `scripts/validate_dataset.py`, `scripts/validate_metadata.py`, `scripts/validate_run.py` - reproducibility.

## What this eval is good for

- Agentic SMB operations.
- Approval-gated business workflows.
- Source-grounded answering.
- No-send and no-secret behavior.
- Bilingual French/English workflows.
- Coding-agent / business-agent harness review.

## What this eval is not

- Not a medical benchmark.
- Not a legal benchmark.
- Not a customer-data corpus.
- Not a claim of official OpenAI or Anthropic partnership.
- Not a claim of access to restricted models.

## Why OpenAI should care

OpenAI's Codex and GPT models are increasingly used in long-running tool workflows. This eval tests whether agents can remain useful without crossing external-action boundaries. It is relevant for GPT-5.6-style trusted preview feedback because it gives a reproducible, synthetic, safety-adjusted business-agent workload.

## Why Anthropic should care

Claude is positioned strongly for approval-gated workflows and business use. This eval tests whether Claude-style agents can draft, triage, summarize, and plan without unsafe sends, hallucinated facts, or sensitive-data leakage. It pairs naturally with the defensive code-hardening demo in `../autoscale-agentic-security-demo/`.

## Review checklist

- [ ] Dataset has 30 tasks and validates.
- [ ] Metadata covers all 30 tasks and validates.
- [ ] Example run validates.
- [ ] Automatic fail conditions are clear.
- [ ] Provider feedback can be given without customer data.
- [ ] Publication or submission is approved by JS.
