import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ allowedRoles = [], children }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token || !userRole) {
    return <Navigate to="/auth/login" replace />;
  }

  if (allowedRoles.includes(userRole)) {
    return children;
  }

  return <Navigate to="/404" replace />;
}
