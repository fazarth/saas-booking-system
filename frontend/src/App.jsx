import React from "react";
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "components/protectedRoute";
import AdminLayout from "layouts/admin";
import OwnerLayout from "layouts/owner";
import ResourceDetail from "views/owner/resource/view/detail";
import CustomerLayout from "layouts/customer";
import AuthLayout from "layouts/auth";
import NotFound from "views/notFound";

const App = () => {
  return (
    <Routes>
      {/* Auth pages */}
      <Route path="auth/*" element={<AuthLayout />} />

      {/* Admin protected */}
      <Route
        path="admin/*"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      />

      {/* Owner protected */}
      <Route
        path="owner/*"
        element={
          <ProtectedRoute allowedRoles={["owner"]}>
            <OwnerLayout />
          </ProtectedRoute>
        }
      >
        <Route path="resources/:id" element={<ResourceDetail />} />
      </Route>

      {/* Customer protected */}
      <Route
        path="customer/*"
        element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <CustomerLayout />
          </ProtectedRoute>
        }
      />

      {/* Default redirect */}
      {/* <Route path="/" element={<Navigate to="/auth/login" replace />} /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
