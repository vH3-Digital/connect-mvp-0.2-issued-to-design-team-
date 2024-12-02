import React from 'react';
import { Paperclip } from 'lucide-react';
import { ChatMessage } from './types';

interface MessageListProps {
  messages: ChatMessage[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[80%] rounded-lg p-3 ${
              msg.sender === 'user'
                ? 'bg-cyan-500/20 text-cyan-50'
                : 'bg-gray-700 text-gray-100'
            }`}
          >
            {msg.attachments?.map((attachment, index) => (
              <div key={index} className="mb-2">
                {attachment.type === 'image' && (
                  <img
                    src={attachment.url}
                    alt="Attachment"
                    className="rounded-lg max-w-full"
                  />
                )}
                {attachment.type === 'file' && (
                  <div className="flex items-center gap-2 bg-gray-800 p-2 rounded-lg">
                    <Paperclip className="w-4 h-4" />
                    <span className="text-sm truncate">{attachment.name}</span>
                  </div>
                )}
                {attachment.type === 'voice' && (
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-8 bg-gray-800 rounded-full relative overflow-hidden">
                      <div className="absolute inset-0 bg-cyan-500/20" style={{ width: '100%' }} />
                    </div>
                    <span className="text-xs">{attachment.name}</span>
                  </div>
                )}
              </div>
            ))}
            {msg.content && <p className="text-sm">{msg.content}</p>}
            <span className="text-xs text-gray-400 mt-1 block">
              {msg.timestamp}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};