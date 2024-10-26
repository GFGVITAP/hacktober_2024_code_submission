// src/components/Navbar.tsx

// ... other imports
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false); // Close the menu after navigation on mobile
  };

  return (
    <nav className="bg-gray-200 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-gray-800 text-lg font-bold">HarvestHarmony</div>
        <div className="hidden md:flex space-x-4">
          <button
            onClick={() => handleNavigation("/")}
            className="bg-gray-300 text-blue-400 hover:bg-gray-400 hover:text-blue-500 transition duration-200 p-2 rounded"
          >
            Home
          </button>
          <button
            onClick={() => handleNavigation("/about")}
            className="bg-gray-300 text-blue-400 hover:bg-gray-400 hover:text-blue-500 transition duration-200 p-2 rounded"
          >
            About
          </button>
          <button
            onClick={() => handleNavigation("/location")}
            className="bg-gray-300 text-blue-400 hover:bg-gray-400 hover:text-blue-500 transition duration-200 p-2 rounded"
          >
            Location
          </button>
          <button
            onClick={() => handleNavigation("/contact")}
            className="bg-gray-300 text-blue-400 hover:bg-gray-400 hover:text-blue-500 transition duration-200 p-2 rounded"
          >
            Contact
          </button>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-800 focus:outline-none hover:text-gray-600 transition duration-200"
          >
            {isOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="flex flex-col space-y-2 mt-2">
            <button
              onClick={() => handleNavigation("/")}
              className="bg-gray-300 text-blue-400 hover:bg-gray-400 hover:text-blue-500 transition duration-200 p-2 rounded"
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation("/about")}
              className="bg-gray-300 text-blue-400 hover:bg-gray-400 hover:text-blue-500 transition duration-200 p-2 rounded"
            >
              About
            </button>
            <button
              onClick={() => handleNavigation("/location")}
              className="bg-gray-300 text-blue-400 hover:bg-gray-400 hover:text-blue-500 transition duration-200 p-2 rounded"
            >
              Services
            </button>
            <button
              onClick={() => handleNavigation("/contact")}
              className="bg-gray-300 text-blue-400 hover:bg-gray-400 hover:text-blue-500 transition duration-200 p-2 rounded"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
