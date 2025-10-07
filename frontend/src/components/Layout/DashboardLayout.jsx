// frontend/src/components/Layout/DashboardLayout.jsx
import Navbar from "../Shared/Navbar.jsx";
import Sidebar from "../Shared/Sidebar.jsx";
import Footer from "../Shared/Footer.jsx";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <main className="flex-grow bg-gray-50 p-6">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
