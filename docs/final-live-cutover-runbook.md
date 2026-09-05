# Final Live Cutover Checklist

Status: blocked pending canonical hosting decision
Last reviewed: 2026-09-05

Use the full [Live Deployment and Rollback Runbook](live-deployment-runbook.md) and [Canonical Production Truth](canonical-production-truth.md).

This checklist intentionally does not prescribe GitHub Pages DNS records or Firebase records until the owner selects the canonical provider. Historical Squarespace records and the Firebase fallback report must be verified rather than assumed current.

## Source and review

- [ ] Confirm `LifeLoggerAI/urai-foundation` and `main` are canonical.
- [ ] Record exact release SHA.
- [ ] Confirm draft PR/review requirements are satisfied.
- [ ] Run `make check` at the exact release SHA.
- [ ] Inspect the `_site` artifact and `public-build-manifest.json`.
- [ ] Confirm no internal, operational, confidential, or sensitive material is in the website artifact.

## Hosting decision

- [ ] Select GitHub Pages or Firebase Hosting as canonical.
- [ ] Record provider project/site/environment.
- [ ] Record deployment authority and owner approval.
- [ ] Disable or clearly classify competing deployment automation.
- [ ] Confirm preview and rollback mechanisms.

## Release and rollback

- [ ] Deploy to provider URL before DNS cutover.
- [ ] Record provider deployment receipt and exact deployed SHA.
- [ ] Record prior rollback SHA/release and rollback procedure.
- [ ] Verify all required routes, crawl files, standards registry, and content marker on provider URL.
- [ ] Verify metadata and accessibility smoke checks.

## DNS and TLS

- [ ] Export all existing DNS records.
- [ ] Preserve MX, SPF, DKIM, DMARC, verification, and unrelated subdomain records.
- [ ] Change only apex/`www` website records required by the selected provider.
- [ ] Verify domain ownership at the provider.
- [ ] Verify apex and `www` resolution.
- [ ] Verify HTTP-to-HTTPS and canonical redirects.
- [ ] Verify valid TLS.

## Custom-domain smoke

- [ ] `/`
- [ ] `/status/` (verify formation-stage legal/authority boundary remains visible)
- [ ] `/governance/` (verify formation-stage governance/transparency boundary remains visible)
- [ ] `/accessibility/`
- [ ] `/deaf-community/`
- [ ] `/emotional-wellness/`
- [ ] `/responsible-ai/`
- [ ] `/research/`
- [ ] `/partners/`
- [ ] `/contact/`
- [ ] `/privacy/`
- [ ] `/terms/`
- [ ] `/community/`
- [ ] `/donate/` (must visibly remain disabled until receiving-entity and processor facts are verified)
- [ ] `/staff/` (must preserve the authentication-disabled boundary until configured)
- [ ] `/grants/` (publicly accessible, noindex demonstration; no authenticated protection is active)
- [ ] `/robots.txt`
- [ ] `/sitemap.xml`
- [ ] `/site.webmanifest`
- [ ] `/public-build-manifest.json`
- [ ] `/standards/registry.json`

## Safety and truthfulness

- [ ] Formation-era status language remains visible.
- [ ] Governance materials remain explicitly formation-stage and do not imply constituted governing bodies, legal independence, charity status, or tax exemption.
- [ ] No unsupported nonprofit, tax, charity, donation, grant, program, partner, research, certification, impact, clinical, or service claim is present.
- [ ] A verified private security/sensitive-reporting channel is published and tested.
- [ ] Contact and privacy language matches the selected host and actual operations.

## Evidence lock

- [ ] Create `launch-proof/urai-foundation-production-lock/<timestamp>/`.
- [ ] Include source/deployed/rollback SHAs, checks, artifact manifest, provider receipt, DNS/TLS, route/metadata/accessibility smoke, approval, exceptions, and rollback procedure.
- [ ] Exclude secrets, private account data, personal data, and sensitive incident details.

## READY rule

Mark the custom-domain release **VERIFIED COMPLETE** only when every applicable item above is evidenced. Otherwise use **IMPLEMENTED, NOT VERIFIED**, **BLOCKED**, or **REQUIRES USER ACTION**.
