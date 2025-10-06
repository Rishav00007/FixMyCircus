// import React, { useState } from "react";
// import api from "../../services/api";
// import { useNavigate } from "react-router-dom";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await api.post("/auth/forgot-password", { email });
//       setMessage(res.data.message); // success message from backend
//       setError("");
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong");
//       setMessage("");
//     }
//   };

//   return (
//     <div>
//       <h2>Forgot Password</h2>
//       {message && <p style={{ color: "green" }}>{message}</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Enter your registered email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <button type="submit">Send Reset Link</button>
//       </form>
//     </div>
//   );
// };

// export default ForgotPassword;


import React, { useState } from "react";
import authService from "../../services/authService.js";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await authService.forgotPassword(email);
      setMessage(data.message || "Password reset link sent to your email!");
    } catch {
      setMessage("Error sending reset link!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="glassmorphism p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Send Reset Link
          </button>
        </form>
        {message && <p className="text-center text-sm text-green-600 mt-3">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;

