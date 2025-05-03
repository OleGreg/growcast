from sqlalchemy import Column, Integer, String
from app.db.database import Base

class Plant(Base):
    __tablename__ = "plants"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    sunlight = Column(String)