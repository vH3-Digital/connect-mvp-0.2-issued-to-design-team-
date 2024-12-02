import React from 'react';

interface ContextInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const ContextInput: React.FC<ContextInputProps> = ({ value, onChange }) => {
  return (
    <div className="card">
      <label className="block text-sm font-medium text-gray-400 mb-2">
        Additional Context
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 h-24 resize-none"
        placeholder="Enter additional context for analysis..."
      />
    </div>
  );
};