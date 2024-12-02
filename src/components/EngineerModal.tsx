import React from 'react';
import { Modal } from './Modal';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Engineer } from '../types/engineer';

interface EngineerModalProps {
  isOpen: boolean;
  onClose: () => void;
  engineer: Engineer;
}

export const EngineerModal: React.FC<EngineerModalProps> = ({
  isOpen,
  onClose,
  engineer
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-400';
      case 'on-site': return 'text-yellow-400';
      case 'travelling': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'Online';
      case 'on-site': return 'On Site';
      case 'travelling': return 'Travelling';
      default: return 'Offline';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Engineer Details">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="relative">
              <img
                src={engineer.avatar}
                alt={engineer.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-900 ${
                getStatusColor(engineer.status)
              } bg-current`} />
            </div>
            <div>
              <h3 className="text-xl font-semibold">{engineer.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-gray-400">{engineer.specialty}</span>
                <span className="text-gray-600">•</span>
                <span className={getStatusColor(engineer.status)}>
                  {getStatusText(engineer.status)}
                </span>
              </div>
              <div className="text-sm text-gray-400 mt-1">
                ID: {engineer.engineerId}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-gray-400">
            <Mail className="w-5 h-5" />
            <span>{engineer.email}</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-400">
            <Phone className="w-5 h-5" />
            <span>{engineer.phone}</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-400">
            <MapPin className="w-5 h-5" />
            <span>{engineer.location}</span>
          </div>
        </div>

        {/* Working Hours */}
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-cyan-400" />
            <h3 className="font-medium">Working Hours</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Hours</span>
              <span>{engineer.workingHours.start} - {engineer.workingHours.end}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Days</span>
              <div className="flex gap-2">
                {engineer.workingHours.days.map(day => (
                  <span key={day} className="text-cyan-400">{day}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div>
          <h3 className="font-medium mb-3">Skills & Certifications</h3>
          <div className="flex flex-wrap gap-2">
            {engineer.skills.map(skill => (
              <span 
                key={skill}
                className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};