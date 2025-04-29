// src/components/HourlyForecast.jsx

const HourlyForecast = ({ hourly }) => {
  // Only show the next 12 hours
  const hoursToDisplay = hourly.slice(1, 13);

  const hourly_forecasts = hoursToDisplay.map((hour, index) => {
    const date = new Date(hour.dt * 1000); // Convert UNIX timestamp to ms
    const time = date.toLocaleTimeString([], { hour: 'numeric', hour12: 'true' });

    return (
      <li key={index} className="hour-card flex flex-row gap-x-2">
        <p><strong>{time}</strong></p>
        <p>{Math.round(hour.temp)}°</p>
        <p>{hour.weather[0].main}</p>
      </li>
    );
  })

  return (
    <div>
      <h3 className="mb-3">Hourly Forecast</h3>
      <ul className="flex flex-col max-h-44 overflow-y-scroll px-2">
        {hourly_forecasts}
      </ul>
    </div>
  );
};

export default HourlyForecast;