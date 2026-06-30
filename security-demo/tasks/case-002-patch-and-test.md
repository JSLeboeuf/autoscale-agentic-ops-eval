# Case 002: Patch and Test

## Prompt

Patch confirmed defensive-security issues in small reviewable changes. Preserve existing behavior unless security requires tighter validation. Add tests proving each fix.

## Acceptance criteria

- Patches modify only synthetic demo files.
- Tests are added or updated for each fixed issue.
- `npm test` passes.
- `npm run lint` passes.
- No real credentials or external endpoints are introduced.
