import React from "react";

const SlotsAvailabilityForm = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
  loading,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Day of Week
        </label>
        <input
          type="text"
          name="dayOfWeek"
          value={formData.dayOfWeek}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          placeholder="e.g. Monday"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Start Time
        </label>
        <input
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          End Time
        </label>
        <input
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Start Date
        </label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          End Date
        </label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="isActive"
          checked={formData.isActive}
          onChange={(e) =>
            onChange({ target: { name: "isActive", value: e.target.checked } })
          }
          className="mr-2"
        />
        <label>Active</label>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="linear rounded-[20px] bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="linear rounded-[20px] bg-blue-600 bg-brand-900 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default SlotsAvailabilityForm;
