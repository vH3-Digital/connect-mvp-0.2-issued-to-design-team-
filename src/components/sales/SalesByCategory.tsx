import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface SalesByCategoryProps {
  data: Array<{
    department: string;
    value_inc_vat: number;
  }>;
}

export const SalesByCategory: React.FC<SalesByCategoryProps> = ({ data }) => {
  const COLORS = ['#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6', '#d946ef'];

  const chartData = data.reduce((acc, curr) => {
    const existing = acc.find(item => item.name === curr.department);
    if (existing) {
      existing.value += curr.value_inc_vat;
    } else {
      acc.push({
        name: curr.department,
        value: curr.value_inc_vat
      });
    }
    return acc;
  }, [] as Array<{ name: string; value: number }>);

  return (
    <div className="card">
      <h3 className="text-lg font-medium mb-6">Sales by Category</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name.split(':')[0]} ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: 'none',
                borderRadius: '0.5rem',
                color: '#111827',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
              }}
              itemStyle={{
                color: '#111827'
              }}
              formatter={(value: number) => [`£${value.toLocaleString()}`, '']}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};