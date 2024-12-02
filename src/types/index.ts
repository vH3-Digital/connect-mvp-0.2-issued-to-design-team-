export interface Agent {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  color: string;
}

export interface Engineer {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  status: 'online' | 'offline' | 'travelling' | 'on-site';
  skills: string[];
  workingHours: {
    days: string[];
    start: string;
    end: string;
  };
  jobs: string[];
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  type: 'sent' | 'received';
  attachments?: {
    type: 'image' | 'file';
    url: string;
    name: string;
  }[];
  voiceNote?: {
    url: string;
    duration: number;
  };
}