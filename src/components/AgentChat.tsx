import React, { useState, useRef } from 'react';
import { Modal } from './Modal';
import { DocumentViewer } from './DocumentViewer';
import { Send, Paperclip, Mic, Image as ImageIcon, X, StopCircle, Clock, Users, FileText } from 'lucide-react';

interface AgentChatProps {
  isOpen: boolean;
  onClose: () => void;
  agent: {
    name: string;
    avatar: string;
    email: string;
    phone: string;
  };
}

interface ChatHistory {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
}

interface CallHistory {
  id: string;
  title: string;
  summary: string;
  timestamp: string;
  transcript: Message[];
}

interface Document {
  id: string;
  title: string;
  type: 'pdf' | 'image' | 'spreadsheet';
  url: string;
  sharedAt: string;
  category: string;
}

// Mock data
const mockChatHistory: ChatHistory[] = [
  {
    id: '1',
    title: 'Previous Chat 1',
    lastMessage: 'Thanks for the help!',
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    title: 'Previous Chat 2',
    lastMessage: 'I will check the manual.',  // Fixed apostrophe
    timestamp: '1 day ago'
  }
];

const mockCallHistory: CallHistory[] = [
  {
    id: '1',
    title: 'Morning Standup',
    summary: 'Discussed daily tasks and priorities',
    timestamp: '9:00 AM',
    transcript: [
      {
        id: '1',
        content: 'Good morning team!',
        sender: 'agent',
        timestamp: '9:00 AM'
      }
    ]
  },
  {
    id: '2',
    title: 'Job Briefing',
    summary: 'HVAC installation preparation',
    timestamp: '10:30 AM',
    transcript: [
      {
        id: '1',
        content: 'Let us go over the installation details.',
        sender: 'agent',
        timestamp: '10:30 AM'
      }
    ]
  }
];

const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Installation Guide.pdf',
    type: 'pdf',
    url: 'https://example.com/guide.pdf',
    sharedAt: '1 hour ago',
    category: 'Technical'
  },
  {
    id: '2',
    title: 'System Diagram.jpg',
    type: 'image',
    url: 'https://example.com/diagram.jpg',
    sharedAt: '2 hours ago',
    category: 'Documentation'
  }
];

interface Message {
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

export const AgentChat: React.FC<AgentChatProps> = ({
  isOpen,
  onClose,
  agent,
}) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hi! I am ${agent.name}. How can I help you today?`,
      sender: 'agent',
      timestamp: '10:00'
    }
  ]);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const recordingTimerRef = useRef<number>();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    // Simulate agent response
    setTimeout(() => {
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: 'I understand your request. Let me help you with that...',
        sender: 'agent',
        timestamp: new Date().toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
      };
      setMessages(prev => [...prev, agentResponse]);
    }, 1000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'file' | 'image') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const newMessage: Message = {
        id: Date.now().toString(),
        content: '',
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        attachments: [{
          type,
          url: reader.result as string,
          name: file.name
        }]
      };
      setMessages(prev => [...prev, newMessage]);
    };
    reader.readAsDataURL(file);

    // Reset the input value to allow uploading the same file again
    e.target.value = '';
  };

  const startRecording = () => {
    recordingTimerRef.current = window.setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
    }
    setIsRecording(false);
    
    const newMessage: Message = {
      id: Date.now().toString(),
      content: '',
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      attachments: [{
        type: 'voice',
        url: '#',
        name: `Voice message (${Math.floor(recordingTime / 60)}:${(recordingTime % 60).toString().padStart(2, '0')})`,
        duration: recordingTime
      }]
    };
    setMessages(prev => [...prev, newMessage]);
    setRecordingTime(0);
  };

  const loadChat = (chat: ChatHistory) => {
    setMessages([{
      id: '1',
      content: chat.lastMessage,
      sender: 'agent',
      timestamp: chat.timestamp
    }]);
  };

  const loadCall = (call: CallHistory) => {
    setMessages(call.transcript);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" size="lg">
      <div className="flex h-[80vh]">
        {/* Chat Section */}
        <div className="w-2/3 flex flex-col border-r border-gray-800">
          {/* Chat Header */}
          <div className="flex items-center space-x-4 p-4 border-b border-gray-800">
            <div className="relative">
              <img
                src={agent.avatar}
                alt={agent.name}
                className="w-12 h-12 rounded-full"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-gray-900 rounded-full" />
            </div>
            <div>
              <h3 className="font-medium text-lg">{agent.name}</h3>
              <p className="text-sm text-cyan-400">Online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.sender === 'user'
                      ? 'bg-cyan-500/20 text-cyan-50'
                      : 'bg-gray-700 text-gray-100'
                  }`}
                >
                  {msg.attachments?.map((attachment, index) => (
                    <div key={index} className="mb-2">
                      {attachment.type === 'image' && (
                        <img
                          src={attachment.url}
                          alt="Attachment"
                          className="rounded-lg max-w-full"
                        />
                      )}
                      {attachment.type === 'file' && (
                        <div className="flex items-center gap-2 bg-gray-800 p-2 rounded-lg">
                          <Paperclip className="w-4 h-4" />
                          <span className="text-sm truncate">{attachment.name}</span>
                        </div>
                      )}
                      {attachment.type === 'voice' && (
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-8 bg-gray-800 rounded-full relative overflow-hidden">
                            <div className="absolute inset-0 bg-cyan-500/20" style={{ width: '100%' }} />
                          </div>
                          <span className="text-xs">{attachment.name}</span>
                        </div>
                      )}
                    </div>
                  ))}
                  {msg.content && <p className="text-sm">{msg.content}</p>}
                  <span className="text-xs text-gray-400 mt-1 block">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-800">
            <div className="relative flex items-center gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-gray-800 text-white rounded-full px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                disabled={isRecording}
              />

              <div className="flex items-center gap-2">
                {isRecording ? (
                  <button
                    type="button"
                    onClick={stopRecording}
                    className="p-2 text-red-400 hover:text-red-300 animate-pulse"
                  >
                    <StopCircle className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={startRecording}
                    className="p-2 text-gray-400 hover:text-white"
                  >
                    <Mic className="w-5 h-5" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  className="p-2 text-gray-400 hover:text-white"
                >
                  <ImageIcon className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-gray-400 hover:text-white"
                >
                  <Paperclip className="w-5 h-5" />
                </button>

                <button
                  type="submit"
                  className="p-2 text-cyan-400 hover:text-cyan-300"
                  disabled={isRecording}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>

            {isRecording && (
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-800 px-4 py-2 rounded-full flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-sm">Recording {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}</span>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={(e) => handleFileUpload(e, 'file')}
            />
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload(e, 'image')}
            />
          </form>
        </div>

        {/* Right Sidebar */}
        <div className="w-1/3 p-4 space-y-6 overflow-y-auto">
          {/* Chat History */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-3">Chat History</h3>
            <div className="space-y-2">
              {mockChatHistory.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => loadChat(chat)}
                  className="w-full text-left p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  <div className="font-medium text-sm">{chat.title}</div>
                  <p className="text-sm text-gray-400 truncate">{chat.lastMessage}</p>
                  <div className="text-xs text-gray-500 mt-1">{chat.timestamp}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Calls */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-3">Recent Calls</h3>
            <div className="space-y-2">
              {mockCallHistory.map((call) => (
                <button
                  key={call.id}
                  onClick={() => loadCall(call)}
                  className="w-full text-left p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  <div className="font-medium text-sm">{call.title}</div>
                  <p className="text-sm text-gray-400 truncate">{call.summary}</p>
                  <div className="text-xs text-gray-500 mt-1">{call.timestamp}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Documents */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-3">Documents</h3>
            <div className="space-y-2">
              {mockDocuments.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => setSelectedDocument(doc)}
                  className="w-full text-left p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors flex items-start gap-3"
                >
                  <FileText className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-sm">{doc.title}</div>
                    <div className="text-xs text-gray-500 mt-1">{doc.sharedAt}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedDocument && (
        <DocumentViewer
          isOpen={!!selectedDocument}
          onClose={() => setSelectedDocument(null)}
          document={selectedDocument}
        />
      )}
    </Modal>
  );
};