import { safeError } from "../lib/redact.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE_LENGTH = 2000;

export function validateContactSubmission(input) {
  const errors = [];
  const normalized = {
    name: String(input?.name ?? "").trim(),
    email: String(input?.email ?? "").trim().toLowerCase(),
    message: String(input?.message ?? "").trim(),
    honeypot: String(input?.honeypot ?? "").trim(),
  };

  if (normalized.honeypot) {
    errors.push("bot_signal_detected");
  }

  if (normalized.name.length < 2) {
    errors.push("name_too_short");
  }

  if (!EMAIL_PATTERN.test(normalized.email)) {
    errors.push("invalid_email");
  }

  if (normalized.message.length < 10) {
    errors.push("message_too_short");
  }

  if (normalized.message.length > MAX_MESSAGE_LENGTH) {
    errors.push("message_too_long");
  }

  return {
    ok: errors.length === 0,
    errors,
    normalized,
  };
}

export function createContactSubmission(input) {
  const validation = validateContactSubmission(input);

  if (!validation.ok) {
    return {
      status: 400,
      body: safeError("Invalid contact submission", {
        errors: validation.errors,
        email: validation.normalized.email,
      }),
    };
  }

  return {
    status: 202,
    body: {
      queued: true,
      externalActionTaken: false,
      requiresHumanApproval: true,
      submission: validation.normalized,
    },
  };
}
