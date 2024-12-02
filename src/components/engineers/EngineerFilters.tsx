import React, { useState } from 'react';
import { Filter, ChevronDown, ChevronRight, X } from 'lucide-react';
import { getStatusColor, getStatusText } from '../../utils/engineerStatus';
import { getSkillColor, getCategoryColor } from '../../utils/tagColors';

interface EngineerFiltersProps {
  allSkills: string[];
  allCategories: string[];
  allStatuses: string[];
  selectedSkills: string[];
  selectedCategories: string[];
  selectedStatuses: string[];
  onSkillToggle: (skill: string) => void;
  onCategoryToggle: (category: string) => void;
  onStatusToggle: (status: string) => void;
  onClearFilters: () => void;
}

export const EngineerFilters: React.FC<EngineerFiltersProps> = ({
  allSkills,
  allCategories,
  allStatuses,
  selectedSkills,
  selectedCategories,
  selectedStatuses,
  onSkillToggle,
  onCategoryToggle,
  onStatusToggle,
  onClearFilters
}) => {
  const [expandedSections, setExpandedSections] = useState({
    status: false,
    category: false,
    skills: false
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const hasActiveFilters = selectedSkills.length > 0 || 
    selectedCategories.length > 0 || 
    selectedStatuses.length > 0;

  return (
    <div className="space-y-4">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-400">
          <Filter className="w-4 h-4" />
          <span className="text-sm font-medium">Active Filters</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1 px-2 py-1 text-xs text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-3 h-3" />
            Clear filters
          </button>
        )}
      </div>

      {/* Filter Groups */}
      <div className="space-y-4">
        {/* Status Filter */}
        <div className="bg-gray-800/50 rounded-lg">
          <button
            onClick={() => toggleSection('status')}
            className="w-full px-4 py-3 flex items-center justify-between text-sm font-medium hover:bg-gray-800/50 transition-colors rounded-lg"
          >
            <span className="text-gray-300">Status</span>
            {expandedSections.status ? (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )}
          </button>
          
          {expandedSections.status && (
            <div className="p-4 pt-0">
              <div className="flex flex-wrap gap-2">
                {allStatuses.map(status => (
                  <button
                    key={status}
                    onClick={() => onStatusToggle(status)}
                    className={`px-2 py-1 rounded-lg text-xs transition-all ${
                      selectedStatuses.includes(status)
                        ? getStatusColor(status) + ' ring-1 ring-current'
                        : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                    }`}
                  >
                    {getStatusText(status)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Category Filter */}
        <div className="bg-gray-800/50 rounded-lg">
          <button
            onClick={() => toggleSection('category')}
            className="w-full px-4 py-3 flex items-center justify-between text-sm font-medium hover:bg-gray-800/50 transition-colors rounded-lg"
          >
            <span className="text-gray-300">Category</span>
            {expandedSections.category ? (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )}
          </button>
          
          {expandedSections.category && (
            <div className="p-4 pt-0">
              <div className="flex flex-wrap gap-2">
                {allCategories.map(category => (
                  <button
                    key={category}
                    onClick={() => onCategoryToggle(category)}
                    className={`px-2 py-1 rounded-lg text-xs transition-all ${
                      selectedCategories.includes(category)
                        ? getCategoryColor(category) + ' ring-1 ring-current'
                        : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Skills Filter */}
        <div className="bg-gray-800/50 rounded-lg">
          <button
            onClick={() => toggleSection('skills')}
            className="w-full px-4 py-3 flex items-center justify-between text-sm font-medium hover:bg-gray-800/50 transition-colors rounded-lg"
          >
            <span className="text-gray-300">Skills</span>
            {expandedSections.skills ? (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )}
          </button>
          
          {expandedSections.skills && (
            <div className="p-4 pt-0">
              <div className="flex flex-wrap gap-2">
                {allSkills.map(skill => (
                  <button
                    key={skill}
                    onClick={() => onSkillToggle(skill)}
                    className={`px-2 py-1 rounded-lg text-xs transition-all ${
                      selectedSkills.includes(skill)
                        ? getSkillColor(skill, allSkills) + ' ring-1 ring-current'
                        : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};