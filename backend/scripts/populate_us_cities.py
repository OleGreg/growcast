import csv
from db.session import SessionLocal
from db.models import USCities

def populate_us_cities(csv_path):
    session = SessionLocal()
    try:
        with open(csv_path, newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                city = row.get("city")
                state_id = row.get("state_id")
                lat = row.get("lat")
                lon = row.get("lng")

                # Skip if any required value is missing
                if not city or not state_id or not lat or not lon:
                    continue

                # Convert coordinates to float, skip if invalid
                try:
                    lat = float(lat)
                    lon = float(lon)
                except ValueError:
                    continue

                # Check if this city already exists
                exists = session.query(USCities).filter_by(
                    city=city,
                    state_id=state_id,
                    lat=lat,
                    lon=lon
                ).first()
                if exists:
                    continue

                new_city = USCities(
                    city=city,
                    state_id=state_id,
                    lat=lat,
                    lon=lon
                )
                session.add(new_city)

            session.commit()
            print("US cities populated successfully.")
    except Exception as e:
        session.rollback()
        print("Error:", e)
    finally:
        session.close()

if __name__ == "__main__":
    populate_us_cities("/app/data/uscities.csv")