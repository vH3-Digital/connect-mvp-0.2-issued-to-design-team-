import React, { useState } from 'react';
import { X, Download, Share2, MessageSquare, Maximize2, ChevronRight, Send, Paperclip } from 'lucide-react';
import { Modal } from './Modal';

interface DocumentViewerProps {
  isOpen: boolean;
  onClose: () => void;
  document: {
    id: string;
    title: string;
    type: 'pdf' | 'image' | 'spreadsheet';
    url: string;
    category: string;
  };
}

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  isOpen,
  onClose,
  document,
}) => {
  const [showChat, setShowChat] = useState(true);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: 'Hello! I can help you understand this document. What would you like to know?',
      sender: 'ai',
      timestamp: '10:00',
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: 'I understand your question about the document. Let me analyze it and provide a detailed response...',
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const renderDocumentPreview = () => {
    switch (document.type) {
      case 'pdf':
        return (
          <iframe
            src={document.url}
            className="w-full h-full rounded-lg bg-white"
            title={document.title}
          />
        );
      case 'image':
        return (
          <img
            src={document.url}
            alt={document.title}
            className="w-full h-full object-contain"
          />
        );
      case 'spreadsheet':
        return (
          <iframe
            src={document.url}
            className="w-full h-full rounded-lg bg-white"
            title={document.title}
          />
        );
      default:
        return <div>Unsupported document type</div>;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" size="lg">
      <div className="flex h-[80vh]">
        {/* Document Section */}
        <div className={`${showChat ? 'w-3/5' : 'w-full'} transition-all duration-300`}>
          <div className="h-full flex flex-col">
            {/* Document Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold">{document.title}</h2>
                <span className="text-sm text-cyan-400">{document.category}</span>
              </div>
              <div className="flex items-center gap-4">
                <button className="text-gray-400 hover:text-white">
                  <Download className="w-5 h-5" />
                </button>
                <button className="text-gray-400 hover:text-white">
                  <Share2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowChat(!showChat)}
                  className="text-gray-400 hover:text-white"
                >
                  {showChat ? <Maximize2 className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Document Viewer */}
            <div className="flex-1 bg-gray-900 rounded-lg overflow-hidden">
              {renderDocumentPreview()}
            </div>
          </div>
        </div>

        {/* Chat Section */}
        {showChat && (
          <div className="w-2/5 ml-4 flex flex-col">
            <div className="bg-gray-800 rounded-lg p-4 flex-1 flex flex-col">
              <h3 className="text-lg font-semibold mb-4">Ask about this document</h3>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
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
                      <p className="text-sm">{msg.content}</p>
                      <span className="text-xs text-gray-400 mt-1 block">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask a question about this document..."
                  className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <button
                  type="submit"
                  className="p-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};