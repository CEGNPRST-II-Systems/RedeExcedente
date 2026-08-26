from database.session import get_db
from fastapi import APIRouter, Depends
from schemas.material import Material, MaterialCreate
from services.material_service import MaterialService
from sqlalchemy.orm import Session

router = APIRouter(prefix="/materials", tags=["materials"])


@router.get("", response_model=list[Material])
def get_materials(
    query: str = None,
    category: str = None,
    zone: str = None,
    db: Session = Depends(get_db),
):
    service = MaterialService(db)
    return service.filter_materials(query, category, zone)


@router.post("", response_model=Material)
def create_material(material: MaterialCreate, db: Session = Depends(get_db)):
    service = MaterialService(db)
    return service.create_material(material)
