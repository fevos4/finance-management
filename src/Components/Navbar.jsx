import logo from "../assets/logo.png";

const Navbar = () => {
  const scrollToFooter = () => {
    const footer = document.getElementById("footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="flex items-center justify-between h-14 p-4 bg-white shadow-md">
      <div className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="h-28 w-auto" />
      </div>
      <ul className="flex gap-6 list-none font-montserrat">
        <li>
          <button onClick={scrollToFooter} className="hover:text-[#1E293B]">
            Contact
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
