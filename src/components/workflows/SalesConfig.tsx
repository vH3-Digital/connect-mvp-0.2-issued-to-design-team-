import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface SalesConfig {
  jobType: string;
  quoteType: string;
  customerGroup: string;
  reportFrequency: 'daily' | 'weekly' | 'monthly';
  scheduleTime: string;
  scheduleDays: string[];
  includeMetrics: string[];
  autoGenerate: boolean;
  exportFormat: 'pdf' | 'excel' | 'both';
}

export const SalesConfig: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [config, setConfig] = useState<SalesConfig>({
    jobType: '',
    quoteType: '',
    customerGroup: '',
    reportFrequency: 'weekly',
    scheduleTime: '09:00',
    scheduleDays: ['Monday'],
    includeMetrics: [],
    autoGenerate: true,
    exportFormat: 'pdf'
  });

  const handleSave = () => {
    // Here you would save to backend
    console.log('Saving sales config:', config);
    onClose();
  };

  return (
    <div className="space-y-6">
      {/* Form content */}
      
      {/* How it works */}
      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
        <h4 className="text-cyan-400 font-medium mb-2">How it works</h4>
        <ul className="text-sm text-gray-400 space-y-2">
          <li>• Reports automatically generated on configured schedule</li>
          <li>• Data aggregated from multiple system sources</li>
          <li>• AI-powered insights and trend analysis included</li>
          <li>• Reports distributed to configured recipients</li>
          <li>• Interactive dashboards available for real-time monitoring</li>
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