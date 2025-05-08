import { useState, useEffect } from 'react';
import loadingImage from './assets/images/Coneflower.svg';
import growCastLogo from './assets/images/growcast_logo.svg';
import CurrentWeatherCard from './components/CurrentWeatherCard';
import DailyForecast from './components/DailyForecast';
import HourlyForecast from './components/HourlyForecast';
import SevereWeatherAlert from './components/SevereWeatherAlert';
import GardeningAdvice from './components/GardeningAdvice';
import CitySearch from './components/CitySearch';
import FrostAlert from './components/FrostAlert';
const API_URL = import.meta.env.VITE_API_URL;


function App() {
  const [ weatherData, setWeatherData ] = useState(null);
  const [ weatherLoading, setWeatherLoading ] = useState(true);
  // const { weatherData, loading } = useWeather();

  async function fetchWeather() {
    const response = await fetch(`${API_URL}/weather`);
    if (!response.ok) {
      throw new Error('Network Error');
    }
    return await response.json();
  }
  
  async function loadWeather() {
    try {
      const data = await fetchWeather();
      console.log('fetching weather data');
      console.log(data);
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    } finally {
      // setLoading(false);
    }
  }

  // if (weatherLoading) {
  //   return (
  //     <main>
  //       <img src={loadingImage} alt="Loading..." />
  //     </main>
  //   );
  // }

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
            <CitySearch weatherData={weatherData} onCitySelect={loadWeather} />
            {/* <SevereWeatherAlert weatherData={weatherData} /> */}
            {/* <FrostAlert daily={weatherData.weather.daily} /> */}
            <CurrentWeatherCard weatherData={weatherData} />
            {/* <HourlyForecast hourly={weatherData.weather.hourly} /> */}
            {/* <DailyForecast daily={weatherData.weather.daily} /> */}
            {/* <GardeningAdvice zipCode={weatherData.zip} /> */}
        </div>
      </div>
    </main>
  );
}

export default App;