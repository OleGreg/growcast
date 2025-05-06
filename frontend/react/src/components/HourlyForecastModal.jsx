import AlertDialog from "./AlertDialog";
import { millimetersToInches } from "../services/formattingService";

const HourlyForecastModal = ({ hourData, onClose }) => {
  if (!hourData) return null;

  const date = new Date(hourData.dt * 1000);
  const time = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const icon = hourData.weather[0].icon;

  return (
    <AlertDialog
      isOpen={!!hourData}
      onClose={onClose}
      title={time}
      borderColor="border-skyblue"
    >
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={hourData.weather[0].description}
        className="mx-auto bg-skyblue rounded-md w-16 mb-2"
      />

      <p className="capitalize text-center">{hourData.weather[0].description}</p>

      <div className="mt-4 space-y-2 flex flex-row flex-wrap gap-x-5 justify-center">
        <p>
          <strong>Temp:</strong> {Math.round(hourData.temp)}°F
        </p>
        <p>
          <strong>Humidity:</strong> {hourData.humidity}%
        </p>
        <p>
          <strong>Wind:</strong> {Math.round(hourData.wind_speed)} mph
        </p>
        {hourData.rain?.["1h"] > 0.5 && (
          <p>
            <strong>Rain:</strong> {millimetersToInches(hourData.rain["1h"])}"
          </p>
        )}
        <p>
          <strong>UVI:</strong> {hourData.uvi}
        </p>
      </div>
    </AlertDialog>
  );
};

export default HourlyForecastModal;