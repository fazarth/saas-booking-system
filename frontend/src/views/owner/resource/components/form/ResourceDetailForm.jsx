import React from "react";

const ResourceDetailForm = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        name="resourceName"
        value={formData.resourceName}
        onChange={onChange}
        placeholder="Resource Name"
        className="w-full rounded-lg border p-3"
        required
      />
      <input
        type="text"
        name="resourceType"
        value={formData.resourceType}
        onChange={onChange}
        placeholder="Resource Type"
        className="w-full rounded-lg border p-3"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={onChange}
        placeholder="Description (optional)"
        className="w-full rounded-lg border p-3"
      />
      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="linear rounded-[20px] bg-gray-300 px-6 py-2 text-sm font-medium hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="linear rounded-[20px] bg-brand-900 px-6 py-2 text-sm font-medium text-white"
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </div>
    </form>
  );
};

export default ResourceDetailForm;
