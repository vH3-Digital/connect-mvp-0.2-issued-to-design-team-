import React, { useState } from 'react';
import { Modal } from '../Modal';
import { Code, Table, Tag } from 'lucide-react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

interface DocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: {
    doc_id: string;
    name: string;
    description: string;
    category: string;
    key_points: string;
    message?: string;
  };
  onViewChat?: () => void;
}

export const DocumentModal: React.FC<DocumentModalProps> = ({
  isOpen,
  onClose,
  document,
  onViewChat
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'key-points'>('details');
  const [error, setError] = useState<string | null>(null);

  const handleViewChat = () => {
    onViewChat?.();
    onClose();
  };

  const renderMarkdown = (content: string) => {
    if (!content) return null;

    // Configure marked options
    marked.setOptions({
      breaks: true,
      gfm: true
    });

    // Parse markdown and sanitize HTML
    const rawHtml = marked(content);
    const cleanHtml = DOMPurify.sanitize(rawHtml);

    return (
      <div 
        className="prose prose-invert max-w-none prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-700"
        dangerouslySetInnerHTML={{ __html: cleanHtml }} 
      />
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">{document.name}</h2>
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-400">{document.category}</span>
          </div>
        </div>
      }
      size="lg"
    >
      <div className="space-y-6">
        {/* Tabs */}
        <div className="flex border-b border-gray-700">
          <button
            onClick={() => setActiveTab('details')}
            className={`px-4 py-2 border-b-2 transition-colors ${
              activeTab === 'details'
                ? 'border-cyan-500 text-cyan-400'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Details
          </button>
          <button
            onClick={() => setActiveTab('key-points')}
            className={`px-4 py-2 border-b-2 transition-colors ${
              activeTab === 'key-points'
                ? 'border-cyan-500 text-cyan-400'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Key Points
          </button>
        </div>

        {/* Content */}
        {activeTab === 'details' ? (
          <div className="bg-gray-800 rounded-lg p-4 max-h-[600px] overflow-y-auto">
            {renderMarkdown(document.description)}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg p-4 max-h-[600px] overflow-y-auto">
            {renderMarkdown(document.key_points)}
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-white"
          >
            Close
          </button>
          <button
            onClick={handleViewChat}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all"
          >
            Ask Questions
          </button>
        </div>
      </div>
    </Modal>
  );
};