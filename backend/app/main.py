# backend/app/main.py

from fastapi import FastAPI

app = FastAPI()

@app.get("/weather")
async def get_weather():
    return {"message": "Hello, the weather looks good today!"}