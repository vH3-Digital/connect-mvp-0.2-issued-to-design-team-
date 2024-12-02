import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useChat } from '../hooks/useChat';
import { MessageCard } from './MessageCard';
import { ChatPanel } from './ChatPanel';
import { Modal } from './Modal';
import { Search } from 'lucide-react';

export const Messages = () => {
  const { user } = useAuth();
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const {
    loading,
    error,
    channels,
    messages,
    contacts,
    sendMessage,
    refreshData
  } = useChat(selectedChannel);

  // Filter channels based on search query
  const filteredChannels = channels.filter(channel => {
    const contact = contacts.find(c => 
      channel.participants_id.includes(c.id) && c.id !== user?.id
    );
    
    return contact?.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
           channel.description?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Handle message sending
  const handleSendMessage = async (message: string) => {
    if (!selectedChannel) return;
    try {
      await sendMessage(message);
      await refreshData(selectedChannel);
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400">
        Error loading messages: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search messages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-800 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      {/* Messages List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredChannels.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            {searchQuery ? 'No messages match your search' : 'No messages yet'}
          </div>
        ) : (
          filteredChannels.map(channel => {
            const contact = contacts.find(c => 
              channel.participants_id.includes(c.id) && c.id !== user?.id
            );
            
            // Get last message from channel description or default text
            const lastMessage = channel.description || 'Start a conversation';
            
            // Check if there are any unread messages
            const hasUnread = messages.some(msg => 
              msg.channel_id === channel.id &&
              msg.sender_id !== user?.id &&
              !msg.receivers.find(r => r.user_id === user?.id)?.read
            );

            return (
              <MessageCard
                key={channel.id}
                name={contact?.username || 'Unknown User'}
                message={lastMessage}
                category={channel.type === 'direct' ? 'Direct Message' : 'Group'}
                status={hasUnread ? 'unread' : 'read'}
                imageUrl={contact?.profile_picture?.url || `https://ui-avatars.com/api/?name=${contact?.username || 'U'}&background=random`}
                onClick={() => {
                  setSelectedChannel(channel.id);
                  setShowChat(true);
                }}
              />
            );
          })
        )}
      </div>

      {/* Chat Modal */}
      {showChat && selectedChannel && (
        <Modal
          isOpen={showChat}
          onClose={() => {
            setShowChat(false);
            setSelectedChannel(null);
          }}
          title=""
          size="lg"
        >
          <ChatPanel
            messages={messages.map(msg => ({
              id: msg.id.toString(),
              content: msg.text,
              sender: msg.sender_id === user?.id ? 'user' : 'agent',
              timestamp: new Date(msg.created_at).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })
            }))}
            onSendMessage={handleSendMessage}
            activeUser={{
              name: contacts.find(c => 
                channels.find(ch => 
                  ch.id === selectedChannel
                )?.participants_id.includes(c.id) && c.id !== user?.id
              )?.username || 'Unknown User',
              avatar: contacts.find(c => 
                channels.find(ch => 
                  ch.id === selectedChannel
                )?.participants_id.includes(c.id) && c.id !== user?.id
              )?.profile_picture?.url || `https://ui-avatars.com/api/?name=U&background=random`,
              online: true // TODO: Implement online status
            }}
          />
        </Modal>
      )}
    </div>
  );
};