import React from 'react';
import { Agent } from './types';

interface ChatHeaderProps {
  agent: Agent;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ agent }) => {
  return (
    <div className="flex items-center space-x-4 p-4 border-b border-gray-800">
      <div className="relative">
        <img
          src={agent.avatar}
          alt={agent.name}
          className="w-12 h-12 rounded-full"
        />
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-gray-900 rounded-full" />
      </div>
      <div>
        <h3 className="font-medium text-lg">{agent.name}</h3>
        <p className="text-sm text-cyan-400">Online</p>
      </div>
    </div>
  );
};