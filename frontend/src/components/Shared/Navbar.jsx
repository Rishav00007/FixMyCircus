import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="glassmorphism fixed w-full z-50 flex justify-between items-center px-8 py-3 backdrop-blur-md shadow-md">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        Caravan Chronicle
      </Link>
      <div className="space-x-6">
        <Link to="/" className="hover:text-blue-500">Home</Link>
        <Link to="/about" className="hover:text-blue-500">About</Link>
        <Link to="/contact" className="hover:text-blue-500">Contact</Link>
        <Link to="/login" className="bg-blue-600 text-white px-4 py-1.5 rounded-full hover:bg-blue-700 transition">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
