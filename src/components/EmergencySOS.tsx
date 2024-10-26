import React, { useState } from 'react';
import { Phone, MessageSquare, MapPin, AlertTriangle } from 'lucide-react';

export function EmergencySOS() {
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);

  const emergencyContacts = [
    { name: 'Emergency Services', number: '102' },
    { name: 'Primary Doctor', number: '9905158193' },
    { name: 'Emergency Contact 1', number: 'xxxxyyyyzz' },
  ];

  const handleEmergency = () => {
    setIsEmergencyActive(true);
    
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Emergency SOS</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Press the emergency button to alert emergency services and your emergency contacts. Your location and vital signs will be shared automatically.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <button
            onClick={handleEmergency}
            className={`
              w-48 h-48 rounded-full flex items-center justify-center
              transition-all duration-300 transform hover:scale-105
              ${isEmergencyActive 
                ? 'bg-red-100 animate-pulse' 
                : 'bg-red-600 hover:bg-red-700'
              }
            `}
          >
            <div className="text-center">
              <AlertTriangle className={`w-16 h-16 mx-auto mb-2 ${isEmergencyActive ? 'text-red-600' : 'text-white'}`} />
              <span className={`font-bold text-xl ${isEmergencyActive ? 'text-red-600' : 'text-white'}`}>
                {isEmergencyActive ? 'SOS ACTIVE' : 'SOS'}
              </span>
            </div>
          </button>
        </div>

        {isEmergencyActive && (
          <div className="text-center text-red-600 mb-8 animate-pulse">
            <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
            <p className="font-bold">Emergency services have been notified</p>
            <p className="text-sm">Help is on the way</p>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg">
            <div className="flex items-center mb-4">
              <Phone className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold">Emergency Contacts</h2>
            </div>
            <ul className="space-y-3">
              {emergencyContacts.map((contact, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span className="text-gray-600">{contact.name}</span>
                  <span className="font-medium">{contact.number}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 border rounded-lg">
            <div className="flex items-center mb-4">
              <MessageSquare className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold">Quick Messages</h2>
            </div>
            <ul className="space-y-3">
              <li className="text-gray-600">Medical emergency</li>
              <li className="text-gray-600">Need immediate assistance</li>
              <li className="text-gray-600">Send help to my location</li>
            </ul>
          </div>

          <div className="p-6 border rounded-lg">
            <div className="flex items-center mb-4">
              <MapPin className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold">Current Location</h2>
            </div>
            <div className="bg-gray-100 rounded-lg p-4">
              <p className="text-gray-600 text-sm">Location services active</p>
              <p className="font-medium">VIT AP, Amravati</p>
              <p className="text-gray-500">Vijaywada, IN 500084</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}