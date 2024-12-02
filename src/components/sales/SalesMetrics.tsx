import React from 'react';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';

interface SalesMetricsProps {
  data: Array<{
    outcome: string;
    value_inc_vat: number;
    profit: number;
  }>;
}

export const SalesMetrics: React.FC<SalesMetricsProps> = ({ data }) => {
  const outcomes = data.reduce((acc, curr) => {
    const status = curr.outcome.toLowerCase();
    if (status.includes('accepted')) return { ...acc, won: acc.won + 1 };
    if (status.includes('refused')) return { ...acc, lost: acc.lost + 1 };
    return { ...acc, open: acc.open + 1 };
  }, { won: 0, lost: 0, open: 0 });

  const metrics = [
    {
      title: 'Won Deals',
      value: outcomes.won,
      icon: CheckCircle2,
      color: 'text-green-400'
    },
    {
      title: 'Lost Deals',
      value: outcomes.lost,
      icon: XCircle,
      color: 'text-red-400'
    },
    {
      title: 'Open Deals',
      value: outcomes.open,
      icon: Clock,
      color: 'text-blue-400'
    }
  ];

  return (
    <div className="card">
      <h3 className="text-lg font-medium mb-6">Deal Status</h3>
      <div className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.title} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
            <div className="flex items-center gap-3">
              <metric.icon className={`w-5 h-5 ${metric.color}`} />
              <span className="text-sm">{metric.title}</span>
            </div>
            <span className="text-lg font-medium">{metric.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};