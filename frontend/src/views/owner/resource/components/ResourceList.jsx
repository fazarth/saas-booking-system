import { useState, useEffect } from "react";
import axios from "../../../../api/axios";
import ResourceCard from "components/card/ResourceCard";

import NFt from "assets/img/nfts/Nft3.png";

const ResourceList = ({ refresh }) => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getResources = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/resources", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Resources from API:", res.data);
        setResources(res.data || []);
      } catch (err) {
        console.error("Error fetching resources:", err);
        setError("Gagal mengambil data resources.");
      } finally {
        setLoading(false);
      }
    };

    getResources();
  }, [refresh]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading resources...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-3">
      {resources.map((resource) => (
        <ResourceCard
          key={resource.id} // ✅ wajib tambahkan key
          id={resource.id}
          title={resource.resourceName}
          description={resource.description}
          type={resource.resourceType}
          isActive={resource.IsActive === 1 || resource.IsActive === true} // ✅ handle 1/0 atau boolean
          image={NFt}
        />
      ))}
    </div>
  );
};

export default ResourceList;
