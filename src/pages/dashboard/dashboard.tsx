import React, { useState, useEffect } from "react";
import { dashboardService, DashboardStats } from "../../services/dashboard";
import Reports from "./components/reports/reports";
import { useAuth } from "../../contexts/AuthContext";
import { StatsCard } from "./components/stats/stats-card";

export const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"stats" | "reports">("stats");

  // Load dashboard stats on mount
  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await dashboardService.getStats();
        setStats(data);
      } catch (err: any) {
        console.error("Failed to load dashboard stats:", err);
        setError(err.message || "Failed to load dashboard stats");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const statCards = [
    {
      title: "Total Calls",
      value: stats?.total_calls.toLocaleString() || "0",
      trend: "up",
      gradient: "from-bgSecondary to-background",
    },
    {
      title: "Tokens",
      value: stats?.tokens.toLocaleString() || "0",
      trend: "up",
      gradient: "from-bgSecondary to-background",
    },
    {
      title: "Customer Feedback Calls",
      value: stats?.customer_feedback_calls.toLocaleString() || "0",
      trend: "up",
      gradient: "from-bgSecondary to-background",
    },
    {
      title: "Knowledge Base Items",
      value: stats?.knowledge_base_items || "0",
      trend: "down",
      gradient: "from-bgSecondary to-background",
    },
    {
      title: "Agent Call Time",
      value: `${stats?.agent_call_time || 0} Hours`,
      trend: "up",
      gradient: "from-bgSecondary to-background",
    },
    {
      title: "Reschedules Handled",
      value: stats?.reschedules_handled.toLocaleString() || "0",
      trend: "up",
      gradient: "from-bgSecondary to-background",
    },
  ];

  return (
    <div className="space-y-4 p-2 lg:p-4">
      {/* Header with User Name */}
      <div className="mt-0">
        <h1 className="text-2xl font-semibold text-primary">
          {user?.first_name && user?.last_name
            ? `${user.first_name} ${user.last_name}'s Dashboard`
            : "Dashboard"}
        </h1>
        <p className="text-white">Welcome back!</p>
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
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard stats...</p>
        </div>
      ) : (
        <>
          {/* Tabs */}
          <div className="flex gap-4 border-b border-gray-800">
            <button
              onClick={() => setActiveTab("stats")}
              className={`px-4 py-2 border-b-2 transition-colors ${
                activeTab === "stats"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              Stats
            </button>
            <button
              onClick={() => setActiveTab("reports")}
              className={`px-4 py-2 border-b-2 transition-colors ${
                activeTab === "reports"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              Reports
            </button>
          </div>

          {/* Content */}
          {activeTab === "stats" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {statCards.map((stat) => (
                <StatsCard
                  key={stat.title}
                  title={stat.title}
                  value={stat.value}
                  trend={stat.trend}
                  gradient={stat.gradient}
                />
              ))}
            </div>
          ) : (
            <Reports />
          )}
        </>
      )}
    </div>
  );
};
