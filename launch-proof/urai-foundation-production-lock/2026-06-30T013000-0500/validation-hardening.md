# Validation Hardening Proof

Added after the initial DONE-DONE proof because repo access can still improve source-side verification.

## New validation script

File: `scripts/validate-routes.py`

Purpose:

- Confirms every required static route file exists.
- Confirms every route includes formation-era boundary language.
- Checks for unsupported high-risk public claim snippets.
- Confirms every required route appears in `sitemap.xml`.

## Required routes validated

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

## Makefile lifecycle update

`make check` now runs:

```bash
python3 -m unittest discover -s tests
python3 scripts/validate-docs.py
python3 scripts/validate-routes.py
```

## GitHub Actions update

`.github/workflows/check.yml` now runs `make check` and then the route validator on push to `main` and pull requests.

## New commits

- `375ac79d3f63974a637ef9d750de9acddfe06ad3` — add route validation script.
- `c2ec6064d8f8fcfb820c503afd3a16787e92133b` — add route validation to Makefile check lifecycle.
- `33c1d048b9be98ac355d53eba3bc0641acbf6a54` — strengthen GitHub Actions validation workflow.

## Remaining proof boundary

The source-side validation is committed. I still cannot truthfully mark the check as passed from this environment because local clone is blocked by network name resolution, and the available GitHub workflow lookup only exposes PR-associated runs, not direct push runs.
