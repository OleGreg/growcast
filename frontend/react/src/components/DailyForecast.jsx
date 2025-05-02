import { useState } from 'react';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
} from '@headlessui/react';
import toggleArrow from "../assets/images/toggle_arrow.svg";
import DailyForecastModal from './DailyForecastModal';
import { toTitleCase, millimetersToInches } from '../services/formattingService';

const DailyForecast = ({ daily }) => {
  const [selectedDay, setSelectedDay] = useState(null);

  if (!daily) return <div>No weather data available</div>;

  const daysToDisplay = daily.slice(0, 8);
  const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <>
      <div className="weather-card w-[400px] max-w-full">
        <Disclosure>
          {({ open }) => (
            <>
              <DisclosureButton className="toggle-click flex justify-between items-center w-full cursor-pointer">
                <h2>7 Day Forecast</h2>
                <img
                  src={toggleArrow}
                  alt="Toggle"
                  className={`transition-transform duration-300 ${open ? "rotate-90" : ""}`}
                />
              </DisclosureButton>

              <Transition
                show={open}
                enter="transition ease-out duration-300"
                enterFrom="opacity-0 max-h-0"
                enterTo="opacity-100 max-h-screen"
                leave="transition ease-in duration-200"
                leaveFrom="opacity-100 max-h-screen"
                leaveTo="opacity-0 max-h-0"
              >
                <DisclosurePanel static className="toggle-body overflow-hidden">
                  <ul className="flex flex-col gap-y-4 mt-5">
                    {daysToDisplay.map((day, index) => {
                      const date = new Date(day.dt * 1000);
                      const dayName = weekdayNames[date.getDay()];
                      const icon = day.weather[0].icon;

                      return (
                        <li
                          key={index}
                          className="hour-card flex justify-between px-4 py-2 items-center
                          rounded-md border-2 border-skyblue cursor-pointer transition-colors hover:bg-sproutgreen/25"
                          onClick={() => setSelectedDay(day)}
                        >
                          <p className="text-left w-10"><strong>{dayName}</strong></p>
                          <p className="text-left w-20">{Math.round(day.temp.max)}° / {Math.round(day.temp.min)}°</p>
                          <img
                            className="bg-skyblue w-10 rounded-md"
                            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                            alt={day.weather[0].description}
                          />
                          <p className="text-right w-36">
                            {day.rain && day.rain > 0.5
                              ? `Rain: ${millimetersToInches(day.rain)}"`
                              : toTitleCase(day.weather[0].description)}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </DisclosurePanel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>

      {selectedDay && (
        <DailyForecastModal
          dayData={selectedDay}
          onClose={() => setSelectedDay(null)}
        />
      )}
    </>
  );
};

export default DailyForecast;