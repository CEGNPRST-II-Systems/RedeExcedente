.PHONY: build up down logs test-backend test-frontend lint format test-ci

build:
	docker compose build

up:
	docker compose up -d

down:
	docker compose down

logs:
	docker compose logs -f

test-backend:
	docker compose exec backend pytest /app/tests

test-ci: lint test-backend test-frontend

test-frontend:
	docker compose exec frontend npm test

lint:
	ruff check --config backend/pyproject.toml backend

format:
	ruff check --fix --config backend/pyproject.toml backend
	ruff format --config backend/pyproject.toml backend

pgadmin:
	docker compose exec pgadmin /venv/bin/python3 /pgadmin4/setup.py load-servers /pgadmin4/servers.json --user admin@admin.com