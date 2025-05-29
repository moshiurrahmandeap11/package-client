import React, { useState, useEffect } from "react";
import {
  MdDashboard,
  MdPeople,
  MdSettings,
  MdLogout,
  MdShoppingCart,
} from "react-icons/md";
import { FaPlus } from "react-icons/fa6";

// Import pages
import AddProducts from "../../pages/AddProducts/AddProducts";
import AddBanner from "../AddBanner/AddBanner";
import ManageOrders from "../Orders/ManageOrders/ManageOrders";
import TotalUsers from "../TotalUsers/TotalUsers";
import ConfirmOrders from "../ConfirmOrders/ConfirmOrders";
import AddRoute from "../AddRoute/AddRoute";
import Cancallation from "../Cancallation/Cancallation";

// Dummy Components
const Dashboard = () => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold">Dashboard</h2>
    <div className="grid sm:grid-cols-2 gap-4">
      <div className="p-4 bg-white shadow rounded-xl">
        <p className="text-gray-600">Total Users</p>
        <p className="text-3xl font-bold text-green-600">100</p>
      </div>
      <div className="p-4 bg-white shadow rounded-xl">
        <p className="text-gray-600">Active Orders</p>
        <p className="text-3xl font-bold text-green-600">25</p>
      </div>
    </div>
  </div>
);

const Settings = () => <h2 className="text-2xl font-bold">System Settings</h2>;
const Logout = () => <h2 className="text-2xl font-bold">Logging Out...</h2>;



// Sidebar Items
const sidebarItems = [
  { label: "Dashboard", icon: <MdDashboard /> },
  { label: "Add Products", icon: <FaPlus /> },
  { label: "Add Banner", icon: <FaPlus /> },
  { label: "Users", icon: <MdPeople /> },
  { label: "Orders", icon: <MdShoppingCart /> },
  { label: "Confirm Orders", icon: <MdShoppingCart /> },
  { label: "Add Route", icon: <FaPlus /> },
  { label: "Cancellation Orders", icon: <MdShoppingCart /> },
  { label: "Settings", icon: <MdSettings /> },
  { label: "Logout", icon: <MdLogout /> },
];

const AdminDashboard = () => {
  const [active, setActive] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Load from localStorage on first render
  useEffect(() => {
    const savedTab = localStorage.getItem("admin-active-tab");
    if (savedTab) setActive(savedTab);
  }, []);

  const handleSetActive = (label) => {
    setActive(label);
    localStorage.setItem("admin-active-tab", label);
    setSidebarOpen(false);
  };

  const renderContent = () => {
    switch (active) {
      case "Dashboard":
        return <Dashboard />;
      case "Add Products":
        return <AddProducts />;
      case "Add Banner":
        return <AddBanner />;
      case "Users":
        return <TotalUsers />;
      case "Orders":
        return <ManageOrders />;
      case "Confirm Orders":
        return <ConfirmOrders />;
      case "Add Route":
        return <AddRoute></AddRoute>;
      case "Cancellation Orders":
        return <Cancallation></Cancallation>;
      case "Settings":
        return <Settings />;
      case "Logout":
        return <Logout />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Mobile Top Bar */}
      <div className="flex md:hidden justify-between items-center bg-white px-4 py-3 shadow-md">
        <h1 className="text-2xl font-bold text-green-600">Admin</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="btn btn-sm btn-outline"
        >
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-white border-r md:w-64 w-full md:block ${
          sidebarOpen ? "block" : "hidden"
        } p-6 md:p-4 transition-all`}
      >
        <ul className="space-y-3">
          {sidebarItems.map((item) => (
            <li
              key={item.label}
              onClick={() => handleSetActive(item.label)}
              className={`flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-100 transition-all duration-150 ${
                active === item.label
                  ? "bg-green-100 text-green-700 font-semibold"
                  : "text-gray-700"
              }`}
            >
              {item.icon}
              {item.label}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div
            key={active}
            className="min-h-[70vh]"
          >
            {renderContent()}
          </div>

      </main>
    </div>
  );
};

export default AdminDashboard;
