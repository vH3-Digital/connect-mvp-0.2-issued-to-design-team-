import React, { useState } from 'react';
import { Plus, Trash2, Clock, Users, FileText } from 'lucide-react';

interface EngineerGroup {
  id: string;
  name: string;
}

interface Engineer {
  id: string;
  name: string;
  group: string;
}

interface JobType {
  id: string;
  name: string;
}

interface User {
  id: string;
  name: string;
  role: string;
}

// Mock data - would come from FMS
const mockGroups: EngineerGroup[] = [
  { id: 'g1', name: 'HVAC Team' },
  { id: 'g2', name: 'Plumbing Team' },
  { id: 'g3', name: 'Electrical Team' }
];

const mockEngineers: Engineer[] = [
  { id: 'e1', name: 'John Smith', group: 'g1' },
  { id: 'e2', name: 'Emily Brown', group: 'g2' },
  { id: 'e3', name: 'Michael Johnson', group: 'g3' }
];

const mockJobTypes: JobType[] = [
  { id: 'j1', name: 'HVAC Installation' },
  { id: 'j2', name: 'HVAC Repair' },
  { id: 'j3', name: 'Plumbing Installation' },
  { id: 'j4', name: 'Plumbing Repair' },
  { id: 'j5', name: 'Electrical Installation' },
  { id: 'j6', name: 'Electrical Repair' }
];

const mockUsers: User[] = [
  { id: 'u1', name: 'Sarah Manager', role: 'Manager' },
  { id: 'u2', name: 'Tom Supervisor', role: 'Supervisor' },
  { id: 'u3', name: 'Alice Coordinator', role: 'Coordinator' }
];

interface StandupConfig {
  id: string;
  brief: string;
  selectedGroups: string[];
  selectedEngineers: string[];
  schedule: {
    days: string[];
    time: string;
  };
  allowHistory: boolean;
  excludedJobTypes: string[];
  reportRecipients: string[];
}

interface PreJobConfig {
  id: string;
  jobTypes: string[];
  notificationWindow: {
    value: number;
    unit: 'minutes' | 'hours' | 'days' | 'on-way';
  };
  selectedGroups: string[];
  selectedEngineers: string[];
  allowHistory: boolean;
}

export const JobPrepConfig: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'standup' | 'prejob'>('standup');
  const [standups, setStandups] = useState<StandupConfig[]>([]);
  const [preJobConfigs, setPreJobConfigs] = useState<PreJobConfig[]>([]);
  const [showNewStandup, setShowNewStandup] = useState(false);
  const [showNewPreJob, setShowNewPreJob] = useState(false);

  const [newStandup, setNewStandup] = useState<StandupConfig>({
    id: '',
    brief: '',
    selectedGroups: [],
    selectedEngineers: [],
    schedule: {
      days: [],
      time: '09:00'
    },
    allowHistory: true,
    excludedJobTypes: [],
    reportRecipients: []
  });

  const [newPreJob, setNewPreJob] = useState<PreJobConfig>({
    id: '',
    jobTypes: [],
    notificationWindow: {
      value: 30,
      unit: 'minutes'
    },
    selectedGroups: [],
    selectedEngineers: [],
    allowHistory: true
  });

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleSaveStandup = () => {
    if (newStandup.brief && (newStandup.selectedGroups.length || newStandup.selectedEngineers.length)) {
      setStandups(prev => [...prev, { ...newStandup, id: Date.now().toString() }]);
      setShowNewStandup(false);
      setNewStandup({
        id: '',
        brief: '',
        selectedGroups: [],
        selectedEngineers: [],
        schedule: {
          days: [],
          time: '09:00'
        },
        allowHistory: true,
        excludedJobTypes: [],
        reportRecipients: []
      });
    }
  };

  const handleSavePreJob = () => {
    if (newPreJob.jobTypes.length && (newPreJob.selectedGroups.length || newPreJob.selectedEngineers.length)) {
      setPreJobConfigs(prev => [...prev, { ...newPreJob, id: Date.now().toString() }]);
      setShowNewPreJob(false);
      setNewPreJob({
        id: '',
        jobTypes: [],
        notificationWindow: {
          value: 30,
          unit: 'minutes'
        },
        selectedGroups: [],
        selectedEngineers: [],
        allowHistory: true
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('standup')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'standup'
              ? 'bg-cyan-500/20 text-cyan-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Daily Standup
        </button>
        <button
          onClick={() => setActiveTab('prejob')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'prejob'
              ? 'bg-cyan-500/20 text-cyan-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Pre-job Briefing
        </button>
      </div>

      {/* Configuration Content */}
      {activeTab === 'standup' ? (
        <div className="space-y-6">
          {!showNewStandup && (
            <button
              onClick={() => setShowNewStandup(true)}
              className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Standup Configuration
            </button>
          )}

          {showNewStandup && (
            <div className="card space-y-6">
              {/* Standup form fields */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Brief Description
                </label>
                <textarea
                  value={newStandup.brief}
                  onChange={(e) => setNewStandup(prev => ({ ...prev, brief: e.target.value }))}
                  className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 h-24 resize-none"
                  placeholder="Enter briefing details and instructions..."
                />
              </div>

              {/* Groups and Engineers selection */}
              <div className="grid grid-cols-2 gap-6">
                {/* Groups */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Engineer Groups
                  </label>
                  <div className="space-y-2">
                    {mockGroups.map(group => (
                      <label key={group.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={newStandup.selectedGroups.includes(group.id)}
                          onChange={(e) => {
                            const groups = e.target.checked
                              ? [...newStandup.selectedGroups, group.id]
                              : newStandup.selectedGroups.filter(id => id !== group.id);
                            setNewStandup(prev => ({ ...prev, selectedGroups: groups }));
                          }}
                          className="rounded border-gray-600 text-cyan-500 focus:ring-cyan-500"
                        />
                        <span className="text-sm text-gray-400">{group.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Individual Engineers */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Individual Engineers
                  </label>
                  <div className="space-y-2">
                    {mockEngineers.map(engineer => (
                      <label key={engineer.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={newStandup.selectedEngineers.includes(engineer.id)}
                          onChange={(e) => {
                            const engineers = e.target.checked
                              ? [...newStandup.selectedEngineers, engineer.id]
                              : newStandup.selectedEngineers.filter(id => id !== engineer.id);
                            setNewStandup(prev => ({ ...prev, selectedEngineers: engineers }));
                          }}
                          className="rounded border-gray-600 text-cyan-500 focus:ring-cyan-500"
                        />
                        <span className="text-sm text-gray-400">{engineer.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Schedule</label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Days</div>
                    <div className="flex flex-wrap gap-2">
                      {weekDays.map(day => (
                        <button
                          key={day}
                          onClick={() => {
                            const days = newStandup.schedule.days.includes(day)
                              ? newStandup.schedule.days.filter(d => d !== day)
                              : [...newStandup.schedule.days, day];
                            setNewStandup(prev => ({
                              ...prev,
                              schedule: { ...prev.schedule, days }
                            }));
                          }}
                          className={`px-3 py-1 rounded-full text-sm transition-colors ${
                            newStandup.schedule.days.includes(day)
                              ? 'bg-cyan-500/20 text-cyan-300 ring-2 ring-cyan-500'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          {day.slice(0, 3)}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Time</div>
                    <input
                      type="time"
                      value={newStandup.schedule.time}
                      onChange={(e) => setNewStandup(prev => ({
                        ...prev,
                        schedule: { ...prev.schedule, time: e.target.value }
                      }))}
                      className="bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowNewStandup(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveStandup}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all"
                >
                  Save Configuration
                </button>
              </div>
            </div>
          )}

          {/* Existing Standups */}
          {standups.map(standup => (
            <div key={standup.id} className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">{standup.brief.slice(0, 50)}...</h3>
                <button
                  onClick={() => setStandups(prev => prev.filter(s => s.id !== standup.id))}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {standup.schedule.time}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {standup.selectedGroups.length + standup.selectedEngineers.length} participants
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {!showNewPreJob && (
            <button
              onClick={() => setShowNewPreJob(true)}
              className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Pre-job Configuration
            </button>
          )}

          {showNewPreJob && (
            <div className="card space-y-6">
              {/* Pre-job form fields */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Job Types
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {mockJobTypes.map(jobType => (
                    <label key={jobType.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={newPreJob.jobTypes.includes(jobType.id)}
                        onChange={(e) => {
                          const types = e.target.checked
                            ? [...newPreJob.jobTypes, jobType.id]
                            : newPreJob.jobTypes.filter(id => id !== jobType.id);
                          setNewPreJob(prev => ({ ...prev, jobTypes: types }));
                        }}
                        className="rounded border-gray-600 text-cyan-500 focus:ring-cyan-500"
                      />
                      <span className="text-sm text-gray-400">{jobType.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Notification Window */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Notification Window
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={newPreJob.notificationWindow.value}
                    onChange={(e) => setNewPreJob(prev => ({
                      ...prev,
                      notificationWindow: {
                        ...prev.notificationWindow,
                        value: parseInt(e.target.value) || 0
                      }
                    }))}
                    className="w-24 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    min="0"
                  />
                  <select
                    value={newPreJob.notificationWindow.unit}
                    onChange={(e) => setNewPreJob(prev => ({
                      ...prev,
                      notificationWindow: {
                        ...prev.notificationWindow,
                        unit: e.target.value as PreJobConfig['notificationWindow']['unit']
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

              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowNewPreJob(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePreJob}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all"
                >
                  Save Configuration
                </button>
              </div>
            </div>
          )}

          {/* Existing Pre-job Configs */}
          {preJobConfigs.map(config => (
            <div key={config.id} className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">
                  {mockJobTypes.filter(jt => config.jobTypes.includes(jt.id)).map(jt => jt.name).join(', ')}
                </h3>
                <button
                  onClick={() => setPreJobConfigs(prev => prev.filter(c => c.id !== config.id))}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {config.notificationWindow.value} {config.notificationWindow.unit}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {config.selectedGroups.length + config.selectedEngineers.length} participants
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* How it works */}
      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
        <h4 className="text-cyan-400 font-medium mb-2">How it works</h4>
        <ul className="text-sm text-gray-400 space-y-2">
          <li>• Daily standup calls automatically scheduled for configured groups</li>
          <li>• Pre-job briefings triggered based on job type and timing</li>
          <li>• Relevant job history and customer notes presented to engineers</li>
          <li>• Voice commands available for hands-free operation</li>
          <li>• Attendance and participation tracked for compliance</li>
        </ul>
      </div>

      {/* Footer Actions */}
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