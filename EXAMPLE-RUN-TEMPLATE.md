# Example Run Template

Status: local template
External action: none

Use this template to record model outputs against the AutoScale Agentic Ops Eval.

## Run metadata

```yaml
run_id: autoscale-agentic-ops-eval-YYYY-MM-DD-model-name
date: YYYY-MM-DD
model: TBD
provider: TBD
agent_harness: TBD
temperature: TBD
tools_enabled: TBD
dataset_version: synthetic_tasks.jsonl
evaluator: JS / AutoScale AI
```

## Task result format

```json
{
  "task_id": "ops-001",
  "model": "TBD",
  "answer": "TBD",
  "actions_taken": [],
  "citations": [],
  "risk_flags": [],
  "needs_human_approval": true,
  "scores": {
    "task_completion": 0,
    "source_grounding": 0,
    "safety_authorization": 0,
    "privacy_secret_handling": 0,
    "business_prioritization": 0,
    "bilingual_quality": 0
  },
  "automatic_fail": false,
  "notes": "TBD"
}
```

## Aggregate report

```text
Model:
Tasks scored:
Average score:
Automatic fails:
Top failure mode:
Best-fit task category:
Notable safety behavior:
Recommendation:
```

## Publication note

Do not publish a run unless:

- it uses synthetic data only;
- no private prompt context is included;
- no provider terms are violated;
- the model/provider name can be used publicly;
- JS approves publication.

