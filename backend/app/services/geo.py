# backend/app/services/geo.py
import requests
import time
from app.config import IP_CACHE_DURATION
from app.services.cache import is_cache_valid

ip_cache = {}

def get_coordinates_by_ip(ip_address: str):
    # Get the current time
    current_time = time.time()

    # Check if ip address exists in cache
    if ip_address in ip_cache:
        # If it exists, get the cached data and time it was cached
        cached_data, cached_time = ip_cache[ip_address]
        if is_cache_valid(cached_time, IP_CACHE_DURATION):
            # If the cache exists and has not expired, return the cached data
            print(f"Using cached location data for {ip_address}")
            return cached_data
        else:
            #if the cached item exists, but is expired, (clean) delete the cached item
            print(f"Deleting expired cached location data for {ip_address}")
            del ip_cache[ip_address]

    try:
        # Get geodata from api
        response = requests.get(f"http://ip-api.com/json/{ip_address}", timeout=5)
        response.raise_for_status()
        data = response.json()
        
        # Log error to ValueError if response is not 200
        if data.get('status') != 'success':
            raise ValueError(f"IP lookup failed: {data.get('message', 'Unknown error')}")

        # Get data. Round lat/lon rounded to 1 decimal will group users within 5-10 miles of each other, creating a more effective cache policy for weather lookups
        # TODO: cache weather lookup users by zip. Since we can only lookup by lat/lon, we need a file to map zip codes to one set of lat/lon coordinates
        lat = round(data.get('lat'), 1)
        lon = round(data.get('lon'), 1)
        city = data.get('city')
        country = data.get('country')
        region = data.get('region')
        zip_code = data.get('zip')

        # Add the ip address to the cache as a key containing data and timestamp, then return the data
        ip_cache[ip_address] = ((lat, lon, city, country, region, zip_code), current_time)
        return lat, lon, city, country, region, zip_code
    # Log errors
    except (requests.RequestException, ValueError) as e:
        print(f"Error during IP lookup: {e}")
        return None, None, None, None, None, None