import { useState } from 'react';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
} from '@headlessui/react';
import { toTitleCase } from "../services/formattingService";
import toggleArrow from "../assets/images/toggle_arrow.svg";
import HourlyForecastModal from './HourlyForecastModal';
import { millimetersToInches } from '../services/formattingService';

const HourlyForecast = ({ hourly }) => {
  const [selectedHour, setSelectedHour] = useState(null);
  if (!hourly) return <div>No weather data available</div>;

  const hoursToDisplay = hourly.slice(1, 13);

  return (
    <>
      <div className="weather-card w-[400px] max-w-full">
        <Disclosure>
          {({ open }) => (
            <div>
              <DisclosureButton className="toggle-click flex justify-between items-center w-full cursor-pointer">
                <h2>Hourly Forecast</h2>
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
                    {hoursToDisplay.map((hour, index) => {
                      const date = new Date(hour.dt * 1000);
                      const time = date.toLocaleTimeString([], {
                        hour: 'numeric',
                        hour12: true,
                      });

                      return (
                        <li
                          key={index}
                          className="hour-card flex justify-between px-4 py-2 items-center
                          rounded-md border-2 border-skyblue cursor-pointer transition-colors hover:bg-sproutgreen/25"
                          onClick={() => setSelectedHour(hour)}
                        >
                          <p className="text-left w-14"><strong>{time}</strong></p>
                          <p className="text-left w-14">{Math.round(hour.temp)}°F</p>
                          <img
                            className="bg-skyblue w-10 rounded-md"
                            src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                            alt={hour.weather[0].description}
                          />
                          <p className="text-right w-36">
                          {hour.rain?.['1h'] > 0.5
                            ? `Rain: ${millimetersToInches(hour.rain['1h'])}"`
                            : toTitleCase(hour.weather[0].description)}
                          </p>
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
      { selectedHour && (
        <HourlyForecastModal 
          hourData={selectedHour}
          onClose={() => setSelectedHour(null)}
        />
      )}
    </>
  );
};

export default HourlyForecast;