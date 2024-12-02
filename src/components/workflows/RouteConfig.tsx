import React, { useState } from 'react';

interface RouteConfig {
  jobType: string;
  maxDetourDistance: number;
  trafficCheckInterval: number;
  autoReassign: boolean;
  reassignThreshold: number;
  considerParking: boolean;
  avoidTollRoads: boolean;
}

export const RouteConfig: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [config, setConfig] = useState<RouteConfig>({
    jobType: '',
    maxDetourDistance: 5,
    trafficCheckInterval: 15,
    autoReassign: true,
    reassignThreshold: 30,
    considerParking: true,
    avoidTollRoads: false
  });

  const handleSave = () => {
    // Here you would save to backend
    console.log('Saving route config:', config);
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
            value={config.jobType}
            onChange={(e) => setConfig(prev => ({ ...prev, jobType: e.target.value }))}
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
            Max Detour Distance (miles)
          </label>
          <input
            type="number"
            value={config.maxDetourDistance}
            onChange={(e) => setConfig(prev => ({ ...prev, maxDetourDistance: parseInt(e.target.value) || 0 }))}
            className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Traffic Check Interval (minutes)
          </label>
          <input
            type="number"
            value={config.trafficCheckInterval}
            onChange={(e) => setConfig(prev => ({ ...prev, trafficCheckInterval: parseInt(e.target.value) || 0 }))}
            className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Reassignment Threshold (minutes)
          </label>
          <input
            type="number"
            value={config.reassignThreshold}
            onChange={(e) => setConfig(prev => ({ ...prev, reassignThreshold: parseInt(e.target.value) || 0 }))}
            className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={config.autoReassign}
            onChange={(e) => setConfig(prev => ({ ...prev, autoReassign: e.target.checked }))}
            className="rounded border-gray-600 text-cyan-500 focus:ring-cyan-500"
          />
          <span className="text-sm text-gray-400">Enable automatic reassignment</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={config.considerParking}
            onChange={(e) => setConfig(prev => ({ ...prev, considerParking: e.target.checked }))}
            className="rounded border-gray-600 text-cyan-500 focus:ring-cyan-500"
          />
          <span className="text-sm text-gray-400">Consider parking availability</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={config.avoidTollRoads}
            onChange={(e) => setConfig(prev => ({ ...prev, avoidTollRoads: e.target.checked }))}
            className="rounded border-gray-600 text-cyan-500 focus:ring-cyan-500"
          />
          <span className="text-sm text-gray-400">Avoid toll roads when possible</span>
        </label>
      </div>

      {/* How it works */}
      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
        <h4 className="text-cyan-400 font-medium mb-2">How it works</h4>
        <ul className="text-sm text-gray-400 space-y-2">
          <li>• Real-time traffic monitoring and route optimization</li>
          <li>• Dynamic rerouting based on traffic conditions</li>
          <li>• Automatic job reassignment when delays exceed thresholds</li>
          <li>• Parking availability factored into arrival time estimates</li>
          <li>• Integration with navigation systems for turn-by-turn guidance</li>
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