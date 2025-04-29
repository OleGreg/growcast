import { useWeather } from './hooks/useWeather';
import loadingImage from './assets/Coneflower.svg';
import CurrentWeatherCard from './components/CurrentWeatherCard';
import HourlyForecast from './components/HourlyForecast';
import './App.css'

function App() {
  const { weatherData, loading } = useWeather();

  if (loading) {
    return (
      <div>
        <img src={loadingImage} alt="Loading..." />
      </div>
    );
  }

  return (
    <div>
      <h1>GrowCast</h1>
      <h2>Weather Data for {weatherData.city}, {weatherData.region}</h2>
      <CurrentWeatherCard weatherData={weatherData} />
      {weatherData && (
        <HourlyForecast hourly={weatherData.weather.hourly} />
      )}
    </div>
  );
}

export default App;