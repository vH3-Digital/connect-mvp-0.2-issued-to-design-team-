import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface StatusConfig {
  jobType: string;
  updateInterval: number;
  notifyCustomer: boolean;
  notifyOffice: boolean;
  customStatuses: string[];
  autoComplete: boolean;
  requirePhotos: boolean;
  requireNotes: boolean;
}

export const StatusConfig: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [config, setConfig] = useState<StatusConfig>({
    jobType: '',
    updateInterval: 15,
    notifyCustomer: true,
    notifyOffice: true,
    customStatuses: [],
    autoComplete: false,
    requirePhotos: true,
    requireNotes: true
  });

  const handleSave = () => {
    // Here you would save to backend
    console.log('Saving status config:', config);
    onClose();
  };

  return (
    <div className="space-y-6">
      {/* Form content */}

      {/* How it works */}
      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
        <h4 className="text-cyan-400 font-medium mb-2">How it works</h4>
        <ul className="text-sm text-gray-400 space-y-2">
          <li>• Engineers update status through mobile app or voice commands</li>
          <li>• Automated notifications sent to configured recipients</li>
          <li>• Photo and note requirements enforced for job completion</li>
          <li>• Status changes trigger relevant workflow automations</li>
          <li>• Real-time updates synchronized with the FMS dashboard</li>
        </ul>
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-400 hover:text-white"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all"
        >
          Save Configuration
        </button>
      </div>
    </div>
  );
};