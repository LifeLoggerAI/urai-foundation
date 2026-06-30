# Claim Audit

Starting commit: f0c533a3b01c2b78f29b33e2ca552d515ac6d81e
Implementation ending commit before proof folder: 814b4ba78d36015894d1695c5720fe29d9d13bfc

## Method

Reviewed current README, homepage, route pages, implementation map, sitemap, prior launch evidence, validation scripts, and deployment docs. Also queried repository search for high-risk terms. The GitHub search call returned no indexed results for the combined high-risk term query at audit time, so this proof relies primarily on direct file reads and the route/page updates made in this pass.

## Allowed claims after this pass

The public site may truthfully claim:

- URAI Foundation is a formation-era public-interest standards/docs initiative.
- The repository publishes static route pages and public documentation.
- The repository contains governance, ethical AI, transparency, risk-review, decision-record, security, contribution, sitemap, manifest, and validation materials.
- Contact is mailto and public GitHub Issues only.
- The site is static and does not implement accounts, forms, payments, analytics scripts, CRM, or database persistence.

## Claims that remain forbidden unless future evidence is added

Do not claim:

- Formal organization status or regulated public-benefit status.
- Funded programs, public services, donations, grants, or grantmaking.
- Official partnerships, endorsements, institutional research relationships, or community representation.
- Clinical, therapy, medical, diagnostic, crisis-response, wellness-service, or efficacy outcomes.
- Backend persistence for contact, research, partner, grant, donation, or program workflows.
- Live domain deployment until DNS/HTTPS verification passes.

## Route-specific claim controls

- `/accessibility/` says accessibility is a standards commitment and avoids certification claims.
- `/deaf-community/` avoids representation, endorsement, partnership, and live-program claims.
- `/emotional-wellness/` explicitly avoids care, therapy, diagnosis, crisis, and clinical-service claims.
- `/responsible-ai/` frames standards and review expectations only.
- `/research/` frames research intent and avoids active institutional relationship claims.
- `/partners/` avoids formal partner claims and points to contact/GitHub paths.
- `/contact/` says mailto/GitHub only and no backend form.
- `/privacy/` says the repo has no accounts, forms, analytics scripts, or database persistence.
- `/terms/` says public docs are informational and not a service promise.
