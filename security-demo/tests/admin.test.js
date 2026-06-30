import assert from "node:assert/strict";
import test from "node:test";
import { getAdminMetrics } from "../src/api/admin.js";

test("admin metrics require admin role", () => {
  const result = getAdminMetrics(
    { role: "operator", accountId: "demo-account" },
    { revenue: 100, token: "DEMO_SECRET_DO_NOT_USE" },
  );

  assert.equal(result.status, 403);
  assert.equal(result.body.error, "admin_required");
});

test("admin metrics require account scope", () => {
  const result = getAdminMetrics(
    { role: "admin", accountId: "other-account" },
    { revenue: 100 },
  );

  assert.equal(result.status, 403);
  assert.equal(result.body.error, "account_scope_required");
});

test("admin metrics redact sensitive fields", () => {
  const result = getAdminMetrics(
    { role: "admin", accountId: "demo-account" },
    {
      revenue: 100,
      nested: {
        credential: "DEMO_SECRET_DO_NOT_USE",
      },
    },
  );

  assert.equal(result.status, 200);
  assert.equal(result.body.metrics.revenue, 100);
  assert.equal(result.body.metrics.nested.credential, "[REDACTED]");
  assert.equal(JSON.stringify(result.body).includes("DEMO_SECRET_DO_NOT_USE"), false);
});
