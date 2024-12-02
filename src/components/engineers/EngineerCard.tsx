import React, { useState } from 'react';
import { MoreVertical, MapPin } from 'lucide-react';
import { EngineerModal } from '../EngineerModal';
import { Engineer } from '../../types/engineer';
import { getStatusColor, getStatusText } from '../../utils/engineerStatus';

interface EngineerCardProps {
  engineer: Engineer;
}

export const EngineerCard: React.FC<EngineerCardProps> = ({ engineer }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div 
        className="card hover:bg-gray-800/50 transition-all cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="relative">
              <img 
                src={engineer.avatar} 
                alt={engineer.name} 
                className="w-12 h-12 rounded-full object-cover"
              />
              <span className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-900 ${getStatusColor(engineer.status).split(' ')[0]}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{engineer.name}</h3>
                <span className={getStatusColor(engineer.status)}>
                  • {getStatusText(engineer.status)}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
                <span>{engineer.specialty}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {engineer.location}
                </div>
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

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mt-4">
          {engineer.skills.map((skill) => (
            <span 
              key={skill}
              className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300"
            >
              {skill}
            </span>
          ))}
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