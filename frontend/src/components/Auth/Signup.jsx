// import { useState } from "react";
// import API from "../../services/api";

// export default function Signup() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("citizen");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post("/signup", { name, email, password, role });
//       setMessage(res.data.message);
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Error occurred");
//     }
//   };

//   return (
//     <div>
//       <h2>Sign Up</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           placeholder="Email"
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           placeholder="Password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <select value={role} onChange={(e) => setRole(e.target.value)}>
//           <option value="citizen">Citizen</option>
//           <option value="staff">Staff</option>
//           <option value="admin">Admin</option>
//         </select>
//         <button type="submit">Sign Up</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/authService.js";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "citizen", message: ""});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await authService.signup(form);
      alert("Account created successfully!");
      navigate("/login");
    } catch (err) {
      alert("Error creating account!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-white to-blue-50">
      <div className="glassmorphism p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            required
          />
          <select
            name="role"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
          >
            <option value="citizen">Citizen</option>
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
          </select>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
 
