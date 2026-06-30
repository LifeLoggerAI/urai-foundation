# Completion Plan

Starting commit: f0c533a3b01c2b78f29b33e2ca552d515ac6d81e
Implementation ending commit before proof folder: 814b4ba78d36015894d1695c5720fe29d9d13bfc

## Completed in repository

1. Added all required static route pages.
2. Updated homepage CTAs and navigation.
3. Updated sitemap.
4. Updated README route map and no-backend runtime boundary.
5. Updated implementation map.
6. Added production-lock proof folder.

## Required external completion actions

1. Pull latest `main` locally.
2. Run `make check` and capture output.
3. Confirm GitHub Pages source is `main` and root.
4. Configure custom domain `uraifoundation.org` in GitHub Pages settings.
5. Update DNS records away from Squarespace and toward GitHub Pages.
6. Wait for propagation and HTTPS issuance.
7. Run `python3 scripts/verify-live-domain.py`.
8. Smoke-test all route URLs.
9. Record passing outputs in a new proof file or append to this proof folder.

## Done-done definition

The Foundation can be called READY only when all are true:

- `make check` passes on the final commit.
- GitHub Pages is configured and serving the repository.
- `uraifoundation.org` resolves to GitHub Pages and no longer serves Squarespace.
- HTTPS works.
- `/`, all nine route pages, and `/sitemap.xml` return successful responses.
- No unsupported public claims are introduced.

Until then, the repo is source-complete but launch-blocked by verification outside this execution environment.
