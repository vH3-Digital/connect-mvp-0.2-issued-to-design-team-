import React from 'react';

export const DashboardChart: React.FC = () => {
  // Mock data points for the graph
  const dataPoints = [100, 150, 200, 350, 320, 380, 450, 280, 180, 250, 380, 220];
  const maxValue = Math.max(...dataPoints);
  const points = dataPoints
    .map((value, index) => {
      const x = (index / (dataPoints.length - 1)) * 100;
      const y = 100 - (value / maxValue) * 100;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="bg-gray-800/50 rounded-xl p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Company Insights</h2>
        <p className="text-sm text-gray-400">September 3, 2024 - October 3, 2024</p>
      </div>
      
      <div className="w-full h-[300px] relative">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-sm text-gray-400">
          <span>500</span>
          <span>250</span>
          <span>0</span>
        </div>

        {/* Graph area */}
        <div className="ml-12 h-full">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Grid lines */}
            <line x1="0" y1="0" x2="100" y2="0" stroke="#2A2F3E" strokeWidth="0.5" />
            <line x1="0" y1="50" x2="100" y2="50" stroke="#2A2F3E" strokeWidth="0.5" />
            <line x1="0" y1="100" x2="100" y2="100" stroke="#2A2F3E" strokeWidth="0.5" />

            {/* Graph line */}
            <polyline
              points={points}
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              className="drop-shadow-lg"
            />

            {/* Data points */}
            {dataPoints.map((value, index) => {
              const x = (index / (dataPoints.length - 1)) * 100;
              const y = 100 - (value / maxValue) * 100;
              return (
                <g key={index}>
                  <circle
                    cx={x}
                    cy={y}
                    r="2"
                    className="fill-white stroke-cyan-500 stroke-2"
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r="4"
                    className="fill-cyan-500/20"
                  />
                </g>
              );
            })}

            {/* Gradient definition */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4F46E5" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};