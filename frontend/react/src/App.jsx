import { useWeather } from './hooks/useWeather';
import loadingImage from './assets/Coneflower.svg';
import CurrentWeatherCard from './components/CurrentWeatherCard';
import DailyForecast from './components/DailyForecast';
import HourlyForecast from './components/HourlyForecast';
import './App.css'

function App() {
  const { weatherData, loading } = useWeather();

  if (loading) {
    return (
      <main>
        <img src={loadingImage} alt="Loading..." />
      </main>
    );
  }

  return (
    <main>
      <div className="container">
        <h1 className="mb-5">GrowCast</h1>
        <h2 className="mb-14">Weather Data for {weatherData.city}, {weatherData.region}</h2>
        <div className="flex flex-row gap-x-10">
          <CurrentWeatherCard weatherData={weatherData} />
          {weatherData && (
            <HourlyForecast hourly={weatherData.weather.hourly} />
          )}
          {weatherData && (
            <DailyForecast daily={weatherData.weather.daily} />
          )}
        </div>
      </div>
    </main>
  );
}

export default App;