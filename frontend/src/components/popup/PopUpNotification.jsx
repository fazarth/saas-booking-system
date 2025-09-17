import React from "react";

const PopUpNotification = ({ type, message, onClose }) => {
  const isError = type === "error";
  const icon = isError ? "❌" : "✅";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className={`w-full max-w-sm rounded-lg bg-white p-6 shadow-lg`}>
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
          className={`w-full rounded-lg bg-brand-900 py-2 text-white`}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PopUpNotification;
