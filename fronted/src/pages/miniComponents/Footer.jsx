import React from "react";
import { FaLinkedin, FaGithub, FaTwitter, FaCalendarCheck } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-gray-700 to-gray-900 text-white py-8 px-6 sm:px-12">
      
      {/* Top Section */}
      <div className="max-w-[1050px] mx-auto text-center">
        <hr className="border-gray-600 mb-5" />
        <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-center gap-2">
          <FaCalendarCheck className="text-blue-400 text-3xl sm:text-4xl" />
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-wide text-blue-400 animate-pulse">
            Thanks for Visiting EventSync
          </h1>
        </div>
        <p className="text-gray-400 text-sm sm:text-md mt-2">
          Crafted with <span className="text-red-500">❤️</span> by Shraddha Kumari | Connecting People, One Event at a Time
        </p>
      </div>

      {/* Footer Links & Socials */}
      <div className="max-w-[1050px] mx-auto mt-6 flex flex-col sm:flex-row justify-between items-center text-gray-400 text-sm gap-4">
        
        {/* Quick Links */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-center sm:text-left">
          <a href="#about" className="hover:text-blue-400 transition">About Us</a>
          <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
          <a href="/privacy" className="hover:text-blue-400 transition">Privacy Policy</a>
          <a href="/terms" className="hover:text-blue-400 transition">Terms & Conditions</a>
        </div>

        {/* Social Media */}
        <div className="flex gap-5 mt-4 sm:mt-0">
          <a href="https://linkedin.com/in/shraddhakodes" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-blue-500 transition">
            <FaLinkedin />
          </a>
          <a href="https://github.com/shraddhakodes" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-gray-300 transition">
            <FaGithub />
          </a>
          <a href="https://twitter.com/shraddhakodes" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-blue-400 transition">
            <FaTwitter />
          </a>
        </div>
      </div>
      
      {/* Bottom Section */}
      <div className="text-center text-gray-500 text-xs mt-6">
        © {new Date().getFullYear()} EventSync. All Rights Reserved.
      </div>
      
    </footer>
  );
};

export default Footer;
