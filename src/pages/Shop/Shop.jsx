import React, { useState, useEffect } from "react";
import { FaRegHeart } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import axios from "axios";
import { useAuth } from "../../hooks/Hooks";
import Loader from "../../components/Loader/Loading";
import { useNavigate } from "react-router";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const { loading } = useAuth();
  const navigate = useNavigate()

  const colors = ["bg-yellow-500", "bg-purple-500", "bg-pink-500"];

  useEffect(() => {
    axios
      .get("https://package-server.vercel.app/products")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []); // empty dependency array means it runs only once

  const handleSeekingProduct = (id) => {
    console.log(id);
    navigate(`/shop-details/${id}`)
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-50 to-white p-10">
      <h1 className="text-4xl font-extrabold mb-8 text-green-700 text-center">
        Package Collection
      </h1>

      <div className="lg:max-w-8/12 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="relative group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute top-2 left-2 flex space-x-1 z-10">
                {colors.map((color, index) => (
                  <span
                    key={index}
                    className={`w-4 h-4 rounded-full border border-white ${color}`}
                  ></span>
                ))}
              </div>

              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md shadow-md z-10">
                -{product.discount}
              </div>

              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                <div className="absolute inset-0 flex flex-col justify-center items-center gap-4 opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition-all duration-300 z-20">
                  <button className="bg-white p-3 rounded-full shadow hover:scale-110 transition">
                    <FaCartShopping className="text-green-600 w-5 h-5" />
                  </button>
                  <button className="bg-white p-3 rounded-full shadow hover:scale-110 transition">
                    <FaRegHeart className="text-pink-500 w-5 h-5" />
                  </button>
                  <button onClick={() =>handleSeekingProduct(product._id)} className="bg-white p-3 rounded-full shadow hover:scale-110 transition">
                    <IoSearch className="text-gray-700 w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white px-4 py-3 z-20">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-sm opacity-80">{product.brand}</p>
                <p className="text-green-300 font-bold text-lg">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
