// src/hooks/useGardeningTips.js
import { useState, useEffect } from 'react';
import { fetchGardeningTips } from '../services/gardeningTipsService';

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

    const interval = setInterval(() => {
      loadGardeningTips();
    }, 35 * 60 * 1000); //refresh weather data every 35 minutes

    //clean up the interval on unmount
    return () => clearInterval(interval);
  }, []);

  return { gardeningTipsData, loading };
}