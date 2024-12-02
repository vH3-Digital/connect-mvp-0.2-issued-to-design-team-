import { ChatHistory, CallHistory, Document } from './types';

export const mockChatHistory: ChatHistory[] = [
  {
    id: '1',
    lastMessage: "I will help you prepare for tomorrow's installations.",
    timestamp: '2024-03-20 14:30',
    unread: true
  },
  {
    id: '2',
    lastMessage: "I will check the manual.",  // Fixed the apostrophe
    timestamp: '2024-03-19 11:20',
    unread: false
  },
  {
    id: '3',
    lastMessage: "I have analyzed the maintenance schedule.",
    timestamp: '2024-03-18 09:45',
    unread: false
  }
];

export const mockCallHistory: CallHistory[] = [
  {
    id: '1',
    type: 'standup',
    summary: 'Daily standup covering 3 installations and 2 maintenance jobs',
    timestamp: '2024-03-20 09:00',
    transcript: []
  },
  {
    id: '2',
    type: 'briefing',
    summary: 'Pre-job briefing for HVAC installation at 123 Main St',
    timestamp: '2024-03-19 14:15',
    transcript: []
  },
  {
    id: '3',
    type: 'bulletin',
    summary: 'Technical bulletin review: Updated safety protocols',
    timestamp: '2024-03-18 11:30',
    transcript: []
  }
];

export const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'HVAC Installation Guide v2',
    type: 'pdf',
    url: '#',
    timestamp: '2024-03-20'
  },
  {
    id: '2',
    name: 'Safety Protocol Update',
    type: 'doc',
    url: '#',
    timestamp: '2024-03-19'
  },
  {
    id: '3',
    name: 'Site Survey Report',
    type: 'pdf',
    url: '#',
    timestamp: '2024-03-18'
  }
];