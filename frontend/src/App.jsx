import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "layouts/admin";
import OwnerLayout from "layouts/owner";
import CustomerLayout from "layouts/customer";
import AuthLayout from "layouts/auth";
const App = () => {
  return (
    <Routes>
      <Route path="auth/*" element={<AuthLayout />} />
      <Route path="admin/*" element={<AdminLayout />} />
      <Route path="owner/*" element={<OwnerLayout />} />
      <Route path="customer/*" element={<CustomerLayout />} />
      <Route path="/" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default App;
