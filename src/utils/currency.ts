export const formatCurrency = (value?: number) => {
  if (typeof value !== 'number') return '£0.00';
  return `£${value.toLocaleString('en-GB', { 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 
  })}`;
};