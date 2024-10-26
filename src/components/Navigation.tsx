import React from 'react';
import { Heart, AlertCircle, Brain } from 'lucide-react';
import { Page } from '../App';

interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  isActive: boolean;
  onClick: () => void;
}

function NavItem({ icon, text, isActive, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
        isActive
          ? 'bg-blue-50 text-blue-700'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <span className="mr-2">{icon}</span>
      <span className="font-medium">{text}</span>
    </button>
  );
}

interface NavigationProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-900">CardioCare</span>
          </div>
          <div className="flex space-x-4">
            <NavItem
              icon={<Heart className="w-5 h-5" />}
              text="Health Data"
              isActive={currentPage === 'health'}
              onClick={() => onPageChange('health')}
            />
            <NavItem
              icon={<AlertCircle className="w-5 h-5" />}
              text="Emergency SOS"
              isActive={currentPage === 'sos'}
              onClick={() => onPageChange('sos')}
            />
            <NavItem
              icon={<Brain className="w-5 h-5" />}
              text="AI Help"
              isActive={currentPage === 'ai'}
              onClick={() => onPageChange('ai')}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}