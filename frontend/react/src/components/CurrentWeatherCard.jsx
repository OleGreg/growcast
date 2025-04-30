// src/components/CurrentWeatherCard.jsx
import { toTitleCase } from "../services/formattingService";

const CurrentWeatherCard = ({ weatherData }) => {
  if (!weatherData) {
    return <div>No weather data available</div>;
  }

  const temp_in_farenheit = Math.round(weatherData.weather.current.temp);

  return (
    <div className="">
      <h3 className="mb-3">Current Weather</h3>
      <p className="font-bold">{temp_in_farenheit}°F</p>
      {/* Map weatherData to create icons, weather info and description */}
      {weatherData.weather.current.weather.map((w, index) => (
        <div key={index} >
          <img
            className="mx-auto"
            src={`https://openweathermap.org/img/wn/${w.icon}@2x.png`} 
            alt={w.description} 
          />
          <p>{toTitleCase(w.description)}</p>
        </div>
      ))}
      <p>{weatherData.weather.current.humidity}% Humidity</p>
    </div>
  );
}

export default CurrentWeatherCard;