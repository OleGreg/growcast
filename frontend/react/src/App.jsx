import { useWeather } from './hooks/useWeather';
import loadingImage from './assets/images/Coneflower.svg';
import growCastLogo from './assets/images/growcast_logo.svg';
import CurrentWeatherCard from './components/CurrentWeatherCard';
import DailyForecast from './components/DailyForecast';
import HourlyForecast from './components/HourlyForecast';
import SevereWeatherAlert from './components/SevereWeatherAlert';

function App() {
  const { weatherData, loading } = useWeather();

  if (loading) {
    return (
      <main>
        <img src={loadingImage} alt="Loading..." />
      </main>
    );
  }

  // 🌤 Determine weather condition
  const currentCondition = weatherData?.weather?.current?.weather?.[0]?.main?.toLowerCase();

  //create array of weather conditions and associated background styles
  const weatherBackground = {
    clear: 'bg-sunshine',
    clouds: 'bg-cloudy',
    rain: 'bg-rain',
    drizzle: 'bg-rain',
    thunderstorm: 'bg-thunderstorm',
    snow: 'bg-snow',
    fog: 'bg-fog',
    mist: 'bg-fog',
    haze: 'bg-fog',
  };

  // get background class for our app depending on the weather
  const backgroundClass = weatherBackground[currentCondition] || 'bg-cloudy';

  return (
    <main className={`${backgroundClass} min-h-[100vh] min-w-[100vw] flex items-center justify-center p-14`}>
      <div className="container mx-auto text-center">
        <h1 className="mb-10" aria-label='GrowCast Weather App'>
          <img 
            src={growCastLogo} 
            className="mx-auto max-w-[444px]"
            alt="GrowCast Weather App text logo" 
          />
        </h1>
        <h2 className="mb-5 text-earthclay font-bold">{weatherData.city}, {weatherData.region}</h2>
        <div className="flex flex-row gap-x-10 mb-10 items-center justify-center">
          <HourlyForecast hourly={weatherData.weather.hourly} />
          <CurrentWeatherCard weatherData={weatherData} />
          <DailyForecast daily={weatherData.weather.daily} />
        </div>
        <div>
          {weatherData.weather.alerts && weatherData.weather.alerts.map((alert, index) => (
            <SevereWeatherAlert key={index} alert={alert} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;