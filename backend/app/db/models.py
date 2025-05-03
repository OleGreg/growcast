from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.db.session import Base

class Plant(Base):
    __tablename__ = "plants"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    sunlight = Column(String)

    zone_id = Column(Integer, ForeignKey("zones.id"))

    #relationship to zone
    zone = relationship("Zone", back_populates="plants")

class Zone(Base):
    __tablename__ = "zones"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)

    # Relationship to Plant
    plants = relationship("Plant", back_populates="zone")