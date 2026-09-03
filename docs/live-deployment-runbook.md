# Live Deployment and Rollback Runbook

Status: formation-stage operator runbook
Last reviewed: 2026-07-06

## Governing rule

Read `docs/canonical-production-truth.md` first. Do not change DNS or call the custom-domain site verified until the owner has selected one canonical host and the exact release evidence gate passes.

Current conflict:

- repository configuration supports GitHub Pages;
- issue #10 reports a Firebase Hosting fallback;
- current custom-domain DNS/TLS destination is not proven at the current source SHA.

This runbook does not authorize DNS, provider, billing, account, or production changes.

## 1. Select the canonical provider

Record a decision with:

- selected provider;
- reason;
- provider project/site/environment;
- source repository/branch;
- preview strategy;
- deployment authority;
- DNS owner;
- rollback method;
- treatment of the non-selected provider;
- cost and maintenance implications.

### GitHub Pages option

Use the repository `Check` workflow and the allowlisted `_site` artifact built by `scripts/build-public-site.py`. Confirm repository Pages settings use GitHub Actions and the `github-pages` environment.

### Firebase Hosting option

Before selection, add reviewed `firebase.json`, `.firebaserc` or target mapping, a curated public directory, preview channels, deployment workflow, ownership/access evidence, and rollback procedure. Disable competing Pages deployment.

## 2. Protect unrelated DNS and email

Before any cutover, export and review all DNS records, including:

- apex and `www`;
- MX;
- SPF, DKIM, DMARC;
- verification TXT records;
- subdomains;
- redirects;
- CAA and DNSSEC status.

Change only records required for the website. Do not remove mail or verification records. Record old values and TTLs for rollback.

## 3. Prepare the release SHA

```bash
git checkout main
git pull --ff-only origin main
git rev-parse HEAD
make check
python3 scripts/build-public-site.py --source-sha "$(git rev-parse HEAD)"
```

Inspect `_site/public-build-manifest.json` and verify that the artifact excludes:

- `docs/audits/`;
- `docs/foundation/` advisor/operational planning;
- `launch-proof/`;
- tests, scripts, workflows, and repository administration files;
- confidential or private records.

The GitHub repository remains public; the artifact boundary controls the website deployment, not repository visibility.

## 4. Record rollback before deployment

Record:

- current deployed SHA, if known;
- current provider release/version/channel;
- previous artifact or release identifier;
- current DNS records and TTL;
- rollback command/process;
- person/role authorized to trigger rollback;
- maximum acceptable outage or degraded period;
- conditions requiring immediate rollback.

If no current deployed SHA can be established, state `unknown` and do not invent one. Preserve the last known good provider artifact as the rollback target.

## 5. Deploy without custom-domain cutover

Deploy first to the provider URL or preview environment. Record:

- source SHA;
- workflow/deployment ID;
- provider project/site;
- artifact digest/manifest;
- timestamp;
- operator/approver role;
- provider URL.

Smoke-test:

```text
/
/accessibility/
/deaf-community/
/emotional-wellness/
/responsible-ai/
/research/
/partners/
/contact/
/privacy/
/terms/
/community/
/donate/ (verify donations remain disabled)
/staff/ (verify authentication remains disabled until configured)
/grants/ (verify publicly accessible, noindex demonstration boundary; no authenticated protection is active)
/robots.txt
/sitemap.xml
/site.webmanifest
/public-build-manifest.json
/standards/registry.json
```

Verify expected Foundation content markers and ensure no old-host or wrong-site content is returned.

## 6. Verify metadata and accessibility smoke

Check:

- title and description;
- canonical URL;
- Open Graph/Twitter metadata;
- favicon/manifest;
- robots/sitemap;
- keyboard navigation and visible focus;
- skip link;
- reduced-motion behavior;
- mobile and desktop reflow;
- no obvious contrast or landmark regression.

This smoke test is not WCAG conformance.

## 7. Cut over the custom domain

Only after provider URL verification:

1. Lower TTL in advance when possible.
2. Change only apex/`www` website records required by the chosen provider.
3. Preserve email and verification records.
4. Configure both apex and `www` behavior.
5. Confirm provider domain ownership.
6. Wait for TLS issuance/validation.
7. Verify DNS from more than one resolver where practical.
8. Verify HTTP-to-HTTPS and `www`/apex canonical redirects.
9. Re-run all route, marker, metadata, and accessibility smoke checks.

Do not hard-code provider IPs in the permanent truth record unless the selected provider requires them and the record is dated.

## 8. Production evidence record

Create:

```text
launch-proof/urai-foundation-production-lock/<timestamp>/
```

Include:

- decision record;
- source SHA;
- green checks;
- artifact manifest/digest;
- provider deployment receipt;
- deployed SHA;
- prior rollback SHA/release;
- DNS before/after;
- TLS/HTTPS proof;
- route and content-marker results;
- metadata/accessibility smoke results;
- known exceptions and expiry;
- approval;
- rollback procedure.

Do not put secrets, private DNS-account information, personal data, or confidential security details in the public proof directory.

## 9. Rollback triggers

Rollback or disable the affected surface when:

- wrong content or wrong repository is served;
- required routes fail materially;
- TLS or domain routing is unsafe;
- unsupported legal/program/partner/research/certification/clinical claims appear;
- private or operational files are exposed in the website artifact;
- critical accessibility regression blocks use;
- security/privacy incident requires containment;
- deployed artifact cannot be tied to the approved SHA.

## 10. Rollback procedure

1. Announce the rollback decision in the release/incident record.
2. Re-deploy the last known good artifact or provider release.
3. If provider rollback fails and domain service must be restored, revert only the website DNS records to the documented prior values.
4. Verify HTTPS and all required routes.
5. Preserve logs and evidence.
6. Open or update an incident/follow-up issue.
7. Do not erase the failed release record.
8. Reassess before retrying.

## 11. Completion rule

The custom-domain release is **VERIFIED COMPLETE** only when:

- one canonical provider is documented;
- release SHA passes required checks;
- curated artifact is inspected;
- deployed and prior rollback SHAs/releases are recorded;
- apex and `www` DNS are correct;
- HTTPS is valid;
- all required routes and content markers pass;
- metadata/crawl files pass;
- no unsupported claim or sensitive artifact is exposed;
- private security reporting remains available;
- the evidence record is complete.
