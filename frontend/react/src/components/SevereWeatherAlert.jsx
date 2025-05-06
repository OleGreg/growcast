import { useState } from "react";
import AlertDialog from "./AlertDialog";

const SevereWeatherAlerts = ({ weatherData }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const alerts = weatherData.weather.alerts;
  if (!alerts || alerts.length === 0) return null;

  return (
    <>
      {alerts.map((alert, index) => {
        const { sender_name, event, start, end, description, tags } = alert;

        const startTime = new Date(start * 1000).toLocaleString();
        const endTime = new Date(end * 1000).toLocaleString();

        return (
          <div key={index} className="w-[400px] max-w-full">
            <div
              className="weather-card severe-alert cursor-pointer border border-red-500 p-4 rounded-md transition"
              onClick={() => setOpenIndex(index)}
            >
              <div className="flex flex-row items-center justify-center gap-x-3">
                <span className="text-red-600 text-xl">⚠️</span>
                <h2 className="text-red-600 font-bold">{event}</h2>
              </div>
            </div>

            <AlertDialog
              isOpen={openIndex === index}
              onClose={() => setOpenIndex(null)}
              title={`⚠️ ${event}`}
              borderColor="border-red-500"
            >
              <p className="text-sm text-gray-500"><strong>Issued by:</strong> {sender_name}</p>
              <p><strong>Start:</strong> {startTime}</p>
              <p><strong>End:</strong> {endTime}</p>
              <p className="whitespace-pre-line my-7">{description}</p>
              {/* {tags.length > 0 && <p><strong>Tags:</strong> {tags.join(', ')}</p>} */}
            </AlertDialog>
          </div>
        );
      })}
    </>
  );
};

export default SevereWeatherAlerts;