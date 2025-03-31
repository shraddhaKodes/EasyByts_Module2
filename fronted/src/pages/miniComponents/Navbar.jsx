import React, { useState, useContext, useEffect } from "react";
import { FaMoon, FaSun, FaBars, FaTimes, FaCalendarAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ThemeContext from "../../context/ThemeContext";
import { jwtDecode } from "jwt-decode" ;

const Navbar = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Check login state on page load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token); // ✅ Decode token
        setUser(decoded); // ✅ Set user state
      } catch (error) {
        console.error("Invalid Token:", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  // ✅ Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // ✅ Remove token
    setUser(null);
    navigate("/"); // Redirect to login page
  };

  // ✅ Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [menuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md shadow-lg px-6 py-4 transition-all 
      ${darkMode ? "bg-gray-900/80 text-white border-b-2 border-white" : "bg-white/80 text-gray-900 border-b border-gray-300"}`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* ✅ Logo */}
        <Link to="/" className="text-3xl font-extrabold flex items-center gap-2">
          <FaCalendarAlt className="text-4xl text-blue-600 dark:text-blue-400" />
          <span className="transition-all duration-300">EventSync</span>
        </Link>

        {/* ✅ Desktop Menu */}
        <ul className="hidden md:flex gap-8 font-medium text-lg">
          {!user && ["Home", "About", "Contact"].map((item, index) => (
            <li key={index} className="relative group">
              <a href={`#${item.toLowerCase()}`} className="transition-all hover:text-blue-600">
                {item}
              </a>
              <span className="absolute left-0 bottom-[-3px] w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}
          {user && (
            <>
              <li className="relative group">
                <Link to="/" className="transition-all hover:text-blue-600">Home</Link>
              </li>
              <li className="relative group">
                <Link to="/events" className="transition-all hover:text-blue-600">Events</Link>
              </li>
              <li className="relative group">
                <Link to="/dashboard" className="transition-all hover:text-blue-600">Dashboard</Link>
              </li>
            </>
          )}
        </ul>

        {/* ✅ Right Section */}
        <div className="flex items-center gap-6">
          {/* ✅ Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-300/40 transition"
          >
            {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />}
          </button>

          {/* ✅ Login / Logout */}
          {user ? (
            <button
              onClick={handleLogout}
              className="hidden md:block px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="hidden md:block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Login / Sign Up
            </Link>
          )}

          {/* ✅ Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-3xl transition-transform duration-300"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* ✅ Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 
        ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setMenuOpen(false)}
      ></div>

      {/* ✅ Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-gray-900/95 text-white shadow-lg transform transition-transform duration-300 
        ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-4 right-4 p-2 text-2xl hover:text-gray-300 transition"
        >
          <FaTimes />
        </button>
        <ul className="flex flex-col items-center justify-center h-full gap-6 text-lg">
          {["Home", "About", "Contact"].map((item, index) => (
            <Link
              key={index}
              to={`#${item.toLowerCase()}`}
              className="hover:text-blue-400 transition-all"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
          {user ? (
            <>
              <Link to="/events" className="hover:text-blue-400 transition-all" onClick={() => setMenuOpen(false)}>
                Events
              </Link>
              <Link to="/dashboard" className="hover:text-blue-400 transition-all" onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:text-blue-400 transition-all" onClick={() => setMenuOpen(false)}>
              Login / Sign Up
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
