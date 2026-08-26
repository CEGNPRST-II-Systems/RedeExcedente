from sqlalchemy import Column, String
from database.session import Base
import uuid

class Material(Base):
    __tablename__ = "materials"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, nullable=False)
    ngoName = Column(String, nullable=False)
    ngoRegistration = Column(String, nullable=False)
    category = Column(String, nullable=False)
    zone = Column(String, nullable=False)
    quantity = Column(String, nullable=False)
    condition = Column(String, nullable=False)
    contact = Column(String, nullable=False)
    description = Column(String, nullable=False)
