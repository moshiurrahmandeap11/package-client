import React, { useState, useEffect, useRef } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router";
import { useAuth } from "../../hooks/Hooks";
import Loading from "../../components/Loader/Loading";
import { toast } from "react-toastify";
import { FaCartShopping } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading, logOut } = useAuth();
  const [littleHam, setLittleHam] = useState(false);
  const fallbackImage =
    "https://i.postimg.cc/tRkXS5ts/lovely-pet-portrait-isolated.jpg";
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Package", path: "/package" },
  ];
  const navigate = useNavigate();

  const navLinkClass = ({ isActive }) =>
    `relative w-fit after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:scale-x-0 after:bg-[#2e7d32] after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 ${
      isActive ? "after:scale-x-100 font-bold text-[#2e7d32]" : "text-[#1e3a2c]"
    }`;

  const renderLinks = () =>
    navItems.map(({ name, path }) => (
      <NavLink
        key={path}
        to={path}
        onClick={() => setIsOpen(false)}
        className={navLinkClass}
      >
        {name}
      </NavLink>
    ));

  // Close littleHam on outside click
  const dropdownRef = useRef();
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setLittleHam(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Log Out Successfully");
        setLittleHam(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-transparent backdrop-blur-xl shadow-2xl px-4 py-3 relative">
      <div className="flex justify-between items-center lg:px-10 mx-auto">
        {/* Left Part */}
        <div className="flex items-center gap-3">
          <RxHamburgerMenu
            className="text-2xl cursor-pointer lg:hidden"
            onClick={() => setIsOpen(true)}
          />
          <Link to="/" className="text-xl lg:text-3xl font-bold text-[#1e3a2c]">
            Package
          </Link>
        </div>

        {/* Center Links (Hidden on small) */}
        <div className="hidden lg:flex gap-6">{renderLinks()}</div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <button
              aria-label="Search"
              className="p-2 rounded-full cursor-pointer hover:bg-green-100 transition"
            >
              <FaSearch size={20} className="text-[#1e3a2c]" />
            </button>

            <button
              aria-label="Cart"
              className="p-2 rounded-full cursor-pointer hover:bg-green-100 transition"
            >
              <FaCartShopping size={20} className="text-[#1e3a2c]" />
            </button>
          </div>

          {/* Right Part */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <img
                className="w-10 h-10 lg:w-14 lg:h-14 rounded-full object-cover cursor-pointer"
                src={user.photoURL || fallbackImage}
                alt={user.displayName || "User"}
                onClick={() => setLittleHam(!littleHam)}
              />

              {/* Dropdown menu with animation */}
              <div
                className={`absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg overflow-hidden z-50 transform transition-all duration-300 origin-top-right
              ${
                littleHam
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
              >
                {user?.email === "moshiurrahmandeap@gmail.com" ? (
                  <button
                    onClick={() => {
                      navigate("/admin-dashboard");
                      setLittleHam(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-green-100 text-[#2e7d32] font-semibold"
                  >
                    Admin
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      navigate("/dashboard/:id");
                      setLittleHam(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-green-100 text-[#2e7d32] font-semibold"
                  >
                    Dashboard
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-green-100 text-[#d32f2f] font-semibold"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="bg-[#a5d6a7] text-[#1e3a2c] px-4 py-1 rounded hover:bg-[#81c784] transition"
            >
              Log In
            </NavLink>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-full bg-white backdrop-blur-3xl shadow-lg z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="bg-white h-screen">
          <div className="p-4 flex justify-between items-center border-b">
            <h2 className="text-xl font-bold text-[#2e7d32]">Package</h2>
            <IoClose
              className="text-2xl cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <div className="flex flex-col gap-4 p-4 text-[#1e3a2c]">
            {renderLinks()}
          </div>
        </div>
      </div>

      {/* Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-white bg-opacity-30 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default Navbar;
