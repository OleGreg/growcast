# backend/app/services/weather.py
import requests
import time
from app.config import WEATHER_CACHE_DURATION, WEATHER_API_KEY
from app.services.cache import is_cache_valid

# Create weather cache object
weather_cache = {}

def get_weather_by_coordinates(lat: float, lon: float):
    current_time = time.time()
    # Create a location key, used to store and retrieve data from the cache
    location_key = f"{lat},{lon}"

    # Check to see if the location being looked up exists in cache
    if location_key in weather_cache:
        cached_data, cached_time = weather_cache[location_key]
        # If it exists, check if the cache is valid (meaning it has not expired). If its valid, return the data from the cache
        if is_cache_valid(cached_time, WEATHER_CACHE_DURATION):
            print(f"Using cached weather for {location_key}")
            return cached_data
        # If the cache is not valid (expired), delete/clean it from the cache to save on memory
        else:
            print(f"Deleting expired cached weather for {location_key}")
            del weather_cache[location_key]

    try:
        # Make the request, add the data to the cache, and return the data
        response = requests.get(
            f"https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&appid={WEATHER_API_KEY}&units=imperial&exclude=minutely"
        )
        response.raise_for_status()
        data = response.json()
        weather_cache[location_key] = (data, current_time)
        return data
    # Log any errors on failed responses
    except (requests.RequestException, ValueError) as e:
        print(f"Error during weather lookup: {e}")
        return None