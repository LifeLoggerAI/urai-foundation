# URAI Foundation Production Status

Date: 2026-06-30
Repository: `LifeLoggerAI/urai-foundation`
Status: DONE BUT NEEDS EXTERNAL ENV
Latest source hardening commit noted here: `c5af9613ba83d8c26ef3e661b90ce1565e12970c`

## What this repo is

URAI Foundation is a documentation-first, static public website and public-interest standards repository. It publishes formation-era governance, ethical AI, transparency, risk-review, accessibility, privacy, terms, contact, research-intent, and partner-interest pages.

## What this repo is not

This repo is not a backend app, account system, donation system, grant intake, partner database, CRM, analytics collector, clinical or therapy service, public program platform, or formal organization/legal-status proof source.

## Source-complete public routes

- `/`
- `/accessibility/`
- `/deaf-community/`
- `/emotional-wellness/`
- `/responsible-ai/`
- `/research/`
- `/partners/`
- `/contact/`
- `/privacy/`
- `/terms/`

## Feature truth table

| Feature | Status | Notes |
| --- | --- | --- |
| Static homepage | LIVE / VERIFIED IN SOURCE | `index.html` exists and links to real pages. |
| Required public routes | LIVE / VERIFIED IN SOURCE | All required route folders contain `index.html`. |
| Sitemap | LIVE / VERIFIED IN SOURCE | Includes homepage and required static routes. |
| Contact | LIVE / VERIFIED IN SOURCE | Mailto and GitHub Issues only. No backend form. |
| Privacy notice | LIVE / VERIFIED IN SOURCE | Static-site notice. No accounts/forms/persistence in this repo. |
| Terms notice | LIVE / VERIFIED IN SOURCE | Conservative documentation usage notice. |
| Route validation | LIVE / VERIFIED IN SOURCE | `scripts/validate-routes.py`; wording was patched after operator receipts exposed false-positive forbidden snippets. |
| Unit tests | LIVE / VERIFIED IN SOURCE | `tests/test_validate_docs.py`, `tests/test_validate_routes.py`, and `tests/test_smoke_live_routes.py`. |
| Live route smoke test | WIRED BUT NEEDS EXTERNAL VERIFICATION | `scripts/smoke-live-routes.py` checks homepage, all required routes, sitemap, and rejects wrong-host responses. |
| GitHub Actions checks | WIRED | Runs checks on push and pull request. |
| GitHub Pages Actions deploy | WIRED BUT NEEDS EXTERNAL VERIFICATION | `.github/workflows/pages.yml` validates then deploys static root via GitHub Pages Actions. |
| GitHub Pages static serving | WIRED | `.nojekyll` is present to disable Jekyll processing. |
| GitHub Pages custom domain | WIRED BUT NEEDS EXTERNAL VERIFICATION | `CNAME` contains `uraifoundation.org`. |
| Live domain DNS and HTTPS | NEEDS EXTERNAL ENV | Operator receipts show the live domain is still on the old host and must be moved to GitHub Pages. |
| Backend persistence | NOT PRESENT | No backend form, database, CRM, or API. |
| Donations/grants/programs | NOT PRESENT | Must not be claimed live. |
| Official partnerships | NOT PRESENT | Must not be claimed without evidence. |
| Clinical/therapy/medical services | DISABLED / NOT PRESENT | Must not be claimed. |

## Validation commands

Run from a normal clone with network access:

```bash
git pull --ff-only origin main
git rev-parse HEAD
make check
make verify-live
```

If `make` is unavailable, run the underlying commands directly:

```bash
python3 -m unittest discover -s tests
python3 scripts/validate-docs.py
python3 scripts/validate-routes.py
python3 scripts/verify-live-domain.py
python3 scripts/smoke-live-routes.py
```

`make check` runs:

```bash
python3 -m unittest discover -s tests
python3 scripts/validate-docs.py
python3 scripts/validate-routes.py
```

`make verify-live` runs:

```bash
python3 scripts/verify-live-domain.py
python3 scripts/smoke-live-routes.py
```

## Deployment target

- Static hosting target: GitHub Pages
- Deploy workflow: `.github/workflows/pages.yml`
- Source: branch `main`, root folder `/`
- Custom domain: `uraifoundation.org`
- Custom domain config file: `CNAME`
- Static serving marker: `.nojekyll`

## Remaining external blockers

1. Pull latest `main` after commit `c5af9613ba83d8c26ef3e661b90ce1565e12970c`.
2. Re-run source verification: `make check` or the direct Python commands above.
3. Confirm GitHub Pages is enabled for this repository.
4. Confirm GitHub Pages source/deployment mode allows GitHub Actions deploys, or intentionally use `main` root if Actions deploy is not selected.
5. Confirm custom domain is set to `uraifoundation.org` in GitHub Pages settings.
6. Replace old-host DNS records with GitHub Pages DNS records.
7. Enable/verify HTTPS.
8. Run `make verify-live` from an environment with normal GitHub and DNS access.
9. Record proof in `launch-proof/urai-foundation-production-lock/<timestamp>/`.

## Proof locations

- `launch-proof/urai-foundation-production-lock/2026-06-30T013000-0500/`
- `launch-proof/urai-foundation-production-lock/PROOF_TEMPLATE.md`
- `docs/final-live-cutover-runbook.md`
- GitHub issue: `#9 P0: Final live verification for URAI Foundation`

## Coordinator summary

`urai-foundation` is source-complete and production-safe after latest validation/test patches. Mark as DONE BUT NEEDS EXTERNAL ENV until the owner pulls latest, source checks pass, DNS is moved to GitHub Pages, HTTPS works, and `make verify-live` passes.
