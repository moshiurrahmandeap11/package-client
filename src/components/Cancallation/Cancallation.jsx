import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/Hooks";
import Loader from "../Loader/Loading";

const Cancallation = () => {
  const [cartData, setCartData] = useState([]);
  const {loading} = useAuth();

  // ✅ Helper: remove duplicate orders based on `id`
  const getUniqueOrders = (orders) => {
    const seen = new Set();
    return orders.filter((order) => {
      if (!seen.has(order.id)) {
        seen.add(order.id);
        return true;
      }
      return false;
    });
  };

  useEffect(() => {
    axios.get('http://localhost:3000/confirm-orders')
      .then((res) => {
        const uniqueOrders = getUniqueOrders(res.data);
        setCartData(uniqueOrders);
      })
      .catch((err) => {
        console.error("Error fetching confirmed orders:", err);
      })
      .finally(() => {
        
      });
  }, []);

  if(loading){
    return <Loader> </Loader>
  }

  return (
    <div
      className="p-6"
    >
      <h2 className="text-2xl font-bold mb-4">Cancelled Orders</h2>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white text-sm text-left border">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Size</th>
              <th className="px-4 py-2">Price ($)</th>
              <th className="px-4 py-2">Discount (%)</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Time</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {cartData.map((cartItem) => (
              <tr
                key={cartItem._id}
                className="border-b hover:bg-gray-100"
              >
                <td className="px-4 py-2">{cartItem._id}</td>
                <td className="px-4 py-2">{cartItem.user || "Unknown User"}</td>
                <td className="px-4 py-2">
                  {cartItem.email || "unknown@email.com"}
                </td>
                <td className="px-4 py-2">{cartItem.name}</td>
                <td className="px-4 py-2">{cartItem.size || "N/A"}</td>
                <td className="px-4 py-2">{cartItem.price || "0"}</td>
                <td className="px-4 py-2">{cartItem.discount || 0}</td>
                <td className="px-4 py-2">{cartItem.date}</td>
                <td className="px-4 py-2">{cartItem.time}</td>
                <td className="px-4 py-2 text-red-500 font-semibold">
                  Cancelled
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cancallation;
