import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AddRoute = () => {
  const [routeName, setRouteName] = useState("");
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [meta, setMeta] = useState("");
  const [content, setContent] = useState("");
  const [bgColor, setBgColor] = useState("#f1f5f9");
  const [showNav, setShowNav] = useState(true);
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRoute = {
      name: routeName,
      slug,
      title,
      meta,
      content,
      bgColor,
      showNav,
    };

    console.log("Created Route:", newRoute);
    alert("✅ Custom Route Created!");

    // Reset
    setRouteName("");
    setSlug("");
    setTitle("");
    setMeta("");
    setContent("");
    setBgColor("#f1f5f9");
    setShowNav(true);
    setShowPreview(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-xl rounded-xl space-y-8">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-bold text-green-600"
      >
        🛠️ Create Custom Route
      </motion.h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 animate__animated animate__fadeIn"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold">Route Name</label>
            <input
              value={routeName}
              onChange={(e) => setRouteName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Contact Us"
              required
            />
          </div>
          <div>
            <label className="font-semibold">Custom Slug</label>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="contact"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              URL: <span className="text-green-600">/page/{slug || "..."}</span>
            </p>
          </div>
          <div>
            <label className="font-semibold">Page Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Example: Get in Touch"
            />
          </div>
          <div>
            <label className="font-semibold">Meta Description</label>
            <input
              value={meta}
              onChange={(e) => setMeta(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="This is a contact page"
            />
          </div>
          <div>
            <label className="font-semibold">Background Color</label>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-16 h-10 rounded overflow-hidden cursor-pointer"
            />
          </div>
          <div className="flex items-center space-x-2 mt-6">
            <input
              type="checkbox"
              checked={showNav}
              onChange={() => setShowNav(!showNav)}
              className="accent-green-600"
            />
            <label className="text-gray-700">Show in Navigation</label>
          </div>
        </div>

        <div>
          <label className="font-semibold">Page Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Write something..."
            rows="6"
            required
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md"
          >
            ➕ Create Route
          </button>
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="text-green-600 hover:underline"
          >
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>
        </div>
      </form>

      {/* Live Preview with Animation */}
      <AnimatePresence>
        {showPreview && content && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="rounded-lg p-6 border mt-6 shadow-md"
            style={{ backgroundColor: bgColor }}
          >
            <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
            <p className="text-sm italic mb-4 text-gray-600">{meta}</p>
            <div className="text-gray-700 whitespace-pre-line">{content}</div>
            <div className="mt-4 text-sm text-gray-500">
              <span className="font-semibold">Route Slug:</span> /page/{slug}
              <br />
              <span className="font-semibold">Navigation:</span>{" "}
              {showNav ? "✅ Visible" : "❌ Hidden"}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddRoute;
