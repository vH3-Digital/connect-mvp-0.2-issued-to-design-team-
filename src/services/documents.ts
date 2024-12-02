import axios from 'axios';

const DOCUMENTS_API_URL = {
  list: 'https://api.vh3connect.io/api:kPLLaYE-/all_documents',
  single: 'https://api.vh3connect.io/api:kPLLaYE-/docs',
  upload: 'https://api.vh3connect.io/api:kPLLaYE-/files/upload_kb'
};

export interface Document {
  id: string;
  created_at: number;
  name: string;
  category: string;
  description: string;
  key_points: string;
  user_id: number;
  company_id: string | null;
  doc_id: string;
  encoded_file: string;
}

export const documentsApi = {
  getDocument: async (documentId: string): Promise<Document> => {
    try {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication required');
      }

      const { data } = await axios.get<Document>(`${DOCUMENTS_API_URL.single}/${documentId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (!data) {
        throw new Error('No document data received');
      }

      return data;
    } catch (error: any) {
      console.error('API Error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to load document');
    }
  },

  listDocuments: async (): Promise<Document[]> => {
    try {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication required');
      }

      const { data } = await axios.get<Document[]>(DOCUMENTS_API_URL.list, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      return data;
    } catch (error: any) {
      console.error('API Error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to fetch documents');
    }
  },

  upload: async (file: File): Promise<Document> => {
    try {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication required');
      }

      // Validate file
      if (!file) {
        throw new Error('No file provided');
      }

      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        throw new Error('File size must be less than 10MB');
      }

      if (file.type !== 'application/pdf') {
        throw new Error('Only PDF files are supported');
      }

      const formData = new FormData();
      formData.append('pdf', file, file.name);

      const { data } = await axios.post<Document>(
        DOCUMENTS_API_URL.upload,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            // Let browser set the correct Content-Type with boundary
            'Content-Type': undefined
          },
          // Add timeout and show upload progress
          timeout: 30000,
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
            console.log(`Upload progress: ${percentCompleted}%`);
          }
        }
      );

      if (!data) {
        throw new Error('No response received from server');
      }

      return data;
    } catch (error: any) {
      console.error('Upload Error:', error.response?.data || error.message);
      
      // Enhanced error handling
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.response?.status === 413) {
        throw new Error('File size too large');
      } else if (error.response?.status === 415) {
        throw new Error('File type not supported');
      } else if (error.response?.status === 400) {
        throw new Error('Invalid file or request');
      } else if (error.code === 'ECONNABORTED') {
        throw new Error('Upload timed out. Please try again.');
      }
      
      throw new Error('Failed to upload document. Please try again.');
    }
  }
};