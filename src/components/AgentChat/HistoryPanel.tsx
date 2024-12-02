import React from 'react';
import { FileText } from 'lucide-react';
import { ChatHistory, CallHistory, Document } from './types';

interface HistoryPanelProps {
  chatHistory: ChatHistory[];
  callHistory: CallHistory[];
  documents: Document[];
  activeChat: string | null;
  activeCall: string | null;
  onChatSelect: (id: string) => void;
  onCallSelect: (id: string) => void;
  onDocumentSelect: (doc: Document) => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({
  chatHistory,
  callHistory,
  documents,
  activeChat,
  activeCall,
  onChatSelect,
  onCallSelect,
  onDocumentSelect,
}) => {
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-400" />;
      case 'doc':
        return <FileText className="w-5 h-5 text-blue-400" />;
      case 'image':
        return <FileText className="w-5 h-5 text-green-400" />;
      default:
        return <FileText className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="w-1/3 flex flex-col">
      {/* Chat History */}
      <div className="p-4 border-b border-gray-800">
        <h3 className="text-sm font-medium text-gray-400 mb-3">Chat History</h3>
        <div className="space-y-2">
          {chatHistory.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onChatSelect(chat.id)}
              className={`w-full text-left p-2 rounded-lg transition-colors ${
                activeChat === chat.id
                  ? 'bg-cyan-500/20 text-cyan-300'
                  : 'hover:bg-gray-800'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-400">{chat.timestamp}</span>
                {chat.unread && (
                  <span className="w-2 h-2 bg-cyan-400 rounded-full" />
                )}
              </div>
              <p className="text-sm line-clamp-1">{chat.lastMessage}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Calls */}
      <div className="p-4 border-b border-gray-800">
        <h3 className="text-sm font-medium text-gray-400 mb-3">Recent Calls</h3>
        <div className="space-y-2">
          {callHistory.map((call) => (
            <button
              key={call.id}
              onClick={() => onCallSelect(call.id)}
              className={`w-full text-left p-2 rounded-lg transition-colors ${
                activeCall === call.id
                  ? 'bg-cyan-500/20 text-cyan-300'
                  : 'hover:bg-gray-800'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-400">{call.timestamp}</span>
                <span className="text-xs bg-gray-700 px-2 py-1 rounded-full">
                  {call.type}
                </span>
              </div>
              <p className="text-sm line-clamp-1">{call.summary}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Documents */}
      <div className="p-4 flex-1 overflow-y-auto">
        <h3 className="text-sm font-medium text-gray-400 mb-3">Documents</h3>
        <div className="space-y-2">
          {documents.map((doc) => (
            <button
              key={doc.id}
              onClick={() => onDocumentSelect(doc)}
              className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              {getFileIcon(doc.type)}
              <div className="flex-1 text-left">
                <p className="text-sm line-clamp-1">{doc.name}</p>
                <span className="text-xs text-gray-400">{doc.timestamp}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};