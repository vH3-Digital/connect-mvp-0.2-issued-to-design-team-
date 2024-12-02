import React from 'react';
import { ChatPanel } from './ChatPanel';
import { Modal } from './Modal';

interface MessageCardProps {
  name: string;
  message: string;
  category: string;
  status: 'read' | 'unread';
  imageUrl: string;
  onClick: () => void;
}

export const MessageCard: React.FC<MessageCardProps> = ({
  name,
  message,
  category,
  status,
  imageUrl,
  onClick,
}) => {
  const [showChat, setShowChat] = React.useState(false);

  const handleClick = () => {
    setShowChat(true);
    onClick();
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="w-full text-left card hover:bg-gray-800/50 transition-colors p-4 flex items-center space-x-3"
      >
        <img src={imageUrl} alt={name} className="w-10 h-10 rounded-full flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="font-medium truncate">{name}</span>
            <span className="text-sm text-gray-400 flex-shrink-0">{category}</span>
          </div>
          <p className="text-sm text-gray-400 truncate mt-1">{message}</p>
        </div>
        {status === 'unread' && (
          <span className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0" />
        )}
      </button>

      <Modal
        isOpen={showChat}
        onClose={() => setShowChat(false)}
        title=""
        size="lg"
      >
        <ChatPanel
          messages={[
            {
              id: '1',
              content: `Hi! I'm ${name}. How can I help you today?`,
              sender: 'agent',
              timestamp: '10:00'
            }
          ]}
          onSendMessage={() => {}}
          activeUser={{
            name,
            avatar: imageUrl,
            online: true
          }}
        />
      </Modal>
    </>
  );
};