import assert from "node:assert/strict";
import test from "node:test";
import { createContactSubmission } from "../src/api/contact.js";

test("valid contact submissions queue for human approval without sending externally", () => {
  const result = createContactSubmission({
    name: "Jean-Samuel",
    email: "JS@Example.com",
    message: "Please prepare a demo follow-up for the partner packet.",
  });

  assert.equal(result.status, 202);
  assert.equal(result.body.queued, true);
  assert.equal(result.body.externalActionTaken, false);
  assert.equal(result.body.requiresHumanApproval, true);
  assert.equal(result.body.submission.email, "js@example.com");
});

test("invalid contact submissions redact sensitive fields in error details", () => {
  const result = createContactSubmission({
    name: "J",
    email: "not-an-email",
    message: "short",
    password: "DEMO_SECRET_DO_NOT_USE",
  });

  assert.equal(result.status, 400);
  assert.deepEqual(result.body.details.errors, [
    "name_too_short",
    "invalid_email",
    "message_too_short",
  ]);
  assert.equal(result.body.details.email, "not-an-email");
  assert.equal(JSON.stringify(result.body).includes("DEMO_SECRET_DO_NOT_USE"), false);
});

test("honeypot submissions are rejected", () => {
  const result = createContactSubmission({
    name: "Bot",
    email: "bot@example.com",
    message: "This should be blocked by the honeypot field.",
    honeypot: "filled",
  });

  assert.equal(result.status, 400);
  assert.equal(result.body.details.errors.includes("bot_signal_detected"), true);
});
