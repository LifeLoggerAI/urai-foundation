# URAI Foundation Final Launch Proof Template

Copy this file into a timestamped folder under:

```text
launch-proof/urai-foundation-production-lock/<timestamp>/
```

Then replace placeholders with real owner-side outputs.

## Verification metadata

- Date/time:
- Operator:
- Repository:
- Branch:
- Commit SHA:
- Live URL:
- GitHub Pages deployment mode:
- GitHub Pages run URL or deployment ID:

## Source verification

Command:

```bash
git clone https://github.com/LifeLoggerAI/urai-foundation.git
cd urai-foundation
git rev-parse HEAD
make check
```

Output:

```text
PASTE OUTPUT HERE
```

Result: PASS / FAIL

## Live verification

Command:

```bash
make verify-live
```

Output:

```text
PASTE OUTPUT HERE
```

Result: PASS / FAIL

## DNS verification

Command:

```bash
dig uraifoundation.org +short
dig www.uraifoundation.org +short
```

Output:

```text
PASTE OUTPUT HERE
```

Result: PASS / FAIL

## HTTPS verification

Command:

```bash
curl -I https://uraifoundation.org/
curl -I https://uraifoundation.org/sitemap.xml
```

Output:

```text
PASTE OUTPUT HERE
```

Result: PASS / FAIL

## Required route smoke test

`make verify-live` already runs the full route smoke test. Confirm these paths passed:

- `/`
- `/accessibility/`
- `/deaf-community/`
- `/emotional-wellness/`
- `/responsible-ai/`
- `/research/`
- `/partners/`
- `/contact/`
- `/privacy/`
- `/terms/`
- `/sitemap.xml`

Result: PASS / FAIL

## Final production verdict

Choose one:

- DONE DONE / DEPLOYED
- DONE BUT NEEDS EXTERNAL ENV
- PARTIAL WITH BLOCKERS
- NOT PRODUCTION READY

Reason:

```text
PASTE FINAL REASON HERE
```

## Closeout

- [ ] `make check` passed.
- [ ] `make verify-live` passed.
- [ ] GitHub Pages deployment is successful.
- [ ] DNS points to GitHub Pages.
- [ ] HTTPS works.
- [ ] All required routes respond successfully.
- [ ] No unsupported claims were introduced.
- [ ] GitHub issue #9 updated or closed with proof link.
