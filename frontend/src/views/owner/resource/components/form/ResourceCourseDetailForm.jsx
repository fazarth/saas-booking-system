import React, { useState } from "react";

const ResourceCourseDetailForm = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
  loading,
}) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.subject) newErrors.subject = "Subject wajib diisi.";
    if (!formData.level) newErrors.level = "Level wajib diisi.";
    if (!formData.durationPerHours || formData.durationPerHours <= 0)
      newErrors.durationPerHours = "Durasi per jam harus lebih dari 0.";
    if (!formData.fee || formData.fee <= 0)
      newErrors.fee = "Biaya harus lebih dari 0.";
    if (!formData.courseType) newErrors.courseType = "Course Type wajib diisi.";
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
          Subject
        </label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={(e) => {
            onChange(e);
            clearError("subject");
          }}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          placeholder="Ex: Matematika"
        />
        {errors.subject && (
          <p className="text-sm text-red-500">{errors.subject}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Level</label>
        <input
          type="text"
          name="level"
          value={formData.level}
          onChange={(e) => {
            onChange(e);
            clearError("level");
          }}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          placeholder="Ex: SMA"
        />
        {errors.level && <p className="text-sm text-red-500">{errors.level}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Durasi Per Jam
        </label>
        <input
          type="number"
          name="durationPerHours"
          value={formData.durationPerHours}
          onChange={(e) => {
            onChange(e);
            clearError("durationPerHours");
          }}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          placeholder="Ex: 50"
        />
        {errors.durationPerHours && (
          <p className="text-sm text-red-500">{errors.durationPerHours}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Biaya</label>
        <input
          type="number"
          step="0.01"
          name="fee"
          value={formData.fee}
          onChange={(e) => {
            onChange(e);
            clearError("fee");
          }}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          placeholder="Ex: 100000"
        />
        {errors.fee && <p className="text-sm text-red-500">{errors.fee}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Course Type
        </label>
        <input
          type="text"
          name="courseType"
          value={formData.courseType}
          onChange={(e) => {
            onChange(e);
            clearError("courseType");
          }}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          placeholder="Ex: Online"
        />
        {errors.courseType && (
          <p className="text-sm text-red-500">{errors.courseType}</p>
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

export default ResourceCourseDetailForm;
