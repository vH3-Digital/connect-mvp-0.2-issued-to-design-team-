import React from 'react';
import { EngineerCard } from './engineers/EngineerCard';
import { EngineerFilters } from './engineers/EngineerFilters';
import { EngineerSearch } from './engineers/EngineerSearch';
import { useEngineerFilters } from '../hooks/useEngineerFilters';
import { engineers } from '../data';

export const Resources: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedSkills,
    setSelectedSkills,
    selectedCategories,
    setSelectedCategories,
    selectedStatuses,
    setSelectedStatuses,
    allSkills,
    allCategories,
    allStatuses,
    filteredEngineers,
    clearFilters
  } = useEngineerFilters(engineers);

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleStatusToggle = (status: string) => {
    setSelectedStatuses(prev =>
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-cyan-400">Resources</h2>
          <p className="text-gray-400">
            {filteredEngineers.length} engineers available
          </p>
        </div>
        <EngineerSearch 
          value={searchQuery}
          onChange={setSearchQuery}
        />
      </div>

      {/* Filters */}
      <EngineerFilters
        allSkills={allSkills}
        allCategories={allCategories}
        allStatuses={allStatuses}
        selectedSkills={selectedSkills}
        selectedCategories={selectedCategories}
        selectedStatuses={selectedStatuses}
        onSkillToggle={handleSkillToggle}
        onCategoryToggle={handleCategoryToggle}
        onStatusToggle={handleStatusToggle}
        onClearFilters={clearFilters}
      />

      {/* Engineer List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEngineers.map((engineer) => (
          <EngineerCard 
            key={engineer.id} 
            engineer={{
              ...engineer,
              engineerId: engineer.id,
              status: engineer.status || 'offline'
            }} 
          />
        ))}
      </div>
    </div>
  );
};