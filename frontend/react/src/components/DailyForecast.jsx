// src/components/DailyForecast.jsx

const DailyForecast = ({ daily }) => {

  const daysToDisplay = daily.slice(1, 8); // Skip today, show next 7 days
  const weekdayNames = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

  const daily_forecasts = daysToDisplay.map((day, index) => {
    const date = new Date(day.dt * 1000)
    const dayName = weekdayNames[date.getDay()];
    const icon = day.weather[0].icon;

    return (
      <li key={index}>
        <p className="font-bold">{dayName}</p>
        <img src={`https://openweathermap.org/img/wn/${icon}.png`}
        alt={day.weather[0].description} />
        <p><strong>High:</strong> {Math.round(day.temp.max)}</p>
        <p><strong>Low:</strong> {Math.round(day.temp.min)}</p>
        <p>{day.weather[0].main}</p>
      </li>
    )
  });

  return (
    <div>
      <h2 className="mb-5">Daily Forecast</h2>
      <ul>
        {daily_forecasts}
      </ul>
    </div>
  )
}

export default DailyForecast;