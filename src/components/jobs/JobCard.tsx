import React, { useState } from 'react';
import { Clock, MapPin, User, Calendar, ChevronRight, Wrench } from 'lucide-react';
import { format } from 'date-fns';
import { Job } from '../../types/jobs';
import { JobModal } from './JobModal';

interface JobCardProps {
  job: Job;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const [showModal, setShowModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-400/20 text-green-400';
      case 'completed with issues': return 'bg-yellow-400/20 text-yellow-400';
      case 'in progress': return 'bg-blue-400/20 text-blue-400';
      default: return 'bg-gray-400/20 text-gray-400';
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd MMM yyyy HH:mm');
  };

  return (
    <>
      <div 
        onClick={() => setShowModal(true)}
        className="card hover:bg-gray-800/50 transition-all cursor-pointer"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-medium truncate">{job.Ref}</h3>
              <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(job.Status)}`}>
                {job.Status}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <User className="w-4 h-4" />
                <span className="truncate">{job.Contact}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4" />
                <span className="truncate">{job.Location}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Wrench className="w-4 h-4" />
                <span className="truncate">{job.Resource}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(job.PlannedStart)}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="w-4 h-4" />
                <span>{job.Duration}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300">
                {job.Type}
              </span>
              <span className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300">
                {job.Category}
              </span>
            </div>
          </div>
          
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      <JobModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        job={job}
      />
    </>
  );
};