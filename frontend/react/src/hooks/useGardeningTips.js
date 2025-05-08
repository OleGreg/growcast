// src/hooks/useGardeningTips.js
import { useState, useEffect } from 'react';
const API_URL = import.meta.env.VITE_API_URL;


export async function fetchGardeningTips(zip_code) {
  const response = await fetch(`${API_URL}/gardening-tips?zip_code=${zip_code}`);
  if (!response.ok) {
    throw new Error('Network Error');
  }
  return await response.json();
}

export function useGardeningTips(zip_code) {
  const [gardeningTipsData, setGardeningTipsData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadGardeningTips() {
    try {
      const data = await fetchGardeningTips(zip_code);
      // console.log('fetching weather data');
      setGardeningTipsData(data);
    } catch (error) {
      console.error('Error fetching gardening tips:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadGardeningTips();
  }, []);

  return { gardeningTipsData, loading };
}