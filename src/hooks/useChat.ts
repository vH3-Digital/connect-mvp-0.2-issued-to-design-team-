import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { chatService } from '../services/chat';
import { Chat, Message, Contact } from '../types/chat';

export const useChat = (channelId?: string) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [channels, setChannels] = useState<Chat[]>([]);
  const [currentChannel, setCurrentChannel] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);

  // Load initial chats and contacts
  const loadChats = useCallback(async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // Load chats and contacts in parallel
      const [userChats, contactsList] = await Promise.all([
        chatService.getChats(user.id),
        chatService.getContacts()
      ]);
      
      setChannels(userChats);
      setContacts(contactsList);
      setLoading(false);
    } catch (err: any) {
      console.error('Failed to load chats:', err);
      setError(err.message);
      setLoading(false);
    }
  }, [user?.id]);

  // Refresh chat data
  const refreshData = useCallback(async () => {
    if (!user) return;

    try {
      console.log('🔄 Refreshing chat data', { channelId });
      setError(null);
      const data = await chatService.refreshData(channelId);

      // Update channels list from updates
      if (data.updates?.length) {
        const updatedChannels = data.updates.map(update => update._channel_info);
        setChannels(prev => {
          // Merge updated channels with existing ones
          const channelMap = new Map(prev.map(c => [c.id, c]));
          updatedChannels.forEach(c => channelMap.set(c.id, c));
          return Array.from(channelMap.values());
        });
      }

      // Update current channel and messages if available
      if (data.current_channel?.channel_info) {
        setCurrentChannel(data.current_channel.channel_info._channel_info);
        
        // Flatten messages from all dates and sort by creation time
        const allMessages = data.current_channel.messages.flatMap(
          dateGroup => dateGroup.messages
        ).sort((a, b) => a.created_at - b.created_at);
        
        setMessages(allMessages);
      }

      // Update contacts list if provided
      if (data.contact_list?.length) {
        setContacts(data.contact_list);
      }

      console.log('✨ Chat data updated');
    } catch (err: any) {
      console.error('Failed to refresh chat:', err);
      setError(err.message);
    }
  }, [channelId, user]);

  const sendMessage = async (text: string) => {
    if (!user || !channelId) return;

    try {
      console.log('📝 Sending message');
      setError(null);
      const newMessage = await chatService.sendMessage(channelId, text);
      
      // Optimistically add message to the list
      setMessages(prev => [...prev, newMessage]);
      
      // Refresh to get any updates
      await refreshData();
      console.log('✨ Message sent and chat refreshed');
      
      return newMessage;
    } catch (err: any) {
      console.error('Failed to send message:', err);
      setError(err.message);
      throw err;
    }
  };

  const createNewChat = async (params: {
    name: string;
    description: string;
    participants: number[];
    groupImage?: File;
  }) => {
    if (!user) return;

    try {
      console.log('🔨 Creating new chat');
      setError(null);
      const newChannel = await chatService.createNewChat(params);
      
      // Refresh chat list to include the new chat
      await loadChats();
      
      console.log('✨ New chat created');
      return newChannel;
    } catch (err: any) {
      console.error('Failed to create chat:', err);
      setError(err.message);
      throw err;
    }
  };

  // Initial load
  useEffect(() => {
    loadChats();
  }, [loadChats]);

  // Set up periodic refresh
  useEffect(() => {
    if (!user) return;

    console.log('⏰ Setting up refresh interval');
    const interval = setInterval(() => {
      refreshData();
    }, 30000);

    return () => {
      console.log('🧹 Cleaning up refresh interval');
      clearInterval(interval);
    };
  }, [user, refreshData]);

  return {
    loading,
    error,
    channels,
    currentChannel,
    messages,
    contacts,
    refreshData,
    sendMessage,
    createNewChat,
    loadChats
  };
};