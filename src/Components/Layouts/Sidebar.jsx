import { MdDashboard, MdSchool, MdPayment  } from 'react-icons/md';
import logo from '../../assets/logo.png';
import userImage from '../../assets/user.jpg'

const Sidebar = ({ activeItem = 'Dashboard', isOpen, toggleSidebar }) => {
  const navigationItems = [
    {
      id: 'Dashboard',
      label: 'Dashboard',
      icon: <MdDashboard className="text-xl" />,
      href: '/dashboard'
    },
    {
      id: 'My Courses',
      label: 'My Courses',
      icon: <MdSchool className="text-xl" />,
      href: '/courses'
    },
    {
      id: 'My Payments',
      label: 'My Payments',
      icon: <MdPayment className="text-xl" />,
      href: '/payments'
    }
  ];

  return (
    <div className={`fixed md:static z-50 bg-white h-full shadow-lg flex flex-col transition-transform duration-300 ease-in-out w-64 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
      <div className="p-6 border-b border-gray-100 items-center justify-center flex">
        <img src={logo} alt="UniPay Logo" className="h-12 scale-150 w-auto" />
      </div>

      <div className="p-6">
        <div className="flex items-center space-x-3">
          <img src={userImage} alt="Feven Tesfaye" className="w-12 h-12 rounded-full object-cover" />
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">Feven Tesfaye</h3>
            <p className="text-gray-500 text-xs">Id number 2025</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  activeItem === item.id
                    ? 'bg-yellow-400 text-black font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
