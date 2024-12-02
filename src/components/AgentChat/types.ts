export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: string;
  attachments?: {
    type: 'image' | 'file' | 'voice';
    url: string;
    name?: string;
    duration?: number;
  }[];
}

export interface ChatHistory {
  id: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

export interface CallHistory {
  id: string;
  type: 'standup' | 'briefing' | 'bulletin';
  summary: string;
  timestamp: string;
  transcript: ChatMessage[];
}

export interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'image';
  url: string;
  timestamp: string;
}

export interface Agent {
  name: string;
  avatar: string;
  email: string;
  phone: string;
}