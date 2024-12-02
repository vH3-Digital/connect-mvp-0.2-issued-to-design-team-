import React, { useState, useRef, useEffect } from 'react';
import { Modal } from '../Modal';
import { DocumentViewer } from '../DocumentViewer';
import { ChatHeader } from './ChatHeader';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { HistoryPanel } from './HistoryPanel';
import { ChatMessage, Agent, Document } from './types';
import { useChat } from '../../hooks/useChat';
import { useAuth } from '../../contexts/AuthContext';

interface AgentChatProps {
  isOpen: boolean;
  onClose: () => void;
  agent: Agent;
}

export const AgentChat: React.FC<AgentChatProps> = ({
  isOpen,
  onClose,
  agent,
}) => {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [activeChannel, setActiveChannel] = useState<string | null>(null);

  const {
    loading,
    error,
    channels,
    currentChannel,
    messages,
    refreshData,
    createNewChat
  } = useChat(activeChannel);

  const recordingTimerRef = useRef<number>();

  // Initialize or find existing chat with agent
  useEffect(() => {
    const initChat = async () => {
      if (!user || !agent.id) return;

      // Find existing channel with agent
      const existingChannel = channels.find(channel => 
        channel.type === 'direct' && 
        channel.participants_id.includes(agent.id)
      );

      if (existingChannel) {
        setActiveChannel(existingChannel.id);
      } else {
        // Create new direct chat with agent
        try {
          const newChannel = await createNewChat([agent.id]);
          setActiveChannel(newChannel.id);
        } catch (err) {
          console.error('Failed to create chat:', err);
        }
      }
    };

    initChat();
  }, [user, agent.id, channels]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !activeChannel) return;

    // TODO: Implement send message API
    // For now, just refresh to get new messages
    setMessage('');
    await refreshData(activeChannel);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'file' | 'image') => {
    const file = e.target.files?.[0];
    if (!file || !activeChannel) return;

    // TODO: Implement file upload API
    // For now, just refresh to get new messages
    await refreshData(activeChannel);
  };

  const startRecording = () => {
    recordingTimerRef.current = window.setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
    setIsRecording(true);
  };

  const stopRecording = async () => {
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
    }
    setIsRecording(false);
    setRecordingTime(0);

    // TODO: Implement voice message API
    // For now, just refresh to get new messages
    if (activeChannel) {
      await refreshData(activeChannel);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" size="lg">
      <div className="h-[600px] flex max-h-[calc(100vh-6rem)]">
        {/* Main Chat Area */}
        <div className="w-2/3 flex flex-col border-r border-gray-800">
          <ChatHeader agent={agent} />
          <MessageList messages={messages.map(msg => ({
            id: msg.id.toString(),
            content: msg.text,
            sender: msg.sender_id === user?.id ? 'user' : 'agent',
            timestamp: new Date(msg.created_at).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })
          }))} />
          <MessageInput
            message={message}
            setMessage={setMessage}
            isRecording={isRecording}
            recordingTime={recordingTime}
            onSendMessage={handleSendMessage}
            onStartRecording={startRecording}
            onStopRecording={stopRecording}
            onFileUpload={handleFileUpload}
          />
        </div>

        <HistoryPanel
          chatHistory={channels.map(channel => ({
            id: channel.id,
            lastMessage: channel.description || '',
            timestamp: new Date(channel.created_at).toLocaleDateString(),
            unread: false // TODO: Implement unread status
          }))}
          callHistory={[]} // TODO: Implement call history
          documents={[]} // TODO: Implement documents
          activeChat={activeChannel}
          activeCall={null}
          onChatSelect={setActiveChannel}
          onCallSelect={() => {}} // TODO: Implement call selection
          onDocumentSelect={setSelectedDocument}
        />
      </div>

      {selectedDocument && (
        <DocumentViewer
          isOpen={!!selectedDocument}
          onClose={() => setSelectedDocument(null)}
          document={{
            id: selectedDocument.id,
            title: selectedDocument.name,
            type: selectedDocument.type === 'doc' ? 'pdf' : selectedDocument.type,
            url: selectedDocument.url,
            category: 'Document'
          }}
        />
      )}
    </Modal>
  );
};