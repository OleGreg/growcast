import { useEffect } from "react";

const AlertDialog = ({ isOpen, onClose, title, borderColor = "border-skyblue", children }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute h-full w-full top-0 left-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={`relative inline z-10 bg-white rounded-xl shadow-xl p-6 text-center border-4 ${borderColor} overflow-y-auto max-h-[calc(100vh-32px)]`}
      >
        <div className="text-2xl font-bold mb-4 flex flex-row justify-center items-center">
          <div className="text-center mx-auto">{title}</div>
          <button onClick={onClose} className="modal-close-button">
            Close
          </button>
        </div>

        <div className="text-left text-gray-800 space-y-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;