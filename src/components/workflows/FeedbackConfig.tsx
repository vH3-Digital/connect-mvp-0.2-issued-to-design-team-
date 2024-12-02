import React, { useState } from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';

interface FeedbackConfig {
  id: string;
  name: string;
  triggerType: 'job-type' | 'customer-group' | 'customer';
  triggerValue: string;
  questions: Question[];
  standardChecks: string[];
}

interface Question {
  id: string;
  text: string;
  type: 'rating' | 'yes-no' | 'open';
}

const standardCheckOptions = [
  'Wore correct PPE',
  'Showed ID badge',
  'Professional manner',
  'Clear communication',
  'Site left clean',
  'Explained work completed',
  'Provided documentation',
  'On-time arrival'
];

const jobTypes = [
  'HVAC Installation',
  'HVAC Repair',
  'Plumbing Installation',
  'Plumbing Repair',
  'Electrical Installation',
  'Electrical Repair'
];

const customerGroups = [
  'Residential',
  'Commercial',
  'Industrial',
  'Property Management',
  'Government'
];

export const FeedbackConfig: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [configs, setConfigs] = useState<FeedbackConfig[]>([]);
  const [showNewForm, setShowNewForm] = useState(false);
  const [newConfig, setNewConfig] = useState<FeedbackConfig>({
    id: '',
    name: '',
    triggerType: 'job-type',
    triggerValue: '',
    questions: [],
    standardChecks: []
  });

  const handleAddConfig = () => {
    if (newConfig.name && newConfig.triggerValue) {
      setConfigs([...configs, { ...newConfig, id: Date.now().toString() }]);
      setNewConfig({
        id: '',
        name: '',
        triggerType: 'job-type',
        triggerValue: '',
        questions: [],
        standardChecks: []
      });
      setShowNewForm(false);
    }
  };

  const handleAddQuestion = (configId: string) => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      text: '',
      type: 'rating'
    };

    setConfigs(configs.map(config => {
      if (config.id === configId) {
        return {
          ...config,
          questions: [...config.questions, newQuestion]
        };
      }
      return config;
    }));
  };

  const handleUpdateQuestion = (configId: string, questionId: string, updates: Partial<Question>) => {
    setConfigs(configs.map(config => {
      if (config.id === configId) {
        return {
          ...config,
          questions: config.questions.map(q => 
            q.id === questionId ? { ...q, ...updates } : q
          )
        };
      }
      return config;
    }));
  };

  const handleRemoveQuestion = (configId: string, questionId: string) => {
    setConfigs(configs.map(config => {
      if (config.id === configId) {
        return {
          ...config,
          questions: config.questions.filter(q => q.id !== questionId)
        };
      }
      return config;
    }));
  };

  const handleToggleStandardCheck = (configId: string, check: string) => {
    setConfigs(configs.map(config => {
      if (config.id === configId) {
        const checks = config.standardChecks.includes(check)
          ? config.standardChecks.filter(c => c !== check)
          : [...config.standardChecks, check];
        return { ...config, standardChecks: checks };
      }
      return config;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Add New Configuration Button */}
      {!showNewForm && (
        <button
          onClick={() => setShowNewForm(true)}
          className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Feedback Configuration
        </button>
      )}

      {/* New Configuration Form */}
      {showNewForm && (
        <div className="card">
          <h3 className="text-lg font-medium mb-4">New Feedback Configuration</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Configuration Name
              </label>
              <input
                type="text"
                value={newConfig.name}
                onChange={(e) => setNewConfig({ ...newConfig, name: e.target.value })}
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="e.g., Residential HVAC Feedback"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Trigger Type
                </label>
                <select
                  value={newConfig.triggerType}
                  onChange={(e) => setNewConfig({ 
                    ...newConfig, 
                    triggerType: e.target.value as FeedbackConfig['triggerType'],
                    triggerValue: ''
                  })}
                  className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="job-type">Job Type</option>
                  <option value="customer-group">Customer Group</option>
                  <option value="customer">Individual Customer</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  {newConfig.triggerType === 'job-type' ? 'Job Type' :
                   newConfig.triggerType === 'customer-group' ? 'Customer Group' :
                   'Customer ID'}
                </label>
                {newConfig.triggerType === 'job-type' ? (
                  <select
                    value={newConfig.triggerValue}
                    onChange={(e) => setNewConfig({ ...newConfig, triggerValue: e.target.value })}
                    className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="">Select job type...</option>
                    {jobTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                ) : newConfig.triggerType === 'customer-group' ? (
                  <select
                    value={newConfig.triggerValue}
                    onChange={(e) => setNewConfig({ ...newConfig, triggerValue: e.target.value })}
                    className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="">Select customer group...</option>
                    {customerGroups.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={newConfig.triggerValue}
                    onChange={(e) => setNewConfig({ ...newConfig, triggerValue: e.target.value })}
                    className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="Enter customer ID"
                  />
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowNewForm(false)}
                className="px-4 py-2 text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleAddConfig}
                disabled={!newConfig.name || !newConfig.triggerValue}
                className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Configuration
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Existing Configurations */}
      <div className="space-y-6">
        {configs.map(config => (
          <div key={config.id} className="card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-medium">{config.name}</h3>
                <p className="text-sm text-gray-400">
                  Triggered by: {config.triggerType === 'job-type' ? 'Job Type' :
                               config.triggerType === 'customer-group' ? 'Customer Group' :
                               'Customer'} - {config.triggerValue}
                </p>
              </div>
            </div>

            {/* Standard Checks */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-400 mb-3">Standard Checks</h4>
              <div className="grid grid-cols-2 gap-3">
                {standardCheckOptions.map(check => (
                  <label key={check} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={config.standardChecks.includes(check)}
                      onChange={() => handleToggleStandardCheck(config.id, check)}
                      className="rounded border-gray-600 text-cyan-500 focus:ring-cyan-500"
                    />
                    <span className="text-sm text-gray-400">{check}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Custom Questions */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-gray-400">Custom Questions</h4>
                <button
                  onClick={() => handleAddQuestion(config.id)}
                  className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Add Question
                </button>
              </div>

              <div className="space-y-3">
                {config.questions.map((question, index) => (
                  <div key={question.id} className="flex items-start gap-3 bg-gray-800/50 p-3 rounded-lg">
                    <GripVertical className="w-5 h-5 text-gray-400 flex-shrink-0 mt-2" />
                    <div className="flex-1 space-y-3">
                      <input
                        type="text"
                        value={question.text}
                        onChange={(e) => handleUpdateQuestion(config.id, question.id, { text: e.target.value })}
                        className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        placeholder="Enter question text"
                      />
                      <select
                        value={question.type}
                        onChange={(e) => handleUpdateQuestion(config.id, question.id, { type: e.target.value as Question['type'] })}
                        className="bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      >
                        <option value="rating">Rating (1-5)</option>
                        <option value="yes-no">Yes/No</option>
                        <option value="open">Open Answer</option>
                      </select>
                    </div>
                    <button
                      onClick={() => handleRemoveQuestion(config.id, question.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
        <h4 className="text-cyan-400 font-medium mb-2">How it works</h4>
        <ul className="text-sm text-gray-400 space-y-2">
          <li>• Automated feedback calls are triggered upon job completion</li>
          <li>• Standard checks are presented as yes/no questions</li>
          <li>• Custom questions can be configured with different response types</li>
          <li>• AI analyzes responses for sentiment and key insights</li>
          <li>• Results are synchronized with the FMS and available in reports</li>
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
          onClick={onClose}
          className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};