// src/components/DailyForecastModal.jsx
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Fragment } from 'react';
import { format } from 'date-fns';
import { millimetersToInches } from '../services/formattingService';
import frostIcon from "../assets/images/frost_alert.svg";


const DailyForecastModal = ({ dayData, onClose }) => {
  if (!dayData) return null;

  const date = new Date(dayData.dt * 1000);
  const readableDate = format(date, 'EEEE, MMMM do');
  const icon = dayData.weather[0].icon;

  return (
    <Transition show={!!dayData} as={Fragment}>
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
                {readableDate}
                <button
                  onClick={onClose}
                  className="modal-close-button"
                >
                  Close
                </button>
              </DialogTitle>

              <img
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt={dayData.weather[0].description}
                className="mx-auto bg-skyblue rounded-md w-16"
              />

              <div className="mt-4 space-y-2">
                <p>{dayData.summary}</p>
                <div className="flex flex-row justify-center gap-3">
                  <p><strong>Low:</strong> {Math.round(dayData.temp.min)}°F</p>
                  <p><strong>High:</strong> {Math.round(dayData.temp.max)}°F</p>
                </div>
                <div className="flex flex-row justify-center gap-3">
                  <p><strong>Humidity:</strong> {dayData.humidity}%</p>
                  <p><strong>Wind:</strong> {Math.round(dayData.wind_speed)} mph</p>
                </div>
                <div className="flex flex-row justify-center gap-3">
                  {dayData.rain && <p><strong>Total Rainfall:</strong> {millimetersToInches(dayData.rain)}"</p>}
                  <p><strong>UVI:</strong> {dayData.uvi} </p>
                </div>
                {(Math.round(dayData.temp.min) <= 32) &&
                  <div className="flex flex-row justify-center items-center gap-3">
                    <img
                      src={frostIcon}
                      alt="Frost warning"
                      className="w-8 h-auto"
                      title="Frost Alert!"
                    />
                    <p className="text-skyblue">Frost warning in effect!</p>
                  </div>
                }
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DailyForecastModal;