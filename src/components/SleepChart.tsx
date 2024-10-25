import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const sleepData = [
  { day: 'Mon', deep: 0.5, light: 4.5, rem: 1.5 },
  { day: 'Tue', deep: 2.8, light: 4.2, rem: 1.8 },
  { day: 'Wed', deep: 2.2, light: 4.8, rem: 1.4 },
  { day: 'Thu', deep: 2.6, light: 4.3, rem: 1.6 },
  { day: 'Fri', deep: 2.4, light: 4.6, rem: 1.7 },
  { day: 'Sat', deep: 3.0, light: 4.0, rem: 2.0 },
  { day: 'Sun', deep: 2.7, light: 4.4, rem: 1.9 },
];

export function SleepChart() {
  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={sleepData}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="deep" stackId="sleep" fill="#1e40af" name="Deep Sleep" />
          <Bar dataKey="light" stackId="sleep" fill="#60a5fa" name="Light Sleep" />
          <Bar dataKey="rem" stackId="sleep" fill="#93c5fd" name="REM Sleep" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}