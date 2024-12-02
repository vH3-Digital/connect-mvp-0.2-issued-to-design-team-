import { useState, useEffect } from 'react';
import { salesService } from '../services/sales';
import { SalesData } from '../types/sales';
import { calculateDateRange } from '../utils/dateUtils';

export const useSalesData = (selectedRange: string) => {
  const [data, setData] = useState<SalesData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const { fromDate, toDate } = calculateDateRange(selectedRange);
        const response = await salesService.getSalesReport(fromDate, toDate);
        setData(response);
      } catch (err: any) {
        console.error('Failed to fetch sales data:', err);
        setError(err.message || 'Failed to load sales data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedRange]);

  return { data, loading, error };
};