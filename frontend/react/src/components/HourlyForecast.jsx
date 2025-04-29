// src/components/HourlyForecast.jsx
import React from 'react';

const HourlyForecast = ({ hourly }) => {
  // Only show the next 12 hours
  const hoursToDisplay = hourly.slice(2, 12);

  return (
    <ul className="hourly-forecast">
      {hoursToDisplay.map((hour, index) => {
        const date = new Date(hour.dt * 1000); // Convert UNIX timestamp to ms
        const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        return (
          <li key={index} className="hour-card">
            <p><strong>{time}</strong></p>
            <p>{Math.round(hour.temp)}°</p>
            <p>{hour.weather[0].main}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default HourlyForecast;