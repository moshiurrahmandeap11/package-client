import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/Hooks';
import Loader from '../Loader/Loading';

const TotalUsers = () => {
  const [users, setUsers] = useState([]);
  const { loading } = useAuth();
  const ADMIN_EMAIL = 'moshiurrahmandeap@gmail.com';

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get('http://localhost:3000/users')
      .then((res) => setUsers(res.data))
      .catch((err) => {
        toast.error("Couldn't fetch users 🥲");
        console.error(err);
      });
  };

  const handleDelete = async (mongoId, firebaseUid) => {
    try {
      await axios.delete(`http://localhost:3000/firebase-users/${firebaseUid}`);
      await axios.delete(`http://localhost:3000/mongo-users/${mongoId}`);
      toast.success('User deleted from both Firebase and MongoDB!');
      setUsers(users.filter((user) => user._id !== mongoId));
    } catch (err) {
      toast.error("Couldn't delete user");
      console.error(err);
    }
  };

  if (loading) return <Loader />;

  return (
    <div
      className="p-4 bg-gray-100 min-h-screen"
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
        👥 Total Users
      </h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No users found 😶
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-100 transition"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4 font-medium">{user.name}</td>
                  <td className="py-3 px-4 break-words">{user.email}</td>
                  <td className="py-3 px-4 capitalize">
                    {user.email === ADMIN_EMAIL ? 'admin' : user.role || 'user'}
                  </td>
                  <td className="py-3 px-4">
                    {user.email !== ADMIN_EMAIL && (
                      <button
                        onClick={() => handleDelete(user._id, user.firebaseUid)}
                        className="text-red-500 hover:text-red-700 transition"
                        title="Kick this user"
                      >
                        <MdDelete size={20} />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile / Tablet Cards */}
      <div className="md:hidden space-y-4">
        {users.length === 0 ? (
          <p className="text-center text-gray-500">No users found 😶</p>
        ) : (
          users.map((user, index) => (
            <div
              key={user._id}
              className="bg-white rounded-lg shadow-md p-4"
            >
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-600">#{index + 1}</span>
                {user.email !== ADMIN_EMAIL && (
                  <button
                    onClick={() => handleDelete(user._id, user.firebaseUid)}
                    className="text-red-500 hover:text-red-700"
                    title="Kick this user"
                  >
                    <MdDelete size={20} />
                  </button>
                )}
              </div>
              <p><span className="font-semibold">Name:</span> {user.name}</p>
              <p><span className="font-semibold">Email:</span> {user.email}</p>
              <p><span className="font-semibold">Role:</span> {user.email === ADMIN_EMAIL ? 'admin' : user.role || 'user'}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TotalUsers;
