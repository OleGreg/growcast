# backend/config.py
import os
from dotenv import load_dotenv

load_dotenv()

IP_CACHE_DURATION = 30 * 60  # 30 minutes
WEATHER_CACHE_DURATION = 30 * 60  # 30 minutes

WEATHER_API_KEY = os.getenv("WEATHER_API_KEY") # Keep private, not a free API
TESTING_IP = os.getenv("TESTING_IP") # Use public IP address for testing, instead of internal network IP
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS") #get allowed origins for CORS policy