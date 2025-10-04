import React from "react";

const ResourceDetailForm = ({
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
          Location
        </label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          placeholder="Ex: Lantai 2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Capacity
        </label>
        <input
          type="number"
          name="capacity"
          value={formData.capacity}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          placeholder="Ex: 10"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Facilities
        </label>
        <input
          type="text"
          name="facilities"
          value={formData.facilities}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          placeholder="Ex: AC, Proyektor"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Floor</label>
        <input
          type="text"
          name="floor"
          value={formData.floor}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          placeholder="Ex: 2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Price
        </label>
        <input
          type="number"
          name="pricePerHour"
          value={formData.pricePerHour}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          placeholder="Ex: 150000"
        />
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

export default ResourceDetailForm;
