import React, { useState, useEffect } from "react";
import axios from "../../../../api/axios";
import PopUpNotification from "components/popup/PopUpNotification";
import ResourceForm from "./ResourceForm";

const ResourcesHeader = ({ onCreateSuccess }) => {
  const [showModal, setShowModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({
    resourceName: "",
    resourceType: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!form.resourceName || !form.resourceType) {
      setError("Resource Name and Type are required");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("/resources", form);
      console.log("Resource created:", res.data);
      handleCloseModal();
      setForm({ resourceName: "", resourceType: "", description: "" });

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
      onCreateSuccess?.();
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.error || "Failed to create resource";
      setError(msg);
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setForm({ resourceName: "", resourceType: "", description: "" });
    setVisible(false);
    setTimeout(() => setShowModal(false), 10);
  };

  useEffect(() => {
    if (showModal) {
      setTimeout(() => setVisible(true), 10);
    }
  }, [showModal]);

  return (
    <>
      {/* Header */}
      <div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
        <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
          Available Resources
        </h4>
        <ul className="mt-4 flex items-center justify-between md:mt-0 md:justify-center md:!gap-5 2xl:!gap-12">
          <li>
            <button
              className="linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
              onClick={() => setShowModal(true)}
            >
              Create Resource
            </button>
          </li>
        </ul>
      </div>

      {/* Modal Create Resource */}
      {showModal && (
        <div className="bg-black/50 fixed inset-0 z-10 flex items-center justify-center">
          <div
            className={`transform rounded-xl border border-gray-300 bg-white p-6 shadow-lg transition-all duration-300 ease-out
              ${
                visible ? "scale-100 opacity-100" : "scale-90 opacity-0"
              } w-full max-w-3xl`}
          >
            <h3 className="mb-4 text-2xl font-bold text-navy-700 dark:text-white">
              Create Resource
            </h3>

            {error && <p className="mb-2 text-sm text-red-500">{error}</p>}

            {/* ResourceForm terbaru dengan dropdown */}
            <ResourceForm
              form={form}
              onChange={handleChange}
              onSubmit={handleSubmit}
              onCancel={handleCloseModal}
              loading={loading}
            />
          </div>
        </div>
      )}

      {/* PopUpNotification */}
      {showSuccess && (
        <PopUpNotification
          type="success"
          message="Resource created successfully!"
          onClose={() => setShowSuccess(false)}
        />
      )}

      {showError && (
        <PopUpNotification
          type="error"
          message={error}
          onClose={() => setShowError(false)}
        />
      )}
    </>
  );
};

export default ResourcesHeader;
