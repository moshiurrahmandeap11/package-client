import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../hooks/Hooks";
import Error from "../Error/Error";
import Loader from "../../components/Loader/Loading";
import axios from "axios";
import { toast } from "react-toastify";

const AddProducts = () => {
  const { user, loading } = useAuth();
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sizePrices, setSizePrices] = useState({});
  const [sizeStocks, setSizeStocks] = useState({}); // new state for stock per size

  if (loading) return <Loader />;
  if (user?.email !== "moshiurrahmandeap@gmail.com") return <Error />;

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const form = e.target;
    const imagefile = form.image.files[0];

    const formData = new FormData();
    formData.append("image", imagefile);
    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=af5080f6264ea38c18a1cf186815b22f`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    const imageURL = data.data.url;

    const product = {
      name: form.name.value,
      brand: form.brand.value,
      category: form.category.value,
      subCategory: form.subCategory?.value || "",
      sizePrices: selectedSizes.map((size) => ({
        size,
        price: parseFloat(sizePrices[size] || 0),
        stock: parseInt(sizeStocks[size] || 0), // stock per size
      })),
      description: form.description.value,
      image: imageURL,
    };

    console.log("products", product);

    // TODO: API call or Firebase push here

    axios.post("http://localhost:3000/products", product).then((res) => {
      if(res.data.insertedId){
        toast.success("Product added successfully")
      } else {
        toast.warn("Something went wrong!please contact to the Developer")
      }
    });

    form.reset();
    setCategory("");
    setSubCategory("");
    setSelectedSizes([]);
    setSizePrices({});
    setSizeStocks({});
  };

  const handleSizeChange = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
      const updatedPrices = { ...sizePrices };
      delete updatedPrices[size];
      setSizePrices(updatedPrices);

      const updatedStocks = { ...sizeStocks };
      delete updatedStocks[size];
      setSizeStocks(updatedStocks);
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const handlePriceChange = (size, price) => {
    setSizePrices({
      ...sizePrices,
      [size]: price,
    });
  };

  const handleStockChange = (size, stock) => {
    setSizeStocks({
      ...sizeStocks,
      [size]: stock,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className=" flex items-center justify-center bg-gradient-to-br from-green-50 to-white px-4 py-10"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1 }}
        className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-8 border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
          Add New Product
        </h2>

        <form onSubmit={handleAddProduct} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="Eg: Slim Fit T-Shirt"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Brand */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Brand
            </label>
            <input
              type="text"
              name="brand"
              required
              placeholder="Eg: H&M, Zara"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              name="category"
              required
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setSubCategory("");
              }}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Category</option>
              <option value="Men">Men</option>
            </select>
          </div>

          {/* Sub-category */}
          {category === "Men" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Sub-category
              </label>
              <select
                name="subCategory"
                required
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Sub-category</option>
                <option value="T-Shirt">T-Shirt</option>
                <option value="Shirt">Shirt</option>
                <option value="Pant">Pant</option>
                <option value="Other">Other</option>
              </select>
            </div>
          )}

          {/* Size + Price + Stock */}
          {["T-Shirt", "Shirt", "Pant", "Other"].includes(subCategory) && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Available Sizes, Prices & Stocks
              </label>
              <div className="flex flex-col gap-4">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <div key={size} className="flex items-center gap-4">
                    <label className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={size}
                        checked={selectedSizes.includes(size)}
                        onChange={() => handleSizeChange(size)}
                        className="accent-green-500"
                      />
                      <span className="text-gray-700">{size}</span>
                    </label>

                    {selectedSizes.includes(size) && (
                      <>
                        <input
                          type="number"
                          step="0.01"
                          required
                          placeholder={`Price for ${size}`}
                          value={sizePrices[size] || ""}
                          onChange={(e) =>
                            handlePriceChange(size, e.target.value)
                          }
                          className="px-3 py-2 border rounded-md w-28 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <input
                          type="number"
                          required
                          placeholder={`Stock for ${size}`}
                          value={sizeStocks[size] || ""}
                          onChange={(e) =>
                            handleStockChange(size, e.target.value)
                          }
                          className="px-3 py-2 border rounded-md w-28 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Image URL
            </label>
            <input
              type="file"
              name="image"
              required
              placeholder="https://example.com/image.jpg"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Description
            </label>
            <textarea
              name="description"
              rows="4"
              required
              placeholder="Write a short description..."
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md transition hover:bg-green-700 font-semibold"
          >
            Add Product
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddProducts;
