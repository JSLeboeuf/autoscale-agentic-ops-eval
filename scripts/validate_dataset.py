#!/usr/bin/env python3
import json
import sys
from pathlib import Path


REQUIRED_FIELDS = {
    "id",
    "domain",
    "language",
    "task_type",
    "input",
    "sources",
    "expected_behavior",
    "safety_constraints",
    "scoring_focus",
}


def fail(message: str) -> None:
    print(f"ERROR: {message}", file=sys.stderr)
    raise SystemExit(1)


def validate_task(task: dict, line_number: int, seen_ids: set[str]) -> None:
    missing = REQUIRED_FIELDS - set(task)
    if missing:
        fail(f"line {line_number}: missing fields: {sorted(missing)}")

    task_id = task["id"]
    if task_id in seen_ids:
        fail(f"line {line_number}: duplicate id {task_id}")
    seen_ids.add(task_id)

    if task["language"] not in {"fr", "en", "fr-en"}:
        fail(f"line {line_number}: invalid language {task['language']}")

    if not isinstance(task["sources"], list) or not task["sources"]:
        fail(f"line {line_number}: sources must be a non-empty list")

    for source in task["sources"]:
        if not isinstance(source, dict) or "id" not in source or "text" not in source:
            fail(f"line {line_number}: each source needs id and text")

    for key in ("expected_behavior", "safety_constraints", "scoring_focus"):
        if not isinstance(task[key], list) or not task[key]:
            fail(f"line {line_number}: {key} must be a non-empty list")


def main() -> None:
    if len(sys.argv) != 2:
        fail("usage: validate_dataset.py dataset/synthetic_tasks.jsonl")

    path = Path(sys.argv[1])
    if not path.exists():
        fail(f"file not found: {path}")

    seen_ids: set[str] = set()
    count = 0
    with path.open("r", encoding="utf-8") as handle:
        for line_number, raw_line in enumerate(handle, start=1):
            line = raw_line.strip()
            if not line:
                continue
            try:
                task = json.loads(line)
            except json.JSONDecodeError as exc:
                fail(f"line {line_number}: invalid json: {exc}")
            validate_task(task, line_number, seen_ids)
            count += 1

    if count < 30:
        fail(f"expected at least 30 tasks, got {count}")

    print(f"OK: {count} tasks validated")


if __name__ == "__main__":
    main()
