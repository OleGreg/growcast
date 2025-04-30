import { useState } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Fragment } from 'react';

const SevereWeatherAlert = ({ alert }) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    sender_name,
    event,
    start,
    end,
    description,
    tags
  } = alert;

  const startTime = new Date(start * 1000).toLocaleString();
  const endTime = new Date(end * 1000).toLocaleString();

  return (
    <>
      <h2 
        className="text-red-600 font-bold underline cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        ⚠️ {event}
      </h2>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
          </TransitionChild>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="mx-auto max-w-md rounded bg-white p-6 shadow-xl">
                <DialogTitle className="text-lg font-bold text-red-700">
                  {event}
                </DialogTitle>

                <p className="text-sm text-gray-600 mb-2">Issued by: {sender_name}</p>
                <p className="mb-2"><strong>Start:</strong> {startTime}</p>
                <p className="mb-2"><strong>End:</strong> {endTime}</p>
                <p className="mb-4 whitespace-pre-line">{description}</p>
                <div className="mb-4">
                  <strong>Tags:</strong> {tags.join(', ')}
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Close
                </button>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SevereWeatherAlert;