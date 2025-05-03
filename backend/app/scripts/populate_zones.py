# backend/app/scripts/populate_zones.py

from sqlalchemy.orm import Session
from app.db.session import engine
from app.db.models import Zone

def generate_usda_zones():
    zones = []
    for num in range(1, 14):  # 1 to 13
        zones.append(f"{num}a")
        zones.append(f"{num}b")
    return zones

def populate_zones():
    usda_zones = generate_usda_zones()

    with Session(bind=engine) as session:
        for zone_name in usda_zones:
            exists = session.query(Zone).filter_by(name=zone_name).first()
            if not exists:
                session.add(Zone(name=zone_name))
        session.commit()

    print(f"Populated {len(usda_zones)} USDA zones.")

if __name__ == "__main__":
    populate_zones()