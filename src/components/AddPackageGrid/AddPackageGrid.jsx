import axios from "axios";
import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import { toast } from "react-toastify";

const AddPackageGrid = () => {
  const [selectedGrid, setSelectedGrid] = useState("grid1");

  const apiMap = {
    grid1: "http://localhost:3000/grid",
    grid2: "http://localhost:3000/grid1",
    grid3: "http://localhost:3000/grid2",
  };

  const handleAddPackageGrid = async (e) => {
    e.preventDefault();
    try {
      const form = e.target;
      const imageFile = form.image.files[0];

      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(imageFile, options);
      const formData = new FormData();
      formData.append("image", compressedFile);

      const res = await fetch(
        "https://api.imgbb.com/1/upload?key=af5080f6264ea38c18a1cf186815b22f",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      const imageURL = data.data.url;

      const buttonUrl = form.buttonUrl.value;

      const gridInfo = {
        image: imageURL,
        buttonUrl: buttonUrl,
      };

      const apiURL = apiMap[selectedGrid];

      await axios.post(apiURL, gridInfo);

      toast.success("🎉 Grid item added to " + selectedGrid + " successfully!");
      form.reset();
    } catch (error) {
      console.error("❌ Error adding grid:", error);
      toast.warn("Something went wrong!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-green-600">
        ➕ Add Package Grid
      </h2>

      <form onSubmit={handleAddPackageGrid} className="space-y-4">
        {/* Grid Selector */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Select Grid API
          </label>
          <select
            className="select select-bordered w-full"
            value={selectedGrid}
            onChange={(e) => setSelectedGrid(e.target.value)}
          >
            <option value="grid1">Grid</option>
            <option value="grid2">Grid 1</option>
            <option value="grid3">Grid 2</option>
          </select>
        </div>

        {/* Image File */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Upload Image
          </label>
          <input
            type="file"
            name="image"
            required
            className="input input-bordered w-full"
          />
        </div>

        {/* Button URL */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Button URL
          </label>
          <input
            type="url"
            name="buttonUrl"
            placeholder="https://example.com"
            required
            className="input input-bordered w-full"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <input
            type="submit"
            value="Submit"
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-full font-semibold transition-all duration-200"
          />
        </div>
      </form>
    </div>
  );
};

export default AddPackageGrid;
