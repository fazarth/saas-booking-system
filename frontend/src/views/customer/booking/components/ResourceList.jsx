import { useState, useEffect } from "react";
import axios from "../../../../api/axios";
import BookingCard from "components/card/BookingCard";

const ResourceList = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const getResources = async () => {
      try {
        const res = await axios.get("/resources");
        setResources(res.data);
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };

    getResources();
  }, []);

  return (
    <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-3">
      {resources.map((resource) => (
        <BookingCard
          key={resource.UniqueID}
          title={resource.Name}
          description={resource.Description}
          type={resource.ResourceType}
          isActive={resource.IsActive === 1}
        />
      ))}
    </div>
  );
};

export default ResourceList;
