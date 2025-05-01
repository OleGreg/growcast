// src/components/HourlyForecast.jsx
import { toTitleCase } from "../services/formattingService";

const HourlyForecast = ({ hourly }) => {
  if (!hourly) {
    return <div>No weather data available</div>;
  }

  // Only show the next 12 hours
  const hoursToDisplay = hourly.slice(1, 13);

  const hourly_forecasts = hoursToDisplay.map((hour, index) => {
    const date = new Date(hour.dt * 1000); // Convert UNIX timestamp to ms
    const time = date.toLocaleTimeString([], { hour: 'numeric', hour12: 'true' });

    return (
      <li key={index} className="hour-card flex flex-row gap-x-2">
        <p><strong>{time}</strong></p>
        <p>{Math.round(hour.temp)}°F</p>
        <p>{toTitleCase(hour.weather[0].description)}</p>
      </li>
    );
  })

  return (
    <div>
      <h3 className="mb-2">Hourly Forecast</h3>
      <ul className="flex flex-col max-h-44 overflow-y-scroll px-2">
        {hourly_forecasts}
      </ul>
    </div>
  );
};

export default HourlyForecast;