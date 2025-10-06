// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "../../services/api";

// const ResetPassword = () => {
//   const { token } = useParams();
//   const navigate = useNavigate();
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setError("");
//     try {
//       const res = await axios.post(`/auth/reset-password/${token}`, {
//         password,
//       });
//       setMessage(res.data.message);
//       // Redirect to login after 2 seconds
//       setTimeout(() => {
//         navigate("/login");
//       }, 2000);
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <div className="reset-container">
//       <h2>Reset Password</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="password"
//           placeholder="New password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Reset Password</button>
//       </form>
//       {message && <p className="success">{message}</p>}
//       {error && <p className="error">{error}</p>}
//     </div>
//   );
// };

// export default ResetPassword;



import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import authService from "../../services/authService.js";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const { data } = await authService.resetPassword(token, password);
      setMessage(data.message || "Password reset successful!");
      setTimeout(() => navigate("/login"), 1500);
    } catch {
      setMessage("Error resetting password!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-white">
      <div className="glassmorphism p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">Reset Password</h2>
        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Reset Password
          </button>
        </form>
        {message && <p className="text-center text-sm text-green-600 mt-3">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;

