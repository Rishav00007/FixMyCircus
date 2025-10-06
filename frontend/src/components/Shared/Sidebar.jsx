// frontend/src/components/Shared/Sidebar.jsx
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import {
  LayoutDashboard,
  FileText,
  Users,
  Map,
  LogOut,
  Home,
} from "lucide-react";

const Sidebar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const role = user?.role || "citizen"; // default fallback

  // Role-based navigation
  const navLinks = {
    citizen: [
      { to: "/citizen-dashboard", label: "Dashboard", icon: LayoutDashboard },
      { to: "/reports", label: "Reports", icon: FileText },
    ],
    staff: [
      { to: "/staff-dashboard", label: "Dashboard", icon: LayoutDashboard },
      { to: "/assigned-complaints", label: "My Complaints", icon: FileText },
    ],
    admin: [
      { to: "/admin-dashboard", label: "Dashboard", icon: LayoutDashboard },
      { to: "/manage-staff", label: "Staff", icon: Users },
      { to: "/analytics", label: "Analytics", icon: Map },
      { to: "/reports", label: "Reports", icon: FileText },
    ],
  };

  const links = navLinks[role] || [];

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-gradient-to-b from-blue-800 to-blue-600 text-white shadow-xl">
      {/* Logo Section */}
      <div className="flex items-center justify-center h-20 border-b border-blue-500">
        <h1 className="text-2xl font-extrabold tracking-wide">
          Caravan Chronicle
        </h1>
      </div>

      {/* Navigation Section */}
      <nav className="flex-grow p-4 space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              isActive
                ? "bg-white text-blue-700 shadow-md"
                : "hover:bg-blue-700/30"
            }`
          }
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </NavLink>

        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-white text-blue-700 shadow-md"
                  : "hover:bg-blue-700/30"
              }`
            }
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer / Logout */}
      <div className="border-t border-blue-500 p-4">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-xl transition"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
        <p className="text-xs text-center text-blue-200 mt-2">
          Logged in as: <span className="font-semibold">{role}</span>
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
