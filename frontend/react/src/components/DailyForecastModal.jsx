import AlertDialog from "./AlertDialog";
import { format } from "date-fns";
import { millimetersToInches } from "../services/formattingService";
import frostIcon from "../assets/images/frost_alert.svg";

const DailyForecastModal = ({ dayData, onClose }) => {
  if (!dayData) return null;

  const date = new Date(dayData.dt * 1000);
  const readableDate = format(date, "EEEE, MMMM do");
  const icon = dayData.weather[0].icon;

  return (
    <AlertDialog
      isOpen={!!dayData}
      onClose={onClose}
      title={readableDate}
      borderColor="border-skyblue"
    >
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={dayData.weather[0].description}
        className="mx-auto bg-skyblue rounded-md w-16"
      />

      <div className="mt-4 space-y-2">
        <p className="text-center">{dayData.summary}</p>

        <div className="flex flex-row justify-center gap-3">
          <p>
            <strong>Low:</strong> {Math.round(dayData.temp.min)}°F
          </p>
          <p>
            <strong>High:</strong> {Math.round(dayData.temp.max)}°F
          </p>
        </div>

        <div className="flex flex-row justify-center gap-3">
          <p>
            <strong>Humidity:</strong> {dayData.humidity}%
          </p>
          <p>
            <strong>Wind:</strong> {Math.round(dayData.wind_speed)} mph
          </p>
        </div>

        <div className="flex flex-row justify-center gap-3">
          {dayData.rain && (
            <p>
              <strong>Total Rainfall:</strong>{" "}
              {millimetersToInches(dayData.rain)}"
            </p>
          )}
          <p>
            <strong>UVI:</strong> {dayData.uvi}
          </p>
        </div>

        {Math.round(dayData.temp.min) <= 32 && (
          <div className="flex flex-row justify-center items-center gap-3">
            <img
              src={frostIcon}
              alt="Frost warning"
              className="w-8 h-auto"
              title="Frost Alert!"
            />
            <p className="text-skyblue">Frost warning in effect!</p>
          </div>
        )}
      </div>
    </AlertDialog>
  );
};

export default DailyForecastModal;