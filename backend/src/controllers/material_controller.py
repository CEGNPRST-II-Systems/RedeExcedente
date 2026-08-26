from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.session import get_db
from services.material_service import MaterialService
from schemas.material import Material, MaterialCreate

router = APIRouter(prefix="/materials", tags=["materials"])

@router.get("", response_model=list[Material])
def get_materials(db: Session = Depends(get_db)):
    service = MaterialService(db)
    return service.get_all_materials()

@router.post("", response_model=Material)
def create_material(material: MaterialCreate, db: Session = Depends(get_db)):
    service = MaterialService(db)
    return service.create_material(material)
