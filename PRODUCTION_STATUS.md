# URAI Foundation Production Status

Date: 2026-06-30
Repository: `LifeLoggerAI/urai-foundation`
Status: DONE BUT NEEDS EXTERNAL ENV
Latest source hardening commit noted here: `1c2d0ae4714581e8104384f5d50efe0777b36f8e`

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
| Route validation | LIVE / VERIFIED IN SOURCE | `scripts/validate-routes.py`. |
| Unit tests | LIVE / VERIFIED IN SOURCE | `tests/test_validate_docs.py` and `tests/test_validate_routes.py`. |
| GitHub Actions | WIRED | Runs checks on push and pull request. |
| GitHub Pages static serving | WIRED | `.nojekyll` is present to disable Jekyll processing. |
| GitHub Pages custom domain | WIRED BUT NEEDS EXTERNAL VERIFICATION | `CNAME` contains `uraifoundation.org`. |
| Live domain DNS and HTTPS | NEEDS EXTERNAL ENV | Must be verified from DNS provider/GitHub Pages. |
| Backend persistence | NOT PRESENT | No backend form, database, CRM, or API. |
| Donations/grants/programs | NOT PRESENT | Must not be claimed live. |
| Official partnerships | NOT PRESENT | Must not be claimed without evidence. |
| Clinical/therapy/medical services | DISABLED / NOT PRESENT | Must not be claimed. |

## Validation commands

Run from a normal clone with network access:

```bash
git clone https://github.com/LifeLoggerAI/urai-foundation.git
cd urai-foundation
git rev-parse HEAD
make check
python3 scripts/verify-live-domain.py
```

`make check` runs:

```bash
python3 -m unittest discover -s tests
python3 scripts/validate-docs.py
python3 scripts/validate-routes.py
```

## Deployment target

- Static hosting target: GitHub Pages
- Source: branch `main`, root folder `/`
- Custom domain: `uraifoundation.org`
- Custom domain config file: `CNAME`
- Static serving marker: `.nojekyll`

## Remaining external blockers

1. Confirm GitHub Pages source is `main` and root.
2. Confirm custom domain is set to `uraifoundation.org` in GitHub Pages settings.
3. Configure DNS to GitHub Pages records.
4. Enable/verify HTTPS.
5. Run `make check` and `python3 scripts/verify-live-domain.py` from an environment with normal GitHub and DNS access.
6. Smoke-test all required public routes over HTTPS.
7. Record proof in `launch-proof/urai-foundation-production-lock/<timestamp>/`.

## Proof locations

- `launch-proof/urai-foundation-production-lock/2026-06-30T013000-0500/`
- `docs/final-live-cutover-runbook.md`
- GitHub issue: `#9 P0: Final live verification for URAI Foundation`

## Coordinator summary

`urai-foundation` is source-complete and production-safe for its static Foundation standards surface. Mark as DONE BUT NEEDS EXTERNAL ENV until DNS/GitHub Pages/HTTPS and final live smoke-test receipts are captured.
