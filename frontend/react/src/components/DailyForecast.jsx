import { useState } from 'react';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
} from '@headlessui/react';
import toggleArrow from "../assets/images/toggle_arrow.svg";
import frostIcon from "../assets/images/frost_alert.svg";
import DailyForecastModal from './DailyForecastModal';
import { toTitleCase, millimetersToInches } from '../services/formattingService';

const DailyForecast = ({ daily }) => {
  const [selectedDay, setSelectedDay] = useState(null);

  if (!daily) return <div>No weather data available</div>;

  const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <>
      <div className="weather-card daily-forecast-card w-[400px] max-w-full">
        <Disclosure>
          {({ open }) => (
            <div>
              <DisclosureButton className="toggle-click flex justify-between items-center w-full cursor-pointer p-5">
                <h2>Daily Forecast</h2>
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
                <DisclosurePanel as="div" className="toggle-body overflow-hidden">
                  <ul className="flex flex-col gap-y-4 px-5 pb-5">
                    {daily.map((day, index) => {
                      const date = new Date(day.dt * 1000);
                      const dayName = weekdayNames[date.getDay()];
                      const icon = day.weather[0].icon;
                      const minTemp = Math.round(day.temp.min);

                      // Determine frost status
                      let frostClass = "border-skyblue";
                      let showFrostIcon = false;
                    
                      // if (minTemp <= 35 ) {
                      //   frostClass = "border-red";
                      // }
                      if (minTemp <= 32) {
                        showFrostIcon = true;
                      }

                      return (
                        <li
                          key={index}
                          className={`hour-card flex justify-between px-4 py-2 items-center relative
                          rounded-md border-2 ${frostClass} cursor-pointer transition-colors hover:bg-sproutgreen/25`}
                          onClick={() => setSelectedDay(day)}
                        >
                          <p className="text-left w-14"><strong>{dayName}</strong></p>
                          <p className="text-left w-26">{Math.round(day.temp.max)}° / {Math.round(day.temp.min)}°</p>
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
                          {showFrostIcon && (
                            <img
                              src={frostIcon}
                              alt="Frost warning"
                              className="w-7 h-auto absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3 p-[3px] frost-pulse rounded-full border border-skyblue"
                              title="Frost Alert!"
                            />
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </DisclosurePanel>
              </Transition>
            </div>
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