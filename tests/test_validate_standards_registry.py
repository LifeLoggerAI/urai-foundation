from __future__ import annotations

import copy
import importlib.util
import json
import tempfile
import unittest
from pathlib import Path

SCRIPT = Path(__file__).resolve().parents[1] / "scripts" / "validate-standards-registry.py"
SPEC = importlib.util.spec_from_file_location("validate_standards_registry", SCRIPT)
assert SPEC and SPEC.loader
MODULE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(MODULE)


class StandardsRegistryValidationTests(unittest.TestCase):
    def setUp(self) -> None:
        self.registry = MODULE.load_registry()

    def test_repository_registry_is_valid(self) -> None:
        self.assertEqual([], MODULE.validate_registry(self.registry))

    def test_rejects_duplicate_id(self) -> None:
        registry = copy.deepcopy(self.registry)
        registry["standards"].append(copy.deepcopy(registry["standards"][0]))
        errors = MODULE.validate_registry(registry)
        self.assertTrue(any("duplicate standard id" in error for error in errors))

    def test_rejects_missing_document(self) -> None:
        registry = copy.deepcopy(self.registry)
        registry["standards"][0]["path"] = "docs/does-not-exist.md"
        errors = MODULE.validate_registry(registry)
        self.assertTrue(any("does not exist" in error for error in errors))

    def test_rejects_path_that_lexically_starts_with_docs_but_escapes_docs(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "docs").mkdir()
            (root / "standards").mkdir()
            outside = root / "standards" / "outside.md"
            outside.write_text("outside\n", encoding="utf-8")
            registry = copy.deepcopy(self.registry)
            registry["standards"] = [copy.deepcopy(self.registry["standards"][0])]
            registry["standards"][0]["path"] = "docs/../standards/outside.md"
            errors = MODULE.validate_registry(registry, root)
            self.assertTrue(any("escapes docs/" in error for error in errors))

    def test_rejects_symlinked_markdown_outside_docs(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            docs = root / "docs"
            outside = root / "outside"
            docs.mkdir()
            outside.mkdir()
            target = outside / "target.md"
            target.write_text("outside\n", encoding="utf-8")
            link = docs / "linked.md"
            try:
                link.symlink_to(target)
            except OSError:
                self.skipTest("symlink support unavailable")
            registry = copy.deepcopy(self.registry)
            registry["standards"] = [copy.deepcopy(self.registry["standards"][0])]
            registry["standards"][0]["path"] = "docs/linked.md"
            errors = MODULE.validate_registry(registry, root)
            self.assertTrue(any("escapes docs/" in error or "regular Markdown" in error for error in errors))

    def test_rejects_certification_claim(self) -> None:
        registry = copy.deepcopy(self.registry)
        registry["certification_program"] = "active"
        errors = MODULE.validate_registry(registry)
        self.assertTrue(any("must remain not-established" in error for error in errors))

    def test_load_rejects_non_object_root(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "registry.json"
            path.write_text(json.dumps([]), encoding="utf-8")
            with self.assertRaises(ValueError):
                MODULE.load_registry(path)


if __name__ == "__main__":
    unittest.main()
