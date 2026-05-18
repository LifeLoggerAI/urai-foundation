.PHONY: check test validate verify-live

check: test validate

test:
	python3 -m unittest discover -s tests

validate:
	python3 scripts/validate-docs.py

verify-live:
	python3 scripts/verify-live-domain.py
