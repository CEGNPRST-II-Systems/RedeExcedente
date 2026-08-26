import pytest
from unittest.mock import MagicMock
from services.material_service import MaterialService

def test_get_all_materials():
    # Setup
    mock_db = MagicMock()
    service = MaterialService(mock_db)
    
    # Mocking the repository's get_all method
    service.repository.get_all = MagicMock(return_value=[{"id": 1, "name": "Material 1"}])
    
    # Execution
    result = service.get_all_materials()
    
    # Verification
    assert result == [{"id": 1, "name": "Material 1"}]
    service.repository.get_all.assert_called_once()
