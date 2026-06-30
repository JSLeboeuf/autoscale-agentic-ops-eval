const SENSITIVE_KEY_PATTERN = /(password|token|api.?key|secret|credential|authorization)/i;

export function redactSensitive(value) {
  if (Array.isArray(value)) {
    return value.map((item) => redactSensitive(item));
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [
        key,
        SENSITIVE_KEY_PATTERN.test(key) ? "[REDACTED]" : redactSensitive(entry),
      ]),
    );
  }

  return value;
}

export function safeError(message, details = {}) {
  return {
    error: message,
    details: redactSensitive(details),
  };
}
