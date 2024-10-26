import { Droplet, Thermometer, Wind, Zap } from 'lucide-react';

interface SensorData {
  id: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  status: 'normal' | 'warning' | 'critical';
}

export default function IoTDashboard() {
  const sensorData: SensorData[] = [
    { 
      id: '1', 
      icon: <Droplet className="w-5 h-5" />, 
      label: 'Soil Moisture', 
      value: '42%',
      status: 'normal'
    },
    { 
      id: '2', 
      icon: <Thermometer className="w-5 h-5" />, 
      label: 'Temperature', 
      value: '24°C',
      status: 'normal'
    },
    { 
      id: '3', 
      icon: <Wind className="w-5 h-5" />, 
      label: 'Humidity', 
      value: '65%',
      status: 'warning'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Zap className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold">IoT Sensors</h2>
        </div>
        <span className="text-sm text-green-600">● 12 Sensors Active</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sensorData.map((sensor) => (
          <div 
            key={sensor.id}
            className={`p-4 rounded-lg border ${
              sensor.status === 'normal' ? 'border-green-200 bg-green-50' :
              sensor.status === 'warning' ? 'border-yellow-200 bg-yellow-50' :
              'border-red-200 bg-red-50'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`${
                sensor.status === 'normal' ? 'text-green-600' :
                sensor.status === 'warning' ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {sensor.icon}
              </div>
              <span className="font-medium">{sensor.label}</span>
            </div>
            <p className="text-2xl font-bold">{sensor.value}</p>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="mt-6 p-4 border border-blue-200 rounded-lg bg-blue-50">
        <h3 className="font-semibold mb-4">Quick Actions</h3>
        <div className="flex gap-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Droplet className="w-4 h-4" />
            Start Irrigation
          </button>
          <button className="bg-white text-blue-600 border border-blue-200 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
            View Detailed Report
          </button>
        </div>
      </div>
    </div>
  );
}