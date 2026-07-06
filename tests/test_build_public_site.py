from __future__ import annotations

import importlib.util
import json
import tempfile
import unittest
from pathlib import Path

SCRIPT = Path(__file__).resolve().parents[1] / "scripts" / "build-public-site.py"
SPEC = importlib.util.spec_from_file_location("build_public_site", SCRIPT)
assert SPEC and SPEC.loader
MODULE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(MODULE)


class PublicSiteBuildTests(unittest.TestCase):
    def make_fixture(self, root: Path) -> None:
        for relative in MODULE.PUBLIC_FILES:
            path = root / relative
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(f"fixture for {relative}\n", encoding="utf-8")
        private = root / "docs" / "foundation" / "private-advisor-note.md"
        private.parent.mkdir(parents=True, exist_ok=True)
        private.write_text("must not be in public artifact\n", encoding="utf-8")
        proof = root / "launch-proof" / "operator-receipt.txt"
        proof.parent.mkdir(parents=True, exist_ok=True)
        proof.write_text("internal receipt\n", encoding="utf-8")

    def test_build_copies_only_allowlisted_files(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory) / "repo"
            output = Path(directory) / "site"
            root.mkdir()
            self.make_fixture(root)

            manifest = MODULE.build_site(root, output, "abc123")

            self.assertEqual(len(MODULE.PUBLIC_FILES), len(manifest["files"]))
            self.assertEqual("abc123", manifest["source_sha"])
            self.assertTrue((output / "index.html").is_file())
            self.assertTrue((output / "standards" / "registry.json").is_file())
            self.assertFalse((output / "docs" / "foundation" / "private-advisor-note.md").exists())
            self.assertFalse((output / "launch-proof" / "operator-receipt.txt").exists())

            saved = json.loads((output / "public-build-manifest.json").read_text(encoding="utf-8"))
            self.assertEqual("explicit-allowlist", saved["publication_boundary"])
            self.assertEqual("abc123", saved["source_sha"])

    def test_build_fails_when_required_file_is_missing(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory) / "repo"
            output = Path(directory) / "site"
            root.mkdir()
            self.make_fixture(root)
            (root / "index.html").unlink()

            with self.assertRaises(FileNotFoundError):
                MODULE.build_site(root, output, "abc123")


if __name__ == "__main__":
    unittest.main()
