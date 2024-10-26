import React from 'react';
import Navbar from './components/Navbar';
import SatelliteAnalysis from './components/SatelliteAnalysis';
import IoTDashboard from './components/IoTDashboard';
import MarketPlace from './components/MarketPlace';
import { Satellite, Cpu, Store } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div>
        <div>
          <h1 className="title">Smart Farm Platform</h1>
          <p className="textxl">Transform your farm with AI, IoT, and market insights</p>
        </div>
      </div>

      {/* Main Content */}
      <div>
        <div className="maincnt">
          {/* Section Headers */}
          <div>
            <h2>Visual Understanding</h2>
          </div>

          <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
            <Cpu className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold">Physical Understanding</h2>
          </div>
          <IoTDashboard />

          <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
            <Store className="w-6 h-6 text-purple-600" />
            <h2>Market Connect</h2>
          </div>
          <MarketPlace />
        </div>
      </div>
    </div>
  );
}

export default App;
