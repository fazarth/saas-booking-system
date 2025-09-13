import { useState, useEffect } from "react";
import axios from "../../../../api/axios";
import ResourceCard from "components/card/ResourceCard";

import NFt from "assets/img/nfts/Nft3.png";

const ResourceList = ({ refresh }) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const getResources = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/resources", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Resources from API:", res.data);
        setResources(res.data);
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };

    getResources();
  }, [refresh]);

  return (
    <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-3">
      {resources.map((resource) => (
        <ResourceCard
          key={resource.id}
          title={resource.resourceName}
          description={resource.description}
          type={resource.resourceType}
          isActive={resource.IsActive === 1}
          image={NFt}
        />
      ))}
    </div>
  );
};

export default ResourceList;
