import React from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const heartRateData = [
  { time: '00:00', value: 62 },
  { time: '04:00', value: 58 },
  { time: '08:00', value: 75 },
  { time: '12:00', value: 82 },
  { time: '16:00', value: 78 },
  { time: '20:00', value: 68 },
  { time: '23:59', value: 65 },
];

export function HeartRateChart() {
  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={heartRateData}>
          <XAxis dataKey="time" />
          <YAxis domain={[50, 100]} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#ef4444"
            fill="#fee2e2"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}