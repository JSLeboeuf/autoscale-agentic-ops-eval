# Model Result Disclosure Policy

Status: provider-safe disclosure policy
External action: none

This policy governs how AutoScale AI records, discusses, submits, or publishes model results generated from this eval.

## Disclosure Principles

1. Synthetic inputs only.
2. No customer data.
3. No private HR, patient, inbox, billing, or credential material.
4. No hidden chain-of-thought disclosure.
5. No raw provider logs unless provider terms allow it.
6. No public model-result publication unless the relevant provider terms allow disclosure and JS approves the exact release.

## Result Labels

Use these labels consistently:

- `internal`: local run for AutoScale review only.
- `provider-safe sample`: small synthetic sample intended to show eval readiness.
- `provider-submitted`: shared privately with a provider or startup program.
- `public`: published in the public repository or public article.

The current provider sample run is:

```text
provider-safe sample
```

It is not:

```text
official benchmark
```

It is not:

```text
provider-certified result
```

It is not:

```text
restricted-model result
```

## Required Result Metadata

Every model-result file should include:

- model identifier as reported by the account or runner;
- run date in UTC;
- dataset version or commit reference;
- task IDs;
- scoring method;
- automatic fail count;
- known limitations;
- disclosure status.

## Provider-Specific Caution

OpenAI and Anthropic terms, preview agreements, and partner-program rules can restrict disclosure of model names, outputs, comparative results, or unpublished capabilities.

Before publishing or submitting results:

- verify the current terms for the exact program;
- keep restricted-access results private unless disclosure is explicitly allowed;
- prefer aggregate findings over raw outputs when terms are unclear;
- state sample size and limitations plainly.

## Acceptable Public Wording

Use:

> This is a small synthetic sample run that validates the eval harness and safety rubric. It is not an official OpenAI or Anthropic benchmark.

Use:

> The eval is designed to test approval-gated SMB workflows: no-send behavior, source grounding, privacy handling, bilingual output, and business prioritization.

Avoid:

> Model X beats Model Y.

Avoid:

> This proves provider-grade performance.

Avoid:

> Early-access model result.

## Minimum Publication Gate

Before a result becomes public:

- all validators pass;
- secret scan passes;
- sample size and limitations are stated;
- provider terms permit disclosure;
- JS approves the exact release text;
- no partnership or official endorsement is implied.

