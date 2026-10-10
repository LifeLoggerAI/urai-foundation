import hashlib
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location("artifact_contract", ROOT / "scripts/public-artifact-contract.py")
CONTRACT = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(CONTRACT)


class PublicArtifactContractTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.site = Path(self.temp.name) / "_site"
        self.site.mkdir()
        self.sha = "a" * 40
        self.entries = []
        for name in CONTRACT.PUBLIC_FILES:
            path = self.site / name
            path.parent.mkdir(parents=True, exist_ok=True)
            data = b"" if name == ".nojekyll" else ("synthetic:" + name).encode()
            path.write_bytes(data)
            self.entries.append({"path": name, "sha256": hashlib.sha256(data).hexdigest(), "bytes": len(data)})
        self.write_manifest()

    def write_manifest(self):
        (self.site / CONTRACT.MANIFEST).write_text(json.dumps({"source_sha": self.sha, "publication_boundary": "explicit-allowlist", "files": self.entries}))

    def test_exact_allowlist_includes_only_approved_hidden_marker(self):
        paths = CONTRACT.upload_paths(self.site, self.sha, [])
        self.assertEqual(len(paths), len(CONTRACT.PUBLIC_FILES) + 1)
        self.assertEqual([p.relative_to(self.site).as_posix() for p in paths if p.name.startswith(".")], [".nojekyll"])

    def test_missing_marker_rejected(self):
        (self.site / ".nojekyll").unlink()
        with self.assertRaises((OSError, ValueError)):
            CONTRACT.verify_site(self.site, self.sha)

    def test_digest_mismatch_rejected(self):
        (self.site / "CNAME").write_bytes(b"x" * (self.site / "CNAME").stat().st_size)
        with self.assertRaises(ValueError):
            CONTRACT.verify_site(self.site, self.sha)

    def test_size_mismatch_rejected(self):
        (self.site / "CNAME").write_text("changed length")
        with self.assertRaises(ValueError):
            CONTRACT.verify_site(self.site, self.sha)

    def test_source_mismatch_rejected(self):
        with self.assertRaises(ValueError):
            CONTRACT.verify_site(self.site, "b" * 40)

    def test_unapproved_hidden_file_rejected(self):
        (self.site / ".env").write_text("synthetic only")
        with self.assertRaises(ValueError):
            CONTRACT.upload_paths(self.site, self.sha, [])

    def test_symlink_rejected(self):
        (self.site / "extra").symlink_to(self.site / "CNAME")
        with self.assertRaises(ValueError):
            CONTRACT.verify_site(self.site, self.sha)

    def test_extra_regular_file_rejected(self):
        (self.site / "extra.txt").write_text("not admitted")
        with self.assertRaises(ValueError):
            CONTRACT.verify_site(self.site, self.sha)

    def test_traversal_manifest_rejected(self):
        self.entries[0]["path"] = "../outside"
        self.write_manifest()
        with self.assertRaises(ValueError):
            CONTRACT.verify_site(self.site, self.sha)

    def test_duplicate_manifest_entry_rejected(self):
        self.entries.append(dict(self.entries[0]))
        self.write_manifest()
        with self.assertRaises(ValueError):
            CONTRACT.verify_site(self.site, self.sha)

    def test_replaced_downloaded_manifest_rejected(self):
        original = hashlib.sha256((self.site / CONTRACT.MANIFEST).read_bytes()).hexdigest()
        (self.site / "CNAME").write_text("altered payload")
        for entry in self.entries:
            if entry["path"] == "CNAME":
                data = (self.site / "CNAME").read_bytes()
                entry.update(bytes=len(data), sha256=hashlib.sha256(data).hexdigest())
        self.write_manifest()
        with self.assertRaises(ValueError):
            CONTRACT.verify_site(self.site, self.sha, original)

    def test_diagnostic_hidden_files_never_selected(self):
        logs = Path(self.temp.name) / "logs"
        logs.mkdir()
        (logs / "check.log").write_text("synthetic diagnostic")
        (logs / ".private").write_text("synthetic excluded")
        paths = CONTRACT.upload_paths(self.site, self.sha, [logs])
        self.assertIn(logs / "check.log", paths)
        self.assertNotIn(logs / ".private", paths)


if __name__ == "__main__":
    unittest.main()
