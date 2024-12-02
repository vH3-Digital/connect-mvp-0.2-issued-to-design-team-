import axios, { AxiosError } from 'axios';
import { User } from '../types/auth';

const API_BASE = 'https://api.vh3connect.io/api:G6skVfcT';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

api.interceptors.response.use(
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
    throw error;
  }
);

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

const formatCredentials = (email: string, password: string) => {
  const formattedEmail = email.trim().toLowerCase();

  if (!formattedEmail) {
    throw new AuthError('Email is required');
  }

  if (!password) {
    throw new AuthError('Password is required');
  }

  if (!formattedEmail.includes('@')) {
    throw new AuthError('Invalid email format');
  }

  return {
    email: formattedEmail,
    password
  };
};

const handleAuthError = (error: unknown): never => {
  if (error instanceof AuthError) {
    throw error;
  }

  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    switch (status) {
      case 403:
        throw new AuthError('Invalid email or password');
      
      case 401:
        sessionStorage.removeItem('authToken');
        throw new AuthError('Your session has expired. Please log in again.');
      
      case 404:
        throw new AuthError('Service not available. Please try again later.');
      
      case 429:
        throw new AuthError('Too many attempts. Please try again later.');
      
      case 500:
        throw new AuthError('An unexpected error occurred. Please try again later.');
      
      default:
        throw new AuthError(message || 'Authentication failed. Please try again.');
    }
  }

  throw new AuthError('An unexpected error occurred. Please try again later.');
};

interface AuthResponse {
  authToken: string;
  user?: User;
}

export const auth = {
  login: async (email: string, password: string): Promise<User> => {
    try {
      const credentials = formatCredentials(email, password);
      console.log('🔑 Logging in:', { email: credentials.email });
      
      const { data } = await api.post<AuthResponse>('/auth/login', credentials);
      
      if (!data.authToken) {
        throw new AuthError('Invalid response from server');
      }

      sessionStorage.setItem('authToken', data.authToken);
      console.log('✅ Login successful');

      const userData = await auth.me();
      return userData;
    } catch (error) {
      handleAuthError(error);
    }
  },

  signup: async (firstName: string, lastName: string, email: string, password: string, phone: string): Promise<User> => {
    try {
      const { email: formattedEmail } = formatCredentials(email, password);
      
      if (!firstName.trim()) {
        throw new AuthError('First name is required');
      }

      if (!lastName.trim()) {
        throw new AuthError('Last name is required');
      }

      if (!phone.trim()) {
        throw new AuthError('Phone number is required');
      }

      // Format phone number to match required format
      const formattedPhone = phone.trim().replace(/^0+/, ''); // Remove leading zeros
      if (!/^44\d{10}$/.test(formattedPhone)) {
        throw new AuthError('Phone number must be in format: 447808648469');
      }

      console.log('📝 Signing up:', { 
        email: formattedEmail,
        phone: formattedPhone,
        firstName,
        lastName
      });

      const credentials = {
        username: `${firstName.trim()} ${lastName.trim()}`,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: formattedEmail,
        password,
        phone: formattedPhone
      };

      const { data } = await api.post<AuthResponse>('/auth/signup', credentials);

      if (!data.authToken) {
        throw new AuthError('Invalid response from server');
      }

      sessionStorage.setItem('authToken', data.authToken);
      console.log('✅ Signup successful');

      const userData = await auth.me();
      return userData;
    } catch (error) {
      handleAuthError(error);
    }
  },

  me: async (): Promise<User> => {
    try {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        throw new AuthError('No authentication token found');
      }

      const { data } = await api.get<User>('/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return data;
    } catch (error) {
      handleAuthError(error);
    }
  },

  logout: () => {
    sessionStorage.removeItem('authToken');
  },

  isAuthenticated: (): boolean => {
    return !!sessionStorage.getItem('authToken');
  }
};