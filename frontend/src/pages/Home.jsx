import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-28 px-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold text-blue-700"
      >
        Welcome to The Caravan Chronicle
      </motion.h1>
      <p className="mt-4 text-lg text-gray-600 max-w-2xl">
        A smart grievance tracking system that ensures every issue gets noticed, tracked, and resolved efficiently — keeping the circus-city running smoothly.
      </p>
      <Link
        to="/signup"
        className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
      >
        Get Started
      </Link>
    </div>
  );
};

export default Home;
