import React from 'react';
import { Message, Contact } from '../types/chat';
import { format } from 'date-fns';

interface MessageListProps {
  messages: Message[];
  currentUserId: number;
  contacts: Contact[];
}

export const MessageList: React.FC<MessageListProps> = ({ 
  messages, 
  currentUserId,
  contacts 
}) => {
  const formatTimestamp = (timestamp: number) => {
    try {
      return format(new Date(timestamp), 'HH:mm');
    } catch (error) {
      return '';
    }
  };

  const getContactInfo = (userId: number) => {
    return contacts?.find(contact => contact.id === userId);
  };

  const getDisplayName = (contact?: Contact) => {
    if (!contact) return 'Unknown User';
    if (contact.first_name && contact.last_name) {
      return `${contact.first_name} ${contact.last_name}`;
    }
    return contact.first_name || contact.email || 'Unknown User';
  };

  const getInitial = (contact?: Contact) => {
    if (!contact) return '?';
    return contact.first_name?.charAt(0) || contact.email?.charAt(0) || '?';
  };

  return (
    <div className="space-y-4">
      {messages?.map((msg) => {
        const contact = getContactInfo(msg.sender_id);
        const isCurrentUser = msg.sender_id === currentUserId;
        const name = getDisplayName(contact);

        return (
          <div
            key={msg.id}
            className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                isCurrentUser
                  ? 'bg-cyan-500/20 text-cyan-50'
                  : 'bg-gray-700 text-gray-100'
              }`}
            >
              {!isCurrentUser && (
                <div className="flex items-center gap-2 mb-1">
                  {(contact?.profile_picture?.url || msg._sender_info?.profile_picture?.url) ? (
                    <img
                      src={contact?.profile_picture?.url || msg._sender_info?.profile_picture?.url}
                      alt={name}
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-xs">
                        {getInitial(contact)}
                      </span>
                    </div>
                  )}
                  <span className="text-sm text-gray-400">
                    {name}
                  </span>
                </div>
              )}
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
              <span className="text-xs text-gray-400 mt-1 block">
                {formatTimestamp(msg.created_at)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};