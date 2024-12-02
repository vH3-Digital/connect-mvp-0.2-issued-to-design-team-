import React, { useState } from 'react';
import { Modal } from './Modal';
import { Phone, Copy, Clock, DollarSign, Play, Download, ChevronRight } from 'lucide-react';

interface CallDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  call: {
    id: string;
    createdAt: string;
    to: string;
    from: string;
    duration: string;
    cost: number;
    recording?: boolean;
    status: string;
  };
}

export const CallDetails: React.FC<CallDetailsProps> = ({
  isOpen,
  onClose,
  call
}) => {
  const [activeTab, setActiveTab] = useState<'call' | 'analysis'>('call');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add a toast notification here
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Call Details" size="lg">
      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('call')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'call'
              ? 'bg-cyan-500/20 text-cyan-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Phone className="w-4 h-4" />
          Call
        </button>
        <button
          onClick={() => setActiveTab('analysis')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'analysis'
              ? 'bg-cyan-500/20 text-cyan-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <ChevronRight className="w-4 h-4" />
          Analysis
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Details */}
        <div className="col-span-2 space-y-6">
          <div className="card">
            <h3 className="text-lg font-medium mb-4">Details</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Call ID</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono">{call.id}</span>
                  <button
                    onClick={() => copyToClipboard(call.id)}
                    className="text-gray-400 hover:text-white"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-400">To</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono">{call.to}</span>
                  <button
                    onClick={() => copyToClipboard(call.to)}
                    className="text-gray-400 hover:text-white"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-400">From</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono">{call.from}</span>
                  <button
                    onClick={() => copyToClipboard(call.from)}
                    className="text-gray-400 hover:text-white"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-400">Duration</span>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>{call.duration}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-400">Cost</span>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <span>${call.cost.toFixed(2)}</span>
                </div>
              </div>

              {call.recording && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Recording</span>
                  <div className="flex gap-2">
                    <button className="text-cyan-400 hover:text-cyan-300">
                      <Play className="w-4 h-4" />
                    </button>
                    <button className="text-cyan-400 hover:text-cyan-300">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-gray-400">Created At</span>
                <span>{call.createdAt}</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-medium mb-4">Latency</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">Slowest</div>
                <div className="text-xl font-medium text-red-400">459 ms</div>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">Fastest</div>
                <div className="text-xl font-medium text-green-400">236 ms</div>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">Average</div>
                <div className="text-xl font-medium">306 ms</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Summary/Transcripts */}
        <div className="space-y-4">
          <div className="flex border-b border-gray-700">
            <button
              className={`px-4 py-2 border-b-2 transition-colors ${
                true
                  ? 'border-cyan-500 text-cyan-400'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Summary
            </button>
            <button
              className={`px-4 py-2 border-b-2 transition-colors ${
                false
                  ? 'border-cyan-500 text-cyan-400'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Transcripts
            </button>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Summary</h4>
            <p className="text-sm text-gray-400">
              Dear [User], I enjoyed speaking with you today and exploring how VH3 Connect can transform your field operations. As we discussed, your field team faces various challenges, including job management, and our AI-powered platform is designed to address these hurdles. Our platform leverages advanced AI to provide real-time insights, enabling engineers to access critical information and perform tasks hands-free using voice commands. This streamlines their workflow, reduces administrative tasks, and enhances decision-making. For managers, VH3 Connect offers real-time data on job progress and engineer performance, allowing for informed decision-making and optimized field operations. I'm excited to demonstrate how VH3 Connect can work seamlessly with your existing system, and I've scheduled a demo for tomorrow at 10 AM. You'll receive a calendar invite with all the necessary details shortly. Looking forward to showcasing the power of VH3 Connect tomorrow! Best regards, Ric Vezza
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};