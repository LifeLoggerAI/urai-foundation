"""Actual artifact validator tests with disposable synthetic public files."""
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest
import zipfile

ROOT = Path(__file__).resolve().parents[1]

def load(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module

build = load("foundation_artifact_builder", ROOT / "scripts/build-public-site.py")
verify = load("foundation_artifact_verifier", ROOT / "scripts/verify-public-artifact.py")
SHA = "a" * 40

class PublicArtifactDeliveryTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name) / "source"
        self.site = Path(self.tmp.name) / "site"
        for name in build.PUBLIC_FILES:
            path = self.root / name
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_bytes(b"" if name == ".nojekyll" else b"public-fixture\n")
        build.build_site(self.root, self.site, SHA)

    def edit_manifest(self, change):
        path = self.site / verify.MANIFEST
        value = json.loads(path.read_text())
        change(value)
        path.write_text(json.dumps(value))

    def test_complete_public_artifact(self):
        result = verify.validate_artifact(self.site, SHA)
        self.assertEqual(result["files_verified"], len(build.PUBLIC_FILES))
        self.assertFalse(result["release_approval"])

    def test_original_missing_hidden_marker_fails(self):
        (self.site / ".nojekyll").unlink()
        with self.assertRaisesRegex(ValueError, "inventory mismatch"):
            verify.validate_artifact(self.site, SHA)

    def test_unexpected_private_dotfile_is_rejected(self):
        (self.site / ".env").write_text("synthetic-only")
        with self.assertRaisesRegex(ValueError, "inventory mismatch"):
            verify.validate_artifact(self.site, SHA)

    def test_manifest_cannot_authorize_an_extra_hidden_file(self):
        self.edit_manifest(lambda m: m["files"].append({"path": ".env"}))
        with self.assertRaises(ValueError):
            verify.validate_artifact(self.site, SHA)

    def test_wrong_source_identity_is_rejected(self):
        with self.assertRaisesRegex(ValueError, "authority"):
            verify.validate_artifact(self.site, "b" * 40)

    def test_manifest_duplicate_is_rejected(self):
        self.edit_manifest(lambda m: m["files"].__setitem__(1, m["files"][0]))
        with self.assertRaisesRegex(ValueError, "duplicate"):
            verify.validate_artifact(self.site, SHA)

    def test_nonallowlisted_manifest_path_is_rejected(self):
        self.edit_manifest(lambda m: m["files"][0].__setitem__("path", "../outside"))
        with self.assertRaisesRegex(ValueError, "non-allowlisted"):
            verify.validate_artifact(self.site, SHA)

    def test_modified_bytes_fail(self):
        (self.site / "index.html").write_text("modified public fixture")
        with self.assertRaisesRegex(ValueError, "mismatch"):
            verify.validate_artifact(self.site, SHA)

    def test_false_digest_fails(self):
        self.edit_manifest(lambda m: m["files"][0].__setitem__("sha256", "0" * 64))
        with self.assertRaisesRegex(ValueError, "digest mismatch"):
            verify.validate_artifact(self.site, SHA)

    def test_boolean_size_fails(self):
        self.edit_manifest(lambda m: m["files"][0].__setitem__("bytes", False))
        with self.assertRaisesRegex(ValueError, "invalid manifest size"):
            verify.validate_artifact(self.site, SHA)

    def test_symlink_fails_even_when_contents_match(self):
        name = self.site / "index.html"
        name.unlink()
        name.symlink_to(self.root / "index.html")
        with self.assertRaisesRegex(ValueError, "symbolic"):
            verify.validate_artifact(self.site, SHA)

    def test_local_zip_roundtrip_preserves_hidden_marker(self):
        # Local packaging proof only; native upload/download is a separate CI step.
        archive = Path(self.tmp.name) / "site.zip"
        with zipfile.ZipFile(archive, "w") as target:
            for path in self.site.rglob("*"):
                if path.is_file():
                    target.write(path, path.relative_to(self.site))
        returned = Path(self.tmp.name) / "returned"
        with zipfile.ZipFile(archive) as source:
            source.extractall(returned)
        self.assertTrue((returned / ".nojekyll").exists())
        self.assertEqual(verify.validate_artifact(returned, SHA)["files_verified"], len(build.PUBLIC_FILES))

if __name__ == "__main__":
    unittest.main()
