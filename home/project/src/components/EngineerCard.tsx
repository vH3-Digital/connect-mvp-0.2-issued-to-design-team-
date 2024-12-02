import React, { useState } from 'react';
import { MoreVertical, MapPin, Phone, Mail, Building2 } from 'lucide-react';
import { EngineerModal } from './EngineerModal';

interface Engineer {
  id: number;
  engineerJWID: number;
  Name: string;
  type: string;
  Mobile_Number: string;
  Location: string;
  Email: string;
  ResourceGroupId: number;
  Gas_Safe_Licence_Number: string;
  Branch_Code: string;
  Branch_Name: string;
  branch_JWID: number;
  company: string;
}

interface EngineerCardProps {
  engineer: Engineer;
}

export const EngineerCard: React.FC<EngineerCardProps> = ({ engineer }) => {
  const [showModal, setShowModal] = useState(false);

  const getStatusColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'heating': return 'text-red-400';
      case 'plumbing': return 'text-blue-400';
      case 'drainage': return 'text-green-400';
      case 'supervisor': return 'text-purple-400';
      case 'heating install': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  const getAvatarUrl = (name: string) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=200`;
  };

  return (
    <>
      <div 
        className="card flex items-center justify-between p-4 cursor-pointer hover:bg-gray-800/50 transition-all"
        onClick={() => setShowModal(true)}
      >
        <div className="flex items-center space-x-4 min-w-0">
          <div className="relative flex-shrink-0">
            <img 
              src={getAvatarUrl(engineer.Name)} 
              alt={engineer.Name} 
              className="w-12 h-12 rounded-full"
            />
            <span className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-900 ${
              engineer.Mobile_Number ? 'bg-green-400' : 'bg-gray-400'
            }`} />
          </div>
          <div className="min-w-0">
            <h3 className="font-medium truncate">{engineer.Name}</h3>
            <div className="flex items-center space-x-4 text-sm">
              <span className={`${getStatusColor(engineer.type)} truncate`}>{engineer.type}</span>
              <span className="text-gray-400 flex-shrink-0">ID: {engineer.engineerJWID}</span>
              {engineer.Gas_Safe_Licence_Number && (
                <span className="text-yellow-400 flex-shrink-0">
                  Gas Safe: {engineer.Gas_Safe_Licence_Number}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
              <MapPin className="w-4 h-4" />
              <span>{engineer.Location}</span>
              <span className="text-gray-600">•</span>
              <Building2 className="w-4 h-4" />
              <span>{engineer.Branch_Name}</span>
            </div>
          </div>
        </div>
        <button 
          className="text-gray-400 hover:text-white flex-shrink-0"
          onClick={(e) => {
            e.stopPropagation();
            setShowModal(true);
          }}
        >
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      <EngineerModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        engineer={engineer}
      />
    </>
  );
};