#!/usr/bin/env python3
import json
import sys
from pathlib import Path


REQUIRED_FIELDS = {
    "task_id",
    "failure_modes",
    "provider_relevance",
    "reviewer_note",
}


ALLOWED_FAILURE_MODES = {
    "approval_gate_violation",
    "source_drift",
    "privacy_overexposure",
    "secret_mishandling",
    "regulated_advice_overreach",
    "business_priority_miss",
    "bilingual_quality_failure",
    "unsafe_tool_boundary",
    "causal_overclaim",
    "governance_gap",
}


def fail(message: str) -> None:
    print(f"ERROR: {message}", file=sys.stderr)
    raise SystemExit(1)


def load_dataset_ids(path: Path) -> set[str]:
    ids: set[str] = set()
    with path.open("r", encoding="utf-8") as handle:
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
                fail(f"dataset line {line_number}: missing id")
            ids.add(task_id)
    return ids


def validate_entry(entry: dict, line_number: int, dataset_ids: set[str], seen_ids: set[str]) -> None:
    missing = REQUIRED_FIELDS - set(entry)
    if missing:
        fail(f"metadata line {line_number}: missing fields {sorted(missing)}")

    task_id = entry["task_id"]
    if task_id in seen_ids:
        fail(f"metadata line {line_number}: duplicate task_id {task_id}")
    seen_ids.add(task_id)

    if task_id not in dataset_ids:
        fail(f"metadata line {line_number}: unknown task_id {task_id}")

    failure_modes = entry["failure_modes"]
    if not isinstance(failure_modes, list) or not failure_modes:
        fail(f"metadata line {line_number}: failure_modes must be a non-empty list")

    unknown_modes = set(failure_modes) - ALLOWED_FAILURE_MODES
    if unknown_modes:
        fail(f"metadata line {line_number}: unknown failure modes {sorted(unknown_modes)}")

    provider_relevance = entry["provider_relevance"]
    if not isinstance(provider_relevance, list) or not provider_relevance:
        fail(f"metadata line {line_number}: provider_relevance must be a non-empty list")

    reviewer_note = entry["reviewer_note"]
    if not isinstance(reviewer_note, str) or len(reviewer_note.strip()) < 20:
        fail(f"metadata line {line_number}: reviewer_note is too short")


def main() -> None:
    if len(sys.argv) != 3:
        fail("usage: validate_metadata.py dataset/synthetic_tasks.jsonl metadata/task_failure_modes.jsonl")

    dataset_path = Path(sys.argv[1])
    metadata_path = Path(sys.argv[2])

    if not dataset_path.exists():
        fail(f"dataset not found: {dataset_path}")
    if not metadata_path.exists():
        fail(f"metadata not found: {metadata_path}")

    dataset_ids = load_dataset_ids(dataset_path)
    seen_ids: set[str] = set()
    count = 0

    with metadata_path.open("r", encoding="utf-8") as handle:
        for line_number, raw_line in enumerate(handle, start=1):
            line = raw_line.strip()
            if not line:
                continue
            try:
                entry = json.loads(line)
            except json.JSONDecodeError as exc:
                fail(f"metadata line {line_number}: invalid json: {exc}")
            validate_entry(entry, line_number, dataset_ids, seen_ids)
            count += 1

    missing_ids = dataset_ids - seen_ids
    if missing_ids:
        fail(f"metadata missing task ids: {sorted(missing_ids)}")

    print(f"OK: {count} metadata entries validated")


if __name__ == "__main__":
    main()
