import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useOwnerHasResource from "hooks/owner/useOwnerHasResource";

export default function ProtectedOwnerWithResource({ children }) {
  const { hasResource, loading } = useOwnerHasResource();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && hasResource === false) {
      navigate("/owner/resources-list");
    }
  }, [loading, hasResource, navigate]);

  if (loading) return <p>Loading...</p>;
  if (!hasResource) return null;

  return children;
}
