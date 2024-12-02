import React, { useState } from 'react';

interface CustomerConfirmationConfig {
  id: string;
  customerGroups: string[];
  jobTypes: string[];
  timing: {
    value: number;
    unit: 'minutes' | 'hours' | 'days' | 'on-way';
  };
  maxRescheduleWindow: number;
  reschedulePreference: 'asap' | 'lowest-miles';
}

export const CustomerConfirmationConfig: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [config, setConfig] = useState<CustomerConfirmationConfig>({
    id: '',
    customerGroups: [],
    jobTypes: [],
    timing: {
      value: 24,
      unit: 'hours'
    },
    maxRescheduleWindow: 14,
    reschedulePreference: 'asap'
  });

  const handleSave = () => {
    // Here you would save to backend
    console.log('Saving confirmation config:', config);
    onClose();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Job Type
          </label>
          <select
            value={config.jobTypes[0] || ''}
            onChange={(e) => setConfig(prev => ({ ...prev, jobTypes: [e.target.value] }))}
            className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="">Select job type...</option>
            <option value="hvac">HVAC</option>
            <option value="plumbing">Plumbing</option>
            <option value="electrical">Electrical</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Customer Group
          </label>
          <select
            value={config.customerGroups[0] || ''}
            onChange={(e) => setConfig(prev => ({ ...prev, customerGroups: [e.target.value] }))}
            className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="">Select customer group...</option>
            <option value="vip">VIP Customers</option>
            <option value="standard">Standard Customers</option>
            <option value="commercial">Commercial</option>
            <option value="residential">Residential</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Confirmation Timing
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={config.timing.value}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                timing: {
                  ...prev.timing,
                  value: parseInt(e.target.value) || 0
                }
              }))}
              className="w-24 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              min="0"
            />
            <select
              value={config.timing.unit}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                timing: {
                  ...prev.timing,
                  unit: e.target.value as CustomerConfirmationConfig['timing']['unit']
                }
              }))}
              className="bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="minutes">Minutes</option>
              <option value="hours">Hours</option>
              <option value="days">Days</option>
              <option value="on-way">On Way</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Max Reschedule Window (days)
          </label>
          <input
            type="number"
            value={config.maxRescheduleWindow}
            onChange={(e) => setConfig(prev => ({
              ...prev,
              maxRescheduleWindow: parseInt(e.target.value) || 0
            }))}
            className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            min="1"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-2">
          Reschedule Preference
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={config.reschedulePreference === 'asap'}
              onChange={() => setConfig(prev => ({
                ...prev,
                reschedulePreference: 'asap'
              }))}
              className="text-cyan-500 focus:ring-cyan-500"
            />
            <span className="text-sm text-gray-400">As Soon As Possible</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={config.reschedulePreference === 'lowest-miles'}
              onChange={() => setConfig(prev => ({
                ...prev,
                reschedulePreference: 'lowest-miles'
              }))}
              className="text-cyan-500 focus:ring-cyan-500"
            />
            <span className="text-sm text-gray-400">Lowest Additional Miles</span>
          </label>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
        <h4 className="text-cyan-400 font-medium mb-2">How it works</h4>
        <ul className="text-sm text-gray-400 space-y-2">
          <li>• Automated confirmation calls are scheduled based on job timing</li>
          <li>• Customers receive calls with interactive voice response options</li>
          <li>• Rescheduling requests are handled based on configured preferences</li>
          <li>• System automatically updates job schedules in the FMS</li>
          <li>• Failed confirmations trigger escalation workflows</li>
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