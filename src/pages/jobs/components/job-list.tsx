import React, { useState, useEffect } from "react";
import { IJob, IJobList } from "../../../interfaces/interfaces";
import { jobsApi } from "../../../services/jobs";
import { JobCard } from "./job-card";
import JobCardPlace from "./job-card-place";
import { motion } from "framer-motion";

export const JobList: React.FC<IJobList> = ({
  searchQuery,
  selectedFilters,
}) => {
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

  const filteredJobs = jobs.filter((job) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      job.Ref.toLowerCase().includes(searchLower) ||
      job.Type.toLowerCase().includes(searchLower) ||
      job.Contact.toLowerCase().includes(searchLower) ||
      job.Location.toLowerCase().includes(searchLower) ||
      job.Postcode.toLowerCase().includes(searchLower);

    const matchesFilters =
      selectedFilters.length === 0 ||
      selectedFilters.some((filter) => job.Category.includes(filter));

    return matchesSearch && matchesFilters;
  });

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        exit={{ opacity: 0 }}
        className="flex flex-wrap sm:mx-[-10px]  "
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
          <JobCardPlace key={index} />
        ))}
      </motion.div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400">
        {error}
      </div>
    );
  }

  if (filteredJobs.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        {searchQuery || selectedFilters.length > 0
          ? "No jobs match your search"
          : "No jobs found"}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0 }}
      className="flex flex-wrap sm:mx-[-10px]  "
    >
      {filteredJobs.map((job) => (
        <JobCard key={job.JobId} job={job} />
      ))}
    </motion.div>
  );
};
