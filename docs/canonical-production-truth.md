# Canonical Production Truth

Status: formation-stage production decision record
Last reviewed: 2026-07-06

## Purpose

This document prevents source readiness, fallback hosting, custom-domain routing, and legal/organizational status from being collapsed into one unsupported claim.

## Canonical source

- Repository: `LifeLoggerAI/urai-foundation`
- Canonical branch: `main`
- Public-site source: repository static HTML/CSS/assets and the required route directories
- Public standards source: reviewed documents under `docs/` and the machine-readable draft registry under `standards/`
- Current audit-start head: `a8fb209f02d81ad59e7ab9cac90ad503a0dcc0ea`

A newer SHA becomes canonical only after it is merged to `main`. A production SHA becomes verified only after deployment evidence names that exact SHA.

## Hosting evidence

### GitHub Pages

Repository evidence:

- `CNAME` contains `uraifoundation.org`.
- `.github/workflows/pages.yml` defines a Pages deployment.
- `.nojekyll` exists.
- deployment runbooks describe GitHub Pages.

Classification: **IMPLEMENTED, NOT VERIFIED**.

The repository does not by itself prove that Pages is enabled, that the environment is approved, that the latest workflow completed, or that the custom domain is serving that artifact.

### Firebase Hosting fallback

Issue #10 reports:

- Firebase project: `urai-4dc1d`
- Hosting site ID: `urai-foundation`
- Fallback URL: `https://urai-foundation.web.app`
- A successful operator smoke receipt dated 2026-06-30

Classification: **IMPLEMENTED, NOT VERIFIED FROM REPOSITORY SOURCE**.

This repository now contains `firebase.json` for the Foundation staff Functions codebase and Firestore rules/indexes only. It contains no `.firebaserc`, project mapping, Hosting target, or Hosting deployment workflow. Therefore the reported Hosting fallback remains unreproducible and must not silently become canonical; the staff backend also remains unconfigured and undeployed until its protected project authority is verified.

### Legacy or current DNS target

Older runbooks say the domain was routed to Squarespace. A later issue says DNS still needed to move toward the chosen live host. No exact-current DNS and TLS receipt tied to the audit-start head was found in the repository.

Classification: **BLOCKED / CURRENT DESTINATION UNVERIFIED**.

## Proposed canonical deployment decision

For this documentation-first public repository, the recommended canonical production architecture is:

1. GitHub repository `main` is the source of truth.
2. Required checks pass on the release SHA.
3. A curated `_site` artifact is built from an explicit allowlist.
4. GitHub Pages deploys that artifact.
5. The `github-pages` environment records the deployment URL and SHA.
6. `uraifoundation.org` and `www.uraifoundation.org` route to the same canonical site.
7. A release evidence record stores deployed SHA, prior rollback SHA, DNS/TLS proof, route smoke output, and operator approval.
8. The Firebase fallback remains temporary until the custom domain is stable, then is either documented as an emergency fallback or decommissioned.

Why this is recommended:

- no additional hosting runtime is required;
- source, checks, deployment, and public history remain in one public repository;
- a static standards site does not currently need Firebase services;
- GitHub Pages is already the architecture encoded in the repository;
- the Firebase fallback is not reproducible from repository configuration.

This recommendation is not a DNS change and is not a production cutover. The owner must approve the hosting decision before external changes.

## Alternative: make Firebase canonical

Firebase may be selected instead, but only after the repository adds:

- `firebase.json` and `.firebaserc` or a documented target mapping;
- an explicit public artifact directory;
- a reviewed deployment workflow;
- preview channels;
- project/site ownership and access evidence;
- exact deployed and rollback SHA records;
- custom-domain and TLS proof;
- a decision to remove or disable competing Pages deployment.

## Required production record

Every production deployment must record:

```text
release_id:
repository:
branch:
source_sha:
prior_rollback_sha:
provider:
provider_project_or_site:
artifact_digest:
deployed_at_utc:
deployed_by:
custom_domain:
www_domain:
tls_result:
route_smoke_result:
metadata_result:
accessibility_smoke_result:
workflow_run:
rollback_command_or_procedure:
known_exceptions:
approval:
```

## Current verified values

| Field | Value | Status |
| --- | --- | --- |
| Repository | `LifeLoggerAI/urai-foundation` | VERIFIED COMPLETE |
| Branch | `main` | VERIFIED COMPLETE |
| Audit-start head | `a8fb209f02d81ad59e7ab9cac90ad503a0dcc0ea` | VERIFIED COMPLETE |
| Intended custom domain | `uraifoundation.org` | VERIFIED IN SOURCE |
| Exact current deployed SHA | Unknown | MISSING |
| Exact current rollback SHA | Unknown | MISSING |
| Canonical hosting provider | Decision pending | BLOCKED |
| Current DNS provider | Not evidenced in authorized repository/Drive materials | MISSING |
| Current DNS destination | Not independently verified | BLOCKED |
| Current HTTPS/custom-domain status | Not independently verified | BLOCKED |
| Firebase fallback project/site | Reported in issue #10 | IMPLEMENTED, NOT VERIFIED |
| GitHub Pages environment | Workflow declares it | IMPLEMENTED, NOT VERIFIED |

## Launch gate

Do not label the custom-domain site **VERIFIED COMPLETE** until all of the following are attached to one release record:

- canonical host decision;
- green required checks on the release SHA;
- successful curated artifact build;
- successful provider deployment tied to the SHA;
- prior rollback SHA;
- apex and `www` DNS proof;
- valid HTTPS;
- all required routes and crawl files return success;
- response content contains the expected Foundation marker;
- metadata and canonical URLs point to the custom domain;
- no unsupported legal, program, partner, certification, research, or clinical claim is present.
