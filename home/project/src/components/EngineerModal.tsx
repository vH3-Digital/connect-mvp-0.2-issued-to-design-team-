import React from 'react';
import { Modal } from './Modal';
import { Phone, Mail, MapPin, Building2, FileText } from 'lucide-react';

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
    <Modal isOpen={isOpen} onClose={onClose} title="Engineer Details">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start space-x-4">
          <img
            src={getAvatarUrl(engineer.Name)}
            alt={engineer.Name}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h3 className="text-xl font-semibold">{engineer.Name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`${getStatusColor(engineer.type)}`}>
                {engineer.type}
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-400">ID: {engineer.engineerJWID}</span>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          {engineer.Mobile_Number && (
            <div className="flex items-center space-x-3 text-gray-400">
              <Phone className="w-5 h-5" />
              <span>{engineer.Mobile_Number}</span>
            </div>
          )}
          {engineer.Email && (
            <div className="flex items-center space-x-3 text-gray-400">
              <Mail className="w-5 h-5" />
              <span>{engineer.Email}</span>
            </div>
          )}
          <div className="flex items-center space-x-3 text-gray-400">
            <MapPin className="w-5 h-5" />
            <span>{engineer.Location}</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-400">
            <Building2 className="w-5 h-5" />
            <div>
              <div>{engineer.Branch_Name}</div>
              <div className="text-sm text-gray-500">Branch Code: {engineer.Branch_Code}</div>
            </div>
          </div>
        </div>

        {/* Qualifications */}
        {engineer.Gas_Safe_Licence_Number && (
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-yellow-400" />
              <h3 className="font-medium">Qualifications</h3>
            </div>
            <div className="space-y-2">
              <div>
                <div className="text-sm text-gray-400">Gas Safe License</div>
                <div>{engineer.Gas_Safe_Licence_Number}</div>
              </div>
            </div>
          </div>
        )}

        {/* Resource Group */}
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="w-5 h-5 text-cyan-400" />
            <h3 className="font-medium">Resource Information</h3>
          </div>
          <div className="space-y-2">
            <div>
              <div className="text-sm text-gray-400">Resource Group ID</div>
              <div>{engineer.ResourceGroupId}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Branch JWID</div>
              <div>{engineer.branch_JWID}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Company ID</div>
              <div className="font-mono text-sm">{engineer.company}</div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};