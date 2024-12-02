import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Mic, Image as ImageIcon, X, StopCircle } from 'lucide-react';
import { format } from 'date-fns';

interface ChatPanelProps {
  messages: {
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
  }[];
  onSendMessage: (message: string) => void;
  activeUser: {
    name: string;
    avatar: string;
    online: boolean;
  };
}

export const ChatPanel: React.FC<ChatPanelProps> = ({
  messages: initialMessages,
  onSendMessage,
  activeUser
}) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [messages, setMessages] = useState(initialMessages);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const recordingTimerRef = useRef<number>();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      content: message,
      sender: 'user' as const,
      timestamp: format(new Date(), 'HH:mm dd/MM/yy'),
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    onSendMessage(message);

    // Simulate agent response
    setTimeout(() => {
      const agentResponse = {
        id: (Date.now() + 1).toString(),
        content: 'I understand your request. Let me help you with that...',
        sender: 'agent' as const,
        timestamp: format(new Date(), 'HH:mm dd/MM/yy'),
      };
      setMessages(prev => [...prev, agentResponse]);
    }, 1000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'file' | 'image') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const newMessage = {
        id: Date.now().toString(),
        content: '',
        sender: 'user' as const,
        timestamp: format(new Date(), 'HH:mm dd/MM/yy'),
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
    
    // Create voice message
    const newMessage = {
      id: Date.now().toString(),
      content: '',
      sender: 'user' as const,
      timestamp: format(new Date(), 'HH:mm dd/MM/yy'),
      attachments: [{
        type: 'voice' as const,
        url: '#',
        name: `Voice message (${formatTime(recordingTime)})`,
        duration: recordingTime
      }]
    };
    setMessages(prev => [...prev, newMessage]);
    setRecordingTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-full bg-gray-900/50">
      {/* Chat Header */}
      <div className="flex items-center space-x-4 p-4 border-b border-gray-800">
        <div className="relative">
          <img
            src={activeUser.avatar}
            alt={activeUser.name}
            className="w-12 h-12 rounded-full"
          />
          <span className={`absolute bottom-0 right-0 w-3 h-3 ${
            activeUser.online ? 'bg-green-400' : 'bg-gray-400'
          } border-2 border-gray-900 rounded-full`} />
        </div>
        <div>
          <h3 className="font-medium text-lg">{activeUser.name}</h3>
          <p className="text-sm text-cyan-400">{activeUser.online ? 'Online' : 'Offline'}</p>
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
        <div ref={messagesEndRef} />
      </div>

      {/* Hidden File Inputs */}
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

      {/* Message Input */}
      <div className="p-4 border-t border-gray-800">
        <form onSubmit={handleSendMessage} className="relative flex items-center gap-2">
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
        </form>

        {isRecording && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-800 px-4 py-2 rounded-full flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-sm">Recording {formatTime(recordingTime)}</span>
          </div>
        )}
      </div>
    </div>
  );
};