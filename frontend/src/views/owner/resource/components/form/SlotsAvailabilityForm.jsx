import React, { useState } from "react";

const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu", "Minggu"];

const SlotsAvailabilityForm = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
  loading,
}) => {
  const [errors, setErrors] = useState({});

  const handleDayChange = (day) => {
    let updated = [...(formData.dayOfWeek || [])];
    if (updated.includes(day)) {
      updated = updated.filter((d) => d !== day);
    } else {
      updated.push(day);
    }
    onChange({ target: { name: "dayOfWeek", value: updated } });

    if (updated.length > 0) {
      clearError("dayOfWeek");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.dayOfWeek || formData.dayOfWeek.length === 0) {
      newErrors.dayOfWeek = "Pilih minimal 1 hari.";
    }
    if (!formData.startTime) newErrors.startTime = "Start Time wajib diisi.";
    if (!formData.endTime) newErrors.endTime = "End Time wajib diisi.";
    if (!formData.startDate) newErrors.startDate = "Start Date wajib diisi.";
    if (!formData.endDate) newErrors.endDate = "End Date wajib diisi.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(e);
    }
  };

  const clearError = (field) => {
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Day of Week
        </label>
        <div className="mt-2 flex flex-wrap gap-2">
          {days.map((day) => (
            <label key={day} className="flex items-center space-x-1">
              <input
                type="checkbox"
                checked={formData.dayOfWeek?.includes(day) || false}
                onChange={(e) => {
                  handleDayChange(day);
                  clearError("dayOfWeek");
                }}
              />
              <span>{day}</span>
            </label>
          ))}
        </div>
        {errors.dayOfWeek && (
          <p className="text-sm text-red-500">{errors.dayOfWeek}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Start Time
        </label>
        <input
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={(e) => {
            onChange(e);
            clearError("startTime");
          }}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
        />
        {errors.startTime && (
          <p className="text-sm text-red-500">{errors.startTime}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          End Time
        </label>
        <input
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={(e) => {
            onChange(e);
            clearError("endTime");
          }}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
        />
        {errors.endTime && (
          <p className="text-sm text-red-500">{errors.endTime}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Start Date
        </label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={(e) => {
            onChange(e);
            clearError("startDate");
          }}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
        />
        {errors.startDate && (
          <p className="text-sm text-red-500">{errors.startDate}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          End Date
        </label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={(e) => {
            onChange(e);
            clearError("endDate");
          }}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
        />
        {errors.endDate && (
          <p className="text-sm text-red-500">{errors.endDate}</p>
        )}
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
