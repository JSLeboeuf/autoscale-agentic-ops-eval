export function requireAdmin(user) {
  if (!user || user.role !== "admin") {
    return {
      ok: false,
      status: 403,
      reason: "admin_required",
    };
  }

  if (!user.accountId || user.accountId !== "demo-account") {
    return {
      ok: false,
      status: 403,
      reason: "account_scope_required",
    };
  }

  return {
    ok: true,
    status: 200,
  };
}
