import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";
import { useNavigate } from "react-router";

const AddBanner = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [buttonUrl, setButtonUrl] = useState("");

  const handleAddBanner = async (e) => {
    e.preventDefault();

    const imageFile = e.target.image.files[0];
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
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

      await axios.post("http://localhost:3000/banner", {
        image: imageURL,
        title,
        subtitle,
        buttonText,
        buttonUrl,
      });

      toast.success("✅ Banner Image and Text Added Successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error uploading image:", err);
      toast.error("❌ Failed to upload banner.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <h3 className="font-bold text-xl mb-4 text-center text-green-700">
          Add Banner
        </h3>
        <form onSubmit={handleAddBanner} className="space-y-4">
          <input
            className="file-input file-input-bordered file-input-success w-full"
            type="file"
            name="image"
            accept="image/*"
            required
          />
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="Subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            required
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="Button Text"
            value={buttonText}
            onChange={(e) => setButtonText(e.target.value)}
            required
            className="input input-bordered w-full"
          />
          <input
            type="url"
            placeholder="Button URL"
            value={buttonUrl}
            onChange={(e) => setButtonUrl(e.target.value)}
            required
            className="input input-bordered w-full"
          />
          <button
            type="submit"
            className="btn btn-success w-full"
          >
            Upload Banner
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBanner;
