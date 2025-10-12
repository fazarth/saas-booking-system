import React from "react";

const ResourceCourseDetailForm = ({
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
          Subject
        </label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          placeholder="Ex: Matematika"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Level</label>
        <input
          type="text"
          name="level"
          value={formData.level}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          placeholder="Ex: SMA"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Durasi Per Jam
        </label>
        <input
          type="number"
          name="durationPerHours"
          value={formData.durationPerHours}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          placeholder="Ex: 2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Biaya</label>
        <input
          type="number"
          step="0.01"
          name="fee"
          value={formData.fee}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          placeholder="Ex: 100000"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Course Type
        </label>
        <input
          type="text"
          name="courseType"
          value={formData.courseType}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          placeholder="Ex: Online"
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

export default ResourceCourseDetailForm;
