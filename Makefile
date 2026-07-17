.PHONY: check test validate validate-routes validate-standards build-site smoke-live verify-live

check: test validate validate-routes validate-standards

test:
	python3 -m unittest discover -s tests

validate:
	python3 scripts/validate-docs.py

validate-routes:
	python3 scripts/validate-routes.py

validate-standards:
	python3 scripts/validate-standards-registry.py

build-site:
	python3 scripts/build-public-site.py

smoke-live:
	python3 scripts/smoke-live-routes.py

verify-live:
	python3 scripts/verify-live-domain.py
	python3 scripts/smoke-live-routes.py
