.PHONY: check test validate validate-routes verify-live

check: test validate validate-routes

test:
	python3 -m unittest discover -s tests

validate:
	python3 scripts/validate-docs.py

validate-routes:
	python3 scripts/validate-routes.py

verify-live:
	python3 scripts/verify-live-domain.py
