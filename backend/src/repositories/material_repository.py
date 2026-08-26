from models.material import Material
from schemas.material import MaterialCreate
from sqlalchemy.orm import Session


class MaterialRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return self.db.query(Material).all()

    def create(self, material_data: MaterialCreate):
        db_material = Material(**material_data.dict())
        self.db.add(db_material)
        self.db.commit()
        self.db.refresh(db_material)
        return db_material
