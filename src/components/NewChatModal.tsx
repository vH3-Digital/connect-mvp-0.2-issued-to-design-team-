import React, { useState } from 'react';
import { Modal } from './Modal';
import { Contact } from '../types/chat';
import { Users } from 'lucide-react';

interface NewChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateChat: (data: {
    name: string;
    description: string;
    participants: number[];
  }) => Promise<void>;
  contacts: Contact[];
}

export const NewChatModal: React.FC<NewChatModalProps> = ({
  isOpen,
  onClose,
  onCreateChat,
  contacts
}) => {
  const [selectedParticipants, setSelectedParticipants] = useState<number[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (selectedParticipants.length === 0) return;

    setIsSubmitting(true);
    try {
      await onCreateChat({
        name,
        description,
        participants: selectedParticipants
      });
      handleClose();
    } catch (error) {
      console.error('Failed to create chat:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSelectedParticipants([]);
    setName('');
    setDescription('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="New Chat"
      size="md"
    >
      <div className="space-y-6">
        {/* Chat Name */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Chat Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="Enter chat name"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 h-24 resize-none"
            placeholder="Enter chat description"
            required
          />
        </div>

        {/* Participants Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Select Participants
          </label>
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {contacts.map(contact => (
              <label
                key={contact.id}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedParticipants.includes(contact.id)
                    ? 'bg-cyan-500/20'
                    : 'hover:bg-gray-800'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedParticipants.includes(contact.id)}
                  onChange={() => {
                    const participants = selectedParticipants.includes(contact.id)
                      ? selectedParticipants.filter(id => id !== contact.id)
                      : [...selectedParticipants, contact.id];
                    setSelectedParticipants(participants);
                  }}
                  className="rounded border-gray-600 text-cyan-500 focus:ring-cyan-500"
                />
                <div className="flex items-center gap-3 flex-1">
                  {contact.profile_picture ? (
                    <img
                      src={contact.profile_picture.url}
                      alt={contact.first_name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                      <span className="text-lg font-medium text-gray-300">
                        {contact.first_name?.[0]}
                      </span>
                    </div>
                  )}
                  <span className="font-medium">
                    {contact.first_name} {contact.last_name}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-gray-400 hover:text-white"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!name || !description || selectedParticipants.length === 0 || isSubmitting}
            className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Users className="w-4 h-4" />
                Create Chat
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};