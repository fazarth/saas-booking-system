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
    if (!formData.spesialization)
      newErrors.spesialization = "Spesialisasi wajib diisi.";
    if (!formData.clinicAddress)
      newErrors.clinicAddress = "Alamat Klinik wajib diisi.";
    if (!formData.fee || formData.fee <= 0)
      newErrors.fee = "Biaya harus lebih dari 0.";
    if (!formData.durationMin || formData.durationMin <= 0)
      newErrors.durationMin = "Durasi Menit harus lebih dari 0.";
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
          Spesialisasi
        </label>
        <input
          type="text"
          name="spesialization"
          value={formData.spesialization}
          onChange={(e) => {
            onChange(e);
            clearError("spesialization");
          }}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          placeholder="Ex: Mata"
        />
        {errors.spesialization && (
          <p className="text-sm text-red-500">{errors.spesialization}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Alamat Klinik
        </label>
        <input
          type="text"
          name="clinicAddress"
          value={formData.clinicAddress}
          onChange={(e) => {
            onChange(e);
            clearError("clinicAddress");
          }}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          placeholder="Ex: Jalan Merdeka, Jakarta"
        />
        {errors.clinicAddress && (
          <p className="text-sm text-red-500">{errors.clinicAddress}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Biaya</label>
        <input
          type="number"
          name="fee"
          value={formData.fee}
          onChange={(e) => {
            onChange(e);
            clearError("fee");
          }}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          placeholder="Ex: 150000"
        />
        {errors.fee && <p className="text-sm text-red-500">{errors.fee}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Durasi (Menit)
        </label>
        <input
          type="number"
          name="durationMin"
          value={formData.durationMin}
          onChange={(e) => {
            onChange(e);
            clearError("durationMin");
          }}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          placeholder="Ex: 30"
        />
        {errors.durationMin && (
          <p className="text-sm text-red-500">{errors.durationMin}</p>
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
