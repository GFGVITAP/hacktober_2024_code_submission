import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

// Simulated ECG data
const generateECGData = () => {
  const data = [];
  for (let i = 0; i < 100; i++) {
    const base = Math.sin(i / 5) * 0.3;
    const value = i % 30 === 0 ? 1 : base;
    data.push({ time: i, value: value });
  }
  return data;
};

export function ECGChart() {
  const data = generateECGData();

  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="time" hide />
          <YAxis hide domain={[-1.5, 1.5]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#ef4444"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}