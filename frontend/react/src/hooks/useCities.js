// src/hooks/useWeather.js
import { useState, useEffect } from 'react';
const API_URL = import.meta.env.VITE_API_URL;

async function fetchCities() {
  const response = await fetch(`${API_URL}/us-cities`);
  if (!response.ok) {
    throw new Error('Network Error');
  }
  return await response.json();
}

export function useCities() {
  const [cities, setCities] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadCities() {
    try {
      const data = await fetchCities();
      setCities(data.city_data || []);
    } catch (error) {
      console.error('Error fetching weather:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCities();
  }, []);

  return { cities, loading };
}