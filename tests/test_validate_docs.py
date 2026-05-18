#!/usr/bin/env python3
"""Unit tests for documentation validation helpers."""

from __future__ import annotations

import importlib.util
import tempfile
import unittest
from pathlib import Path

SCRIPT = Path(__file__).resolve().parents[1] / "scripts" / "validate-docs.py"
SPEC = importlib.util.spec_from_file_location("validate_docs", SCRIPT)
assert SPEC is not None and SPEC.loader is not None
validate_docs = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(validate_docs)


class ValidateDocsTests(unittest.TestCase):
    def test_external_links_are_ignored(self) -> None:
        self.assertTrue(validate_docs.is_external_link("https://example.com"))
        self.assertTrue(validate_docs.is_external_link("mailto:security@example.com"))
        self.assertFalse(validate_docs.is_external_link("docs/policy.md"))

    def test_split_link_target_returns_decoded_path_and_anchor(self) -> None:
        self.assertEqual(
            validate_docs.split_link_target("docs/policy%20file.md#Review%20Scope"),
            ("docs/policy file.md", "Review Scope"),
        )
        self.assertEqual(validate_docs.split_link_target("#local-section"), ("", "local-section"))

    def test_slugify_heading_matches_expected_markdown_anchor(self) -> None:
        self.assertEqual(validate_docs.slugify_heading("Review Scope & Limits"), "review-scope-limits")
        self.assertEqual(validate_docs.slugify_heading("`Code` Review"), "code-review")

    def test_validate_file_detects_trailing_whitespace(self) -> None:
        with tempfile.TemporaryDirectory(dir=validate_docs.ROOT) as tmp:
            path = Path(tmp) / "sample.md"
            path.write_text("# Title  \n", encoding="utf-8")
            errors = validate_docs.validate_file(path)
        self.assertTrue(any("trailing whitespace" in error for error in errors))

    def test_validate_file_detects_broken_markdown_anchor(self) -> None:
        with tempfile.TemporaryDirectory(dir=validate_docs.ROOT) as tmp:
            path = Path(tmp) / "sample.md"
            path.write_text("# Existing Section\n\n[Bad](#missing-section)\n", encoding="utf-8")
            errors = validate_docs.validate_file(path)
        self.assertTrue(any("broken Markdown anchor" in error for error in errors))

    def test_validate_file_allows_existing_markdown_anchor(self) -> None:
        with tempfile.TemporaryDirectory(dir=validate_docs.ROOT) as tmp:
            path = Path(tmp) / "sample.md"
            path.write_text("# Existing Section\n\n[Good](#existing-section)\n", encoding="utf-8")
            errors = validate_docs.validate_file(path)
        self.assertFalse(any("broken Markdown anchor" in error for error in errors))

    def test_markdown_anchors_include_duplicate_heading_suffixes(self) -> None:
        with tempfile.TemporaryDirectory(dir=validate_docs.ROOT) as tmp:
            path = Path(tmp) / "sample.md"
            path.write_text("# Repeat\n\n## Repeat\n", encoding="utf-8")
            anchors = validate_docs.markdown_anchors(path)
        self.assertEqual(anchors, {"repeat", "repeat-1"})

    def test_html_anchors_include_id_and_name_attributes(self) -> None:
        with tempfile.TemporaryDirectory(dir=validate_docs.ROOT) as tmp:
            path = Path(tmp) / "sample.html"
            path.write_text('<h1 id="intro">Intro</h1>\n<a name="legacy"></a>\n', encoding="utf-8")
            anchors = validate_docs.html_anchors(path)
        self.assertEqual(anchors, {"intro", "legacy"})

    def test_validate_file_ignores_links_inside_fenced_code_blocks(self) -> None:
        with tempfile.TemporaryDirectory(dir=validate_docs.ROOT) as tmp:
            path = Path(tmp) / "sample.md"
            path.write_text("# Title\n\n```md\n[Example](missing.md)\n```\n", encoding="utf-8")
            errors = validate_docs.validate_file(path)
        self.assertFalse(any("broken relative link" in error for error in errors))

    def test_markdown_link_targets_include_images_and_reference_definitions(self) -> None:
        self.assertEqual(validate_docs.markdown_link_targets("![Alt](docs/image.png)"), ["docs/image.png"])
        self.assertEqual(validate_docs.markdown_link_targets("[policy]: docs/policy.md"), ["docs/policy.md"])

    def test_html_link_targets_include_href_src_and_action(self) -> None:
        line = '<a href="/docs/a.md"><img src="/logo.svg"><form action="/submit"></form>'
        self.assertEqual(validate_docs.html_link_targets(line), ["/docs/a.md", "/logo.svg", "/submit"])

    def test_validate_file_detects_broken_image_link(self) -> None:
        with tempfile.TemporaryDirectory(dir=validate_docs.ROOT) as tmp:
            path = Path(tmp) / "sample.md"
            path.write_text("# Title\n\n![Missing](missing.png)\n", encoding="utf-8")
            errors = validate_docs.validate_file(path)
        self.assertTrue(any("broken relative link" in error for error in errors))

    def test_validate_file_detects_broken_reference_link(self) -> None:
        with tempfile.TemporaryDirectory(dir=validate_docs.ROOT) as tmp:
            path = Path(tmp) / "sample.md"
            path.write_text("# Title\n\nSee [Policy][policy].\n\n[policy]: missing.md\n", encoding="utf-8")
            errors = validate_docs.validate_file(path)
        self.assertTrue(any("broken relative link" in error for error in errors))

    def test_validate_file_detects_broken_html_root_relative_link(self) -> None:
        with tempfile.TemporaryDirectory(dir=validate_docs.ROOT) as tmp:
            path = Path(tmp) / "sample.html"
            path.write_text('<a href="/missing.html">Missing</a>\n', encoding="utf-8")
            errors = validate_docs.validate_file(path)
        self.assertTrue(any("broken relative link" in error for error in errors))

    def test_validate_file_allows_existing_html_root_relative_link(self) -> None:
        with tempfile.TemporaryDirectory(dir=validate_docs.ROOT) as tmp:
            linked_path = validate_docs.ROOT / "temporary-target.html"
            linked_path.write_text('<h1 id="target">Target</h1>\n', encoding="utf-8")
            path = Path(tmp) / "sample.html"
            path.write_text('<a href="/temporary-target.html#target">Target</a>\n', encoding="utf-8")
            try:
                errors = validate_docs.validate_file(path)
            finally:
                linked_path.unlink()
        self.assertFalse(any("broken relative link" in error for error in errors))
        self.assertFalse(any("broken HTML anchor" in error for error in errors))

    def test_validate_file_detects_broken_html_anchor(self) -> None:
        with tempfile.TemporaryDirectory(dir=validate_docs.ROOT) as tmp:
            linked_path = validate_docs.ROOT / "temporary-target.html"
            linked_path.write_text('<h1 id="target">Target</h1>\n', encoding="utf-8")
            path = Path(tmp) / "sample.html"
            path.write_text('<a href="/temporary-target.html#missing">Target</a>\n', encoding="utf-8")
            try:
                errors = validate_docs.validate_file(path)
            finally:
                linked_path.unlink()
        self.assertTrue(any("broken HTML anchor" in error for error in errors))

    def test_normalize_link_target_removes_titles_and_angle_brackets(self) -> None:
        self.assertEqual(validate_docs.normalize_link_target('docs/policy.md "Policy"'), "docs/policy.md")
        self.assertEqual(validate_docs.normalize_link_target("<docs/policy.md> 'Policy'"), "docs/policy.md")

    def test_validate_file_allows_link_titles(self) -> None:
        with tempfile.TemporaryDirectory(dir=validate_docs.ROOT) as tmp:
            path = Path(tmp) / "sample.md"
            linked_path = Path(tmp) / "policy.md"
            linked_path.write_text("# Policy\n", encoding="utf-8")
            path.write_text('# Title\n\n[Policy](policy.md "Policy title")\n', encoding="utf-8")
            errors = validate_docs.validate_file(path)
        self.assertFalse(any("broken relative link" in error for error in errors))

    def test_validate_file_allows_angle_bracket_reference_targets(self) -> None:
        with tempfile.TemporaryDirectory(dir=validate_docs.ROOT) as tmp:
            path = Path(tmp) / "sample.md"
            linked_path = Path(tmp) / "policy.md"
            linked_path.write_text("# Policy\n", encoding="utf-8")
            path.write_text("# Title\n\n[policy]: <policy.md> 'Policy title'\n", encoding="utf-8")
            errors = validate_docs.validate_file(path)
        self.assertFalse(any("broken relative link" in error for error in errors))

    def test_iter_files_includes_static_site_files_and_text_configs(self) -> None:
        files = validate_docs.iter_files()
        self.assertIn(validate_docs.ROOT / "Makefile", files)
        self.assertIn(validate_docs.ROOT / ".editorconfig", files)
        self.assertIn(validate_docs.ROOT / ".gitignore", files)
        self.assertIn(validate_docs.ROOT / "CNAME", files)
        self.assertIn(validate_docs.ROOT / "index.html", files)
        self.assertIn(validate_docs.ROOT / "styles.css", files)
        self.assertIn(validate_docs.ROOT / "sitemap.xml", files)
        self.assertIn(validate_docs.ROOT / "site.webmanifest", files)

    def test_unsupported_link_schemes_are_rejected(self) -> None:
        with tempfile.TemporaryDirectory(dir=validate_docs.ROOT) as tmp:
            path = Path(tmp) / "sample.md"
            path.write_text("# Title\n\n[Unsafe](javascript:alert(1))\n", encoding="utf-8")
            errors = validate_docs.validate_file(path)
        self.assertTrue(any("unsupported link scheme" in error for error in errors))

    def test_supported_external_link_schemes_are_allowed(self) -> None:
        with tempfile.TemporaryDirectory(dir=validate_docs.ROOT) as tmp:
            path = Path(tmp) / "sample.md"
            path.write_text("# Title\n\n[Email](mailto:security@example.com)\n[Phone](tel:+15555550100)\n", encoding="utf-8")
            errors = validate_docs.validate_file(path)
        self.assertFalse(any("unsupported link scheme" in error for error in errors))

    def test_data_uris_and_same_page_hashes_are_ignored_for_html(self) -> None:
        with tempfile.TemporaryDirectory(dir=validate_docs.ROOT) as tmp:
            path = Path(tmp) / "sample.html"
            path.write_text('<a href="#local">Local</a><img src="data:image/svg+xml,test">\n', encoding="utf-8")
            errors = validate_docs.validate_file(path)
        self.assertFalse(any("unsupported link scheme" in error for error in errors))
        self.assertFalse(any("broken relative link" in error for error in errors))


if __name__ == "__main__":
    unittest.main()
