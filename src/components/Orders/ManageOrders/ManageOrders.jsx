import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Loader from "../../Loader/Loading";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState(null); // for animation


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const [cartRes, productRes, usersRes] = await Promise.all([
          axios.get("http://localhost:3000/add-to-cart"),
          axios.get("http://localhost:3000/products"),
          axios.get("http://localhost:3000/users"),
        ]);

        const carts = cartRes.data;
        const products = productRes.data;
        const usersData = usersRes.data;

        const matchedOrders = carts
          .filter((cartItem) => cartItem.status !== "Confirmed") // hide confirmed
          .map((cartItem) => {
            const product = products.find((p) => p._id === cartItem.pid);
            const user = usersData.find((u) => u.firebaseUid === cartItem.uid);

            if (!product) return null;

            return {
              id: cartItem._id,
              user: user?.name || "Unknown User",
              email: user?.email || "unknown@email.com",
              name: product.name,
              size: cartItem.size || "N/A",
              price: cartItem.price || "0",
              date: cartItem.date || "",
              time: cartItem.time || "",
              discount: product.discount || 0,
              status: cartItem.status || "Pending",
            };
          })
          .filter(Boolean);

        setOrders(matchedOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleConfirm = async (id) => {
    console.log(id);
    const orderToConfirm = orders.find((order) => order.id === id);
    if (!orderToConfirm) return;

    try {
      const res = await axios.post("http://localhost:3000/confirm-orders", {
        ...orderToConfirm,
        status: "Confirmed",
      });

      if (res.status === 200 || res.status === 201) {
        // Animate out first
        setRemoving(id);
        setTimeout(() => {
          setOrders((prev) => prev.filter((order) => order.id !== id));
          setRemoving(null);
        }, 500); // same as animation duration
      }
      axios.delete(`http://localhost:3000/add-to-cart/${id}`)
    } catch (error) {
      console.error("Error confirming order:", error);
    }
  };

  const handleDelete =  async (id) => {
     const orderToCancel = orders.find((order) => order.id === id);
     console.log(orderToCancel);
     if (!orderToCancel) return;

     try {
      const res = await axios.post("http://localhost:3000/cancel-orders", {
        ...orderToCancel,
        status: "Cancelled",
      })

      if(res.status === 200 || res.status === 201) {
        setRemoving(id)
        setTimeout(() => {
          setOrders((prev) => prev.filter((order) => order.id !== id))
          setRemoving(null)
        }, 500)
      }
      axios.delete(`http://localhost:3000/add-to-cart/${id}`)
     } catch(error) {
      console.error("Error confirming order:", error)
     }
  };

  if (loading) return <Loader />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 min-h-screen bg-gray-100"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
        🛒 Manage All Orders
      </h2>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Order Name</th>
              <th className="px-6 py-3">Size</th>
              <th className="px-6 py-3">Price (৳)</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Time</th>
              <th className="px-6 py-3">Discount (%)</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 200 }}
                    transition={{ duration: 0.5 }}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">{order.user}</td>
                    <td className="px-6 py-4">{order.email}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {order.name}
                    </td>
                    <td className="px-6 py-4">{order.size}</td>
                    <td className="px-6 py-4">{order.price}</td>
                    <td className="px-6 py-4">{order.date}</td>
                    <td className="px-6 py-4">{order.time}</td>
                    <td className="px-6 py-4">{order.discount}%</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                          order.status === "Confirmed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 space-x-2 text-center">
                      {order.status !== "Confirmed" && (
                        <>
                          <button
                            onClick={() => handleConfirm(order.id)}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                            disabled={removing === order.id}
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => handleDelete(order.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                            disabled={removing === order.id}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </motion.tr>
                ))
              ) : (
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <td colSpan={10} className="text-center text-gray-500 py-8 text-lg">
                    🚫 No Customer Orders Found
                  </td>
                </motion.tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ManageOrders;
