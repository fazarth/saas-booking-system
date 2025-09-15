import React, { useState, useRef, useEffect } from "react";
import InputField from "components/fields/InputField";
import Dropdown from "components/dropdown";

function useOutsideAlerter(ref, setX) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setX(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setX]);
}

const ResourceForm = ({ form, onChange, onSubmit, onCancel, loading }) => {
  const options = ["Course", "Health", "Room", "Vehicle"];
  const [selectedType, setSelectedType] = useState(form.resourceType || "");
  const [openWrapper, setOpenWrapper] = useState(false);

  const dropdownRef = useRef(null);
  useOutsideAlerter(dropdownRef, setOpenWrapper);

  const handleSelectType = (value) => {
    setSelectedType(value);
    onChange({ target: { name: "resourceType", value } });
    setOpenWrapper(false);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <InputField
        label="Resource Name"
        id="resourceName"
        type="text"
        placeholder="Resource Name"
        value={form.resourceName}
        onChange={onChange}
      />
      <div ref={dropdownRef} className="relative flex w-full flex-col">
        <label className="ml-3 text-sm font-bold text-navy-700 dark:text-white">
          Resource Type
        </label>
        <Dropdown
          button={
            <button
              type="button"
              className="w-full rounded-lg border p-3 text-left"
              onClick={() => setOpenWrapper(!openWrapper)}
            >
              {selectedType ? selectedType : "Type"}
            </button>
          }
          openWrapper={openWrapper}
          setOpenWrapper={setOpenWrapper}
          wrapperClassNames="w-full"
          classNames="absolute left-0 w-full rounded-lg border bg-white shadow-lg mt-2 z-50"
        >
          {options.map((opt) => (
            <div
              key={opt}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              onClick={() => handleSelectType(opt)}
            >
              {opt}
            </div>
          ))}
        </Dropdown>
      </div>
      <InputField
        label="Description (optional)"
        id="description"
        type="text"
        placeholder="Description (optional)"
        value={form.description}
        onChange={onChange}
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
          className="linear rounded-[20px] bg-brand-900 px-6 py-2 text-sm font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </div>
    </form>
  );
};

export default ResourceForm;
