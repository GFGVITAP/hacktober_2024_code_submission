import { Menu, Satellite, Cpu, Store, BarChart2, Home } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Home className="w-6 h-6 text-green-600" />
            <span className="font-bold text-xl">SmartFarm</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink icon={<Satellite className="w-5 h-5" />} text="Satellite Analysis" />
            <NavLink icon={<Cpu className="w-5 h-5" />} text="IoT Sensors" />
            <NavLink icon={<Store className="w-5 h-5" />} text="Market" />
            <NavLink icon={<BarChart2 className="w-5 h-5" />} text="Analytics" />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <MobileNavLink icon={<Satellite className="w-5 h-5" />} text="Satellite Analysis" />
              <MobileNavLink icon={<Cpu className="w-5 h-5" />} text="IoT Sensors" />
              <MobileNavLink icon={<Store className="w-5 h-5" />} text="Market" />
              <MobileNavLink icon={<BarChart2 className="w-5 h-5" />} text="Analytics" />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

const NavLink = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <a href="#" className="flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors">
    {icon}
    <span>{text}</span>
  </a>
);

const MobileNavLink = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <a href="#" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
    {icon}
    <span>{text}</span>
  </a>
);