export interface SalesOpportunity {
  quote_ref?: string;
  created_date?: string;
  Customer?: string;
  title?: string;
  value_inc_vat: number;
  costs?: number;
  profit?: number;
  lead_source?: string;
  department?: string;
  outcome?: string;
  issued_by?: string;
  [key: string]: any; // Allow for dynamic fields
}

export interface SalesTotals {
  number_of_deals: number;
  total_value_of_deals: number;
  total_cost_of_deals: number;
  total_profit_of_deals: number;
  [key: string]: any; // Allow for dynamic fields
}

export interface SalesData {
  related_sales_opportunities: SalesOpportunity[];
  review_of_sales_data?: string;
  totals: SalesTotals;
  [key: string]: any; // Allow for dynamic fields
}