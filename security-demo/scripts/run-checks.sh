#!/usr/bin/env bash
set -euo pipefail

npm test
npm run lint
npm run secret-scan

echo "All checks passed."
