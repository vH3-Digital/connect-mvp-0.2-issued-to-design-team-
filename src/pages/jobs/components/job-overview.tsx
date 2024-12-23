import React, { useState, useEffect } from "react";
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
} from "recharts";
import { IJob } from "../../../interfaces/interfaces";
import { jobsApi } from "../../../services/jobs";

const COLORS = ["#06b6d4", "#3b82f6", "#6366f1", "#8b5cf6", "#d946ef"];

export const JobOverview: React.FC = () => {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await jobsApi.getJobs();
        setJobs(Array.isArray(data) ? data : []);
      } catch (err: any) {
        console.error("Failed to load jobs:", err);
        setError(err.message || "Failed to load jobs");
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400">
        {error}
      </div>
    );
  }

  // Calculate statistics
  const jobsByStatus = jobs.reduce((acc, job) => {
    acc[job.Status] = (acc[job.Status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const jobsByType = jobs.reduce((acc, job) => {
    acc[job.Type] = (acc[job.Type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusData = Object.entries(jobsByStatus).map(([name, value]) => ({
    name,
    value,
  }));

  const typeData = Object.entries(jobsByType).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="space-y-6">
      {/* Status Distribution */}
      <div className="">
        <div className="w-full p-4 bg-bgSecondary rounded-[12px] mb-4 ">
          <h3 className="text-lg font-medium mb-6 text-white">
            Job Types Distribution
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={typeData}
                // margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis  stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#100a21",
                    border: "none",
                    borderRadius: "0.5rem",
                    color: "#F3F4F6",
                  }}
                />
                <Bar dataKey="value" fill="#5681F7" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="w-full p-4 bg-bgSecondary rounded-[12px]">
          <h3 className="text-lg font-medium mb-6 text-white">
            Job Status Distribution
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
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
                  {statusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Job Types Distribution */}
    </div>
  );
};
