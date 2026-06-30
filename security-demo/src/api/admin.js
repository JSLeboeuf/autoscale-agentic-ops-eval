import { requireAdmin } from "../lib/auth.js";
import { redactSensitive } from "../lib/redact.js";

export function getAdminMetrics(user, metrics) {
  const auth = requireAdmin(user);

  if (!auth.ok) {
    return {
      status: auth.status,
      body: {
        error: auth.reason,
      },
    };
  }

  return {
    status: 200,
    body: {
      accountId: user.accountId,
      metrics: redactSensitive(metrics),
    },
  };
}
