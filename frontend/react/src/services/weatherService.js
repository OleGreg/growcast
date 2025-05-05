// src/services/weatherService.js
export async function fetchWeather() {
  const response = await fetch('http://api.growcast.local/weather');
  if (!response.ok) {
    throw new Error('Network Error');
  }
  return await response.json();
}