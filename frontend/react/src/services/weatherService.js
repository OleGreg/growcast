// src/services/weatherService.js

export async function fetchWeather() {
  const response = await fetch('http://localhost:8000/weather');
  if (!response.ok) {
    throw new Error('Network Error');
  }
  return await response.json();
}