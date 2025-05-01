import { useState } from 'react';
import ForecastModal from './ForecastModal';

const DailyForecast = ({ daily }) => {
  const [selectedDay, setSelectedDay] = useState(null);

  if (!daily) return <div>No weather data available</div>;

  const daysToDisplay = daily.slice(1, 8);
  const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div>
      <h3 className="mb-2">7 Day Forecast</h3>
      <div className="flex flex-col gap-5 h-44 overflow-y-scroll">
        {daysToDisplay.map((day, index) => {
          const date = new Date(day.dt * 1000);
          const dayName = weekdayNames[date.getDay()];
          const icon = day.weather[0].icon;

          return (
            <div
              key={index}
              className="cursor-pointer relative bg-white/70 hover:bg-white/25 transition-colors backdrop-blur-sm rounded-xl p-4 shadow-md flex flex-row text-center items-center gap-x-5 h-24"
              onClick={() => setSelectedDay(day)}
            >
              <p className="font-bold text-lg w-9">{dayName}</p>
              <div className="bg-skyblue rounded-md">
                <img
                  src={`https://openweathermap.org/img/wn/${icon}.png`}
                  alt={day.weather[0].description}
                />
              </div>
              <p><strong>High:</strong> {Math.round(day.temp.max)}°F</p>
              <p><strong>Low:</strong> {Math.round(day.temp.min)}°F</p>
            </div>
          );
        })}
      </div>

      {selectedDay && (
        <ForecastModal
          dayData={selectedDay}
          onClose={() => setSelectedDay(null)}
        />
      )}
    </div>
  );
};

export default DailyForecast;