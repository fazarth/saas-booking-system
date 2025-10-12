import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "api/axios";

import NFt from "assets/img/nfts/Nft3.png";
import PopUpConfirmation from "components/popup/PopUpConfirmation";
import PopUpNotification from "components/popup/PopUpNotification";
import ResourceCourseDetailForm from "../../components/form/ResourceCourseDetailForm";
import ResourceHealthDetailForm from "../../components/form/ResourceHealthDetailForm";
import ResourceRoomDetailForm from "../../components/form/ResourceRoomDetailForm";
import ResourceVehicleDetailForm from "../../components/form/ResourceVehicleDetailForm";

const ResourceDetail = () => {
  const { resourceId, id } = useParams();
  const navigate = useNavigate();

  const [resource, setResource] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resourceType, setResourceType] = useState(null);
  const [editForm, setEditForm] = useState({});

  // Popups & notifications
  const [isConfirmPopup, setIsConfirmPopup] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [notification, setNotification] = useState(null);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  const detailFormsMap = {
    course: ResourceCourseDetailForm,
    health: ResourceHealthDetailForm,
    room: ResourceRoomDetailForm,
    vehicle: ResourceVehicleDetailForm,
  };

  const DetailFormComponent = detailFormsMap[resourceType];

  const initialDetailForms = {
    course: {
      subject: "",
      level: "",
      durationPerHours: "",
      fee: "",
      courseType: "",
    },
    health: {
      specialization: "",
      clinicAddress: "",
      fee: "",
      durationMin: "",
    },
    room: {
      location: "",
      capacity: "",
      facilities: "",
      floor: "",
      pricePerHour: "",
    },
    vehicle: {
      brand: "",
      model: "",
      year: "",
      type: "",
      rentalPrice: "",
      img: "",
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const resResource = await axios.get(
          `/resources/${resourceId}/detail/${id}`
        );
        // console.log("Response resource:", resResource.data);
        const data = Array.isArray(resResource.data)
          ? resResource.data[0]
          : resResource.data;

        const resParent = await axios.get("/resources");
        const parentList = resParent.data;
        const parent = parentList.find((r) => r.id === data.resourceId);

        setResource({ ...data, resourceType: parent?.resourceType });
        setResourceType(parent?.resourceType);

        // setEditForm(initialDetailForms[data.resourceType]);

        const resSlots = await axios.get(`/availability/${resourceId}/${id}`);
        setSlots(resSlots.data || null);

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
  }, [resourceId, id]);

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
  const handleOpenEdit = (item) => {
    setResourceType(item.resourceType);
    setEditForm({ ...initialDetailForms[item.resourceType], ...item });
    setIsEditModal(true);
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const requiredFieldsMap = {
      course: ["subject", "level"],
      health: ["specialization", "clinicAddress"],
      room: ["location", "capacity"],
      vehicle: ["brand", "model"],
    };

    const requiredFields = requiredFieldsMap[resourceType] || [];
    const missingFields = requiredFields.filter(
      (f) => editForm[f] === undefined || editForm[f] === ""
    );

    if (missingFields.length > 0) {
      setNotification({
        type: "error",
        message: `Field ${missingFields.join(", ")} is required`,
      });
      return;
    }

    try {
      setEditLoading(true);
      const res = await axios.put(`/resources/${resourceId}/${id}`, editForm);
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
      const res = await axios.delete(`/resources/${resourceId}/${id}`);
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
          <h1 className="pb-6 text-2xl font-bold">{resource.location}</h1>

          <img
            src={NFt}
            alt={resource.location}
            className="mb-4 w-full rounded-lg"
          />

          <div className="text-black-600 mt-2 space-y-1">
            {resourceType === "room" && (
              <>
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
              </>
            )}

            {resourceType === "course" && (
              <>
                <p>
                  <span className="font-semibold">Subject:</span>{" "}
                  {resource.subject}
                </p>
                <p>
                  <span className="font-semibold">Level:</span> {resource.level}
                </p>
                <p>
                  <span className="font-semibold">Duration:</span>{" "}
                  {resource.durationPerHours} menit
                </p>
                <p>
                  <span className="font-semibold">Fee:</span> Rp {resource.fee}
                </p>
                <p>
                  <span className="font-semibold">Type:</span>{" "}
                  {resource.courseType}
                </p>
              </>
            )}

            {resourceType === "health" && (
              <>
                <p>
                  <span className="font-semibold">Specialization:</span>{" "}
                  {resource.specialization}
                </p>
                <p>
                  <span className="font-semibold">Clinic Address:</span>{" "}
                  {resource.clinicAddress}
                </p>
                <p>
                  <span className="font-semibold">Fee:</span> Rp {resource.fee}
                </p>
                <p>
                  <span className="font-semibold">Duration:</span>{" "}
                  {resource.durationMin} menit
                </p>
              </>
            )}

            {resourceType === "vehicle" && (
              <>
                <p>
                  <span className="font-semibold">Brand:</span> {resource.brand}
                </p>
                <p>
                  <span className="font-semibold">Model:</span> {resource.model}
                </p>
                <p>
                  <span className="font-semibold">Year:</span> {resource.year}
                </p>
                <p>
                  <span className="font-semibold">Type:</span> {resource.type}
                </p>
                <p>
                  <span className="font-semibold">Rental Price:</span> Rp{" "}
                  {resource.rentalPrice}
                </p>
              </>
            )}
          </div>

          <div className="mt-4">
            <h3 className="text-black-700 font-semibold">Available Slot:</h3>
            {!slots || slots.length === 0 ? (
              <p className="text-black-500">No available slot</p>
            ) : (
              slots.map((slot) => (
                <div key={slot.id} className="text-black-600">
                  <p>
                    <span className="font-semibold">Day:</span> {slot.DayOfWeek}
                  </p>
                  <p>
                    <span className="font-semibold">Time:</span>{" "}
                    {slot.StartTime} - {slot.EndTime}
                  </p>
                  <p>
                    <span className="font-semibold">Status:</span>{" "}
                    {slot.IsActive ? "Active ✅" : "Inactive ❌"}
                  </p>
                </div>
              ))
            )}
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={() => handleOpenEdit(resource)}
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
            {DetailFormComponent && (
              <DetailFormComponent
                formData={editForm}
                onChange={handleEditChange}
                onSubmit={handleEditSubmit}
                onCancel={() => setIsEditModal(false)}
                loading={editLoading}
              />
            )}
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
