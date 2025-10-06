import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import Contact from "../pages/Contact.jsx";
import NotFound from "../pages/NotFound.jsx";
import Login from "../components/Auth/Login.jsx";
import Signup from "../components/Auth/Signup.jsx";
import ResetPassword from "../components/Auth/ResetPassword.jsx";
import ForgotPassword from "../components/Auth/ForgotPassword.jsx";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
