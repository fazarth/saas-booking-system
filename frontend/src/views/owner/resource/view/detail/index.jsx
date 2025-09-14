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
  const [isConfirmPopup, setIsConfirmPopup] = useState(false);
  const [notification, setNotification] = useState(null);

  const navigate = useNavigate();

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

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/resources/${id}`);
      setIsConfirmPopup(false);
      setNotification({ type: "success", message: res.data.message });
      setTimeout(() => {
        navigate("/owner/resources-list");
      }, 1500);
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
            <button className="linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90">
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
        <PopUpConfirmation
          title="Confirm Delete"
          message="Are you sure want to delete this resource"
          onConfirm={handleDelete}
          onCancel={() => setIsConfirmPopup(false)}
        />
      )}

      {/* Popup Notification */}
      {notification && (
        <PopUpNotification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default ResourceDetail;
