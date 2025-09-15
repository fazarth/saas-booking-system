import React, { useEffect, useState } from "react";

const PopUpConfirmation = ({ title, message, onConfirm, onCancel }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleCancel = () => {
    setVisible(false);
    setTimeout(() => {
      onCancel?.();
    }, 300);
  };

  const handleConfirm = () => {
    setVisible(false);
    setTimeout(() => {
      onConfirm?.();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div
        className={`w-full max-w-sm transform rounded-lg bg-white p-6 shadow-lg transition-all duration-300 ${
          visible ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        <div className="mb-4 text-center">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        </div>
        <p className="mb-6 text-center text-gray-700">{message}</p>
        <div className="flex justify-between">
          <button
            className="w-[45%] rounded-lg bg-gray-300 py-2 text-gray-800 hover:bg-gray-400"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="w-[45%] rounded-lg bg-red-600 py-2 text-white hover:bg-red-700"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpConfirmation;
