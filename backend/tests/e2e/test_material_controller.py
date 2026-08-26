import os
import pytest
from unittest.mock import MagicMock
from fastapi.testclient import TestClient

# Set DB to sqlite in-memory before importing app
os.environ["DATABASE_URL"] = "sqlite:///:memory:"

from main import app
from database.session import get_db

def override_get_db():
    mock_db = MagicMock()
    # Mocking the repository query behavior with all required fields
    mock_data = {
        "id": "1",
        "title": "Material Teste",
        "ngoName": "ONG Teste",
        "ngoRegistration": "123",
        "category": "Teste",
        "zone": "Zona Norte",
        "quantity": "1",
        "condition": "Novo",
        "contact": "12345678",
        "description": "Descricao de teste"
    }
    mock_db.query.return_value.all.return_value = [mock_data]
    yield mock_db

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

def test_get_materials():
    response = client.get("/materials")
    assert response.status_code == 200
    assert response.json() == [{
        "id": "1",
        "title": "Material Teste",
        "ngoName": "ONG Teste",
        "ngoRegistration": "123",
        "category": "Teste",
        "zone": "Zona Norte",
        "quantity": "1",
        "condition": "Novo",
        "contact": "12345678",
        "description": "Descricao de teste"
    }]
