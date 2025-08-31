import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Booking from "views/admin/booking";
import Profile from "views/admin/profile";
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
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "NFT Marketplace",
    layout: "/admin",
    path: "nft-marketplace",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: "Booking List",
    layout: "/admin",
    path: "booking-list",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <Booking />,
    secondary: true,
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
    path: "/user/login",
    icon: <MdLock className="h-6 w-6" />,
    component: <Login />,
  },
];

export default routes;
