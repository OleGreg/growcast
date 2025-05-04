# backend/main.py
from config import TESTING_IP, ALLOWED_ORIGINS
from fastapi import FastAPI, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from db.session import get_db
from services.geo import get_coordinates_by_ip
from services.weather import get_weather_by_coordinates
from services.gardening_tips import get_weather_gardening_tips, get_zone_by_zip

# Instantiate FastAPI object
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Create weather route
@app.get("/weather")
async def get_weather(incoming_request: Request):
    # Get the client IP from the incoming request. Set the client ip to the TESTING_IP environment variable if it exists
    client_ip = incoming_request.client.host
    client_ip = TESTING_IP or client_ip

    #Get data from the geocoordinates API or cache
    lat, lon, city, country, region, zip_code = get_coordinates_by_ip(client_ip)
    #Get data from the weather API or cache
    weather_data = get_weather_by_coordinates(lat, lon)
    #Get gardening tips from our logic functions based on weather data
    weather_gardening_tips = get_weather_gardening_tips(weather_data, zip_code)

    #Return Data
    return {
        "ip": client_ip,
        "latitude": lat,
        "longitude": lon,
        "city": city,
        "country": country,
        "region": region,
        "weather": weather_data,
        "weather_gardening_tips": weather_gardening_tips
    }

# Create gardening tips route
@app.get("/gardening-tips")
def get_gardening_tips(zip_code: str, db: Session = Depends(get_db)):
    zone = get_zone_by_zip(zip_code, db)
    if not zone:
        return {"error": "Zone not found for ZIP"}
    return {
        "zip_code": zip_code,
        "zone": zone.name
    }
