import { useState, Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild
} from "@headlessui/react";
import { format } from 'date-fns';
import frostIcon from "../assets/images/frost_alert.svg";

const FrostAlert = ({ daily }) => {
  const [openAlert, setOpenAlert] = useState(false);
  if (!daily) return null;

  const frost_alerts_check = (day) => Math.round(day.temp.min) <= 35;
  const frost_alerts_exist = daily.some(frost_alerts_check);

  if(!frost_alerts_exist) {
    return null;
  }

  const soft_frost_days = daily.map((day, index) => {
    const date = new Date(day.dt * 1000);
    const readableDate = format(date, 'EEEE, MMMM do');
    if(Math.round(day.temp.min) > 32 && Math.round(day.temp.min) <= 35) {
      return (
        <li 
          key={index}
          className="list-none font-bold text-lg text-skyblue"                              
        >
          <p>On {readableDate}, the low is {Math.round(day.temp.min)}°F and the high is {Math.round(day.temp.max)}°F.</p>
        </li>
      );
    }
  });

  const frost_days = daily.map((day, index) => {
    const date = new Date(day.dt * 1000);
    const readableDate = format(date, 'EEEE, MMMM do');
    if(Math.round(day.temp.min) <=32 ) {
      return (
        <li 
          key={index}
          className="list-none font-bold text-lg text-skyblue"                              
        >
          <p>On {readableDate}, the low is {Math.round(day.temp.min)}°F and the high is {Math.round(day.temp.max)}°F.</p>
        </li>
      );
    }
  });

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

      <Transition show={openAlert} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpenAlert}>
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
                  <h2 className="text-skyblue">Frost Alert!</h2>
                  <button
                    onClick={() => setOpenAlert(false)}
                    className="modal-close-button"
                  >
                    Close
                  </button>
                </DialogTitle>
                {/* Normal Frost Alert (below freezing forecasted). 
                Our frost_days will be an array with a length, so we need to check to make sure there's a value that's defined */}
                { frost_days.some(index => index !== undefined)  &&
                  <div className="mt-4 space-y-2">
                    <p>According to the current forecast, the following days will experience freezing temps:</p>
                    <ul>
                      {frost_days}
                    </ul>
                    <p>Cover vulnerable crops and move plants indoors</p>
                  </div>
                }

                {/* A soft frost alert, 32-35 degree temps forecasted */}
                { soft_frost_days.some(index => index!== undefined) &&
                  <div className="mt-4 space-y-2">
                    <p>According to the current forecast, the following days have temps that are close to freezing:</p>
                    <ul>
                      {soft_frost_days}
                    </ul>
                  </div>
                }

                { (soft_frost_days.some(index => index!== undefined) || frost_days.some(index => index !== undefined)) &&
                  <div className="mt-4 space-y-2">
                    <p>Monitor the weather and plan accordingly.</p>
                    <p>Lowest daily temperatures typically occur just before sunrise.</p>
                    <p>Cover vulnerable crops and move potted plants indoors if needed.</p>
                  </div>
                }
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default FrostAlert;