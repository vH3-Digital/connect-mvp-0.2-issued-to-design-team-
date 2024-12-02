export const engineers = [
  {
    name: 'John Smith',
    specialty: 'HVAC',
    id: 'ENG-001',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    email: 'john.smith@vh3connect.io',
    phone: '+44 7700 900123',
    location: 'London, UK',
    status: 'online',
    workingHours: {
      start: '09:00',
      end: '17:30',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    },
    skills: ['Installation', 'System Maintenance', 'Balancing', "IPAF"]
  },
  {
    name: 'Emily Brown',
    specialty: 'Electrical',
    id: 'ENG-002',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop',
    email: 'emily.brown@vh3connect.io',
    phone: '+44 7700 900456',
    location: 'Manchester, UK',
    status: 'on-site',
    workingHours: {
      start: '08:00',
      end: '16:30',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    },
    skills: ['Electrical Systems', 'PAT Tester', 'Safety Standards']
  },
  {
    name: 'Michael Johnson',
    specialty: 'Plumbing',
    id: 'ENG-003',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    email: 'michael.johnson@vh3connect.io',
    phone: '+44 7700 900789',
    location: 'Birmingham, UK',
    status: 'travelling',
    workingHours: {
      start: '07:30',
      end: '16:00',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    },
    skills: ['Plumbing Systems', 'Maintenance', 'Emergency Repairs']
  }
];

export const messages = [
  {
    id: '1',
    sender: 'Emily Brown',
    preview: 'Good idea! I\'ll schedule a c...',
    category: 'Design',
    status: 'read',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop'
  },
  {
    id: '2',
    sender: 'John Smith',
    preview: 'Latest updates on Project...',
    category: 'Design',
    status: 'unread',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop'
  },
  {
    id: '3',
    sender: 'Michael Johnson',
    preview: 'Feedback received for Pro...',
    category: 'Design',
    status: 'unread',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop'
  }
];