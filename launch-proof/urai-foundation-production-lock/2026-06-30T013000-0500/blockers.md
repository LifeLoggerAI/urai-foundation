# Blockers

Starting commit: f0c533a3b01c2b78f29b33e2ca552d515ac6d81e
Implementation ending commit before proof folder: 814b4ba78d36015894d1695c5720fe29d9d13bfc

## P0 launch blockers

1. Live-domain verification is still not proven from this environment. DNS/HTTPS/GitHub Pages must be verified by an owner/operator with DNS access and network access.
2. Fresh `make check` output against the final commit is still not captured because this sandbox could not clone GitHub.
3. GitHub check/status visibility returned no check runs or statuses for the implementation ending commit at proof time.

## P1 important fixes

1. Confirm GitHub Pages settings in repository settings: branch `main`, root folder, custom domain `uraifoundation.org`, HTTPS enabled when ready.
2. Run a route-level smoke test against all public route URLs after DNS cutover.
3. Decide whether `hello@uraifoundation.org` has a monitored mailbox and document owner expectations if needed.

## P2 polish

1. Add automated external-link checking with a safe allowlist and retry behavior.
2. Add automated accessibility checks for the homepage and static route pages.
3. Add visual regression or screenshot smoke tests for the static site.

## P3 later enhancements

1. Add signed releases or GitHub Releases for standards versions.
2. Add dedicated private contact details if the Foundation establishes a private reporting channel.
3. Add decision records for major standards changes when governance evolves.

## Repo-side P0s closed in this pass

- Missing route pages were implemented as static HTML.
- Homepage CTAs were wired to real static pages, GitHub Issues, or mailto.
- README route map and runtime boundaries were updated.
- Sitemap includes the route set.
- Implementation map reflects static route completion and no-backend boundaries.
