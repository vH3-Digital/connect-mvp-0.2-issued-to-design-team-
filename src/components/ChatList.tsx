import React from 'react';
import { MessageCircle, Users } from 'lucide-react';
import { Chat } from '../types/chat';
import { formatDistanceToNow, format } from 'date-fns';

interface ChatListProps {
  chats: Chat[];
  selectedChatId: string | null;
  onSelectChat: (chatId: string) => void;
}

export const ChatList: React.FC<ChatListProps> = ({
  chats,
  selectedChatId,
  onSelectChat
}) => {
  const formatTimestamp = (timestamp: number | null) => {
    if (!timestamp) return '';
    
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return '';
    
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays < 1) {
      return formatDistanceToNow(date, { addSuffix: true });
    } else if (diffInDays < 7) {
      return format(date, 'EEEE');
    } else {
      return format(date, 'dd/MM/yy');
    }
  };

  // Sort chats by message timestamp only
  const sortedChats = [...chats].sort((a, b) => {
    const timeA = a.description ? new Date(a.description).getTime() : 0;
    const timeB = b.description ? new Date(b.description).getTime() : 0;
    return timeB - timeA;
  });

  if (sortedChats.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center">
          <MessageCircle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No chats yet</p>
          <p className="text-sm text-gray-500 mt-1">Start a new conversation</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4">
        <div className="space-y-2">
          {sortedChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                selectedChatId === chat.id
                  ? 'bg-cyan-500/20 text-cyan-300'
                  : 'hover:bg-gray-800'
              }`}
            >
              <div className="relative flex-shrink-0">
                {chat.group_image?.url ? (
                  <img
                    src={chat.group_image.url}
                    alt={chat.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                    {chat.type === 'group' ? (
                      <Users className="w-6 h-6 text-gray-400" />
                    ) : (
                      <MessageCircle className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                )}
                {chat.type === 'group' && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center text-xs">
                    {chat.participants_id.length}
                  </div>
                )}
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="font-medium truncate">
                  {chat.name || (chat.type === 'group' ? 'Group Chat' : 'Direct Message')}
                </div>
                <div className="text-sm text-gray-400 truncate">
                  {chat.description}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {formatTimestamp(chat.created_at)}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};