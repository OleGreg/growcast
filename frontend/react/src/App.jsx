import { useState } from 'react';
import growCastLogo from './assets/images/growcast_logo.svg';
import CurrentWeatherCard from './components/CurrentWeatherCard';
import DailyForecast from './components/DailyForecast';
import HourlyForecast from './components/HourlyForecast';
import SevereWeatherAlert from './components/SevereWeatherAlert';
import GardeningAdvice from './components/GardeningAdvice';
import CitySearch from './components/CitySearch';
import AnimatedLoading from './components/AnimatedLoading';
import FrostAlert from './components/FrostAlert';
const API_URL = import.meta.env.VITE_API_URL;


function App() {
  const [ weatherData, setWeatherData ] = useState(null);
  const [ cityData, setCityData ] = useState(null);
  const [ weatherLoading, setWeatherLoading ] = useState(true);

  async function fetchWeather(lat, lon) {
    const response = await fetch(`${API_URL}/weather-by-coordinates?lat=${lat}&lon=${lon}`);
    if (!response.ok) {
      throw new Error('Network Error');
    }
    return await response.json();
  }
  
  async function loadWeather(lat, lon, city, zip) {
    try {
      const data = await fetchWeather(lat, lon);
      setWeatherData(data);
      setCityData({
        "city": city,
        "zip": zip
      });
    } catch (error) {
      console.error('Error fetching weather:', error);
    } finally {
      setWeatherLoading(false);
    }
  }

  return (
    <main className="min-h-screen max-md:p-5 p-14">
      <div className="container mx-auto text-center">
        <h1 className="mb-10" aria-label="GrowCast Weather App">
          <img
            src={growCastLogo}
            className="mx-auto w-[444px] max-w-full"
            alt="GrowCast Weather App text logo"
          />
        </h1>
        <div className="flex flex-col gap-5 items-center max-w-full">
            <CitySearch onCitySelect={loadWeather} />
            { weatherLoading &&
              <div className="max-md:scale-75 origin-top">
                <AnimatedLoading />
              </div>
            } 
            { !weatherLoading &&
              <>
                <CurrentWeatherCard cityData={cityData} weatherData={weatherData} />
                <SevereWeatherAlert weatherData={weatherData} />
                <FrostAlert daily={weatherData.weather.daily} />
                <HourlyForecast hourly={weatherData.weather.hourly} />
                <DailyForecast daily={weatherData.weather.daily} />
                <GardeningAdvice zipCode={cityData.zip} />
              </>
            }
        </div>
      </div>
    </main>
  );
}

export default App;