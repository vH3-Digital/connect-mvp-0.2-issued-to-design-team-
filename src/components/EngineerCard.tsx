import React, { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import { EngineerModal } from './EngineerModal';

interface Engineer {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  status: 'online' | 'on-site' | 'travelling' | 'offline';
  skills: string[];
}

interface EngineerCardProps {
  engineer: Engineer;
}

export const EngineerCard: React.FC<EngineerCardProps> = ({ engineer }) => {
  const [showModal, setShowModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-400';
      case 'on-site': return 'bg-yellow-400';
      case 'travelling': return 'bg-blue-400';
      default: return 'bg-gray-400';
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
    <>
      <div 
        className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-800 transition-all cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img 
                src={engineer.avatar} 
                alt={engineer.name} 
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-900 ${getStatusColor(engineer.status)}`} />
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{engineer.name}</h3>
                <span className="text-sm text-gray-400">{engineer.specialty}</span>
                <span className={`text-sm ${getStatusColor(engineer.status).replace('bg-', 'text-')}`}>
                  • {getStatusText(engineer.status)}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {engineer.skills.map((skill) => (
                  <span key={skill} className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(true);
            }}
            className="text-gray-400 hover:text-white"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      <EngineerModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        engineer={engineer}
      />
    </>
  );
};