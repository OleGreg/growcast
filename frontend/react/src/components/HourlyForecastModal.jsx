// src/components/HourlyForecastModal.jsx
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { Fragment } from 'react';
import { millimetersToInches } from '../services/formattingService';

const HourlyForecastModal = ({ hourData, onClose }) => {
  if (!hourData) return null;
  const date = new Date(hourData.dt * 1000);
  const time = date.toLocaleTimeString([], {
    hour: 'numeric',
    hour12: true,
  });
  const icon = hourData.weather[0].icon;

  return (
    <Transition show={!!hourData} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 text-center relative border-4 border-skyblue">
              <DialogTitle className="text-xl font-bold mb-4 grid grid-cols-3 items-center">
                <div></div>
                {time}
                <button
                  onClick={onClose}
                  className="w-20 ml-auto text-lg inline-flex justify-center rounded-md bg-skyblue px-4 py-2 text-white font-semibold hover:bg-skyblue/70 transition cursor-pointer"
                >
                  Close
                </button>
              </DialogTitle>

              <img
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt={hourData.weather[0].description}
                className="mx-auto bg-skyblue rounded-md w-16 mb-2"
              />

              <p className="capitalize">{hourData.weather[0].description}</p>


              <div className="mt-4 space-y-2 flex flex-row flex-wrap gap-x-5 justify-center">
                <p><strong>Temp:</strong> {Math.round(hourData.temp)}°F</p>
                <p><strong>Humidity:</strong> {hourData.humidity}%</p>
                <p><strong>Wind:</strong> {Math.round(hourData.wind_speed)} mph</p>
                {hourData.rain?.['1h'] > 0.5 && (
                  <p><strong>Rain:</strong> {millimetersToInches(hourData.rain['1h'])}"</p>
                )}
                <p><strong>UVI:</strong> {hourData.uvi}</p>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default HourlyForecastModal;