import React from "react";

const Footer = () => {
  return (
    <footer className="mt-16 text-center py-6 bg-blue-50 border-t border-blue-100">
      <p className="text-sm text-gray-600">
        © {new Date().getFullYear()} The Caravan Chronicle | All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
