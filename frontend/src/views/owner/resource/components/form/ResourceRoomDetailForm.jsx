import React, { useState } from "react";

const ResourceRoomDetailForm = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
  loading,
}) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.location) newErrors.location = "Lokasi wajib diisi.";
    if (!formData.capacity) newErrors.capacity = "Kapasitas wajib diisi.";
    if (!formData.facilities) newErrors.facilities = "Fasilitas wajib diisi.";
    if (!formData.floor) newErrors.floor = "Lantai wajib diisi.";
    if (!formData.pricePerHour || formData.pricePerHour <= 0)
      newErrors.pricePerHour = "Harga harus lebih dari 0.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(e);
    }
  };

  const clearError = (field) => {
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Lokasi
        </label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={(e) => {
            onChange(e);
            clearError("location");
          }}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          placeholder="Ex: Puncak Bogor"
        />
        {errors.location && (
          <p className="mt-1 text-sm text-red-500">{errors.location}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Kapasitas
        </label>
        <input
          type="number"
          name="capacity"
          value={formData.capacity}
          onChange={(e) => {
            onChange(e);
            clearError("capacity");
          }}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          placeholder="Ex: 10"
        />
        {errors.capacity && (
          <p className="mt-1 text-sm text-red-500">{errors.capacity}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Fasilitas
        </label>
        <input
          type="text"
          name="facilities"
          value={formData.facilities}
          onChange={(e) => {
            onChange(e);
            clearError("facilities");
          }}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          placeholder="Ex: AC, Proyektor"
        />
        {errors.facilities && (
          <p className="mt-1 text-sm text-red-500">{errors.facilities}</p>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Lantai
          </label>
          <input
            type="text"
            name="floor"
            value={formData.floor}
            onChange={(e) => {
              onChange(e);
              clearError("floor");
            }}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            placeholder="Ex: 2"
          />
          {errors.floor && (
            <p className="mt-1 text-sm text-red-500">{errors.floor}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          name="pricePerHour"
          value={formData.pricePerHour}
          onChange={(e) => {
            onChange(e);
            clearError("pricePerHour");
          }}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          placeholder="Ex: 150000"
        />
        {errors.pricePerHour && (
          <p className="mt-1 text-sm text-red-500">{errors.pricePerHour}</p>
        )}
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
          className="linear rounded-[20px] bg-brand-900 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default ResourceRoomDetailForm;
