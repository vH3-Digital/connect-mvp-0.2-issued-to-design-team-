import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  trend: 'up' | 'down';
  gradient: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, trend, gradient }) => {
  return (
    <div 
      className={`
        rounded-2xl 
        bg-gradient-to-br ${gradient} 
        p-6 
        relative 
        overflow-hidden 
        group 
        hover:scale-98 
        transition-all 
        duration-300 
        cursor-pointer
        pl-10
        hover:bg-gradient-to-b 
        hover:from-white/5 
        hover:to-transparent
      `}
    >
      <div className="relative z-10">
        <h3 className="text-sm text-gray-200 mb-4">{title}</h3>
        <div className="flex items-center justify-between">
          <span className="text-4xl font-bold">{value}</span>
          <span className={`${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
            {trend === 'up' ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
          </span>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
    </div>
  );
};