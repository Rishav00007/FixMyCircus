import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center">
      <h1 className="text-6xl font-bold text-blue-600">404</h1>
      <p className="text-gray-600 mt-2">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-4 text-blue-600 hover:underline">Back to Home</Link>
    </div>
  );
};

export default NotFound;
