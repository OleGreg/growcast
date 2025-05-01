// src/components/ForecastModal.jsx
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Fragment } from 'react';
import { format } from 'date-fns';

const ForecastModal = ({ dayData, onClose }) => {
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
            <DialogPanel className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 text-center relative">
              <DialogTitle className="text-xl font-bold mb-4">
                {readableDate}
              </DialogTitle>

              <img
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt={dayData.weather[0].description}
                className="mx-auto bg-skyblue rounded-md"
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
                  {dayData.rain && <p><strong>Total Rainfall:</strong> {Math.round((dayData.rain / 25.4) * 100) / 100}"</p>}
                  <p><strong>UVI:</strong> {dayData.uvi} </p>
                </div>

              </div>

              <div className="absolute top-6 right-6">
                <button
                  onClick={onClose}
                  className="inline-flex justify-center rounded-md bg-skyblue px-4 py-2 text-white font-semibold hover:bg-skyblue/70 transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ForecastModal;