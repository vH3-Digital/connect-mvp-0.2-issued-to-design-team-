import React from "react";
import { format, subDays } from "date-fns";
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
  Legend,
} from "recharts";
export default function Reports() {
  // Mock data for visualizations
  const agentPerformanceData = [
    { name: "Connie", efficiency: 94, accuracy: 98, satisfaction: 96 },
    { name: "Tia", efficiency: 91, accuracy: 95, satisfaction: 92 },
    { name: "Kyle", efficiency: 88, accuracy: 92, satisfaction: 90 },
    { name: "Salma", efficiency: 96, accuracy: 97, satisfaction: 95 },
    { name: "Harris", efficiency: 89, accuracy: 94, satisfaction: 93 },
  ];

  const resolutionData = [
    { name: "First Contact", value: 65 },
    { name: "Escalated", value: 20 },
    { name: "Multiple Contacts", value: 15 },
  ];

  const COLORS = ["#06b6d4", "#3b82f6", "#6366f1"];

  const hourlyResponseData = [
    { hour: "6AM", responses: 45 },
    { hour: "8AM", responses: 85 },
    { hour: "10AM", responses: 132 },
    { hour: "12PM", responses: 120 },
    { hour: "2PM", responses: 140 },
    { hour: "4PM", responses: 110 },
    { hour: "6PM", responses: 75 },
    { hour: "8PM", responses: 45 },
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Agent Performance Comparison */}
      <div className="bg-bgSecondary rounded-[12px] p-6">
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
                  backgroundColor: "#1F2937",
                  border: "none",
                  borderRadius: "0.5rem",
                  color: "#F3F4F6",
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
      <div className="bg-bgSecondary rounded-[12px] p-6">
        <h3 className="text-lg font-medium mb-4">Resolution Distribution</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={resolutionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {resolutionData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "none",
                  borderRadius: "0.5rem",
                  color: "#F3F4F6",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Hourly Response Volume */}
      <div className="bg-bgSecondary rounded-[12px] p-6 lg:col-span-2">
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
                  backgroundColor: "#1F2937",
                  border: "none",
                  borderRadius: "0.5rem",
                  color: "#F3F4F6",
                }}
              />
              <Line
                type="monotone"
                dataKey="responses"
                stroke="#06b6d4"
                strokeWidth={2}
                dot={{ fill: "#06b6d4" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
