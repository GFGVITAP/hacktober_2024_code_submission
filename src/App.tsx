import React, { useState } from 'react';
import { Heart, Activity, Moon } from 'lucide-react';
import { Navigation } from './components/Navigation';
import { DashboardCard } from './components/DashboardCard';
import { HeartRateChart } from './components/HeartRateChart';
import { ECGChart } from './components/ECGChart';
import { SleepChart } from './components/SleepChart';
import { EmergencySOS } from './components/EmergencySOS';

export type Page = 'health' | 'sos' | 'ai';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('health');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      
      {currentPage === 'health' && (
        <>
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Health Dashboard</h1>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">Last updated: {new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DashboardCard
                title="Heart Rate"
                icon={<Heart className="w-6 h-6 text-red-500" />}
              >
                <div className="mb-4">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-gray-900">72</span>
                    <span className="ml-2 text-gray-500">BPM</span>
                  </div>
                  <p className="text-sm text-gray-500">Average today</p>
                </div>
                <HeartRateChart />
              </DashboardCard>

              <DashboardCard
                title="ECG"
                icon={<Activity className="w-6 h-6 text-red-500" />}
              >
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Real-time monitoring</p>
                </div>
                <ECGChart />
              </DashboardCard>

              <DashboardCard
                title="Sleep Analysis"
                icon={<Moon className="w-6 h-6 text-blue-500" />}
              >
                <div className="mb-4">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-gray-900">3</span>
                    <span className="ml-2 text-gray-500">hours</span>
                  </div>
                  <p className="text-sm text-gray-500">Last night's sleep</p>
                </div>
                <SleepChart />
              </DashboardCard>
            </div>
          </main>
        </>
      )}

      {currentPage === 'sos' && <EmergencySOS />}
      
      {currentPage === 'ai' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">AI Help</h1>
          {
            <iframe src='https://izhaan-raza.github.io/chatBot/' width="100%" height="600px"></iframe>
          }
        </div>
      )}
    </div>
  );
}

export default App;