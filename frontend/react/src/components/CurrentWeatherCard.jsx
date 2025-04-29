// src/components/CurrentWeatherCard.jsx
function CurrentWeatherCard({ weatherData }) {
  if (!weatherData) {
    return <div>No weather data available</div>;
  }

  const iconCode = weatherData.weather.current.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <div className="weather-card">
      <h3>Current Weather</h3>
      <p><strong>Temperature:</strong> {weatherData.weather.current.temp}°F</p>
      {/* Map weatherData to create icons, weather info and description */}
      {weatherData.weather.current.weather.map((w, index) => (
        <div key={index} >
          <img 
            src={`https://openweathermap.org/img/wn/${w.icon}@2x.png`} 
            alt={w.description} 
          />
          <p><strong>{w.main}:</strong> {w.description}</p>
        </div>
      ))}
      <p><strong>Humidity:</strong> {weatherData.weather.current.humidity}%</p>
      {/* Add more weather details as needed */}
    </div>
  );
}

export default CurrentWeatherCard;