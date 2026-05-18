# Accessibility and Site Quality Checklist

Use this checklist for meaningful changes to the public website, documentation structure, navigation, or visual system.

## Accessibility baseline

- Page structure uses one clear `h1`, logical heading order, and descriptive section labels.
- Navigation works with keyboard only.
- Visible focus states are present for interactive elements.
- Link text is descriptive without relying on surrounding copy.
- Color contrast is sufficient in normal, hover, and focus states.
- Content does not require motion, hover, audio, or precise pointer control to understand.
- Motion and transitions respect `prefers-reduced-motion`.
- Images, icons, and embedded visuals have meaningful alt text or are correctly marked decorative.
- Forms, if added, have labels, validation messages, and safe fallback contact paths.

## Responsive review

Check at minimum:

- Small mobile width around 360px.
- Large mobile width around 430px.
- Tablet width around 768px.
- Laptop width around 1280px.
- Wide desktop width around 1440px and above.

Verify that:

- Navigation remains usable.
- Cards and grids do not overflow.
- Text remains readable.
- Primary calls to action remain visible and tappable.
- Sticky elements do not cover content.

## Content quality

- Copy is direct, specific, and free of AI hype.
- Requirements are distinguishable from recommendations.
- Claims are supported by linked standards, templates, or process docs.
- Formation status and limitations remain honest.
- Contact paths do not invite disclosure of sensitive details in public issues.

## SEO and sharing

- Title and meta description match the page purpose.
- Canonical URL is correct.
- Open Graph and Twitter metadata are present for public pages.
- `robots.txt`, `sitemap.xml`, `site.webmanifest`, and favicon links remain valid.
- Public standards that should be discoverable are listed in the sitemap.

## Release verification

Before publishing or merging major site changes:

```bash
make check
```

Then verify the deployed site:

```bash
curl -I https://uraifoundation.org/
curl -I https://uraifoundation.org/favicon.svg
curl -I https://uraifoundation.org/site.webmanifest
curl -I https://uraifoundation.org/sitemap.xml
```

Finally, open the site in a browser and complete the responsive review above.
