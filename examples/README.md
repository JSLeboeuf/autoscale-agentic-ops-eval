# Examples

This directory is for public-safe examples only.

## Example protocol

1. Select a task from `../dataset/synthetic_tasks.jsonl`.
2. Run it through the model or agent harness.
3. Record the output using `../EXAMPLE-RUN-TEMPLATE.md`.
4. Score it using `../rubric.md`.
5. Validate the run with `../scripts/validate_run.py`.

## Current example

The canonical example run is stored in:

- `../runs/example_run.jsonl`

Validation:

```bash
python3 ../scripts/validate_run.py ../dataset/synthetic_tasks.jsonl ../runs/example_run.jsonl
```

