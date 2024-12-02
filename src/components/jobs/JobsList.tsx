import React, { useState, useEffect } from 'react';
import { JobCard } from './JobCard';
import { jobsApi } from '../../services/jobs';
import { Job } from '../../types/jobs';

interface JobsListProps {
  searchQuery: string;
  selectedFilters: string[];
}

export const JobsList: React.FC<JobsListProps> = ({ searchQuery, selectedFilters }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
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
        console.error('Failed to load jobs:', err);
        setError(err.message || 'Failed to load jobs');
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  const filteredJobs = jobs.filter(job => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || 
      job.Ref.toLowerCase().includes(searchLower) ||
      job.Type.toLowerCase().includes(searchLower) ||
      job.Contact.toLowerCase().includes(searchLower) ||
      job.Location.toLowerCase().includes(searchLower) ||
      job.Postcode.toLowerCase().includes(searchLower);

    const matchesFilters = selectedFilters.length === 0 || 
      selectedFilters.some(filter => job.Category.includes(filter));

    return matchesSearch && matchesFilters;
  });

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
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

  if (filteredJobs.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        {searchQuery || selectedFilters.length > 0 ? 'No jobs match your search' : 'No jobs found'}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredJobs.map((job) => (
        <JobCard key={job.JobId} job={job} />
      ))}
    </div>
  );
};