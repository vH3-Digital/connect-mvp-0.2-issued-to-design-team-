export const getStatusColor = (status: string) => {
  switch (status) {
    case 'online': return 'bg-green-400/20 text-green-400';
    case 'on-site': return 'bg-yellow-400/20 text-yellow-400';
    case 'travelling': return 'bg-blue-400/20 text-blue-400';
    default: return 'bg-gray-400/20 text-gray-400';
  }
};

export const getStatusText = (status: string) => {
  switch (status) {
    case 'online': return 'Online';
    case 'on-site': return 'On Site';
    case 'travelling': return 'Travelling';
    default: return 'Offline';
  }
};