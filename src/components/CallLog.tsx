import React, { useState } from 'react';
import { 
  Filter, 
  LineChart, 
  Download, 
  Play, 
  ExternalLink, 
  Search,
  ChevronDown,
  Clock,
  Phone,
  PhoneIncoming,
  PhoneOutgoing
} from 'lucide-react';
import { CallDetails } from './CallDetails';

interface Call {
  id: string;
  notes?: string;
  createdAt: string;
  direction: 'inbound' | 'outbound';
  to: string;
  from: string;
  recording?: boolean;
  status: 'completed' | 'failed' | 'missed';
  transcript?: boolean;
  pathwayLogs?: boolean;
  pathwayTags?: string[];
  duration: string;
  cost: number;
}

const mockCalls: Call[] = [
  {
    id: 'b0e21',
    createdAt: '2024-03-20 10:29 AM',
    direction: 'inbound',
    to: '+447808648469',
    from: '+441495364570',
    recording: true,
    status: 'completed',
    transcript: true,
    duration: '0m 20s',
    cost: 0.07
  },
  {
    id: '21ca3',
    createdAt: '2024-03-20 10:22 AM',
    direction: 'outbound',
    to: '+447808648469',
    from: '+441156473987',
    recording: true,
    status: 'completed',
    transcript: true,
    duration: '2m 31s',
    cost: 0.47
  },
  // Add more mock data as needed
];

export const CallLog: React.FC = () => {
  const [selectedCalls, setSelectedCalls] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedCalls(mockCalls.map(call => call.id));
    } else {
      setSelectedCalls([]);
    }
  };

  const handleSelectCall = (id: string) => {
    if (selectedCalls.includes(id)) {
      setSelectedCalls(prev => prev.filter(callId => callId !== id));
    } else {
      setSelectedCalls(prev => [...prev, id]);
    }
  };

  return (
    <>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Add Filter</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-cyan-400 hover:text-cyan-300 transition-colors">
              <LineChart className="w-4 h-4" />
              <span>View Analytics & Call Insights</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search calls..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedCalls.length === mockCalls.length}
                      onChange={handleSelectAll}
                      className="rounded border-gray-600 text-cyan-500 focus:ring-cyan-500"
                    />
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-gray-400">Notes</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-400">Call ID</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-400">Created On</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-400">Direction</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-400">To</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-400">From</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-400">Recording</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-400">Status</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-400">Transcript</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-400">Duration</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-400">Cost</th>
                </tr>
              </thead>
              <tbody>
                {mockCalls.map((call) => (
                  <tr 
                    key={call.id}
                    className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedCall(call)}
                  >
                    <td className="p-4" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedCalls.includes(call.id)}
                        onChange={() => handleSelectCall(call.id)}
                        className="rounded border-gray-600 text-cyan-500 focus:ring-cyan-500"
                      />
                    </td>
                    <td className="p-4">
                      <button className="text-gray-400 hover:text-white">
                        <Search className="w-4 h-4" />
                      </button>
                    </td>
                    <td className="p-4 font-mono text-sm">{call.id}</td>
                    <td className="p-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        {call.createdAt}
                      </div>
                    </td>
                    <td className="p-4">
                      {call.direction === 'inbound' ? (
                        <PhoneIncoming className="w-4 h-4 text-green-400" />
                      ) : (
                        <PhoneOutgoing className="w-4 h-4 text-blue-400" />
                      )}
                    </td>
                    <td className="p-4 font-mono text-sm">{call.to}</td>
                    <td className="p-4 font-mono text-sm">{call.from}</td>
                    <td className="p-4">
                      {call.recording && (
                        <div className="flex gap-2">
                          <button className="text-cyan-400 hover:text-cyan-300">
                            <Play className="w-4 h-4" />
                          </button>
                          <button className="text-cyan-400 hover:text-cyan-300">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        call.status === 'completed' 
                          ? 'bg-green-400/20 text-green-400'
                          : call.status === 'failed'
                          ? 'bg-red-400/20 text-red-400'
                          : 'bg-yellow-400/20 text-yellow-400'
                      }`}>
                        {call.status}
                      </span>
                    </td>
                    <td className="p-4">
                      {call.transcript && (
                        <button className="px-3 py-1 text-sm text-cyan-400 hover:text-cyan-300">
                          View
                        </button>
                      )}
                    </td>
                    <td className="p-4 text-sm">{call.duration}</td>
                    <td className="p-4 text-sm">£{call.cost.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedCall && (
        <CallDetails
          isOpen={!!selectedCall}
          onClose={() => setSelectedCall(null)}
          call={selectedCall}
        />
      )}
    </>
  );
};