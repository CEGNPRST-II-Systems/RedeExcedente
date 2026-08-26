from repositories.material_repository import MaterialRepository
from schemas.material import MaterialCreate
from sqlalchemy.orm import Session


class MaterialService:
    def __init__(self, db: Session):
        self.repository = MaterialRepository(db)

    def filter_materials(
        self, query: str = None, category: str = None, zone: str = None
    ):
        return self.repository.filter_materials(query, category, zone)

    def create_material(self, material_data: MaterialCreate):
        return self.repository.create(material_data)

    def get_all_materials(self):
        return self.repository.filter_materials()
