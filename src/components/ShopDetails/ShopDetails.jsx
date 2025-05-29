import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import { useAuth } from "../../hooks/Hooks";
import Loader from "../Loader/Loading";
import { toast } from "react-toastify";
import Error from "../../pages/Error/Error";

const ShopDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.error("Product fetch failed:", err);
      });
  }, [id]);

const handleAddToCart = (id) => {
  if(user?.email === "moshiurrahmandeap@gmail.com"){
    return toast.error("Admin can't add to cart 🚫");
  }

  if (!selectedSize) {
    return toast.warning("Please select a size first");
  }

  navigate(`/dashboard/${id}`);

  const now = new Date();

  const cartItem = {
    id: product._id,
    userId: user?.uid,
    name: product.name,
    size: selectedSize.size,
    price: selectedSize.price,
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString(),
    quantity: 1,
    image: product.image,
    status: "Pending",
  };

  // Existing cart from localStorage
  const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

  const itemIndex = existingCart.findIndex(
    (item) => item.id === cartItem.id && item.size === cartItem.size
  );

  if (itemIndex > -1) {
    existingCart[itemIndex].quantity += 1;
  } else {
    existingCart.push(cartItem);
  }

  localStorage.setItem("cart", JSON.stringify(existingCart));

  toast.success(`Added ${product.name} (${selectedSize.size}) to cart!`);
};


  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return (
      <div className="text-center text-red-500 text-xl mt-10">
        Product not found 😢
      </div>
    );
  }

  const sizePrices = product?.sizePrices;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-green-50 to-white p-10"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <motion.img
          src={product.image}
          alt={product.name}
          className="rounded-xl shadow-md w-full h-[500px] object-cover"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
        />

        <div>
          <motion.h2
            className="text-4xl font-bold text-green-800"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Name: {product.name}
          </motion.h2>
          <p className="text-gray-600 font-medium text-lg">
            Management: {product.brand}
          </p>
          <p className="text-gray-600 font-medium text-lg">
            Category: {product.category}
          </p>
          <p className="text-gray-600 font-medium text-lg">
            Sub Category: {product.subCategory}
          </p>

          {/* Size Selection */}
          <div className="mt-4">
            <h4 className="text-md font-semibold text-gray-700">
              Select Size:
            </h4>
            <div className="flex gap-3 mt-2 flex-wrap">
              {sizePrices?.map((sizePrice, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(sizePrice)}
                  className={`px-4 py-2 rounded-md border-2 transition-all duration-300 ${
                    selectedSize?.size === sizePrice.size
                      ? "bg-green-500 text-white "
                      : "border-gray-300 text-gray-700 hover:border-green-400"
                  }`}
                >
                  {sizePrice.size}
                </button>
              ))}
            </div>
          </div>

          {/* Price & Stock Info */}
          {selectedSize && (
            <motion.div
              key={selectedSize.size}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-1"
            >
              <p className="text-lg font-medium text-gray-800">
                Price:{" "}
                <span className="text-green-600">৳ {selectedSize.price}</span>
              </p>
              <p className="text-md text-gray-600">
                Stock:{" "}
                <span
                  className={
                    selectedSize.stock > 0 ? "text-green-500" : "text-red-500"
                  }
                >
                  {selectedSize.stock > 0
                    ? `${selectedSize.stock} available`
                    : "Out of stock"}
                </span>
              </p>
            </motion.div>
          )}

          <p className="text-gray-500 mt-4">
            {product.description || "No description provided."}
          </p>

          {/* Add to Cart Button */}
          <button
            onClick={() => handleAddToCart(product._id)}
            className="btn btn-success w-full mt-6"
          >
            Add to Cart 🛒
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ShopDetails;
