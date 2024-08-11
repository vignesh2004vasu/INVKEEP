import React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, LineChart } from 'recharts';

const chartData = [
  { date: '2024-01-01', value: 400 },
  { date: '2024-02-01', value: 300 },
  { date: '2024-03-01', value: 500 },
  { date: '2024-04-01', value: 450 },
  { date: '2024-05-01', value: 700 },
];

const ChartComponent = () => {
  return (
    <div className="w-full p-6">
      <h2 className="text-xl font-bold mb-4">Charts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded">
          <h3 className="text-lg font-semibold mb-2">Bar Chart</h3>
          <BarChart width={500} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </div>
        <div className="p-4 border rounded">
          <h3 className="text-lg font-semibold mb-2">Line Chart</h3>
          <LineChart width={500} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#82ca9d" />
          </LineChart>
        </div>

      </div>
    </div>
  );
};

export default ChartComponent;
