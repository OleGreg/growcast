// src/services/weatherService.js
const API_URL = import.meta.env.VITE_API_URL;

export async function fetchWeather() {
  const response = await fetch(`${API_URL}/weather`);
  if (!response.ok) {
    throw new Error('Network Error');
  }
  return await response.json();
}