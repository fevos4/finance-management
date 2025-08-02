import logo from "../assets/logo.png";


const Navbar = () => {
  return (
    <nav className="flex items-center justify-between h-14 p-4 bg-white shadow-md">
      <div className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="h-28 w-auto" />
        
      </div>
      <ul className="flex gap-6 list-none font-montserrat">
        <li>
          <a href="/" className="hover:text-[#1E293B]">Help</a>
        </li>
        <li>
          <a href="/about" className="hover:text-[#1E293B]">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
