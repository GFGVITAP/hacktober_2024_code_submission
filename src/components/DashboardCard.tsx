import React, { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

export function DashboardCard({ title, icon, children }: DashboardCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          {icon}
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}