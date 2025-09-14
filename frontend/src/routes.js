import React from "react";

// Admin Imports
import AdminDashboard from "views/admin/dashboard";
import OwnerDashboard from "views/owner/dashboard";
import CustomerDashboard from "views/customer/dashboard";
import NFTMarketplace from "views/admin/marketplace";
import Booking from "views/admin/booking";
import Resource from "views/owner/resource";
import ProfileCopy from "views/admin/profile";
import Profile from "views/user/profile";
import DataTables from "views/admin/tables";

// Auth Imports
import Login from "views/auth/Login";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
} from "react-icons/md";

const routes = [
  {
    name: "Admin Dashboard",
    layout: "/admin",
    path: "dashboard",
    icon: <MdHome className="h-6 w-6" />,
    component: <AdminDashboard />,
    allowedRoles: ["admin"],
  },
  {
    name: "Owner Dashboard",
    layout: "/owner",
    path: "dashboard",
    icon: <MdHome className="h-6 w-6" />,
    component: <OwnerDashboard />,
    allowedRoles: ["owner"],
  },
  {
    name: "Customer Dashboard",
    layout: "/customer",
    path: "dashboard",
    icon: <MdHome className="h-6 w-6" />,
    component: <CustomerDashboard />,
    allowedRoles: ["customer"],
  },
  {
    name: "NFT Marketplace",
    layout: "/admin",
    path: "nft-marketplace",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
    allowedRoles: ["admin"],
  },
  {
    name: "NFT Marketplace",
    layout: "/owner",
    path: "nft-marketplace",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
    allowedRoles: ["owner"],
  },
  {
    name: "Resources List",
    layout: "/owner",
    path: "resources-list",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <Resource />,
    secondary: true,
    allowedRoles: ["owner"],
  },
  {
    name: "Booking List",
    layout: "/admin",
    path: "booking-list",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <Booking />,
    // secondary: true,
    allowedRoles: ["customer"],
  },
  {
    name: "Data Tables",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables",
    component: <DataTables />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Profile Copy",
    layout: "/owner",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <ProfileCopy />,
  },
  {
    name: "Admin Login",
    layout: "/auth",
    path: "admin/login",
    icon: <MdLock className="h-6 w-6" />,
    component: <Login />,
  },
  {
    name: "Owner Login",
    layout: "/auth",
    path: "owner/login",
    icon: <MdLock className="h-6 w-6" />,
    component: <Login />,
  },
  {
    name: "Customer Login",
    layout: "/auth",
    path: "login",
    icon: <MdLock className="h-6 w-6" />,
    component: <Login />,
  },
];

export default routes;
