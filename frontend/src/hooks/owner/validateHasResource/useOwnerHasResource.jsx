import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";

export default function useOwnerHasResource() {
  const [loading, setLoading] = useState(true);
  const [hasResource, setHasResource] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkOwnerResources = async () => {
      try {
        const token = localStorage.getItem("token");
        const id = localStorage.getItem("id");

        const res = await axios.get(`/resources/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data && res.data.length > 0) {
          setHasResource(true);
        } else {
          setHasResource(false);
        }
      } catch (err) {
        console.error("Error cek resource:", err);
        setHasResource(false);
      } finally {
        setLoading(false);
      }
    };

    checkOwnerResources();
  }, []);

  return { hasResource, loading };
}
