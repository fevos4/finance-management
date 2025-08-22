import { MdDashboard, MdSchool } from "react-icons/md";
import logo from "../../assets/logo.png";
import defaultUserImage from "../../assets/user.jpg"; // local default fallback
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { logout, studentData } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  const navigationItems = [
    {
      id: "Dashboard",
      label: "Dashboard",
      icon: <MdDashboard className="text-xl" />,
      href: "/dashboard",
    },
    {
      id: "My Courses",
      label: "My Courses",
      icon: <MdSchool className="text-xl" />,
      href: "/courses",
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div
      className={`fixed md:static z-50 bg-white h-full shadow-lg flex flex-col transition-transform duration-300 ease-in-out w-64 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-gray-100 flex justify-center items-center">
        <img src={logo} alt="UniPay Logo" className="h-12 scale-150 w-auto" />
      </div>

      {/* User Info */}
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <img
            src={studentData?.studentInfo?.profileImage || defaultUserImage}
            alt={studentData?.studentInfo?.name || "User"}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">
              {studentData?.studentInfo?.name || "Guest User"}
            </h3>
            <p className="text-gray-500 text-xs">
              ID number {studentData?.studentInfo?.id || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = currentPath.startsWith(item.href);
            return (
              <li key={item.id}>
                <a
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-yellow-400 text-black font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  <span className="text-sm">{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="w-full text-left text-black hover:text-red-400 px-4 py-2 rounded-lg transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
