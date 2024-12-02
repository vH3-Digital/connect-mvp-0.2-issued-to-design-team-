import React from 'react';
import { Search } from 'lucide-react';

interface EngineerSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const EngineerSearch: React.FC<EngineerSearchProps> = ({ value, onChange }) => {
  return (
    <div className="relative max-w-md w-full">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search engineers..."
        className="w-full bg-gray-800 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />
    </div>
  );
};