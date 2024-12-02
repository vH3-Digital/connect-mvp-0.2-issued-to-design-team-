import React from 'react';
import { EngineerCard } from './EngineerCard';
import { Engineer } from '../../types/engineer';

interface EngineerListProps {
  engineers: Engineer[];
}

export const EngineerList: React.FC<EngineerListProps> = ({ engineers }) => {
  if (engineers.length === 0) {
    return (
      <div className="text-center text-gray-400 py-8">
        No engineers match your criteria
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {engineers.map((engineer) => (
        <EngineerCard key={engineer.id} engineer={engineer} />
      ))}
    </div>
  );
};