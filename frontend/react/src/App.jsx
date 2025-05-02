import { useWeather } from './hooks/useWeather';
import loadingImage from './assets/images/Coneflower.svg';
import growCastLogo from './assets/images/growcast_logo.svg';
import CurrentWeatherCard from './components/CurrentWeatherCard';
import DailyForecast from './components/DailyForecast';
import HourlyForecast from './components/HourlyForecast';
import SevereWeatherAlert from './components/SevereWeatherAlert';
import GardeningAdvice from './components/GardeningAdvice';

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
    <main className="min-h-[100vh] min-w-[100vw] flex justify-center lg:pt-14 p-14 bg-radial from-lightbrown to-darkbrown">
      <div className="container mx-auto text-center">
        <h1 className="mb-10" aria-label="GrowCast Weather App">
          <img
            src={growCastLogo}
            className="mx-auto max-w-[444px]"
            alt="GrowCast Weather App text logo"
          />
        </h1>

        <div className="flex flex-col gap-5 items-center">
          <CurrentWeatherCard weatherData={weatherData} />
          <HourlyForecast hourly={weatherData.weather.hourly} />
          <DailyForecast daily={weatherData.weather.daily} />
          <GardeningAdvice />
        </div>

        <div>
          {weatherData.weather.alerts &&
            weatherData.weather.alerts.map((alert, index) => (
              <SevereWeatherAlert key={index} alert={alert} />
            ))}
        </div>
      </div>
    </main>
  );
}

export default App;