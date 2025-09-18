import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "api/axios";

import NFt from "assets/img/nfts/Nft3.png";
import PopUpConfirmation from "components/popup/PopUpConfirmation";
import PopUpNotification from "components/popup/PopUpNotification";
import ResourceDetailForm from "../../components/form/ResourceDetailForm";

const ResourceDetail = () => {
  const { id: resourceId } = useParams();
  const navigate = useNavigate();

  const [resource, setResource] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Popups & notifications
  const [isConfirmPopup, setIsConfirmPopup] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [notification, setNotification] = useState(null);
  const [notificationVisible, setNotificationVisible] = useState(false);

  const [isEditModal, setIsEditModal] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [editForm, setEditForm] = useState({
    resourceName: "",
    resourceType: "",
    description: "",
  });
  const [editLoading, setEditLoading] = useState(false);

  // Fetch resource + availability
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const resResource = await axios.get(`/resources/${resourceId}/all`);
        setResource(resResource.data[0]);

        const resSlots = await axios.get(
          `/availability/resource/${resourceId}`
        );
        setSlots(resSlots.data[0] || null);

        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch resource data");
        setResource(null);
        setSlots(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [resourceId]);

  useEffect(() => {
    if (resource) {
      console.log("Updated state resource:", resource);
    }
  }, [resource]);

  useEffect(() => {
    console.log("Updated state slots:", slots);
  }, [slots]);

  // Notification & modal animations
  useEffect(() => {
    if (notification) setTimeout(() => setNotificationVisible(true), 10);
    else setNotificationVisible(false);
  }, [notification]);

  useEffect(() => {
    if (isEditModal) setTimeout(() => setEditVisible(true), 10);
    else setEditVisible(false);
  }, [isEditModal]);

  useEffect(() => {
    if (isConfirmPopup) setTimeout(() => setConfirmVisible(true), 10);
    else setConfirmVisible(false);
  }, [isConfirmPopup]);

  // Handlers
  const handleOpenEdit = () => {
    if (!resource) return;
    setEditForm({
      resourceName: resource.resourceName,
      resourceType: resource.resourceType,
      description: resource.description || "",
    });
    setIsEditModal(true);
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editForm.resourceName || !editForm.resourceType) {
      setNotification({ type: "error", message: "Name and Type are required" });
      return;
    }

    try {
      setEditLoading(true);
      const res = await axios.put(`/resources/${resourceId}`, editForm);
      setResource(res.data);
      setEditVisible(false);
      setTimeout(() => setIsEditModal(false), 300);
      setNotification({
        type: "success",
        message: "Resource updated successfully!",
      });
    } catch (err) {
      setNotification({
        type: "error",
        message: err.response?.data?.error || "Failed to update resource",
      });
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/resources/${resourceId}`);
      setConfirmVisible(false);
      setTimeout(() => setIsConfirmPopup(false), 300);
      setNotification({ type: "success", message: res.data.message });
      setTimeout(() => navigate("/owner/resources-list"), 1500);
    } catch (err) {
      setNotification({
        type: "error",
        message: err.response?.data?.error || "Failed to delete resource",
      });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="p-6">
      {resource ? (
        <div className="rounded-lg bg-white p-6 shadow-md">
          {/* Title */}
          <h1 className="text-2xl font-bold">{resource.location}</h1>

          {/* Image */}
          <img
            src={NFt}
            alt={resource.location}
            className="mb-4 w-full rounded-lg"
          />

          {/* Room Details */}
          <div className="mt-2 space-y-1 text-gray-600">
            <p>
              <span className="font-semibold">Capacity:</span>{" "}
              {resource.capacity}
            </p>
            <p>
              <span className="font-semibold">Facilities:</span>{" "}
              {resource.facilities}
            </p>
            <p>
              <span className="font-semibold">Floor:</span> {resource.floor}
            </p>
            <p>
              <span className="font-semibold">Price/Hour:</span> Rp{" "}
              {resource.pricePerHour}
            </p>
          </div>

          {/* Availability Slot */}
          <div className="mt-4">
            <h3 className="font-semibold text-gray-700">Available Slot:</h3>
            {!slots || Object.keys(slots).length === 0 ? (
              <p className="text-gray-500">No available slot</p>
            ) : (
              <div className="text-gray-600">
                <p>
                  <span className="font-semibold">Day:</span> {slots.dayOfWeek}
                </p>
                <p>
                  <span className="font-semibold">Time:</span> {slots.startTime}{" "}
                  - {slots.endTime}
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={handleOpenEdit}
              className="linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white"
            >
              Edit
            </button>
            <button
              onClick={() => setIsConfirmPopup(true)}
              className="linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white"
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <p>Resource not found</p>
      )}

      {/* Popups */}
      {isConfirmPopup && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ease-out ${
            confirmVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
          }`}
        >
          <PopUpConfirmation
            title="Confirm Delete"
            message="Are you sure want to delete this resource"
            onConfirm={handleDelete}
            onCancel={() => setIsConfirmPopup(false)}
          />
        </div>
      )}

      {isEditModal && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ease-out ${
            editVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
          }`}
        >
          <div className="w-full max-w-3xl transform rounded-xl border border-gray-300 bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-2xl font-bold">Edit Resource</h3>
            <ResourceDetailForm
              formData={editForm}
              onChange={handleEditChange}
              onSubmit={handleEditSubmit}
              onCancel={() => setIsEditModal(false)}
              loading={editLoading}
            />
          </div>
        </div>
      )}

      {notification && (
        <div
          className={`fixed inset-0 right-5 z-50 transform transition-all duration-300 ease-out ${
            notificationVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
          }`}
        >
          <PopUpNotification
            type={notification.type}
            message={notification.message}
            onClose={() => setNotification(null)}
          />
        </div>
      )}
    </div>
  );
};

export default ResourceDetail;
