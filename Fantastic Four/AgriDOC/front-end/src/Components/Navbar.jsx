import React from "react";
import { LuLeaf } from "react-icons/lu";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center bg-[#081213] p-4 fixed w-full top-0 z-50">
      {/* Logo Section */}
      <div className="flex items-center text-green text-2xl font-bold">
        <LuLeaf className="mr-2" />
        AgriDOC
      </div>
      
      {/* Navigation Links */}
      <div className="flex-grow">
        <ul className="flex justify-end space-x-8 text-white text-lg">
          <li className="hover:text-green-500 cursor-pointer transition-colors">Detection</li>
          <li className="hover:text-green-500 cursor-pointer transition-colors">History</li>
          <li className="hover:text-green-500 cursor-pointer transition-colors">Information</li>
          <li className="hover:text-green-500 cursor-pointer transition-colors">Q&A</li>
        </ul>
      </div>
      
      {/* User Profile Icon */}
      <div className="text-white text-xl cursor-pointer ml-8">
        <i className="fas fa-user-circle"></i> {/* Example icon */}
      </div>
    </div>
  );
};

export default Navbar;
