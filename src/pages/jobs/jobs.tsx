import React, { useState } from "react";
import { Filter, Search } from "lucide-react";
import { JobList } from "./components/job-list";
import { JobOverview } from "./components/job-overview";

type TabType = "jobs" | "overview";

export const Jobs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("jobs");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-primary mb-2">
          Jobs Management
        </h2>
        <p className="text-white">Track and manage field operations</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-800">
        <button
          onClick={() => setActiveTab("jobs")}
          className={`px-4 py-2 border-b-2 transition-colors ${
            activeTab === "jobs"
              ? "border-primary text-primary"
              : "border-transparent text-gray-400 hover:text-white"
          }`}
        >
          Jobs
        </button>
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 border-b-2 transition-colors ${
            activeTab === "overview"
              ? "border-primary text-primary"
              : "border-transparent text-gray-400 hover:text-white"
          }`}
        >
          Overview
        </button>
      </div>

      {/* Content */}
      {activeTab === "jobs" ? (
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>

          {/* Jobs List */}
          <JobList
            searchQuery={searchQuery}
            selectedFilters={selectedFilters}
          />
        </div>
      ) : (
        <JobOverview />
      )}
    </div>
  );
};
