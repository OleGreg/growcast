from sqlalchemy.orm import Session
from db.models import USCities

def get_city_data(db: Session):
  city_data = db.query(USCities).all()
  if city_data:
    return [
      {
        "city": f"{city.city}, {city.state_id}",
        "lat": city.lat,
        "lon": city.lon
      }
      for city in city_data
    ]
  return None