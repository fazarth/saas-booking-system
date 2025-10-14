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
    if (!formData.brand) newErrors.brand = "Brand wajib diisi.";
    if (!formData.model) newErrors.model = "Model Klinik wajib diisi.";
    if (!formData.year || formData.year <= 0)
      newErrors.year = "Tahun harus lebih dari 0.";
    if (!formData.type) newErrors.type = "Tipe wajib diisi";
    if (!formData.rentalPrice || formData.rentalPrice <= 0)
      newErrors.rentalPrice = "Harga Rental harus lebih dari 0.";
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
        <label className="block text-sm font-medium text-gray-700">Brand</label>
        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={(e) => {
            onChange(e);
            clearError("brand");
          }}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          placeholder="Ex: Toyota"
        />
        {errors.brand && <p className="text-sm text-red-500">{errors.brand}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Model</label>
        <input
          type="text"
          name="model"
          value={formData.model}
          onChange={(e) => {
            onChange(e);
            clearError("model");
          }}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          placeholder="Ex: Avanza"
        />
        {errors.model && <p className="text-sm text-red-500">{errors.model}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Tahun</label>
        <input
          type="number"
          name="year"
          value={formData.year}
          onChange={(e) => {
            onChange(e);
            clearError("year");
          }}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          placeholder="Ex: 2020"
        />
        {errors.year && <p className="text-sm text-red-500">{errors.year}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Tipe</label>
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={(e) => {
            onChange(e);
            clearError("type");
          }}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          placeholder="Ex: MPV"
        />
        {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Harga Rental
        </label>
        <input
          type="number"
          name="rentalPrice"
          value={formData.rentalPrice}
          onChange={(e) => {
            onChange(e);
            clearError("rentalPrice");
          }}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          placeholder="Ex: 4000000"
        />
        {errors.rentalPrice && (
          <p className="text-sm text-red-500">{errors.rentalPrice}</p>
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
