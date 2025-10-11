import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "api/axios";
import ResourceCard from "components/card/ResourceCard";
import NFt from "assets/img/nfts/Nft3.png";
import { jwtDecode } from "jwt-decode";

const ResourceList = ({ refresh }) => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

        const res = await axios.get(`/resources`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const ownerResources = (res.data || []).filter(
          (r) => r.ownerId === ownerId
        );

        const details = await Promise.all(
          ownerResources.map(async (r) => {
            const detailRes = await axios.get(`/resources/${r.id}/all`, {
              headers: { Authorization: `Bearer ${token}` },
            });

            const detailArray = Array.isArray(detailRes.data)
              ? detailRes.data
              : [detailRes.data];

            return detailArray.map((d) => ({ ...r, ...d }));
          })
        );

        // Flatten array hasil Promise.all
        setResources(details.flat());
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
        {resources.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/owner/resources/${item.id}`)}
            className="cursor-pointer"
          >
            <ResourceCard
              id={item.id}
              resourceId={item.resourceId}
              title={item.location}
              description={item.facilities}
              type={item.floor}
              isActive={true}
              image={NFt}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default ResourceList;
