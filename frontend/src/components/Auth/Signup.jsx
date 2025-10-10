import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/authService.js";
import "./Auth.css";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "citizen",
  });
  const [otpSent, setOtpSent] = useState(false); //  Track if OTP was sent
  const [otp, setOtp] = useState(""); //  OTP input
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      await authService.sendOTP(form); //  Call backend to send OTP
      alert("OTP sent to your email!");
      setOtpSent(true);
    } catch (err) {
      alert(err.response?.data?.message || "Error sending OTP");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      await authService.verifyOTP({ email: form.email, otp }); //  Verify OTP
      alert("Email verified! You can now login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Sign Up</h2>
        {!otpSent ? (
          <form onSubmit={handleSendOtp} className="auth-form">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="auth-input"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="auth-input"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="auth-input"
              onChange={handleChange}
              required
            />
            <select name="role" className="auth-input" onChange={handleChange}>
              <option value="citizen">Citizen</option>
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
            <button type="submit" className="auth-button">
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="auth-form">
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              className="auth-input"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button type="submit" className="auth-button">
              Verify OTP
            </button>
          </form>
        )}
        <p className="auth-links">
          Already have an account?{" "}
          <Link to="/login" className="auth-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
