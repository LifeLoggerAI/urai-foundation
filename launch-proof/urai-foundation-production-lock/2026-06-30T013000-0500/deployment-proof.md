# Deployment Proof

Starting commit: f0c533a3b01c2b78f29b33e2ca552d515ac6d81e
Implementation ending commit before proof folder: 814b4ba78d36015894d1695c5720fe29d9d13bfc

## Repository deployment config

- Repository: `LifeLoggerAI/urai-foundation`
- Default branch: `main`
- Visibility: public
- Custom domain file: `CNAME`
- `CNAME` value: `uraifoundation.org`
- Static site source files: repository root plus route folders.

## Live verification attempted

The web open attempt for `https://uraifoundation.org/` returned a fetch/cache failure from the browser tool rather than page content.

The sandbox DNS test returned temporary DNS resolution failures for:

- `uraifoundation.org`
- `www.uraifoundation.org`
- `lifeloggerai.github.io`

Because the environment could not resolve these hosts, live deployment cannot be marked verified from this run.

## Required DNS records for GitHub Pages

Apex records:

```text
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
```

WWW record:

```text
CNAME www   lifeloggerai.github.io
```

Remove old Squarespace records if still present:

```text
A     @     198.49.23.144
A     @     198.49.23.145
A     @     198.185.159.144
A     @     198.185.159.145
CNAME www   ext-sq.squarespace.com
```

## Required GitHub Pages settings

1. Open repository settings for `LifeLoggerAI/urai-foundation`.
2. Enable GitHub Pages for branch `main` and repository root.
3. Set custom domain to `uraifoundation.org`.
4. Wait for GitHub domain verification.
5. Enable HTTPS enforcement when available.

## Proof commands for owner/operator

Run after DNS cutover:

```bash
dig uraifoundation.org +short
dig www.uraifoundation.org +short
curl -I https://uraifoundation.org/
curl -I https://uraifoundation.org/accessibility/
curl -I https://uraifoundation.org/deaf-community/
curl -I https://uraifoundation.org/emotional-wellness/
curl -I https://uraifoundation.org/responsible-ai/
curl -I https://uraifoundation.org/research/
curl -I https://uraifoundation.org/partners/
curl -I https://uraifoundation.org/contact/
curl -I https://uraifoundation.org/privacy/
curl -I https://uraifoundation.org/terms/
curl -I https://uraifoundation.org/sitemap.xml
python3 scripts/verify-live-domain.py
```

Success criteria:

- Apex returns GitHub Pages IPs.
- `www` resolves through GitHub Pages.
- HTTPS works.
- Responses are not served by Squarespace.
- `/` and `/sitemap.xml` return `200`.
- Route pages return `200` or a GitHub Pages equivalent success response.
- `python3 scripts/verify-live-domain.py` passes.
