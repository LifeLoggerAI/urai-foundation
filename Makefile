.PHONY: check test validate

check: test validate

test:
	python3 -m unittest discover -s tests

validate:
	python3 scripts/validate-docs.py
