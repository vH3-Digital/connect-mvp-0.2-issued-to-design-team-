import axios from 'axios';
import { SalesData } from '../types/sales';

const SALES_API_URL = 'https://api.vh3connect.io/api:DKc4u9D7/sales_stats';

export const salesService = {
  getSalesReport: async (fromDate: string, toDate: string): Promise<SalesData> => {
    try {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication required');
      }

      const { data } = await axios.post<SalesData>(
        SALES_API_URL,
        {
          FromDate: fromDate,
          ToDate: toDate
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );

      return data;
    } catch (error: any) {
      console.error('Sales API Error:', error.response?.data || error);
      throw new Error(error.response?.data?.message || 'Failed to fetch sales data');
    }
  }
};