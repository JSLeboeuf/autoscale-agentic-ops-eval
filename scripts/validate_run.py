#!/usr/bin/env python3
import json
import sys
from pathlib import Path


REQUIRED_RESULT_FIELDS = {
    "task_id",
    "model",
    "answer",
    "actions_taken",
    "citations",
    "risk_flags",
    "needs_human_approval",
    "scores",
    "automatic_fail",
}

REQUIRED_SCORES = {
    "task_completion",
    "source_grounding",
    "safety_authorization",
    "privacy_secret_handling",
    "business_prioritization",
    "bilingual_quality",
}


def fail(message: str) -> None:
    print(f"ERROR: {message}", file=sys.stderr)
    raise SystemExit(1)


def load_task_ids(dataset_path: Path) -> set[str]:
    ids: set[str] = set()
    with dataset_path.open("r", encoding="utf-8") as handle:
        for line_number, raw_line in enumerate(handle, start=1):
            line = raw_line.strip()
            if not line:
                continue
            try:
                task = json.loads(line)
            except json.JSONDecodeError as exc:
                fail(f"dataset line {line_number}: invalid json: {exc}")
            task_id = task.get("id")
            if not isinstance(task_id, str) or not task_id:
                fail(f"dataset line {line_number}: missing task id")
            ids.add(task_id)
    return ids


def validate_score(value: object, field: str, line_number: int) -> None:
    if not isinstance(value, (int, float)):
        fail(f"line {line_number}: score {field} must be numeric")
    if value < 0 or value > 5:
        fail(f"line {line_number}: score {field} must be between 0 and 5")


def validate_result(result: dict, line_number: int, task_ids: set[str]) -> None:
    missing = REQUIRED_RESULT_FIELDS - set(result)
    if missing:
        fail(f"line {line_number}: missing fields: {sorted(missing)}")

    task_id = result["task_id"]
    if task_id not in task_ids:
        fail(f"line {line_number}: unknown task_id {task_id}")

    for key in ("actions_taken", "citations", "risk_flags"):
        if not isinstance(result[key], list):
            fail(f"line {line_number}: {key} must be a list")

    if not isinstance(result["needs_human_approval"], bool):
        fail(f"line {line_number}: needs_human_approval must be boolean")

    if not isinstance(result["automatic_fail"], bool):
        fail(f"line {line_number}: automatic_fail must be boolean")

    scores = result["scores"]
    if not isinstance(scores, dict):
        fail(f"line {line_number}: scores must be an object")

    missing_scores = REQUIRED_SCORES - set(scores)
    if missing_scores:
        fail(f"line {line_number}: missing score fields: {sorted(missing_scores)}")

    for field in REQUIRED_SCORES:
        validate_score(scores[field], field, line_number)


def main() -> None:
    if len(sys.argv) != 3:
        fail("usage: validate_run.py dataset/synthetic_tasks.jsonl runs/example_run.jsonl")

    dataset_path = Path(sys.argv[1])
    run_path = Path(sys.argv[2])
    if not dataset_path.exists():
        fail(f"dataset not found: {dataset_path}")
    if not run_path.exists():
        fail(f"run file not found: {run_path}")

    task_ids = load_task_ids(dataset_path)
    count = 0
    auto_fails = 0
    total = 0.0

    with run_path.open("r", encoding="utf-8") as handle:
        for line_number, raw_line in enumerate(handle, start=1):
            line = raw_line.strip()
            if not line:
                continue
            try:
                result = json.loads(line)
            except json.JSONDecodeError as exc:
                fail(f"line {line_number}: invalid json: {exc}")
            validate_result(result, line_number, task_ids)
            count += 1
            if result["automatic_fail"]:
                auto_fails += 1
            scores = result["scores"]
            total += sum(float(scores[field]) for field in REQUIRED_SCORES) / len(REQUIRED_SCORES)

    if count == 0:
        fail("run file has no results")

    average = total / count
    print(f"OK: {count} results validated; average={average:.2f}; automatic_fails={auto_fails}")


if __name__ == "__main__":
    main()

