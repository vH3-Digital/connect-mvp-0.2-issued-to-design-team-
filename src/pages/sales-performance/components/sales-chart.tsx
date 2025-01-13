import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface SalesChartProps {
  data: Array<{
    department: string;
    value_inc_vat: number;
    profit: number;
  }>;
}

export const SalesChart: React.FC<SalesChartProps> = ({ data }) => {
  const chartData = data.reduce((acc, curr) => {
    const existing = acc.find((item) => item.department === curr.department);
    if (existing) {
      existing.value += curr.value_inc_vat;
      existing.profit += curr.profit;
    } else {
      acc.push({
        department: curr.department,
        value: curr.value_inc_vat,
        profit: curr.profit,
      });
    }
    return acc;
  }, [] as Array<{ department: string; value: number; profit: number }>);

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length || !payload[0] || !payload[1]) {
      return null;
    }

    const department =
      payload[0].payload.department?.split(":")[0] || "Unknown";
    const value = payload[0].value || 0;
    const profit = payload[1].value || 0;

    return (
      <div className="bg-bgSecondary rounded-[12px] p-6 mb-[20px]">
        <p className="text-gray-100 font-medium mb-1">{department}</p>
        <p className="text-gray-400">
          <span className="font-medium">Value:</span> £{value.toLocaleString()}
        </p>
        <p className="text-gray-400">
          <span className="font-medium">Profit:</span> £
          {profit.toLocaleString()}
        </p>
      </div>
    );
  };

  if (!chartData.length) {
    return (
      <div className="bg-bgSecondary rounded-[12px] p-6 mb-[20px]">
        <h3 className="text-lg font-medium mb-6">Sales by Department</h3>
        <div className="h-[300px] flex items-center justify-center text-gray-400">
          No sales data available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bgSecondary rounded-[12px] p-6 mb-[20px]">
      <h3 className="text-lg font-medium mb-6">Sales by Department</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="department"
              stroke="#9CA3AF"
              tick={{ fill: "#9CA3AF" }}
              tickFormatter={(value) => value?.split(":")[0] || ""}
            />
            <YAxis
              stroke="#9CA3AF"
              tick={{ fill: "#9CA3AF" }}
              tickFormatter={(value) => `£${value.toLocaleString()}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" name="Value" fill="#06b6d4" />
            <Bar dataKey="profit" name="Profit" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
