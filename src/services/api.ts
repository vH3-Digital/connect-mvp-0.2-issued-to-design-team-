import axios from 'axios';

// Create base API instance
const createAPI = (baseURL: string) => {
  const instance = axios.create({
    baseURL,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });

  // Request interceptor for auth token
  instance.interceptors.request.use(
    (config) => {
      const token = sessionStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      console.log('🚀 Making API request:', {
        url: config.url,
        method: config.method,
        headers: config.headers
      });
      return config;
    },
    (error) => {
      console.error('❌ Request error:', error);
      return Promise.reject(error);
    }
  );

  // Response interceptor for logging
  instance.interceptors.response.use(
    (response) => {
      console.log('✅ API Response:', {
        url: response.config.url,
        status: response.status,
        data: response.data
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
      return Promise.reject(error);
    }
  );

  return instance;
};

// Create engineers API instance
export const engineersApi = createAPI('https://api.vh3connect.io/api:_bvbfpgN');

export default {
  create: createAPI
};