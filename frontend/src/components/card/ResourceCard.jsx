import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useState } from "react";
import Card from "components/card";
import PopUpConfirmation from "components/popup/PopUpConfirmation";

const ResourceCard = ({ title, description, type, isActive, image, extra }) => {
  const [heart, setHeart] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirmBooking = () => {
    setShowConfirm(false);
    console.log("Booking confirmed for:", title);
  };

  return (
    <Card
      extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white ${extra}`}
    >
      <div className="h-full w-full">
        {/* Header section */}
        {image && (
          <div className="relative mb-3 w-full">
            <img
              src={image}
              alt={title}
              className="h-full w-full rounded-xl object-cover"
            />
            <button
              onClick={() => setHeart(!heart)}
              className="absolute right-3 top-3 flex items-center justify-center rounded-full bg-white p-2 text-brand-500 hover:cursor-pointer"
            >
              <div className="flex h-full w-full items-center justify-center rounded-full text-xl hover:bg-gray-50 dark:text-navy-900">
                {heart ? (
                  <IoHeartOutline />
                ) : (
                  <IoHeart className="text-brand-500" />
                )}
              </div>
            </button>
          </div>
        )}

        {/* Content */}
        <div className="mb-3 flex flex-col items-start px-1">
          <p className="w-full truncate text-lg font-bold text-navy-700 dark:text-white">
            {title}
          </p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            {description}
          </p>
          <p className="mt-2 text-xs text-gray-500">Type: {type}</p>
          <p className="mt-1 text-xs text-gray-500">
            Status: {isActive ? "Active ✅" : "Inactive ❌"}
          </p>
        </div>

        {/* Action button */}
        <div className="flex justify-end">
          <button
            onClick={() => setShowConfirm(true)}
            className="linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
          >
            Book Now
          </button>
        </div>
      </div>
      {showConfirm && (
        <PopUpConfirmation
          title="Confirm Booking"
          message={`Are you sure want to book "${title}"`}
          onConfirm={handleConfirmBooking}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </Card>
  );
};

export default ResourceCard;
