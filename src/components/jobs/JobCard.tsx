import React, { useState } from 'react';
import { Clock, MapPin, User, Calendar, ChevronRight, Wrench } from 'lucide-react';
import { format, parseISO, differenceInMinutes } from 'date-fns';
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

  const calculateTimeDifference = () => {
    if (!job.RealStart || !job.RealEnd) return null;
    
    const actualMinutes = differenceInMinutes(
      parseISO(job.RealEnd),
      parseISO(job.RealStart)
    );
    
    const plannedDuration = job.Duration.split(':');
    const plannedMinutes = parseInt(plannedDuration[0]) * 60 + parseInt(plannedDuration[1]);
    
    const difference = actualMinutes - plannedMinutes;
    const color = difference > 0 ? 'text-red-400' : 'text-green-400';
    
    return {
      actual: actualMinutes,
      planned: plannedMinutes,
      difference,
      color
    };
  };

  const calculateStartDifference = () => {
    if (!job.RealStart || !job.PlannedStart) return null;

    const difference = differenceInMinutes(
      parseISO(job.RealStart),
      parseISO(job.PlannedStart)
    );

    const color = difference > 0 ? 'text-red-400' : 'text-green-400';

    return {
      difference,
      color
    };
  };

  const timeDiff = calculateTimeDifference();
  const startDiff = calculateStartDifference();

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

              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-gray-400" />
                {job.RealStart ? (
                  <>
                    <span className="text-gray-400">Started: {formatDate(job.RealStart)}</span>
                    {startDiff && (
                      <span className={startDiff.color}>
                        ({startDiff.difference > 0 ? '+' : ''}{startDiff.difference} mins from planned)
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-gray-400">Planned: {formatDate(job.PlannedStart)}</span>
                )}
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-gray-400" />
                {timeDiff ? (
                  <>
                    <span className="text-gray-400">
                      Duration: {Math.floor(timeDiff.actual / 60)}:{String(timeDiff.actual % 60).padStart(2, '0')}
                    </span>
                    <span className={timeDiff.color}>
                      ({timeDiff.difference > 0 ? '+' : ''}{timeDiff.difference} mins from planned)
                    </span>
                  </>
                ) : (
                  <span className="text-gray-400">Duration: {job.Duration}</span>
                )}
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
