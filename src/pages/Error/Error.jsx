import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const Error = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-white px-4"
    >
      <motion.h1
        className="text-8xl font-extrabold text-green-600"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        404
      </motion.h1>

      <motion.h2
        className="mt-4 text-2xl md:text-3xl font-semibold text-gray-800 text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Oops! Page not found.
      </motion.h2>

      <motion.p
        className="mt-2 text-gray-600 text-center max-w-md"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        The page you're looking for doesn't exist or has been moved. Let's get
        you back home.
      </motion.p>

      <motion.div
        className="mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link
          to="/"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition shadow-md"
        >
          Go to Home
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Error;
