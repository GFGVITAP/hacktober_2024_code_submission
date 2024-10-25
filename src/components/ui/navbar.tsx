// src/components/Navbar.tsx

import React, { useState } from "react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-200 p-4">
      {" "}
      {/* Changed to a lighter grey */}
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-gray-800 text-lg font-bold">HarvestHarmony</div>{" "}
        {/* Changed text color to darker for contrast */}
        <div className="hidden md:flex space-x-4">
          <a
            href="#"
            className="text-gray-800 hover:text-gray-600 transition duration-200"
          >
            {" "}
            {/* Added transition for smooth effect */}
            Home
          </a>
          <a
            href="#"
            className="text-gray-800 hover:text-gray-600 transition duration-200"
          >
            About
          </a>
          <a
            href="#"
            className="text-gray-800 hover:text-gray-600 transition duration-200"
          >
            Services
          </a>
          <a
            href="#"
            className="text-gray-800 hover:text-gray-600 transition duration-200"
          >
            Contact
          </a>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-800 focus:outline-none hover:text-gray-600 transition duration-200" // Added hover effect
          >
            {isOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="flex flex-col space-y-2 mt-2">
            <a
              href="#"
              className="block text-gray-800 hover:text-gray-600 transition duration-200"
            >
              Home
            </a>
            <a
              href="#"
              className="block text-gray-800 hover:text-gray-600 transition duration-200"
            >
              About
            </a>
            <a
              href="#"
              className="block text-gray-800 hover:text-gray-600 transition duration-200"
            >
              Services
            </a>
            <a
              href="#"
              className="block text-gray-800 hover:text-gray-600 transition duration-200"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
