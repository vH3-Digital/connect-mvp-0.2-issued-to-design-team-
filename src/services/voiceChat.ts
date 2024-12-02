import axios from 'axios';

interface VoiceChatSession {
  agentId: string;
  sessionToken: string;
}

const VOICE_CHAT_API_URL = 'https://api.vh3connect.io/api:sLAMGphr/provision_web_agent_session';

export const voiceChatService = {
  getSession: async (agentId: string): Promise<VoiceChatSession> => {
    try {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication required');
      }

      const { data } = await axios.post<VoiceChatSession>(
        VOICE_CHAT_API_URL,
        { agent_id: agentId },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );

      if (!data.agentId || !data.sessionToken) {
        throw new Error('Invalid session response');
      }

      return data;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Failed to initialize voice chat';
      console.error('Voice chat session error:', message);
      throw new Error(message);
    }
  }
};