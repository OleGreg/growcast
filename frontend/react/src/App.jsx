import { useWeather } from './hooks/useWeather';
import loadingImage from './assets/images/Coneflower.svg';
import growCastLogo from './assets/images/growcast_logo.svg';
import CurrentWeatherCard from './components/CurrentWeatherCard';
import DailyForecast from './components/DailyForecast';
import HourlyForecast from './components/HourlyForecast';
import SevereWeatherAlert from './components/SevereWeatherAlert';
import GardeningAdvice from './components/GardeningAdvice';
import FrostAlert from './components/FrostAlert';

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
          <SevereWeatherAlert weatherData={weatherData} />
          <FrostAlert daily={weatherData.weather.daily} />
          <CurrentWeatherCard weatherData={weatherData} />
          <HourlyForecast hourly={weatherData.weather.hourly} />
          <DailyForecast daily={weatherData.weather.daily} />
          <GardeningAdvice zipCode={weatherData.zip} />
        </div>
      </div>
    </main>
  );
}

export default App;