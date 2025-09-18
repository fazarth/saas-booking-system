import React, { useState, useEffect } from "react";
import axios from "api/axios";
import PopUpNotification from "components/popup/PopUpNotification";
import ResourceForm from "../form/ResourceForm";
import ResourceDetailForm from "../form/ResourceDetailForm";
import SlotsAvailabilityForm from "../form/SlotsAvailabilityForm";

const ResourcesHeader = ({ onCreateSuccess }) => {
  const [resources, setResources] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [visible, setVisible] = useState(false);

  const [step, setStep] = useState("resource");

  const [activeResourceId, setActiveResourceId] = useState(null);

  const [resourceForm, setResourceForm] = useState({
    resourceName: "",
    resourceType: "",
    description: "",
  });

  const [resourceDetailForm, setResourceDetailForm] = useState({
    location: "",
    capacity: "",
    facilities: "",
    floor: "",
    pricePerHour: "",
  });

  const [availabilityForm, setAvailabilityForm] = useState({
    dayOfWeek: "",
    startTime: "",
    endTime: "",
    startDate: "",
    endDate: "",
    isActive: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  // ----------------------------
  // Handlers
  // ----------------------------
  const handleResourceChange = (e) => {
    const { name, value } = e.target;
    setResourceForm({ ...resourceForm, [name]: value });
  };

  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    setResourceDetailForm({ ...resourceDetailForm, [name]: value });
  };

  const handleAvailabilityChange = (e) => {
    const { name, value } = e.target;
    setAvailabilityForm({ ...availabilityForm, [name]: value });
  };

  const handleResourceSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!resourceForm.resourceName || !resourceForm.resourceType) {
      setError("Resource Name and Type are required");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("/resources", resourceForm);
      console.log("Resource created:", res.data);

      // simpan id resource yg baru dibuat
      setActiveResourceId(res.data.id);

      // lanjut ke detail
      setStep("detail");

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

  // Step 2: Simpan detail sementara
  const handleDetailSubmit = (e) => {
    if (e?.preventDefault) e.preventDefault();
    // langsung lanjut ke step availability
    setStep("availability");
    setError("");
  };

  // Step 3: Add availability (sekalian jalankan detail)
  const handleFinalSubmit = async (e) => {
    if (e?.preventDefault) e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Save detail
      await axios.post(
        `/resources/${activeResourceId}/detail`,
        resourceDetailForm
      );
      console.log("✅ Resource detail created");

      // 2. Save availability (perhatikan resourceId ikut dikirim di body)
      await axios.post(`/availability`, {
        ...availabilityForm,
        resourceId: activeResourceId,
      });
      console.log("✅ Availability created");

      // sukses semua
      handleCloseModal();
      setStep("resource");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (err) {
      console.error("❌ Error", err.response?.data || err.message);
      setError(
        err.response?.data?.error || "Failed to save detail or availability"
      );
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setResourceForm({ resourceName: "", resourceType: "", description: "" });
    setResourceDetailForm({
      location: "",
      capacity: "",
      facilities: "",
      floor: "",
      pricePerHour: "",
    });
    setAvailabilityForm({
      dayOfWeek: "",
      startTime: "",
      endTime: "",
      startDate: "",
      endDate: "",
      isActive: true,
    });
    setActiveResourceId(null);
    setVisible(false);
    setTimeout(() => setShowModal(false), 10);
    setStep("resource");
  };

  useEffect(() => {
    if (showModal) {
      setTimeout(() => setVisible(true), 10);
    }
  }, [showModal]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await axios.get("/resources");
        setResources(res.data || []);
      } catch (err) {
        console.error("Failed to fetch resources:", err);
      }
    };
    fetchResources();
  }, []);

  return (
    <>
      {/* Header */}
      <div className="mb-4 mt-5 flex flex-col px-4">
        <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
          {resources.length === 0
            ? "Available Resource"
            : resources[0].resourceName}
        </h4>

        {resources.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {["course", "health", "room", "vehicle"].map((type) =>
              resources.some((r) => r.resourceType === type) ? (
                <button
                  key={type}
                  onClick={() => {
                    setStep("detail");
                    setActiveResourceId(
                      resources.find((r) => r.resourceType === type)?.id || null
                    );
                    setShowModal(true);
                  }}
                  className="linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
                >
                  Add New {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ) : null
            )}
          </div>
        )}
      </div>

      {resources.length === 0 && (
        <div className="my-48 flex justify-center">
          <button
            className="linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
            onClick={() => {
              setStep("resource");
              setShowModal(true);
            }}
          >
            Create Resource
          </button>
        </div>
      )}

      {/* Modal Create Resource / Detail / Availability */}
      {showModal && (
        <div className="bg-black/50 fixed inset-0 z-10 flex items-center justify-center">
          <div
            className={`transform rounded-xl border border-gray-300 bg-white p-6 shadow-lg transition-all duration-300 ease-out
              ${
                visible ? "scale-100 opacity-100" : "scale-90 opacity-0"
              } w-full max-w-3xl`}
          >
            <h3 className="mb-4 text-2xl font-bold text-navy-700 dark:text-white">
              {step === "resource"
                ? "Create Resource"
                : step === "detail"
                ? "Add Resource Detail"
                : "Set Availability"}
            </h3>

            {error && <p className="mb-2 text-sm text-red-500">{error}</p>}

            {step === "resource" && (
              <ResourceForm
                form={resourceForm}
                onChange={handleResourceChange}
                onSubmit={handleResourceSubmit}
                onCancel={handleCloseModal}
                loading={loading}
              />
            )}

            {step === "detail" && (
              <ResourceDetailForm
                formData={resourceDetailForm}
                onChange={handleDetailChange}
                onSubmit={handleDetailSubmit}
                onCancel={handleCloseModal}
                loading={loading}
              />
            )}

            {step === "availability" && (
              <SlotsAvailabilityForm
                formData={availabilityForm}
                onChange={handleAvailabilityChange}
                onSubmit={handleFinalSubmit}
                onCancel={handleCloseModal}
                loading={loading}
              />
            )}
          </div>
        </div>
      )}

      {/* PopUpNotification */}
      {showSuccess && (
        <PopUpNotification
          type="success"
          message="Action completed successfully!"
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
