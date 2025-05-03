import csv
from app.db.session import SessionLocal
from app.db.models import Zone, ZipCode

def populate_zipcodes(csv_path):
    session = SessionLocal()
    try:
        with open(csv_path, newline='') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                zip_code = row["zipcode"]
                zone_name = row["zone"]

                # Skip if either value is missing
                if not zip_code or not zone_name:
                    continue

                # Find the matching Zone
                zone = session.query(Zone).filter_by(name=zone_name).first()
                if not zone:
                    print(f"Zone {zone_name} not found, skipping zip {zip_code}")
                    continue

                # Check if zip code already exists
                existing = session.query(ZipCode).filter_by(zip_code=zip_code).first()
                if existing:
                    continue

                # Create and add the ZipCode entry
                new_zip = ZipCode(zip_code=zip_code, zone=zone)
                session.add(new_zip)

            session.commit()
            print("Zip codes populated successfully.")
    except Exception as e:
        session.rollback()
        print("Error:", e)
    finally:
        session.close()

if __name__ == "__main__":
    populate_zipcodes("/app/data/zipcodes.csv")