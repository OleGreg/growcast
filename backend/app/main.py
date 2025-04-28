# backend/app/main.py
import os
import requests
from fastapi import FastAPI, Request
from dotenv import load_dotenv

#load vars from .env
load_dotenv()

app = FastAPI()

@app.get("/weather")
async def get_weather(incoming_request : Request):
    client_ip = incoming_request.client.host
    client_ip = os.getenv("TESTING_IP", client_ip)
    lat, lon, city, country, region = get_coordinates_by_ip(client_ip)
    weather_data = get_weather_by_coordinates(lat, lon)
    return {
        "ip": client_ip,
        "latitude": lat,
        "longitude": lon,
        "city": city,
        "country": country,
        "region": region,
        "weather": weather_data
    }

def get_coordinates_by_ip(ip_address):
    try:
        response = requests.get(f"http://ip-api.com/json/{ip_address}", timeout=5)
        response.raise_for_status()

        data = response.json()

        if data.get('status') != 'success':
            raise ValueError(f"IP lookup failed: {data.get('message', 'Unknown error')}")

        lat = data.get('lat')
        lon = data.get('lon')
        city = data.get('city')
        country = data.get('country')
        region = data.get('region')
        return lat, lon, city, country, region
    
    except (requests.RequestException, ValueError) as e:
        print(f"Error during IP lookup: {e}")
        return None, None, None, None, None
    
def get_weather_by_coordinates(lat, lon):
    weather_api_key = os.getenv("WEATHER_API_KEY")
    try:
        response = requests.get(f"https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&appid={weather_api_key}")
        response.raise_for_status()

        data = response.json()

        return data
    except (requests.RequestException, ValueError) as e:
        print(f"Error during weather lookup: {e}")
        return None