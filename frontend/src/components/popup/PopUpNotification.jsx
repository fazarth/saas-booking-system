import React, { useEffect, useState } from "react";

const PopUpNotification = ({ type, message, onClose }) => {
  const [visible, setVisible] = useState(false);

  const isError = type === "error";
  const icon = isError ? "❌" : "✅";

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose?.();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div
        className={`
          w-full max-w-sm transform rounded-lg bg-white p-6 shadow-lg transition-all duration-300
          ${visible ? "scale-100 opacity-100" : "scale-90 opacity-0"}
        `}
      >
        <div className="mb-4 flex flex-col items-center justify-between">
          <h2 className="text-center text-xl font-semibold">
            {isError ? "Error" : "Success"}
          </h2>
        </div>
        <span className="flex flex-col items-center justify-center text-4xl">
          {icon}
        </span>
        <p className="my-8 text-center text-gray-700">{message}</p>
        <button
          className="w-full rounded-lg bg-brand-900 py-2 text-white"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PopUpNotification;
