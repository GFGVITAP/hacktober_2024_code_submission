import React from 'react';
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { FiShield } from "react-icons/fi";
import { LuUser, LuLeaf } from "react-icons/lu";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0d1b12] text-white 
    bg-gradient-to-tr from-[#040a08] via-[#101d26] to-[#050b09]">
      {/* Title Section */}
      <div className="text-4xl font-semibold mt-12 mb-4 transition-transform duration-500 hover:scale-105">
        Smart Paddy Disease Detection
      </div>
      <div className="text-3xl font-bold text-green mb-2 transition-transform duration-500 hover:scale-105">
        AgriDOC
      </div>
      <div className="text-lg text-gray-300 mb-8 transition-opacity duration-500 hover:opacity-90">
        Your Intelligent Agriculture Assistant for Healthier Crops
      </div>
      
      {/* Features Section */}
      <div className="grid grid-cols-2 gap-6 mb-12 font-bold justify-center items-center">
        <div className="flex flex-col items-center justify-center bg-gray-800 p-6 rounded-lg transition-transform duration-300 hover:scale-105 hover:bg-green-500">
          <HiMiniMagnifyingGlass className="text-3xl mb-2 text-green transition-transform duration-300 hover:scale-110" />
          <span>Disease Detection</span>
        </div>
        <div className="flex flex-col items-center justify-center bg-gray-800 p-6 rounded-lg transition-transform duration-300 hover:scale-105 hover:bg-green-500">
          <FiShield className="text-3xl mb-2 text-green transition-transform duration-300 hover:scale-110" />
          <span>Prevention Tips</span>
        </div>
        <div className="flex flex-col items-center justify-center bg-gray-800 p-6 rounded-lg transition-transform duration-300 hover:scale-105 hover:bg-green-500">
          <LuLeaf className="text-3xl mb-2 text-green transition-transform duration-300 hover:scale-110" />
          <span>Crop Analysis</span>
        </div>
        <div className="flex flex-col items-center justify-center bg-gray-800 p-6 rounded-lg transition-transform duration-300 hover:scale-105 hover:bg-green-500">
          <LuUser className="text-3xl mb-2 text-green transition-transform duration-300 hover:scale-110" />
          <span>Expert Support</span>
        </div>
      </div>

      {/* Get Started Button */}
      <button className="text-green bg-black py-3 px-8 rounded-full transition-colors 
      duration-300 hover:bg-green hover:text-white">
        Get Started
      </button>
    </div>
  );
};

export default Home;
