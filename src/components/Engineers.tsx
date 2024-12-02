import React from 'react';
import { Search } from 'lucide-react';
import { engineers } from '../data';
import { EngineerCard } from './EngineerCard';

export const Engineers: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredEngineers = engineers.filter(engineer => {
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      engineer.name.toLowerCase().includes(searchLower) ||
      engineer.specialty.toLowerCase().includes(searchLower) ||
      engineer.skills.some(skill => skill.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-cyan-400">Engineers</h2>
          <p className="text-gray-400">
            {filteredEngineers.length} engineers available
          </p>
        </div>
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search engineers..."
            className="w-full bg-gray-800 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
      </div>

      {/* Engineers List */}
      <div className="space-y-2">
        {filteredEngineers.map((engineer) => (
          <EngineerCard key={engineer.id} engineer={engineer} />
        ))}
      </div>
    </div>
  );
};