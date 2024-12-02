import React from 'react';
import { Modal } from '../Modal';
import { MapPin, User, Calendar, Clock, FileText, Tag, Users, MessageSquare, Wrench } from 'lucide-react';
import { format } from 'date-fns';
import { Job } from '../../types/jobs';

interface JobModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job;
}

export const JobModal: React.FC<JobModalProps> = ({ isOpen, onClose, job }) => {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd MMM yyyy HH:mm');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Job Details - ${job.Ref}`} size="lg">
      <div className="space-y-6">
        {/* Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-cyan-400" />
            <span className="text-lg font-medium">{job.Type}</span>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm ${
            job.Status.toLowerCase() === 'completed' ? 'bg-green-400/20 text-green-400' :
            job.Status.toLowerCase() === 'completed with issues' ? 'bg-yellow-400/20 text-yellow-400' :
            'bg-gray-400/20 text-gray-400'
          }`}>
            {job.Status}
          </span>
        </div>

        {/* Contact Info */}
        <div className="bg-gray-800 rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-cyan-400" />
            <span className="font-medium">Contact Details</span>
          </div>
          <div className="pl-7 space-y-2">
            <p>{job.Contact}</p>
            <p className="text-gray-400">{job.PrintName}</p>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <p>{job.Location}</p>
            </div>
            <p className="pl-6 text-gray-400">{job.Postcode}</p>
          </div>
        </div>

        {/* Description */}
        <div className="bg-gray-800 rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <span className="font-medium">Description</span>
          </div>
          <div className="pl-7">
            <p className="whitespace-pre-wrap">{job.Description}</p>
          </div>
        </div>

        {/* Engineer Note - Only show if there's content */}
        {job.ResNote && (
          <div className="bg-gray-800 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-cyan-400" />
              <span className="font-medium">Engineer Note</span>
            </div>
            <div className="pl-7">
              <p className="whitespace-pre-wrap">{job.ResNote}</p>
            </div>
          </div>
        )}

        {/* Customer Note - Only show if there's content */}
        {job.CustNote && (
          <div className="bg-gray-800 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-cyan-400" />
              <span className="font-medium">Customer Note</span>
            </div>
            <div className="pl-7">
              <p className="whitespace-pre-wrap">{job.CustNote}</p>
            </div>
          </div>
        )}

        {/* Engineer Info */}
        <div className="bg-gray-800 rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Wrench className="w-5 h-5 text-cyan-400" />
            <span className="font-medium">Engineer Details</span>
          </div>
          <div className="pl-7 space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400">Engineer</p>
                <p>{job.Resource}</p>
              </div>
              <div>
                <p className="text-gray-400">Vehicle</p>
                <p>{job.Asset}</p>
              </div>
              {job.DrivingDist > 0 && (
                <>
                  <div>
                    <p className="text-gray-400">Driving Time</p>
                    <p>{job.DrivingDur}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Distance</p>
                    <p>{job.DrivingDist.toFixed(2)} miles</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Timing */}
        <div className="bg-gray-800 rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            <span className="font-medium">Timing</span>
          </div>
          <div className="pl-7 space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400">Planned Start</p>
                <p>{formatDate(job.PlannedStart)}</p>
              </div>
              <div>
                <p className="text-gray-400">Duration</p>
                <p>{job.Duration}</p>
              </div>
              {job.RealStart && (
                <>
                  <div>
                    <p className="text-gray-400">Actual Start</p>
                    <p>{formatDate(job.RealStart)}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Actual Duration</p>
                    <p>{job.RealDuration}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Assistants */}
        {job.Assistants && job.Assistants.length > 0 && (
          <div className="bg-gray-800 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-cyan-400" />
              <span className="font-medium">Assistants</span>
            </div>
            <div className="pl-7 space-y-2">
              {job.Assistants.map((assistant, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{assistant.ResourceName}</span>
                  {assistant.Start && assistant.End && (
                    <span className="text-sm text-gray-400">
                      {format(new Date(assistant.Start), 'HH:mm')} - {format(new Date(assistant.End), 'HH:mm')}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};