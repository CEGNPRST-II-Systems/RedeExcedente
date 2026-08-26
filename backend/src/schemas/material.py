from pydantic import BaseModel, Field


class MaterialBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=100)
    ngoName: str = Field(..., min_length=1, max_length=100)
    ngoRegistration: str = Field(..., min_length=1)
    category: str = Field(..., min_length=1)
    zone: str = Field(..., min_length=1)
    quantity: int = Field(..., gt=0)
    condition: str = Field(..., min_length=1)
    contact: str = Field(..., min_length=1, max_length=20)
    description: str = Field(..., min_length=1, max_length=500)


class MaterialCreate(MaterialBase):
    pass


class Material(MaterialBase):
    id: str

    class Config:
        from_attributes = True
