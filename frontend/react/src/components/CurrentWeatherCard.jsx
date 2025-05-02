// src/components/CurrentWeatherCard.jsx
import { toTitleCase } from "../services/formattingService";

const CurrentWeatherCard = ({ weatherData }) => {
  if (!weatherData) {
    return <div>No weather data available</div>;
  }

  return (
    <div className="weather-card w-[400px] max-w-full space-y-5">
      <h2 className="text-skyblue !text-lg font-bold">Currently in {weatherData.city}, {weatherData.region}</h2>
      <div className="flex flex-row justify-center gap-5 items-center">
        <img
          className="bg-skyblue w-16 rounded-lg"
          src={`https://openweathermap.org/img/wn/${weatherData.weather.current.weather[0].icon}@2x.png`} 
          alt={weatherData.weather.current.weather[0].description} 
        />
        <h2 className="temp">{Math.round(weatherData.weather.current.temp)}°F</h2>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p>{toTitleCase(weatherData.weather.current.weather[0].description)}</p>
        <p>{weatherData.weather.current.humidity}% Humidity</p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p>UV {weatherData.weather.current.uvi} ({
            weatherData.weather.current.uvi <= 2 ? 'Low' :
            weatherData.weather.current.uvi <= 5 ? 'Moderate' :
            weatherData.weather.current.uvi <= 8 ? 'High' :
            'Extreme'
          })
        </p>
        <p>{Math.round(weatherData.weather.current.wind_speed)} mph winds</p>
      </div>
    </div>
  );
}

export default CurrentWeatherCard;