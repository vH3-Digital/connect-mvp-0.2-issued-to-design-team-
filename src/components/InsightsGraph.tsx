import React from 'react';

export const InsightsGraph = () => {
  // Mock data points for the graph
  const dataPoints = [100, 150, 200, 350, 320, 380, 450, 280, 180, 250, 380, 220];
  const maxValue = Math.max(...dataPoints);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className="w-full h-[300px] relative">
      {/* Y-axis labels */}
      <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-sm text-gray-400">
        <span>500</span>
        <span>250</span>
        <span>100</span>
      </div>

      {/* Graph area */}
      <div className="ml-12 h-full">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Grid lines */}
          <line x1="0" y1="0" x2="100" y2="0" stroke="#2A2F3E" strokeWidth="0.5" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="#2A2F3E" strokeWidth="0.5" />
          <line x1="0" y1="100" x2="100" y2="100" stroke="#2A2F3E" strokeWidth="0.5" />

          {/* Bars */}
          {dataPoints.map((value, index) => {
            const barWidth = 6;
            const gap = (100 - (dataPoints.length * barWidth)) / (dataPoints.length + 1);
            const x = gap + (index * (barWidth + gap));
            const height = (value / maxValue) * 100;
            const y = 100 - height;

            return (
              <g key={index}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={height}
                  className="fill-cyan-500/20 hover:fill-cyan-500/40 transition-colors cursor-pointer"
                />
                {/* Bar value */}
                <text
                  x={x + (barWidth / 2)}
                  y={y - 2}
                  textAnchor="middle"
                  className="fill-gray-400 text-[4px]"
                >
                  {value}
                </text>
                {/* Month label */}
                <text
                  x={x + (barWidth / 2)}
                  y="105"
                  textAnchor="middle"
                  className="fill-gray-400 text-[3px]"
                >
                  {months[index]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};