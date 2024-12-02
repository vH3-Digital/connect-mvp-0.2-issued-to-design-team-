import React from 'react';
import { StatCard } from './StatCard';
import { InsightsGraph } from './InsightsGraph';
import { useAuth } from '../contexts/AuthContext';
import { format, subDays } from 'date-fns';

const stats = [
  {
    title: 'Total Calls',
    value: '15,245',
    trend: 'up',
    gradient: 'from-gray-800 to-gray-900',
  },
  {
    title: 'Answered',
    value: '1,258',
    trend: 'up',
    gradient: 'from-gray-800 to-gray-900',
  },
  {
    title: 'Customer Feedback Calls Completed',
    value: '753',
    trend: 'down',
    gradient: 'from-gray-800 to-gray-900',
  },
  {
    title: 'Knowledge Base Items',
    value: '289',
    trend: 'up',
    gradient: 'from-gray-800 to-gray-900',
  },
  {
    title: 'Avg. Call Duration',
    value: '4 Mins.',
    trend: 'up',
    gradient: 'from-gray-800 to-gray-900',
  },
  {
    title: 'Reschedules handled',
    value: '543',
    trend: 'up',
    gradient: 'from-gray-800 to-gray-900',
  },
];

export const Dashboard = () => {
  const { user } = useAuth();
  const today = new Date();
  const thirtyDaysAgo = subDays(today, 30);
  const dateRange = `${format(thirtyDaysAgo, 'MMMM d, yyyy')} - ${format(today, 'MMMM d, yyyy')}`;

  return (
    <div className="space-y-8">
      {/* Header with User Name */}
      <div>
        <h1 className="text-2xl font-semibold text-cyan-400">
          {user?.first_name && user?.last_name 
            ? `${user.first_name} ${user.last_name}'s Dashboard`
            : 'Dashboard'}
        </h1>
        <p className="text-gray-400">Welcome back!</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            trend={stat.trend}
            gradient={stat.gradient}
          />
        ))}
      </div>

      {/* Company Insights */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold">Company Insights</h2>
          <p className="text-gray-400">{dateRange}</p>
        </div>
        <div className="card p-6">
          <InsightsGraph />
        </div>
      </div>
    </div>
  );
};