import React, { useState } from 'react';
import { Modal } from './Modal';
import {
  Calendar,
  CreditCard,
  CheckCircle2,
  XCircle,
  ExternalLink
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  iconUrl?: string;
  icon?: any;
  status: 'connected' | 'disconnected';
  color: string;
  lastSync?: string;
}

const integrations: Integration[] = [
  {
    id: 'gmail',
    name: 'Gmail',
    description: 'Sync emails and manage communications',
    iconUrl: 'https://cdn.prod.website-files.com/66f62ac0b4dbc96bb348eb73/6706305af04657beee0c666c_gmail-icon.svg',
    status: 'disconnected',
    color: 'from-red-400 to-red-500',
    lastSync: '2 hours ago'
  },
  {
    id: 'gdrive',
    name: 'Google Drive',
    description: 'Access and manage documents',
    iconUrl: 'https://cdn.prod.website-files.com/66f62ac0b4dbc96bb348eb73/66fb96061add33b7afd7313b_Google_Drive_Logo.svg',
    status: 'disconnected',
    color: 'from-blue-400 to-blue-500'
  },
  {
    id: 'gcalendar',
    name: 'Google Calendar',
    description: 'Schedule and manage appointments',
    icon: Calendar,
    status: 'disconnected',
    color: 'from-green-400 to-green-500'
  },
  {
    id: 'outlook',
    name: 'Outlook / MS365',
    description: 'Microsoft email and calendar integration',
    iconUrl: 'https://cdn.prod.website-files.com/66f62ac0b4dbc96bb348eb73/66fb96061add33b7afd7318f_Microsoft_Office_logo_(2019%E2%80%93present).svg.png',
    status: 'disconnected',
    color: 'from-blue-500 to-indigo-500'
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Payment processing and invoicing',
    icon: CreditCard,
    status: 'disconnected',
    color: 'from-purple-400 to-purple-500'
  },
  {
    id: 'bigchange',
    name: 'BigChange',
    description: 'Job management and scheduling',
    iconUrl: 'https://cdn.prod.website-files.com/66f62ac0b4dbc96bb348eb73/66fb96071add33b7afd7373a_OxIn5M_w_400x400.png',
    status: 'disconnected',
    color: 'from-orange-400 to-orange-500'
  }
];

export const Integrations: React.FC = () => {
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);

  const handleConnect = (integration: Integration) => {
    // Here you would implement OAuth or other authentication flows
    console.log('Connecting to:', integration.name);
  };

  const handleDisconnect = (integration: Integration) => {
    // Here you would implement disconnection logic
    console.log('Disconnecting from:', integration.name);
  };

  const renderIcon = (integration: Integration) => {
    if (integration.iconUrl) {
      return <img src={integration.iconUrl} alt={integration.name} className="w-6 h-6" />;
    }
    if (integration.icon) {
      const Icon = integration.icon;
      return <Icon className="w-6 h-6 text-white" />;
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-cyan-400">Integrations</h2>
        <p className="text-gray-400">Connect your third-party services</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration) => (
          <div
            key={integration.id}
            className="card hover:bg-gray-800/50 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${integration.color}`}>
                {renderIcon(integration)}
              </div>
              <div className="flex items-center gap-2">
                {integration.status === 'connected' ? (
                  <span className="flex items-center gap-1 text-green-400 text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    Connected
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-gray-400 text-sm">
                    <XCircle className="w-4 h-4" />
                    Disconnected
                  </span>
                )}
              </div>
            </div>
            
            <h3 className="text-lg font-medium mt-4">{integration.name}</h3>
            <p className="text-gray-400 text-sm mt-2">{integration.description}</p>
            
            {integration.lastSync && (
              <p className="text-sm text-gray-500 mt-2">Last synced: {integration.lastSync}</p>
            )}

            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={() => setSelectedIntegration(integration)}
                className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center gap-1"
              >
                Configure
                <ExternalLink className="w-4 h-4" />
              </button>
              
              {integration.status === 'connected' ? (
                <button
                  onClick={() => handleDisconnect(integration)}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Disconnect
                </button>
              ) : (
                <button
                  onClick={() => handleConnect(integration)}
                  className="text-cyan-400 hover:text-cyan-300 text-sm"
                >
                  Connect
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Configuration Modal */}
      {selectedIntegration && (
        <Modal
          isOpen={!!selectedIntegration}
          onClose={() => setSelectedIntegration(null)}
          title={`Configure ${selectedIntegration.name}`}
          size="md"
        >
          <div className="space-y-6">
            {/* OAuth Sign-in Button */}
            <button
              onClick={() => handleConnect(selectedIntegration)}
              className={`w-full px-4 py-3 rounded-lg bg-gradient-to-r ${selectedIntegration.color} text-white flex items-center justify-center gap-2 hover:opacity-90 transition-opacity`}
            >
              {renderIcon(selectedIntegration)}
              Sign in with {selectedIntegration.name}
            </button>

            {/* Configuration Options */}
            <div className="space-y-4">
              <h4 className="font-medium">Sync Options</h4>
              
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-600 text-cyan-500 focus:ring-cyan-500"
                />
                <span className="text-sm text-gray-400">Enable automatic sync</span>
              </label>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Sync Frequency
                </label>
                <select className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                  <option value="5">Every 5 minutes</option>
                  <option value="15">Every 15 minutes</option>
                  <option value="30">Every 30 minutes</option>
                  <option value="60">Every hour</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Data Retention
                </label>
                <select className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                  <option value="7">7 days</option>
                  <option value="30">30 days</option>
                  <option value="90">90 days</option>
                  <option value="365">1 year</option>
                </select>
              </div>
            </div>

            {/* Integration Status */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-medium mb-2">Integration Status</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex justify-between">
                  <span>Status</span>
                  <span className={selectedIntegration.status === 'connected' ? 'text-green-400' : 'text-red-400'}>
                    {selectedIntegration.status === 'connected' ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
                {selectedIntegration.lastSync && (
                  <div className="flex justify-between">
                    <span>Last Sync</span>
                    <span>{selectedIntegration.lastSync}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>API Calls</span>
                  <span>0/1000</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedIntegration(null)}
                className="px-4 py-2 text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Save configuration
                  setSelectedIntegration(null);
                }}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};