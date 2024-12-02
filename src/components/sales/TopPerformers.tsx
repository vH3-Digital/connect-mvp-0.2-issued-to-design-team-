import React from 'react';
import { Crown, TrendingUp } from 'lucide-react';

interface TopPerformersProps {
  data: Array<{
    issued_by: string;
    value_inc_vat: number;
    profit: number;
  }>;
}

export const TopPerformers: React.FC<TopPerformersProps> = ({ data }) => {
  // Ensure data is valid and not empty
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="card">
        <div className="flex items-center gap-2 mb-6">
          <Crown className="w-5 h-5 text-yellow-400" />
          <h3 className="text-lg font-medium">Top Performers</h3>
        </div>
        <p className="text-gray-400 text-sm">No performance data available</p>
      </div>
    );
  }

  const performers = data.reduce((acc, curr) => {
    if (!curr.issued_by || typeof curr.value_inc_vat !== 'number' || typeof curr.profit !== 'number') {
      return acc;
    }

    const existing = acc.find(item => item.name === curr.issued_by);
    if (existing) {
      existing.value += curr.value_inc_vat;
      existing.profit += curr.profit;
      existing.deals += 1;
    } else {
      acc.push({
        name: curr.issued_by,
        value: curr.value_inc_vat,
        profit: curr.profit,
        deals: 1
      });
    }
    return acc;
  }, [] as Array<{ name: string; value: number; profit: number; deals: number }>)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // If no valid performers after filtering
  if (performers.length === 0) {
    return (
      <div className="card">
        <div className="flex items-center gap-2 mb-6">
          <Crown className="w-5 h-5 text-yellow-400" />
          <h3 className="text-lg font-medium">Top Performers</h3>
        </div>
        <p className="text-gray-400 text-sm">No valid performance data available</p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-6">
        <Crown className="w-5 h-5 text-yellow-400" />
        <h3 className="text-lg font-medium">Top Performers</h3>
      </div>
      <div className="space-y-4">
        {performers.map((performer, index) => (
          <div key={performer.name} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                <span className="text-sm font-medium">{index + 1}</span>
              </div>
              <div>
                <p className="font-medium">{performer.name}</p>
                <p className="text-sm text-gray-400">{performer.deals} deals</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-cyan-400">
                <TrendingUp className="w-4 h-4" />
                <span>£{performer.value.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</span>
              </div>
              <p className="text-sm text-gray-400">
                £{performer.profit.toLocaleString('en-GB', { minimumFractionDigits: 2 })} profit
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};