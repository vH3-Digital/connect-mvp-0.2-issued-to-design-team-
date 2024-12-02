export interface Engineer {
  id: string;
  name: string;
  engineerId: string;
  specialty: string;
  status: 'online' | 'on-site' | 'travelling' | 'offline';
  avatar: string;
  email: string;
  phone: string;
  location: string;
  workingHours: {
    start: string;
    end: string;
    days: string[];
  };
  skills: string[];
}