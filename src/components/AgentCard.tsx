import React, { useState } from 'react';
import { Mic, MoreVertical } from 'lucide-react';
import { AgentChat } from './AgentChat';
import { VoiceChat } from './VoiceChat';
import { Agent } from '../types/agents';

interface AgentCardProps {
  agent: Agent;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  const [showChat, setShowChat] = useState(false);
  const [showVoiceChat, setShowVoiceChat] = useState(false);

  return (
    <>
      <div className="card group hover:bg-gray-800/50 transition-all cursor-pointer h-full">
        <div className="flex justify-between items-start mb-4">
          <img 
            src={agent.avatar.url} 
            alt={agent.name} 
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex gap-2">
            <button
              onClick={() => setShowVoiceChat(true)}
              className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors"
            >
              <Mic className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowChat(true)}
              className="p-2 bg-gray-700 text-gray-400 rounded-lg hover:bg-gray-600 hover:text-white transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold mb-4">{agent.name}</h3>
        
        <div className="text-sm text-gray-400">
          {agent.description.split('\n')[0]}
        </div>
      </div>

      <AgentChat
        isOpen={showChat}
        onClose={() => setShowChat(false)}
        agent={{
          id: agent.id.toString(),
          name: agent.name,
          avatar: agent.avatar.url,
          introduction: agent.introduction
        }}
      />

      <VoiceChat 
        isOpen={showVoiceChat}
        onClose={() => setShowVoiceChat(false)}
        agent={{
          id: agent.id.toString(),
          name: agent.name,
          avatar: agent.avatar.url
        }}
      />
    </>
  );
};