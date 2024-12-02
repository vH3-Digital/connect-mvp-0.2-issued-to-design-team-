import axios from 'axios';
import { Job } from '../types/jobs';

const JOBS_API_URL = 'https://api.vh3connect.io/api:e6J0tYOV/jobs/get';

export const jobsApi = {
  getJobs: async (): Promise<Job[]> => {
    try {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication required');
      }

      const { data } = await axios.get<Job[]>(JOBS_API_URL, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      return data;
    } catch (error: any) {
      console.error('Failed to fetch jobs:', error);
      throw new Error(error.response?.data?.message || 'Failed to load jobs');
    }
  }
};