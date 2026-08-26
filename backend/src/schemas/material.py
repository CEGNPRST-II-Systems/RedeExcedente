from pydantic import BaseModel


class MaterialBase(BaseModel):
    title: str
    ngoName: str
    ngoRegistration: str
    category: str
    zone: str
    quantity: int
    condition: str
    contact: str
    description: str


class MaterialCreate(MaterialBase):
    pass


class Material(MaterialBase):
    id: str

    class Config:
        from_attributes = True
