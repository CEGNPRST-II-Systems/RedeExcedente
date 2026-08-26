from models.material import Material
from schemas.material import MaterialCreate
from sqlalchemy.orm import Session


class MaterialRepository:
    def __init__(self, db: Session):
        self.db = db

    def filter_materials(
        self, query: str = None, category: str = None, zone: str = None
    ):
        query_obj = self.db.query(Material)
        if query:
            query_obj = query_obj.filter(
                Material.title.ilike(f"%{query}%")
                | Material.ngoName.ilike(f"%{query}%")
            )
        if category and category != "Todas":
            query_obj = query_obj.filter(Material.category == category)
        if zone and zone != "Todas":
            query_obj = query_obj.filter(Material.zone == zone)

        return query_obj.all()

    def create(self, material_data: MaterialCreate):
        db_material = Material(**material_data.dict())
        self.db.add(db_material)
        self.db.commit()
        self.db.refresh(db_material)
        return db_material
