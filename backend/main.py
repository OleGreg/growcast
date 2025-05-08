# backend/main.py
from config import TESTING_IP, ALLOWED_ORIGINS
from fastapi import FastAPI, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from db.session import get_db
from services.geo import get_coordinates_by_ip
from services.weather import get_weather_by_coordinates
from services.gardening_tips import get_zone_by_zip
from services.cities import get_city_data

# Instantiate FastAPI object
app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://localhost",
    "https://localhost:5173",
    "https://localhost",
    "http://growcast.local",
    "https://growcast.local",
    "https://api.growcast.local",
    "http://api.growcast.local",
    "https://growcast.app",
    "https://www.growcast.app",
]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Create weather route. Lookup by IP address as a fallback
@app.get("/weather-by-ip")
async def get_weather(incoming_request: Request):
    # Get the client IP from the incoming request. Set the client ip to the TESTING_IP environment variable if it exists
    # Get the request variableX-Forwarded-For, otherwise internal docker network IP will be sent
    x_forwarded_for = incoming_request.headers.get("X-Forwarded-For")
    client_ip = x_forwarded_for.split(",")[0] if x_forwarded_for else incoming_request.client.host
    print("Client IP:", client_ip)
    client_ip = TESTING_IP or client_ip

    #Get data from the geocoordinates API or cache
    lat, lon, city, country, region, zip_code = get_coordinates_by_ip(client_ip)
    #Get data from the weather API or cache
    weather_data = get_weather_by_coordinates(lat, lon)

    #Return Data
    return {
        "ip": client_ip,
        "latitude": lat,
        "longitude": lon,
        "city": city,
        "country": country,
        "region": region,
        "zip": zip_code,
        "weather": weather_data
    }

# Create weather route
@app.get("/weather-by-coordinates")
async def get_weather(lat: str, lon: str):
    weather_data = get_weather_by_coordinates(lat, lon)

    #Return Data
    return {
        "ip": client_ip,
        "latitude": lat,
        "longitude": lon,
        "city": city,
        "country": country,
        "region": region,
        "zip": zip_code,
        "weather": weather_data
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

# Create Get Cities route
@app.get("/us-cities")
def get_us_cities(db: Session = Depends(get_db)):
    city_data = get_city_data(db)
    if not city_data:
        return {"error": "No City Data Found"}
    return {
        "city_data" : city_data
    }

