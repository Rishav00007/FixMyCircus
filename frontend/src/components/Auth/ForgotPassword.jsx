import React, { useState } from "react";
import authService from "../../services/authService.js";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await authService.forgotPassword(email);
      setMessage(data.message || "Password reset link sent to your email!");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Error sending reset link!");
      setMessage("");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Forgot Password</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your registered email"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="auth-button">
            Send Reset Link
          </button>
        </form>
        {message && (
          <p className="text-green-600 mt-3 text-center">{message}</p>
        )}
        {error && <p className="text-red-600 mt-3 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
