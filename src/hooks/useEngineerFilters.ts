import { useState, useMemo } from 'react';
import { Engineer } from '../types/engineer';

export const useEngineerFilters = (engineers: Engineer[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const allSkills = useMemo(() => {
    const skills = new Set<string>();
    engineers.forEach(engineer => {
      engineer.skills.forEach(skill => skills.add(skill));
    });
    return Array.from(skills).sort();
  }, [engineers]);

  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    engineers.forEach(engineer => categories.add(engineer.specialty));
    return Array.from(categories).sort();
  }, [engineers]);

  const allStatuses = ['online', 'on-site', 'travelling', 'offline'];

  const clearFilters = () => {
    setSelectedSkills([]);
    setSelectedCategories([]);
    setSelectedStatuses([]);
  };

  const filteredEngineers = useMemo(() => {
    return engineers.filter(engineer => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = searchQuery === '' || 
        engineer.name.toLowerCase().includes(searchLower) ||
        engineer.specialty.toLowerCase().includes(searchLower) ||
        engineer.location.toLowerCase().includes(searchLower) ||
        engineer.skills.some(skill => skill.toLowerCase().includes(searchLower));

      const matchesSkills = selectedSkills.length === 0 ||
        selectedSkills.every(skill => engineer.skills.includes(skill));

      const matchesCategory = selectedCategories.length === 0 ||
        selectedCategories.includes(engineer.specialty);

      const matchesStatus = selectedStatuses.length === 0 ||
        selectedStatuses.includes(engineer.status);

      return matchesSearch && matchesSkills && matchesCategory && matchesStatus;
    });
  }, [engineers, searchQuery, selectedSkills, selectedCategories, selectedStatuses]);

  return {
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
  };
};