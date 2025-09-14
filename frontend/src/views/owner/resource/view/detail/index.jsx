import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../../../api/axios";

import NFt from "assets/img/nfts/Nft3.png";

const ResourceDetail = () => {
  const { id } = useParams();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

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
        </div>
      ) : (
        <p>Resource not found</p>
      )}
    </div>
  );
};

export default ResourceDetail;
