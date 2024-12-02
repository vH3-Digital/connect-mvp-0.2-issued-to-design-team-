import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useChat } from '../hooks/useChat';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { ChatList } from './ChatList';
import { LoadingScreen } from './LoadingScreen';
import { NewChatModal } from './NewChatModal';
import { Plus } from 'lucide-react';

export const Chats: React.FC = () => {
  const { user } = useAuth();
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [showNewChat, setShowNewChat] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const {
    loading,
    channels,
    messages,
    contacts,
    sendMessage,
    refreshData,
    createNewChat
  } = useChat(selectedChannel);

  // Sort channels by most recent message
  const sortedChannels = [...(channels || [])].sort((a, b) => {
    const timeA = a.created_at || 0;
    const timeB = b.created_at || 0;
    return timeB - timeA;
  });

  const handleSendMessage = async (text: string) => {
    if (!selectedChannel) return;
    try {
      setError(null);
      await sendMessage(text);
      await refreshData();
    } catch (err: any) {
      setError(err.message);
      console.error('Failed to send message:', err);
    }
  };

  const handleCreateChat = async (data: { participants: number[] }) => {
    try {
      setError(null);
      if (!data.participants.length) {
        throw new Error('Please select at least one participant');
      }

      const newChannel = await createNewChat(data.participants);
      setSelectedChannel(newChannel.id);
      await refreshData(newChannel.id);
      setShowNewChat(false);
    } catch (err: any) {
      setError(err.message);
      console.error('Failed to create chat:', err);
    }
  };

  // Handle channel selection
  useEffect(() => {
    if (selectedChannel) {
      refreshData();
    }
  }, [selectedChannel, refreshData]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Please sign in to access chats</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full bg-gray-900">
      <div className="w-80 border-r border-gray-800 flex flex-col">
        {/* New Chat Button */}
        <div className="p-4">
          <button
            onClick={() => setShowNewChat(true)}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg px-4 py-2 flex items-center justify-center gap-2 hover:from-cyan-600 hover:to-blue-600 transition-all"
          >
            <Plus className="w-5 h-5" />
            New Chat
          </button>
        </div>

        {/* Chat List */}
        <ChatList
          chats={sortedChannels}
          selectedChatId={selectedChannel}
          onSelectChat={setSelectedChannel}
        />
      </div>
      
      <div className="flex-1 flex flex-col">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 m-4 p-4 rounded-lg text-red-400">
            {error}
          </div>
        )}
        
        {selectedChannel ? (
          <>
            <div className="flex-1 overflow-y-auto p-4">
              <MessageList
                messages={messages}
                currentUserId={user.id}
                contacts={contacts}
              />
            </div>
            <MessageInput onSendMessage={handleSendMessage} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Select a chat to start messaging
          </div>
        )}
      </div>

      <NewChatModal
        isOpen={showNewChat}
        onClose={() => setShowNewChat(false)}
        onCreateChat={handleCreateChat}
        contacts={contacts}
      />
    </div>
  );
};