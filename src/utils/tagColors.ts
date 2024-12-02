// Predefined color combinations for tags
export const tagColors = {
  status: {
    'online': 'bg-green-400/20 text-green-400',
    'on-site': 'bg-yellow-400/20 text-yellow-400',
    'travelling': 'bg-blue-400/20 text-blue-400',
    'offline': 'bg-gray-400/20 text-gray-400'
  },
  category: {
    'Electrical': 'bg-purple-400/20 text-purple-400',
    'HVAC': 'bg-cyan-400/20 text-cyan-400',
    'Plumbing': 'bg-pink-400/20 text-pink-400'
  },
  skills: [
    'bg-emerald-400/20 text-emerald-400',
    'bg-blue-400/20 text-blue-400',
    'bg-purple-400/20 text-purple-400',
    'bg-pink-400/20 text-pink-400',
    'bg-cyan-400/20 text-cyan-400',
    'bg-indigo-400/20 text-indigo-400',
    'bg-rose-400/20 text-rose-400',
    'bg-teal-400/20 text-teal-400',
    'bg-violet-400/20 text-violet-400',
    'bg-sky-400/20 text-sky-400'
  ]
};

// Get color for skill based on its index
export const getSkillColor = (skill: string, allSkills: string[]) => {
  const index = allSkills.indexOf(skill);
  return tagColors.skills[index % tagColors.skills.length];
};

// Get color for category
export const getCategoryColor = (category: string) => {
  return tagColors.category[category] || 'bg-gray-400/20 text-gray-400';
};

// Get color for status
export const getStatusColor = (status: string) => {
  return tagColors.status[status] || 'bg-gray-400/20 text-gray-400';
};