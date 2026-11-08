# Evidence coverage, controls and explicit non-certification
Checked 2026-11-07 (America/Chicago), source `main@8ee8036b649ae9c9e73ae374a7247f0bb34c4c03`.
| Surface | Audited scope | Not audited |
| --- | --- | --- |
| Main Git tree | Exact 120 paths/blob Git SHA-1/byte sizes, 37 dirs, complete untruncated API tree | All 120 independently hashed SHA-256, LFS, ignored files |
| History | 53 head names+SHA, 48 retrieved PR records, important PRs read | Every branch file tree, every commit, deleted/unreachable history |
| Core source | Main README, status, governance charter, Firestore rules, Firebase config, Functions backend and owner bootstrap materially read | Every file comprehensively semantic-reviewed |
| Website | Canonical main route/asset path presence, source feature intent | Current domain HTTPS/DNS, exact deployed bytes, physical/assistive testing |
| CI | Exact GitHub run conclusions (main Check SUCCESS; Pages FAIL; PR60 Checks SUCCESS) | Independent downloaded artifact byte equality, locally re-run tests |
| Cloud | Source config and two provider mapping leads | Live Firebase/GCP IAM/Rules/Auth/Storage/Hosting/Functions/logs/billing |
| Legal | Dated and draft Drive records, authoritative references identified | Direct live state record readback, filed Form811, adopted board/signed licenses, current IRS determination |
| Funding | Proposal/dossier and unmerged donation PR | Deposits, bank, funds transfer, audited financial ledger, grant award |
| Privacy | Source client-write denials and privileged callable signatures | Real operator identities, full private-vault data deletion, host retention |

**Important**: Git blob identity (SHA-1) and content length describe repository objects, not original byte inspection. Main README original base64 bytes were separately fetched and SHA-256 checked in the work session (17,191 bytes; SHA-256 `fb2505d0b32355328e58a82531beb88f5eb83e10d002013569d3cde64ae1d030`), but the main-tree manifest conservatively does not claim whole-repository bytes read. No signed executed documents, private EIN, medical or donor data placed in this repository.

Proof hierarchy: historical claims/intent < source files/commit < exact isolated tests < authenticated cross-system provider runtime < physical accessibility acceptance < authorized current production receipt. Workflows being 'green' are not legal/governance authority. Foundation is **SOURCE-PARTIAL, LEGAL AND PRODUCTION HOLD**, with a useful source-level repository implementation but incomplete current authority evidence.
