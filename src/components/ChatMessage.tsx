import React from 'react';
import { format } from 'date-fns';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: string;
  sender: string;
  avatar?: string | null;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isUser,
  timestamp,
  sender,
  avatar
}) => {
  // Format timestamp to include date
  const formattedTimestamp = format(new Date(timestamp), 'HH:mm dd/MM/yy');

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-start max-w-[70%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <img
          src={avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(sender)}&background=random`}
          alt={sender}
          className="w-8 h-8 rounded-full flex-shrink-0 mx-2"
        />
        <div>
          <div className={`flex items-center gap-2 mb-1 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
            <span className="text-sm text-gray-400">{sender}</span>
            <span className="text-xs text-gray-500">{formattedTimestamp}</span>
          </div>
          <div
            className={`rounded-lg px-4 py-2 ${
              isUser
                ? 'bg-cyan-500/20 text-cyan-50'
                : 'bg-gray-700 text-gray-100'
            }`}
          >
            <p className="text-sm">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};