# Final Live Cutover Runbook

This runbook is the final operator checklist for moving URAI Foundation from source-complete to live-verified.

## Current source status

The repository is source-complete for the static formation-era public standards site:

- Homepage: `/`
- Required static routes:
  - `/accessibility/`
  - `/deaf-community/`
  - `/emotional-wellness/`
  - `/responsible-ai/`
  - `/research/`
  - `/partners/`
  - `/contact/`
  - `/privacy/`
  - `/terms/`
- Route validation: `scripts/validate-routes.py`
- Full local lifecycle: `make check`
- Custom domain file: `CNAME` with `uraifoundation.org`

## Step 1: Pull and validate source

Run from a normal terminal with GitHub access:

```bash
git clone https://github.com/LifeLoggerAI/urai-foundation.git
cd urai-foundation
git rev-parse HEAD
make check
```

Expected result:

```text
Route validation passed for 10 required routes.
```

Also run:

```bash
python3 scripts/validate-routes.py
python3 scripts/validate-docs.py
python3 -m unittest discover -s tests
```

## Step 2: Configure GitHub Pages

In GitHub repository settings for `LifeLoggerAI/urai-foundation`:

1. Open Settings.
2. Open Pages.
3. Set source to deploy from branch.
4. Select branch `main`.
5. Select folder `/` root.
6. Set custom domain to `uraifoundation.org`.
7. Save.
8. Wait for Pages to build.
9. Enable HTTPS when GitHub allows it.

## Step 3: Configure DNS

At the DNS provider for `uraifoundation.org`, remove old Squarespace records if present:

```text
A     @     198.49.23.144
A     @     198.49.23.145
A     @     198.185.159.144
A     @     198.185.159.145
CNAME www   ext-sq.squarespace.com
```

Add GitHub Pages records:

```text
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
CNAME www   lifeloggerai.github.io
```

Do not mark live until DNS has propagated and HTTPS works.

## Step 4: Verify DNS and HTTPS

Run:

```bash
dig uraifoundation.org +short
dig www.uraifoundation.org +short
curl -I https://uraifoundation.org/
curl -I https://uraifoundation.org/sitemap.xml
python3 scripts/verify-live-domain.py
```

Success means:

- Apex returns only GitHub Pages IPs.
- `www` resolves through GitHub Pages.
- HTTPS works.
- Response headers do not indicate Squarespace.
- `python3 scripts/verify-live-domain.py` exits successfully.

## Step 5: Smoke-test required routes

Run:

```bash
for path in / /accessibility/ /deaf-community/ /emotional-wellness/ /responsible-ai/ /research/ /partners/ /contact/ /privacy/ /terms/ /sitemap.xml; do
  echo "== $path =="
  curl -fsSI "https://uraifoundation.org$path" | head -n 1
done
```

Each path should return a successful HTTP status.

## Step 6: Capture launch proof

Create or update a proof file under:

```text
launch-proof/urai-foundation-production-lock/<timestamp>/
```

Include:

- Final commit SHA from `git rev-parse HEAD`.
- `make check` output.
- DNS `dig` output.
- HTTPS `curl -I` output.
- `python3 scripts/verify-live-domain.py` output.
- Route smoke-test output.
- GitHub Pages settings screenshot or text summary.

## READY rule

URAI Foundation is READY only when:

- `make check` passes.
- GitHub Pages is serving the repository from `main` root.
- `uraifoundation.org` resolves to GitHub Pages.
- HTTPS works.
- All required static routes respond successfully.
- No unsupported claims are introduced.
