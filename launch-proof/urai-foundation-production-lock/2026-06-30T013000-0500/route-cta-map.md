# Route and CTA Map

Starting commit: f0c533a3b01c2b78f29b33e2ca552d515ac6d81e
Implementation ending commit before proof folder: 814b4ba78d36015894d1695c5720fe29d9d13bfc

## Public routes

| Route | Source file | Status | Notes |
| --- | --- | --- | --- |
| `/` | `index.html` | Implemented | Homepage links to the completed static routes. |
| `/accessibility/` | `accessibility/index.html` | Implemented | Static standards page. |
| `/deaf-community/` | `deaf-community/index.html` | Implemented | Static considerations page. |
| `/emotional-wellness/` | `emotional-wellness/index.html` | Implemented | Static safety/standards page. |
| `/responsible-ai/` | `responsible-ai/index.html` | Implemented | Static standards page. |
| `/research/` | `research/index.html` | Implemented | Static research-intent page. |
| `/partners/` | `partners/index.html` | Implemented | Static partner-interest boundary page. |
| `/contact/` | `contact/index.html` | Implemented | Mailto and GitHub Issues only. |
| `/privacy/` | `privacy/index.html` | Implemented | Static-site privacy notice. |
| `/terms/` | `terms/index.html` | Implemented | Static usage notice. |

## Homepage CTAs

| CTA | Target | Status |
| --- | --- | --- |
| Explore responsible AI standards | `/responsible-ai/` | Real static page |
| Contact or open an issue | `/contact/` | Real static page |
| Open a public issue | `https://github.com/LifeLoggerAI/urai-foundation/issues` | External GitHub workflow |
| Email hello@uraifoundation.org | `mailto:hello@uraifoundation.org` | Mailto only |

## Footer/navigation

The homepage and route pages link to real static routes and public GitHub/mailto targets. There is no fake contact form, partner form, research form, donation CTA, grant intake, or hidden backend workflow.

## Sitemap

`sitemap.xml` now includes `/`, all nine static route pages, and the core documentation URLs.
