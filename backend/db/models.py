from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from db.session import Base

class Plant(Base):
    __tablename__ = "plants"

    #Columns
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    sunlight = Column(String)

    #Foreign Keys
    zone_id = Column(Integer, ForeignKey("zones.id"))

    #relationships
    zone = relationship("Zone", back_populates="plants")

class Zone(Base):
    __tablename__ = "zones"

    #Columns
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)

    # Relationships
    plants = relationship("Plant", back_populates="zone")
    zip_codes = relationship("ZipCode", back_populates="zone")

class ZipCode(Base):
    __tablename__ = "zip_codes"

    #Columns
    id = Column(Integer, primary_key=True, index=True)
    zip_code = Column(String, index=True)

    #Foreign Keys
    zone_id = Column(Integer, ForeignKey("zones.id"))

    #Relationships
    zone = relationship("Zone", back_populates="zip_codes")

class USCities(Base):
    __tablename__ = "us_cities"

    #Columns
    id = Column(Integer, primary_key=True, index=True)
    city = Column(String, index=True)
    state_id = Column(String, index=True)
    lat = Column(Float, nullable=False)
    lon = Column (Float, nullable=False)
