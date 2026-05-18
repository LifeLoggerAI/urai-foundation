# Live Deployment Runbook

This runbook is the operational checklist for moving `uraifoundation.org` from the current Squarespace routing to the GitHub Pages site in this repository.

## Current deployment model

- Site source: `LifeLoggerAI/urai-foundation`
- Static site files: repository root
- Custom domain file: `CNAME`
- Domain: `uraifoundation.org`
- Target host: GitHub Pages

## Preflight

Run from the repository root:

```bash
git pull origin main
python3 -m unittest discover -s tests
python3 scripts/validate-docs.py
```

Optional live-domain check:

```bash
python3 scripts/verify-live-domain.py
```

The live-domain check is expected to fail until DNS no longer points to Squarespace.

## DNS cutover

In the DNS manager for `uraifoundation.org`, delete these Squarespace records:

```text
A     @     198.49.23.144
A     @     198.49.23.145
A     @     198.185.159.144
A     @     198.185.159.145
CNAME www   ext-sq.squarespace.com
```

Add these GitHub Pages records:

```text
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
CNAME www   lifeloggerai.github.io
```

Use the lowest TTL the DNS provider allows during cutover. Raise TTL later after verification is stable.

## GitHub Pages settings

In GitHub:

1. Open `LifeLoggerAI/urai-foundation`.
2. Go to Settings -> Pages.
3. Set source to the branch/folder that serves the repository root, usually `main` and `/root`.
4. Set the custom domain to:

```text
uraifoundation.org
```

5. Wait for GitHub to verify DNS.
6. Enable Enforce HTTPS when available.

## Verification

Run:

```bash
python3 scripts/verify-live-domain.py
```

Manual verification:

```bash
dig uraifoundation.org +short
dig www.uraifoundation.org +short
curl -I https://uraifoundation.org/
curl -I https://uraifoundation.org/favicon.svg
curl -I https://uraifoundation.org/site.webmanifest
curl -I https://uraifoundation.org/sitemap.xml
```

Expected result:

- Apex resolves to GitHub Pages IPs.
- `www` resolves to `lifeloggerai.github.io` or GitHub Pages infrastructure.
- HTTP headers do not show `server: Squarespace`.
- `/` returns `200`.
- `/sitemap.xml` returns `200`.

## Completion criteria

The Foundation site is live only when all are true:

- Repository checks pass.
- GitHub Pages custom domain is configured.
- HTTPS is enforced or pending only because GitHub is issuing the certificate.
- `python3 scripts/verify-live-domain.py` passes.
- `curl -I https://uraifoundation.org/` no longer shows Squarespace.
- `curl -I https://uraifoundation.org/sitemap.xml` returns `200`.

## Rollback

If the GitHub Pages deployment fails after DNS cutover:

1. Keep repository checks intact.
2. Confirm GitHub Pages source and custom domain settings.
3. If the site must temporarily return to Squarespace, restore the previous Squarespace DNS records.
4. Document the rollback in `CHANGELOG.md` and open a follow-up issue.
