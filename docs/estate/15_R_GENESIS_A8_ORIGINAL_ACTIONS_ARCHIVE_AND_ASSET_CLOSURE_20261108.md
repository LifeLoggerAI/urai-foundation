# ONE URAI GENESIS — Foundation R-GENESIS-A8: original GitHub Actions artifacts and website dependency closure

**Observed:** 2026-11-08 America/Chicago / Nov 9 UTC. **Scope:** read-only recovery and original-byte verification of three historic GitHub Actions ZIP artifacts; independent offline static-site reference inspection; exact current audit-head CI readback. Documentation-only on existing draft PR #65. **No production deployment, payment, legal filing or governance action performed.** Read [A6](13_FULL_REACHABLE_GIT_HISTORY_COMPLETION_20261107.md) and [A7](14_R_GENESIS_A7_FRESH_SOURCE_LEGAL_CI_READBACK_20261108.md) first. Frozen main remains `8ee8036b649ae9c9e73ae374a7247f0bb34c4c03`.

## Evidence grade and reproducibility

The ZIPs below were downloaded via the authenticated GitHub Actions artifact API and their **actual local ZIP bytes** SHA-256 hashed. Python `zipfile` opened every archive and `testzip()` found **no CRC failures**. The website archive `_site/public-build-manifest.json` was parsed from each ZIP, and every present manifest-declared file was byte-length and SHA-256 compared to the ZIP member. The HTML dependency scan used Python `html.parser` and checked local `link`, `script`, `img`, `source`, and `iframe` `href`/`src` references against the actual archived `_site` paths. It is **not browser execution**, a network test, server response inspection, deployed artifact equality, access-control test, or license audit.

| Artifact (GitHub Actions run / ID) | ZIP bytes | Original ZIP SHA-256 | Entries / uncompressed bytes | Scope |
| --- | ---: | --- | --- | --- |
| [Main Check](https://github.com/LifeLoggerAI/urai-foundation/actions/runs/37683147407) public-site artifact `11510931447` | 105,096 | `c6b5832017f67a1e331d1aefc783c00dd97dbf41227f83ef3f15179894752683` | 54 / 273,055 | `main@8ee8036...`, Oct 7; ZIP includes site, compiled Functions and CI logs |
| [PR #60 Check](https://github.com/LifeLoggerAI/urai-foundation/actions/runs/38009775773) public-site artifact `11652932822` | 112,290 | `971b913a4ffd2bd3b9c2d3b382c16405ab50563c3e80569fe90605ba33cdd2bc` | 57 / 296,567 | candidate `aa7bff55...`, Oct 10; includes site, Functions and CI logs |
| PR #60 Check diagnostics `11652853107` | 5,057 | `9882a34e047bc064505887fad1c40616e8bb1c5dedd4b0edac77f199b0762ec3` | 12 / 18,089 | exact candidate's native checks, package audit, artifact parity contract |

These are dated artifacts from actual workflow runs, **not** evidence that they were published to `uraifoundation.org` or Firebase. The repo remains public; artifact allowlisting does not make Git history private.

## Offline source-artifact website proof, including actual negative case

| Check | Oct 7 main Check archive | Oct 10 PR #60 Check archive |
| --- | --- | --- |
| `_site` ZIP members including build manifest | **42** | **45** |
| Build-manifest file entries | **42** | **44** |
| Manifest source SHA | `8ee8036b649ae9c9e73ae374a7247f0bb34c4c03` | `aa7bff55f9a88656a7eb067e74c2ae5de879447c` |
| HTML files actually scanned | **18** | **19** |
| Local HTML asset references checked | **50** | **53** |
| Unresolved local references | **2** | **0** |
| Manifest-declared members absent from downloaded ZIP | `.nojekyll` | **none** |
| Manifest member digest/size mismatches where member present | **0** | **0** |
| Site path scope leak check | no matched `functions/src/`, `tests/`, `scripts/`, `launch-proof/`, `docs/estate/`, `node_modules/` or `.git/` inside `_site` | same |

**Main defect directly verified in original packaged bytes:** both `_site/index.html` and `_site/governance/index.html` link `/foundation-home.css`, yet no `foundation-home.css` exists among the original main ZIP `_site` entries **and** it is missing from that main artifact's own allowlist manifest. This is **two broken CSS dependencies / one missing asset**, not two separate security vulnerabilities. The PR #60 ZIP contains `foundation-home.css` and resolves all 53 scanned internal asset references; its additional published path `research/global-emotional-weather/index.html` is also present. This confirms the **built-candidate packaging correction**, NOT a merged or live release.

**Separate original artifact discrepancy:** main `_site/public-build-manifest.json` lists `.nojekyll` (0 bytes, empty-file SHA-256) but the downloaded main *Check* ZIP omits that hidden file; `all-source-status.log` shows it existed in the build workspace. PR #60 Check artifact contains `.nojekyll`. Do **not** assume this means a live Pages deploy is missing `.nojekyll`; the older Pages run separately failed at `Configure Pages` and never published an artifact, and GitHub's Check/upload-artifact path need not match Pages packaging settings.

The scanner checks local asset links in static HTML only; it does not guarantee all route navigation links, JavaScript actions, CSS `url()`, CSP, HTML semantics, assistive-device behavior, screen capture quality or reachable live TLS. Public site references were taken from actual ZIP paths and all present archive files matched manifest SHA-256/size.

## Original CI execution evidence, corrected interpretation

From the downloaded *main* Check ZIP: Python `make check` recorded **58/58 unittest success**; Functions Node TAP **41/41 pass**. From the downloaded PR #60 diagnostics ZIP: Python `make check` **71/71 unittest success**; Functions Node TAP **62/62 pass**; `audit-all.json` and `audit-prod.json` report **0 vulnerabilities** in that dated locked dependency audit. These are distinct Python and JavaScript suites, not duplicate counts. They demonstrate historical candidate-source checks and compiler/SDK unit behavior, **not** Firebase authenticated runtime, current dependency posture, external accessibility or deployment parity.

Both `make-check.log` files include `PASS https://uraifoundation.org/ ok` and `FAIL https://uraifoundation.org/accessibility/ missing`, followed by `Live route smoke test failed for 1 route(s).` This text is emitted by the intentional negative unit fixture in `tests/test_smoke_live_routes.py::test_main_returns_failure_when_any_route_fails`, which mocks two URLs and **asserts failure return code 1**. It is **NOT a real failed live-domain HTTP request**. The unittest process ultimately reports `OK`; don't use these fixture lines to assert site availability or broken live accessibility route.

The PR #60 diagnostic `downloaded-artifact-contract.log` reports `source_sha=aa7bff55...`, `downloaded_files_verified=45`, `manifest_entries=44`, scope `downloaded artifact bytes only, not hosting`. This is consistent with the new ZIP self-audit (44 published allowlist files plus one public build manifest). Live runtime and hosting release remain unverified.

## Fresh Nov 9 UTC audit PR CI

Previous A7 audit head `d9e1dd457116b07ff36a21a0aee8e737cdac1628` has [Check run 42538824630](https://github.com/LifeLoggerAI/urai-foundation/actions/runs/42538824630) dated 2026-11-09T00:11:25Z: completed **failure** within seconds; job `128909001749` returned no accessible steps (`steps:null`; step API `steps:[]`). The precise runner/billing/permissions/annotation cause was not resolved. **Do not treat a no-step failure as proof source tests ran and failed, or as a success.** Every new documentation commit has a new SHA requiring its own check readback.

## P0–P3 and source identity handoff

- **P0**: keep production, fundraising and legal HOLD. Independent review for both main source defects (unmerged `auth_time` future-timestamp repair, non-authoritative `upsertFoundationProfileField` verified-fact creation), exact GitHub Actions pre-step diagnosis and Foundation-specific state reinstatement/fee authority. Do not auto-merge PR #60 just because its ZIP is better than main.
- **P1**: authorized GCP/Firebase read-only project/IAM/Auth/AppCheck/Firestore/Storage/Functions/Hosting and `uraifoundation.org` DNS/TLS/runtime/deployed SHA inventory; isolated emulator negative tests and device accessibility checks, then exact release/rollback proof.
- **P2**: current official Texas status receipt; duly constituted governance and conflicts process; signed asset-specific Labs/Holdings/Foundation service/IP contracts; IRS tax determination and legally authorized finance controls before donor/funder actions.
- **P3**: independently reviewed responsible-AI, accessibility, funded public-interest programs, research/consent safeguards and impact/continuity evidence.

**Historical source scope** remains 53 original surviving branch heads / 481 reachable commits / 483 Git blob objects / 3,080,302 unique bytes (A6). External provider data, deleted/unreachable Git objects, ignored files and actual state filing are not covered by that count. **Keep main, PR #60, #28, Labs #262 and source-history receipts unchanged.** This document does not alter source-code packaging or legal/production state.
