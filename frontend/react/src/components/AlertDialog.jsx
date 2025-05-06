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
        className={`relative inline z-10 bg-white rounded-xl shadow-xl p-6 border-4 ${borderColor} overflow-y-auto max-h-[calc(100vh-32px)]`}
      >
        <div className="text-2xl font-bold mb-4 lg:mb-8 relative">
          <button onClick={onClose} className="flex ml-auto mb-4 modal-close-button lg:absolute lg:right-0 lg:top-0">
            Close
          </button>
          <div className="mx-auto lg:relative lg:top-2 pointer-events-none">{title}</div>
        </div>

        <div className="text-left text-gray-800 space-y-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;