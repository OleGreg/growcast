# backend/app/main.py
import os, requests, time
from fastapi import FastAPI, Request
from dotenv import load_dotenv

#add a simple in-memory cache for ip geodata and weather data
ip_cache = {}
IP_CACHE_DURATION = 30 * 60 # 30 minutes in seconds
weather_cache = {}
WEATHER_CACHE_DURATION = 2 * 60 * 60 # 2 hours in seconds

#load vars from .env
load_dotenv()

#instantiate FastAPI
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
    #Check if data is already in cache, returned cached data if its available
    current_time = time.time()
    if ip_address in ip_cache:
        cached_data, cached_time = ip_cache[ip_address]
        if current_time - cached_time < IP_CACHE_DURATION:
            print(f"Using cached location data for {ip_address}")
            return cached_data
    
    try:
        response = requests.get(f"http://ip-api.com/json/{ip_address}", timeout=5)
        response.raise_for_status()

        data = response.json()

        if data.get('status') != 'success':
            raise ValueError(f"IP lookup failed: {data.get('message', 'Unknown error')}")

        #get data from response
        #round latitude and longitude, so we can group users who are reasonably close to effectively cache weather data, while still providing accuracy
        lat = round(data.get('lat'), 1)
        lon = round(data.get('lon'), 1)
        city = data.get('city')
        country = data.get('country')
        region = data.get('region')

        # Save to cache
        ip_cache[ip_address] = ((lat, lon, city, country, region), current_time)

        return lat, lon, city, country, region
    
    except (requests.RequestException, ValueError) as e:
        print(f"Error during IP lookup: {e}")
        return None, None, None, None, None
    
def get_weather_by_coordinates(lat, lon):
    #get our API key from .env file, allows this repo to be public without exposing important stuff ;)
    weather_api_key = os.getenv("WEATHER_API_KEY")
    #get the current time for calculating whether we need to use cached data, or issue a new request
    current_time = time.time()
    #build a unique key for this location
    location_key = f"{lat},{lon}"
    #check if weather is cached
    if location_key in weather_cache:
        cached_data, cached_time = weather_cache[location_key]
        if current_time - cached_time < WEATHER_CACHE_DURATION:
            print(f"Using cached weather for {location_key}")
            return cached_data

    #get response, raise any https errors
    try:
        response = requests.get(f"https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&appid={weather_api_key}&units=imperial&exclude=minutely")
        response.raise_for_status()
        data = response.json()
        #cache response
        weather_cache[location_key] = (data, current_time)
        return data
    except (requests.RequestException, ValueError) as e:
        print(f"Error during weather lookup: {e}")
        return None