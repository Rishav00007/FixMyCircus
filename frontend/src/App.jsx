// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Signup from "./components/Auth/Signup";
// import Login from "./components/Auth/Login";
// import ForgotPassword from "./components/Auth/ForgotPassword";
// import ResetPassword from "./components/Auth/ResetPassword";

// import { AuthProvider } from "./context/AuthContext";
// import Home from "./pages/Home";

// const App = () => {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Home/>} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/reset-password/:token" element={<ResetPassword />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
    
//   );
// };

// export default App;


import React from "react";
import AppRouter from "./router/AppRouter.jsx";
import Navbar from "./components/Shared/Navbar.jsx";
import Footer from "./components/Shared/Footer.jsx";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-white">
      <Navbar />
      <main className="flex-grow">
        <AppRouter />
      </main>
      <Footer />
    </div>
  );
};

export default App;

