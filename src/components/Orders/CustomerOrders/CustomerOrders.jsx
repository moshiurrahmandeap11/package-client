import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { Link } from "react-router"; // React Router Dom হবে এটা
import axios from "axios";

const statusStyles = {
  Delivered: "bg-green-100 text-green-700",
  Processing: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-700",
  Pending: "bg-gray-100 text-gray-700",
};

const CustomerOrders = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isConfirmed, setIsConfirmed] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const confirmedIds = JSON.parse(localStorage.getItem("confirmed")) || [];
    setCartItems(storedCart);
    setIsConfirmed(confirmedIds);
  }, []);

  const handleConfirm = (pid, uid, price, size, date, time) => {
    console.log(pid, uid, price, size, date, time);
    const cartInfo = {
      pid,
      uid,
      price,
      size,
      date,
      time,
      confirm: true,
    };

    axios.post("https://package-server.vercel.app/add-to-cart", cartInfo).then((res) => {
      console.log("Successfully posted:", res.data);
      if (res.data.insertedId) {
        toast.success("Order Confirmed");

        const updatedConfirmed = [...isConfirmed, pid];
        setIsConfirmed(updatedConfirmed);
        localStorage.setItem("confirmed", JSON.stringify(updatedConfirmed));
      } else {
        toast.warn("Failed To Confirm. Please Contact the admin");
      }
    });
  };

  const handleDelete = (orderId) => {
    const updatedItems = cartItems.filter((item) => item.id !== orderId);
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));

    const updatedConfirmed = isConfirmed.filter((id) => id !== orderId);
    setIsConfirmed(updatedConfirmed);
    localStorage.setItem("confirmed", JSON.stringify(updatedConfirmed));

    toast.success("Item Deleted Successfully");
  };

  return (
    <div
      className="p-4 sm:p-6 bg-gray-50 min-h-screen"
    >
      <h2
        className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-blue-700 mb-6"
      >
        📦 Your Orders
      </h2>

      <div
        className="overflow-x-auto"
      >
        <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden text-sm sm:text-base">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left">Order ID</th>
              <th className="px-4 sm:px-6 py-3 text-left">Item</th>
              <th className="px-4 sm:px-6 py-3 text-left">Date</th>
              <th className="px-4 sm:px-6 py-3 text-left">Time</th>
              <th className="px-4 sm:px-6 py-3 text-left">Amount</th>
              <th className="px-4 sm:px-6 py-3 text-left">Status</th>
              <th className="px-4 sm:px-6 py-3 text-left">Action</th>
              <th className="px-4 sm:px-6 py-3 text-left">Delete</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {cartItems.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="px-6 py-8 text-center text-gray-500 text-base sm:text-lg font-medium bg-white rounded-md shadow-sm"
                >
                  <span className="block mb-2">No orders found. 🛒</span>
                  <Link
                    to="/shop"
                    className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300"
                  >
                    Click to Add Order & Have Fun 🚀
                  </Link>
                </td>
              </tr>
            ) : (
              cartItems.map((item, index) => (
                <tr
                  key={item.id || index}
                  className="hover:bg-gray-100 transition"
                >
                  <td className="px-4 font-medium sm:px-6 py-4">{item.id}</td>
                  <td className="px-4 font-medium sm:px-6 py-4">{item.name}</td>
                  <td className="px-4 font-medium sm:px-6 py-4">{item.date}</td>
                  <td className="px-4 font-medium sm:px-6 py-4">{item.time}</td>
                  <td className="px-4 font-medium sm:px-6 py-4">
                    BDT {item.price}
                  </td>
                  <td className="px-4 font-medium sm:px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        isConfirmed.includes(item.id)
                          ? "bg-green-100 text-green-700"
                          : statusStyles[item.status] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {isConfirmed.includes(item.id) ? "Confirmed" : item.status}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 space-x-2">
                    {item.status === "Pending" &&
                    !isConfirmed.includes(item.id) ? (
                      <button
                        className="text-green-600 bg-green-300 p-1 text-sm cursor-pointer rounded-full hover:bg-green-500 transition"
                        onClick={() =>
                          handleConfirm(item.id, item.userId, item.price, item.size, item.date, item.time,)
                        }
                      >
                        Confirm
                      </button>
                    ) : isConfirmed.includes(item.id) ? (
                      <button
                        disabled
                        className="text-gray-500 bg-gray-200 p-1 text-sm rounded-full cursor-not-allowed"
                      >
                        Confirmed
                      </button>
                    ) : null}
                  </td>
                  <td
                    onClick={() => handleDelete(item.id)}
                    className="px-4 sm:px-6 py-4 cursor-pointer text-red-400 text-xs"
                  >
                    {!isConfirmed.includes(item.id) && (
                      <MdDelete
                        size={24}
                        className="hover:text-red-600 transition"
                      />
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerOrders;
