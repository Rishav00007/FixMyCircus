// import { useContext } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext.jsx";
// import {
//   LayoutDashboard,
//   FileText,
//   Users,
//   Map,
//   LogOut,
//   Home,
// } from "lucide-react";
// import "./Sidebar.css";


// const Sidebar = () => {
//   const { user, logoutUser } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logoutUser();
//     navigate("/login");
//   };

//   const role = user?.role || "citizen";

  

//   const navLinks = {
//     citizen: [
//       { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
//       { to: "/reports", label: "Reports", icon: FileText },
//     ],
//     staff: [
//       { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
//       { to: "/assigned-complaints", label: "My Complaints", icon: FileText },
//     ],
//     admin: [
//       { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
//       { to: "/manage-staff", label: "Staff", icon: Users },
//       { to: "/analytics", label: "Analytics", icon: Map },
//       { to: "/reports", label: "Reports", icon: FileText },


//     ],
//   };

//   const links = navLinks[role] || [];

//   return (
//     <aside className="sidebar">
//       <nav className="sidebar-nav">
//         <NavLink to="/" className="sidebar-link">
//           <Home className="icon" /> Home
//         </NavLink>
//         {links.map(({ to, label, icon: Icon }) => (
//           <NavLink key={to} to={to} className="sidebar-link">
//             <Icon className="icon" /> {label}
//           </NavLink>
//         ))}
//       </nav>
//       <div className="sidebar-footer">
//         <button onClick={handleLogout} className="logout-btn">
//           <LogOut className="icon" /> Logout
//         </button>
//         <p>
//           Logged in as: <strong>{role}</strong>
//         </p>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;





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
  ClipboardList,
  FolderKanban,
} from "lucide-react";
import "./Sidebar.css";

const Sidebar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const role = user?.role || "citizen";

  // Dynamic role-based navigation
  const navLinks = {
    citizen: [
      { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { to: "/reports", label: "My Reports", icon: FileText },
    ],

    staff: [
      { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      // {
      //   to: "/assigned-complaints",
      //   label: "Assigned Complaints",
      //   icon: ClipboardList,
      // },
    ],

    admin: [
      { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      {
        to: "/manage-staff",
        label: "Manage Staff",
        icon: Users,
      },
      {
        to: "/departments",
        label: "Departments",
        icon: FolderKanban,
      },
      // {
      //   to: "/assign-complaints",
      //   label: "Assign Complaints",
      //   icon: ClipboardList,
      // },
      {
        to: "/analytics",
        label: "Analytics",
        icon: Map,
      },
      {
        to: "/reports",
        label: "Reports",
        icon: FileText,
      },
    ],
  };

  const links = navLinks[role] || [];

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <NavLink to="/" className="sidebar-link">
          <Home className="icon" /> Home
        </NavLink>

        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <Icon className="icon" /> {label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
          <LogOut className="icon" /> Logout
        </button>
        <p className="sidebar-role">
          Logged in as: <strong>{role}</strong>
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;

