import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface DashboardStatsProps {
  title: string;
  value: string;
  trend: 'up' | 'down';
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ title, value, trend }) => {
  return (
    <div className="bg-gray-800/50 rounded-xl p-6 hover:bg-gray-800/70 transition-colors cursor-pointer">
      <h3 className="text-sm text-gray-400 mb-4">{title}</h3>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold">{value}</span>
        <span className={trend === 'up' ? 'text-green-400' : 'text-red-400'}>
          {trend === 'up' ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
        </span>
      </div>
    </div>
  );
};