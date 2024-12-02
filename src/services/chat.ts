import axios from 'axios';
import { Chat, Message, ChatRefreshResponse, Contact } from '../types/chat';

const CHAT_API_URL = 'https://api.vh3connect.io/api:-2bubRTp';

const chatApi = axios.create({
  baseURL: CHAT_API_URL,
  headers: {
    'Accept': 'application/json'
  }
});

chatApi.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('authToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

chatApi.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', {
      url: response.config.url,
      status: response.status
    });
    return response;
  },
  (error) => {
    console.error('❌ API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      details: error.response?.data
    });
    throw error;
  }
);

export const chatService = {
  getChats: async (userId: number): Promise<Chat[]> => {
    console.log('📡 Fetching user chats:', { userId });
    try {
      const { data } = await chatApi.get<Chat[]>('/chats', {
        params: {
          'user_id[]': userId
        }
      });
      console.log('✨ Chats fetched:', { count: data?.length || 0 });
      return data || [];
    } catch (error: any) {
      if (error.response?.status === 404) {
        // No chats found is a valid state
        return [];
      }
      const errorMessage = error?.response?.data?.message || 'Failed to fetch chats';
      console.error('Failed to fetch chats:', {
        error: error?.response?.data || error?.message
      });
      throw new Error(errorMessage);
    }
  },

  getContacts: async (): Promise<Contact[]> => {
    console.log('📡 Fetching contacts');
    try {
      const { data } = await chatApi.get<Contact[]>('/contacts');
      console.log('✨ Contacts fetched:', { count: data?.length || 0 });
      return data || [];
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Failed to fetch contacts';
      console.error('Failed to fetch contacts:', {
        error: error?.response?.data || error?.message
      });
      throw new Error(errorMessage);
    }
  },

  refreshData: async (channelId?: string): Promise<ChatRefreshResponse> => {
    console.log('📡 Refreshing chat data:', { channelId });
    try {
      const { data } = await chatApi.get<ChatRefreshResponse>('/refresh_data', {
        params: {
          channel_id: channelId || undefined
        }
      });
      console.log('✨ Chat data refreshed');
      return data;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Failed to refresh chat data';
      console.error('Failed to refresh chat data:', {
        error: error?.response?.data || error?.message
      });
      throw new Error(errorMessage);
    }
  },

  sendMessage: async (channelId: string, text: string): Promise<Message> => {
    console.log('📤 Sending message:', { channelId });
    try {
      if (!text.trim()) {
        throw new Error('Message cannot be empty');
      }

      const { data } = await chatApi.post<Message>('/send_message', {
        channel_id: channelId,
        message: text.trim()
      });
      console.log('📨 Message sent:', { id: data.id });
      return data;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Failed to send message';
      console.error('Failed to send message:', {
        error: error?.response?.data || error?.message
      });
      throw new Error(errorMessage);
    }
  },

  createNewChat: async (participants: number[]): Promise<Chat> => {
    console.log('🔨 Creating new chat:', { participants });
    try {
      if (!participants?.length) {
        throw new Error('At least one participant is required');
      }

      // Create FormData with properly formatted participants array
      const formData = new FormData();
      participants.forEach((id, index) => {
        formData.append(`participants[${index}]`, id.toString());
      });

      const { data } = await chatApi.post<Chat>('/new_chat', formData);
      console.log('✨ Chat created:', { id: data.id });
      return data;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Failed to create chat';
      console.error('Failed to create chat:', {
        error: error?.response?.data || error?.message
      });
      throw new Error(errorMessage);
    }
  }
};