import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Pages.css";

export default function Home() {
  return (
    <div className="page-container">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="page-title"
      >
        Welcome to The Caravan Chronicle
      </motion.h1>

      <p className="page-description">
        A smart grievance tracking system that ensures every issue gets noticed,
        tracked, and resolved efficiently — keeping the circus-city running
        smoothly.
      </p>

      <Link to="/signup" className="page-cta">
        Get Started
      </Link>
    </div>
  );
}
