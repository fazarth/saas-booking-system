import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "../../../../../api/axios";

import NFt from "assets/img/nfts/Nft3.png";
import PopUpConfirmation from "components/popup/PopUpConfirmation";
import PopUpNotification from "components/popup/PopUpNotification";

const ResourceDetail = () => {
  const { id } = useParams();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  // Popup states
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

  const navigate = useNavigate();

  // Fetch resource
  useEffect(() => {
    const fetchResource = async () => {
      try {
        const res = await axios.get(`/resources/${id}`);
        setResource(res.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch resource");
      } finally {
        setLoading(false);
      }
    };
    fetchResource();
  }, [id]);

  // Confirmation popup animation
  useEffect(() => {
    if (isConfirmPopup) setTimeout(() => setConfirmVisible(true), 10);
    else setConfirmVisible(false);
  }, [isConfirmPopup]);

  // Edit modal animation
  useEffect(() => {
    if (isEditModal) setTimeout(() => setEditVisible(true), 10);
    else setEditVisible(false);
  }, [isEditModal]);

  // Notification animation
  useEffect(() => {
    if (notification) setTimeout(() => setNotificationVisible(true), 10);
    else setNotificationVisible(false);
  }, [notification]);

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/resources/${id}`);
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

  const handleOpenEdit = () => {
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
      const res = await axios.put(`/resources/${id}`, editForm);
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="p-6">
      {resource ? (
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h1 className="text-2xl font-bold">{resource.resourceName}</h1>
          <img
            src={NFt}
            alt={resource.resourceName}
            className="mb-4 w-full rounded-lg"
          />
          <p className="mt-2 text-gray-600">{resource.description}</p>
          <p className="mt-2 text-sm text-gray-500">
            Type: {resource.resourceType}
          </p>

          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={handleOpenEdit}
              className="linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
            >
              Edit
            </button>

            <button
              onClick={() => setIsConfirmPopup(true)}
              className="linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <p>Resource not found</p>
      )}

      {/* Popup Confirmation */}
      {isConfirmPopup && (
        <div
          className={`fixed inset-0 z-50 flex transform items-center justify-center transition-all duration-300 ease-out ${
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

      {/* Edit Modal */}
      {isEditModal && (
        <div
          className={`fixed inset-0 z-50 flex transform items-center justify-center transition-all duration-300 ease-out ${
            editVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
          }`}
        >
          <div className="w-full max-w-3xl transform rounded-xl border border-gray-300 bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-2xl font-bold">Edit Resource</h3>

            <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="resourceName"
                value={editForm.resourceName}
                onChange={handleEditChange}
                placeholder="Resource Name"
                className="w-full rounded-lg border p-3"
                required
              />
              <input
                type="text"
                name="resourceType"
                value={editForm.resourceType}
                onChange={handleEditChange}
                placeholder="Resource Type"
                className="w-full rounded-lg border p-3"
                required
              />
              <textarea
                name="description"
                value={editForm.description}
                onChange={handleEditChange}
                placeholder="Description (optional)"
                className="w-full rounded-lg border p-3"
              />

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditModal(false)}
                  className="linear rounded-[20px] bg-gray-300 px-6 py-2 text-sm font-medium hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editLoading}
                  className="linear rounded-[20px] bg-brand-900 px-6 py-2 text-sm font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
                >
                  {editLoading ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notification */}
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
