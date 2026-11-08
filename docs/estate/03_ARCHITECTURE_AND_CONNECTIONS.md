# Foundation architecture, entities, provider boundaries
## Organizational relationship map — intent versus execution
```text
Human authorized signers / governing records (not inferred from GitHub)
    |-- URAI Labs LLC [Wyoming commercial operator: product/services]
    |       |-- UrAi consumer runtime (urai-spatial etc.)
    |       |-- RuAi professional tenant (B2Bportal; separate purposes)
    |       |-- Privacy, Jobs, Studio, Content, Communications, Admin
    |-- URAI IP Holdings LLC [Wyoming intended IP custodian/asset licensor]
    |       '-- asset-scoped rights and executed Labs licenses NOT established
    '-- URAI Foundation [Texas domestic nonprofit corporation, historically
        involuntarily terminated; independent public-interest mission intended]
        |-- draft ethics, standards, research and accessibility framework
        |-- public informational Foundation site
        '-- undeployed protected grant staff Functions/Firestore candidate
```
This is a functional relationship chart, NOT a beneficial-ownership graph, foundation subsidiary assertion, board chart, executed assignment, or legally effective intercompany licensing diagram. No automatic access to UrAi consumer memories, RuAi patient/client records or commercial funds is authorized by Foundation membership. Foundation standards are guidelines and draft assessment requirements, not regulator or certification authority. The UrAi in-app AI Council is unrelated to the Foundation's prospective human governance body.

## Source-level architecture
Public: static HTML/CSS, lightweight JS Grant Desk demo, curated public builder, GitHub Pages workflows and domain CNAME `uraifoundation.org`. Website includes public legal-status, governance, community, donations, staff and grants *information only*. No web CRM, active contact intake or research enrollment.
Private backend source: Node22 Functions codebase `foundation-staff`, `functions/src/index.ts` with App Check-protected callables for draft/review/approve/profile; Firestore staff, profile, document metadata, opportunity, application, approval, submission, awards, reporting and audit collections. Direct clients denied writes by `firestore.rules`; token+staff document identity agreement, role segregation and transaction rechecks. Owner bootstrap requires explicit Firebase project and verified pre-existing Auth identity; never execute without separate owner authorization.

## Firebase discovery / hosting collision
- `urai-foundation-38828874-c42a1` is a **founder-supplied project ID lead, not inspected GCP/Firebase inventory**. Source does not bind it.
- `urai-4dc1d` / site `urai-foundation`, URL https://urai-foundation.web.app — historical June issue #10 reports a green fallback site; it is not currently established as repo-bound, current or production canonical.
- `firebase.json` has Functions and Firestore rules/indexes, NO `project`, `.firebaserc`, Hosting target, Storage rules or deployment authorization. No Foundation-specific production IAM, secrets, authenticated employee roster, Auth/AppCheck provider, Rules deploy, indexes, Storage bucket or live data permissions verified. Distinguish provider identifier, actual binding, rights, resource inventory, deployed revision, live checks and rollback.
- GitHub Pages configured with `CNAME` yet exact main Pages run failed. Custom domain cannot be declared live from source alone.

## Privacy & safety
Static site has no declared analytics script or public backend form in main README; do not infer host logging, data retention, cookies, forms or route responses from repository source. Staff backend intentionally handles potentially sensitive nonprofit tax, funder and person records. It must never ingest consumer memory or professional data merely because ecosystems share a brand. Vault Storage rules, malware scans, retention, incident handling, real auth revocation and tenant separation require runtime verification. No public repository upload of private legal/EIN/employee/donor/grantee data.
