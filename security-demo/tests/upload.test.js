import assert from "node:assert/strict";
import test from "node:test";
import { validateUpload } from "../src/api/upload.js";

test("safe uploads are accepted for review but not stored automatically", () => {
  const result = validateUpload({
    originalName: "partner-one-pager.pdf",
    mimeType: "application/pdf",
    size: 120_000,
  });

  assert.equal(result.ok, true);
  assert.equal(result.status, 202);
  assert.equal(result.body.accepted, true);
  assert.equal(result.body.stored, false);
  assert.equal(result.body.requiresHumanApproval, true);
});

test("path traversal filenames are rejected", () => {
  const result = validateUpload({
    originalName: "../private.env",
    mimeType: "application/pdf",
    size: 100,
  });

  assert.equal(result.ok, false);
  assert.equal(result.status, 400);
  assert.equal(result.body.details.errors.includes("unsafe_filename"), true);
});

test("dangerous mime and extension combinations are rejected", () => {
  const result = validateUpload({
    originalName: "invoice.svg",
    mimeType: "image/svg+xml",
    size: 10_000,
  });

  assert.equal(result.ok, false);
  assert.equal(result.body.details.errors.includes("unsupported_extension"), true);
  assert.equal(result.body.details.errors.includes("unsupported_mime_type"), true);
});

test("oversized uploads are rejected", () => {
  const result = validateUpload({
    originalName: "large.pdf",
    mimeType: "application/pdf",
    size: 10 * 1024 * 1024,
  });

  assert.equal(result.ok, false);
  assert.equal(result.body.details.errors.includes("invalid_size"), true);
});
