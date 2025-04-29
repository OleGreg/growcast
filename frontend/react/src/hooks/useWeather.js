// src/hooks/useWeather.js
import { useState, useEffect } from 'react';
import { fetchWeather } from '../services/weatherService';

export function useWeather() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWeather() {
      try {
        const data = await fetchWeather();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather:', error);
      } finally {
        setLoading(false);
      }
    }

    loadWeather();
  }, []);

  return { weatherData, loading };
}