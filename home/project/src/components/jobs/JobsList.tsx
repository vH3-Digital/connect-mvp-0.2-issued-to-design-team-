import React, { useState } from 'react';
import { JobCard } from './JobCard';
import { mockJobs } from '../../data/mockJobs';
import { Job } from '../../types/jobs';

interface JobsListProps {
  searchQuery: string;
  selectedFilters: string[];
}

export const JobsList: React.FC<JobsListProps> = ({ searchQuery, selectedFilters }) => {
  const [jobs] = useState<Job[]>(mockJobs);

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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredJobs.map((job) => (
        <JobCard key={job.JobId} job={job} />
      ))}
    </div>
  );
};