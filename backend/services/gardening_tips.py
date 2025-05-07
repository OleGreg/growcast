from sqlalchemy.orm import Session
from db.models import ZipCode

def get_zone_by_zip(zip_code: str, db: Session):
  zip_entry = db.query(ZipCode).filter(ZipCode.zip_code == zip_code).first()
  if zip_entry:
    return zip_entry.zone
  return None