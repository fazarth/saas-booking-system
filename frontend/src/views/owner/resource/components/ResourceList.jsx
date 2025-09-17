import { useState, useEffect } from "react";
import axios from "api/axios";
import ResourceCard from "components/card/ResourceCard";
import NFt from "assets/img/nfts/Nft3.png";

import { jwtDecode } from "jwt-decode";

const ResourceList = ({ ownerId, refresh }) => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Token tidak ditemukan");
          setLoading(false);
          return;
        }

        const decoded = jwtDecode(token);
        const ownerId = decoded.id || decoded.userId;
        console.log("OwnerId dari token:", ownerId);

        const res = await axios.get(`/resources`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const ownerResources = (res.data || []).filter(
          (r) => r.ownerId === ownerId
        );
        console.log("Owner resources:", ownerResources);

        const details = await Promise.all(
          ownerResources.map(async (r) => {
            const detailRes = await axios.get(`/resources/${r.id}/all`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            const detailData = Array.isArray(detailRes.data)
              ? detailRes.data[0]
              : detailRes.data;
            return { ...r, ...detailData };
          })
        );

        setResources(details);
      } catch (err) {
        console.error("Error fetching resources:", err);
        setError("Gagal mengambil data resources.");
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [refresh]);

  if (loading)
    return <p className="text-center text-gray-500">Loading resources...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
      <div className="mb-4 mt-5 flex flex-col px-4">
        <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
          {resources.length === 0 ? "" : "Available Resource"}
        </h4>
      </div>

      <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-3">
        {resources.map((detail) => (
          <ResourceCard
            key={detail.id}
            id={detail.id}
            title={`${detail.resourceName} @ ${detail.location || "N/A"}`}
            description={`Capacity: ${detail.capacity || "-"}, Facilities: ${
              detail.facilities || "-"
            }`}
            type="Room"
            isActive={true}
            image={NFt}
          />
        ))}
      </div>
    </>
  );
};

export default ResourceList;
