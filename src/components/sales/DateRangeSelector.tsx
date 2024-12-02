import React from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

interface DateRangeSelectorProps {
  selectedRange: string;
  onRangeChange: (range: string) => void;
}

const dateRanges = [
  { label: 'Today', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'This Week', value: 'this_week' },
  { label: 'This Month', value: 'this_month' },
  { label: 'Last Month', value: 'last_month' },
  { label: 'This Quarter', value: 'this_quarter' },
  { label: 'This Year', value: 'this_year' },
  { label: 'Last Quarter', value: 'last_quarter' },
  { label: 'Last Year', value: 'last_year' }
];

export const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({
  selectedRange,
  onRangeChange
}) => {
  return (
    <div className="relative">
      <select
        value={selectedRange}
        onChange={(e) => onRangeChange(e.target.value)}
        className="bg-gray-800 text-white rounded-lg pl-10 pr-10 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
      >
        {dateRanges.map(range => (
          <option key={range.value} value={range.value}>
            {range.label}
          </option>
        ))}
      </select>
      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
    </div>
  );
};