import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../hooks/Hooks";
import CustomerOrders from "../../components/Orders/CustomerOrders/CustomerOrders";
import Loader from "../../components/Loader/Loading";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("orders");
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email === "moshiurrahmandeap@gmail.com") {
      navigate("/admin-dashboard");
    }
  }, [user, navigate]);

  if (loading) {
    return <Loader />;
  }

  const tabItems = [
    { key: "orders", label: "🛒 Orders" },
    { key: "wishlist", label: "❤️ Wishlist" },
    { key: "billing", label: "💳 Billing" },
    { key: "profile", label: "👤 My Profile" },
    { key: "logout", label: "🔄 Logout" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "orders":
        return (
          <motion.div
            key="orders"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
          >
            <h3 className="text-2xl font-semibold mb-4">🛒 Recent Orders</h3>
            <CustomerOrders />
          </motion.div>
        );
      case "wishlist":
        return (
          <motion.div
            key="wishlist"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
          >
            <h3 className="text-2xl font-semibold mb-4">❤️ Wishlist</h3>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span>Smart Watch</span>
                <button className="text-sm text-blue-600 hover:underline">
                  View
                </button>
              </li>
              <li className="flex justify-between items-center">
                <span>Mechanical Keyboard</span>
                <button className="text-sm text-blue-600 hover:underline">
                  View
                </button>
              </li>
            </ul>
          </motion.div>
        );
      case "billing":
        return (
          <motion.div
            key="billing"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
          >
            <h3 className="text-2xl font-semibold mb-4">💳 Billing Info</h3>
            <p className="text-gray-700">Last Payment: ৳2,200 on 25 May 2025</p>
            <p className="text-gray-700">Payment Method: bKash</p>
          </motion.div>
        );
      case "profile":
        return (
          <motion.div
            key="profile"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
          >
            <h1 className="text-2xl font-bold mb-2">👤 My Profile</h1>
            <p>Name: {user?.displayName}</p>
            <p>Email: {user?.email}</p>
          </motion.div>
        );
      case "logout":
        return (
          <motion.div
            key="logout"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <button className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition">
              🔒 Confirm Logout
            </button>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">
          Welcome, {user?.displayName || "User"} 👋
        </h2>
        <nav className="space-y-4">
          {tabItems.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`w-full text-left px-4 py-2 rounded-md ${
                activeTab === tab.key
                  ? "bg-green-100 text-green-700 font-semibold"
                  : "hover:bg-gray-100 text-gray-700"
              } transition`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Content Area */}
      <main className="flex-1 p-8">
        <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
      </main>
    </div>
  );
};

export default Dashboard;
