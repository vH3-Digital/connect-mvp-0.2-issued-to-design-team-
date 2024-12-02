import axios from 'axios';
import { Agent } from '../types/agents';

const AGENTS_API_URL = 'https://api.vh3connect.io/api:i4c4T6bH/agents';

export const agentsApi = {
  getAgents: async (): Promise<Agent[]> => {
    try {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication required');
      }

      const { data } = await axios.get<Agent[]>(AGENTS_API_URL, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      return data;
    } catch (error: any) {
      console.error('Failed to fetch agents:', error);
      throw new Error(error.response?.data?.message || 'Failed to load agents');
    }
  }
};