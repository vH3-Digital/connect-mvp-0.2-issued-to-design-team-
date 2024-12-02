import axios from 'axios';

export interface DashboardStats {
  total_calls: number;
  tokens: number;
  customer_feedback_calls: number;
  knowledge_base_items: string;
  agent_call_time: number;
  reschedules_handled: number;
}

const DASHBOARD_API_URL = 'https://api.vh3connect.io/api:KD8DhY1m/dashboards';

export const dashboardService = {
  getStats: async (dashboardId: string = 'default'): Promise<DashboardStats> => {
    try {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication required');
      }

      const { data } = await axios.get<DashboardStats>(
        `${DASHBOARD_API_URL}/${dashboardId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        }
      );

      return data;
    } catch (error: any) {
      console.error('Failed to fetch dashboard stats:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch dashboard stats');
    }
  }
};