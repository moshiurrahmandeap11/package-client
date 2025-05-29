import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ConfirmOrders = () => {
  const [confirmed, setConfirmed] = useState([]);
  const [loading, setLoading] = useState(true);

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
    axios.get('https://package-server.vercel.app/confirm-orders')
      .then((res) => {
        const uniqueOrders = getUniqueOrders(res.data);
        setConfirmed(uniqueOrders);
      })
      .catch((err) => {
        console.error("Error fetching confirmed orders:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div
      className="p-6 min-h-screen bg-gray-100"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
        ✅ Confirmed Orders
      </h2>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3">Size</th>
              <th className="px-6 py-3">Price (৳)</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Time</th>
              <th className="px-6 py-3">Discount (%)</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={9} className="text-center py-8 text-lg text-gray-500">Loading...</td>
              </tr>
            ) : confirmed.length > 0 ? (
              confirmed.map((order, index) => (
                <tr
                  key={order.id || index}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4">{order.user}</td>
                  <td className="px-6 py-4">{order.email}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{order.name}</td>
                  <td className="px-6 py-4">{order.size}</td>
                  <td className="px-6 py-4">{order.price}</td>
                  <td className="px-6 py-4">{order.date}</td>
                  <td className="px-6 py-4">{order.time}</td>
                  <td className="px-6 py-4">{order.discount}%</td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="text-center py-8 text-lg text-gray-500">
                  📭 No Confirmed Orders Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConfirmOrders;
