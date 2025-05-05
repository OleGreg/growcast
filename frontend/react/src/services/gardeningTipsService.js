// src/services/gardeningTipsService.js
const API_URL = import.meta.env.VITE_API_URL;


export async function fetchGardeningTips(zip_code) {
  const response = await fetch(`${API_URL}/gardening-tips?zip_code=${zip_code}`);
  if (!response.ok) {
    throw new Error('Network Error');
  }
  return await response.json();
}