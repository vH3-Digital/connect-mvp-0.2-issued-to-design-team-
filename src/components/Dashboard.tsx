import React, { useState, useEffect } from 'react';
import { StatCard } from './StatCard';
import { useAuth } from '../contexts/AuthContext';
import { format, subDays } from 'date-fns';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { dashboardService, DashboardStats } from '../services/dashboard';

// Mock data for visualizations
const agentPerformanceData = [
  { name: 'Connie', efficiency: 94, accuracy: 98, satisfaction: 96 },
  { name: 'Tia', efficiency: 91, accuracy: 95, satisfaction: 92 },
  { name: 'Kyle', efficiency: 88, accuracy: 92, satisfaction: 90 },
  { name: 'Salma', efficiency: 96, accuracy: 97, satisfaction: 95 },
  { name: 'Harris', efficiency: 89, accuracy: 94, satisfaction: 93 },
];

const resolutionData = [
  { name: 'First Contact', value: 65 },
  { name: 'Escalated', value: 20 },
  { name: 'Multiple Contacts', value: 15 },
];

const COLORS = ['#06b6d4', '#3b82f6', '#6366f1'];

const hourlyResponseData = [
  { hour: '6AM', responses: 45 },
  { hour: '8AM', responses: 85 },
  { hour: '10AM', responses: 132 },
  { hour: '12PM', responses: 120 },
  { hour: '2PM', responses: 140 },
  { hour: '4PM', responses: 110 },
  { hour: '6PM', responses: 75 },
  { hour: '8PM', responses: 45 },
];

export const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'stats' | 'reports'>('stats');

  // Load dashboard stats on mount
  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await dashboardService.getStats();
        setStats(data);
      } catch (err: any) {
        console.error('Failed to load dashboard stats:', err);
        setError(err.message || 'Failed to load dashboard stats');
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const statCards = [
    {
      title: 'Total Calls',
      value: stats?.total_calls.toLocaleString() || '0',
      trend: 'up',
      gradient: 'from-gray-800 to-gray-900',
    },
    {
      title: 'Tokens',
      value: stats?.tokens.toLocaleString() || '0',
      trend: 'up',
      gradient: 'from-gray-800 to-gray-900',
    },
    {
      title: 'Customer Feedback Calls',
      value: stats?.customer_feedback_calls.toLocaleString() || '0',
      trend: 'up',
      gradient: 'from-gray-800 to-gray-900',
    },
    {
      title: 'Knowledge Base Items',
      value: stats?.knowledge_base_items || '0',
      trend: 'down',
      gradient: 'from-gray-800 to-gray-900',
    },
    {
      title: 'Agent Call Time',
      value: `${stats?.agent_call_time || 0} Hours`,
      trend: 'up',
      gradient: 'from-gray-800 to-gray-900',
    },
    {
      title: 'Reschedules Handled',
      value: stats?.reschedules_handled.toLocaleString() || '0',
      trend: 'up',
      gradient: 'from-gray-800 to-gray-900',
    },
  ];

 return (
  <div className="space-y-4 p-2 lg:p-4">
    {/* Header with User Name */}
    <div className="mt-0">
      <h1 className="text-2xl font-semibold text-cyan-400">
        {user?.first_name && user?.last_name
          ? `${user.first_name} ${user.last_name}'s Dashboard`
          : 'Dashboard'}
      </h1>
      <p className="text-gray-400">Welcome back!</p>
    </div>


      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard stats...</p>
        </div>
      ) : (
        <>
          {/* Tabs */}
          <div className="flex gap-4 border-b border-gray-800">
            <button
              onClick={() => setActiveTab('stats')}
              className={`px-4 py-2 border-b-2 transition-colors ${
                activeTab === 'stats'
                  ? 'border-cyan-500 text-cyan-400'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Stats
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`px-4 py-2 border-b-2 transition-colors ${
                activeTab === 'reports'
                  ? 'border-cyan-500 text-cyan-400'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Reports
            </button>
          </div>

          {/* Content */}
          {activeTab === 'stats' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {statCards.map((stat) => (
                <StatCard
                  key={stat.title}
                  title={stat.title}
                  value={stat.value}
                  trend={stat.trend}
                  gradient={stat.gradient}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Agent Performance Comparison */}
              <div className="card p-6">
                <h3 className="text-lg font-medium mb-4">Agent Performance Metrics</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={agentPerformanceData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="name" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937',
                          border: 'none',
                          borderRadius: '0.5rem',
                          color: '#F3F4F6'
                        }}
                      />
                      <Bar dataKey="efficiency" name="Efficiency" fill="#06b6d4" />
                      <Bar dataKey="accuracy" name="Accuracy" fill="#3b82f6" />
                      <Bar dataKey="satisfaction" name="Satisfaction" fill="#6366f1" />
                      <Legend />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Resolution Distribution */}
              <div className="card p-6">
                <h3 className="text-lg font-medium mb-4">Resolution Distribution</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={resolutionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {resolutionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937',
                          border: 'none',
                          borderRadius: '0.5rem',
                          color: '#F3F4F6'
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Hourly Response Volume */}
              <div className="card p-6 lg:col-span-2">
                <h3 className="text-lg font-medium mb-4">Hourly Response Volume</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={hourlyResponseData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="hour" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937',
                          border: 'none',
                          borderRadius: '0.5rem',
                          color: '#F3F4F6'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="responses" 
                        stroke="#06b6d4" 
                        strokeWidth={2}
                        dot={{ fill: '#06b6d4' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};