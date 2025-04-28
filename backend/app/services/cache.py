# backend/app/services/cache.py
import time

# Basic boolean check to see if cache is valid or not
def is_cache_valid(cached_time: float, duration: int) -> bool:
    return (time.time() - cached_time) < duration