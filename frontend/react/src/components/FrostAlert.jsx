import { useState } from "react";
import { format } from "date-fns";
import AlertDialog from "./AlertDialog";
import frostIcon from "../assets/images/frost_alert.svg";

const FrostAlert = ({ daily }) => {
  const [openAlert, setOpenAlert] = useState(false);
  if (!daily) return null;

  const frost_alerts_check = (day) => Math.round(day.temp.min) <= 34;
  const frost_alerts_exist = daily.some(frost_alerts_check);
  if (!frost_alerts_exist) return null;

  const soft_frost_days = daily.map((day, index) => {
    const minTemp = Math.round(day.temp.min);
    const maxTemp = Math.round(day.temp.max);
    const readableDate = format(new Date(day.dt * 1000), "EEEE, MMMM do");

    if (minTemp > 32 && minTemp <= 34) {
      return (
        <li key={index} className="list-none font-bold text-lg text-skyblue">
          <p>
            On {readableDate}, the low is {minTemp}°F and the high is {maxTemp}°F.
          </p>
        </li>
      );
    }
    return null;
  }).filter(Boolean);

  const frost_days = daily.map((day, index) => {
    const minTemp = Math.round(day.temp.min);
    const maxTemp = Math.round(day.temp.max);
    const readableDate = format(new Date(day.dt * 1000), "EEEE, MMMM do");

    if (minTemp <= 32) {
      return (
        <li key={index} className="list-none font-bold text-lg text-skyblue">
          <p>
            On {readableDate}, the low is {minTemp}°F and the high is {maxTemp}°F.
          </p>
        </li>
      );
    }
    return null;
  }).filter(Boolean);

  return (
    <>
      <div
        className="weather-card frost-alert w-[400px] max-w-full cursor-pointer"
        onClick={() => setOpenAlert(true)}
      >
        <div className="flex flex-row items-center justify-center gap-x-5">
          <img
            src={frostIcon}
            alt="Frost warning"
            title="Frost Alert!"
            className="w-7 h-auto frost-pulse rounded-full p-[3px] border border-white"
          />
          <h2>Frost Alert!</h2>
        </div>
      </div>

      <AlertDialog
        isOpen={openAlert}
        onClose={() => setOpenAlert(false)}
        title="Frost Alert!"
        borderColor="border-skyblue"
      >
        {frost_days.length > 0 && (
          <div className="mt-4 space-y-2">
            <p>
              According to the current forecast, the following days will experience
              freezing temps:
            </p>
            <ul>{frost_days}</ul>
            <p>Cover vulnerable crops and move plants indoors.</p>
          </div>
        )}

        {soft_frost_days.length > 0 && (
          <div className="mt-4 space-y-2">
            <p>
              According to the current forecast, the following days have temps that
              are close to freezing:
            </p>
            <ul>{soft_frost_days}</ul>
          </div>
        )}

        {(frost_days.length > 0 || soft_frost_days.length > 0) && (
          <div className="mt-4 space-y-2">
            <p>Monitor the weather and plan accordingly.</p>
            <p>Lowest daily temperatures typically occur just before sunrise.</p>
            <p>Cover vulnerable crops and move potted plants indoors if needed.</p>
          </div>
        )}
      </AlertDialog>
    </>
  );
};

export default FrostAlert;