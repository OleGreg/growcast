// src/hooks/useWeather.js
import { useState, useEffect } from 'react';
import { fetchWeather } from '../services/weatherService';

export function useWeather() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadWeather() {
    try {
      const data = await fetchWeather();
      // console.log('fetching weather data');
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadWeather();

    const interval = setInterval(() => {
      loadWeather();
    }, 35 * 60 * 1000); //refresh weather data every 35 minutes

    //clean up the interval on unmount
    return () => clearInterval(interval);
  }, []);

  return { weatherData, loading };
}