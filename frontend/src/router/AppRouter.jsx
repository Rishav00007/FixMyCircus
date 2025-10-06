import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home.jsx";
import DashboardLayout from "../components/Layout/DashboardLayout.jsx";
import CitizenDashboard from "../components/Dashboard/CitizenDashboard.jsx";
import StaffDashboard from "../components/Dashboard/StaffDashboard.jsx";
import AdminDashboard from "../components/Dashboard/AdminDashboard.jsx";
import About from "../pages/About.jsx";
import Contact from "../pages/Contact.jsx";
import NotFound from "../pages/NotFound.jsx";
import Login from "../components/Auth/Login.jsx";
import Signup from "../components/Auth/Signup.jsx";
import ResetPassword from "../components/Auth/ResetPassword.jsx";
import ForgotPassword from "../components/Auth/ForgotPassword.jsx";

import ComplaintForm from "../components/Complaints/ComplaintForm.jsx";
import ComplaintList from "../components/Complaints/ComplaintList.jsx";
import ComplaintDetails from "../components/Complaints/ComplaintDetails.jsx";

import Navbar from "../components/Shared/Navbar.jsx";
import Sidebar from "../components/Shared/Sidebar.jsx";

import { useAuth } from "../context/AuthContext.jsx";

const AppRouter = () => {
    const { user } = useAuth();
    const getDashboard = () => {
        if (!user) return <Navigate to="/login" />;
        switch (user.role) {
        case "citizen":
            return <CitizenDashboard />;
        case "staff":
            return <StaffDashboard />;
        case "admin":
            return <AdminDashboard />;
        default:
            return <Navigate to="/login" />;
        }
    };

  return (
    <div>
        {user && <Navbar />}
        <div className="flex min-h-screen bg-gray-50">
        {user && <Sidebar role={user.role} />}
        <div className="flex-1 p-4 md:p-6">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                {/* Role-Based Dashboards */}
                <Route path="/dashboard" element={getDashboard()} />

                {/* Citizen Routes */}
                {user?.role === "citizen" && (
                <>
                    <Route path="/complaints/new" element={<ComplaintForm />} />
                    <Route path="/complaints" element={<ComplaintList type="citizen" />} />
                    <Route path="/complaints/:id" element={<ComplaintDetails />} />
                </>
                )}

                {/* Staff Routes */}
                {user?.role === "staff" && (
                <>
                    <Route path="/assigned-complaints" element={<ComplaintList type="staff" />} />
                    <Route path="/complaints/:id" element={<ComplaintDetails />} />
                </>
                )}

                {/* Admin Routes */}
                {user?.role === "admin" && (
                <>
                    <Route path="/all-complaints" element={<ComplaintList type="admin" />} />
                    <Route path="/complaints/:id" element={<ComplaintDetails />} />
                </>
                )}
                
                <Route path="*" element={<NotFound />} />
            </Routes>

        </div>
        </div>
    
    </div>
    
  );
};

export default AppRouter;
