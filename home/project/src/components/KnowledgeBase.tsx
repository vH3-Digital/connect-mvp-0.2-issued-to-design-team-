import React, { useState, useEffect } from 'react';
import { Search, Upload, FileText, User, Tag, MessageSquare, Info, Clock } from 'lucide-react';
import { UploadModal } from './documents/UploadModal';
import { DocumentModal } from './documents/DocumentModal';
import { DocumentViewer } from './documents/DocumentViewer';
import { documentsApi } from '../services/documents';

interface Document {
  id: string;
  doc_id: string;
  name: string;
  description: string;
  category: string;
  key_points: string;
  message?: string;
  user_id: number;
  created_at: number;
}

export const KnowledgeBase: React.FC = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [showViewer, setShowViewer] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        setLoading(true);
        setError(null);
        const docs = await documentsApi.listDocuments();
        
        const uniqueDocs = Array.from(new Map(docs.map(doc => [
          doc.doc_id,
          {
            ...doc,
            id: doc.doc_id
          }
        ])).values());

        setDocuments(uniqueDocs);
      } catch (err: any) {
        console.error('Failed to load documents:', err);
        setError(err.message || 'Failed to load documents');
      } finally {
        setLoading(false);
      }
    };

    loadDocuments();
  }, []);

  const handleUploadComplete = (response: Document) => {
    setSelectedDocument(response);
    setShowUploadModal(false);
    setShowDocumentModal(true);
    
    const newDoc = {
      ...response,
      id: response.doc_id
    };
    
    setDocuments(prev => {
      const existing = prev.find(doc => doc.doc_id === newDoc.doc_id);
      if (existing) {
        return prev.map(doc => doc.doc_id === newDoc.doc_id ? newDoc : doc);
      }
      return [...prev, newDoc];
    });
  };

  const handleViewInfo = (doc: Document, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDocument(doc);
    setShowDocumentModal(true);
  };

  const handleChat = (doc: Document, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDocument(doc);
    setShowViewer(true);
  };

  const filteredDocuments = documents.filter(doc => {
    if (!searchQuery) return true;
    const search = searchQuery.toLowerCase();
    return (
      doc.name?.toLowerCase().includes(search) ||
      doc.category?.toLowerCase().includes(search)
    );
  });

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-cyan-400">Knowledge Base</h2>
          <p className="text-gray-400">Access and manage documentation</p>
        </div>
        <div className="w-full sm:w-auto">
          <button
            onClick={() => setShowUploadModal(true)}
            className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg px-4 py-2 flex items-center justify-center gap-2 hover:from-cyan-600 hover:to-blue-600 transition-all"
          >
            <Upload className="w-5 h-5" />
            Upload Document
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search documents..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-800 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full flex justify-center py-12">
            <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="col-span-full">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400">
              {error}
            </div>
          </div>
        ) : filteredDocuments.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-400">
            {searchQuery ? 'No documents match your search' : 'No documents yet'}
          </div>
        ) : (
          filteredDocuments.map((doc) => (
            <div
              key={doc.doc_id}
              className="bg-gray-800/50 rounded-xl p-6 hover:bg-gray-800 transition-all border border-gray-700/50 hover:border-gray-700 flex flex-col"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-500/20 flex-shrink-0">
                  <FileText className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-lg mb-2 text-gray-100 truncate">
                    {doc.name}
                  </h3>
                  
                  {/* Metadata */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-cyan-400" />
                      <span className="text-sm text-cyan-400 font-medium truncate">
                        {doc.category}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400 truncate">
                        User {doc.user_id}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">
                        {formatDate(doc.created_at)}
                      </span>
                    </div>
                  </div>

                  {/* Description Preview */}
                  {doc.description && (
                    <p className="mt-4 text-sm text-gray-400 line-clamp-2">
                      {doc.description}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={(e) => handleViewInfo(doc, e)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors"
                >
                  <Info className="w-4 h-4" />
                  View Info
                </button>
                <button
                  onClick={(e) => handleChat(doc, e)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg text-sm font-medium transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  Chat
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modals */}
      <UploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUploadComplete={handleUploadComplete}
      />

      {selectedDocument && (
        <DocumentModal
          isOpen={showDocumentModal}
          onClose={() => {
            setShowDocumentModal(false);
            setSelectedDocument(null);
          }}
          document={selectedDocument}
          onViewChat={() => {
            setShowDocumentModal(false);
            setShowViewer(true);
          }}
        />
      )}

      {selectedDocument && (
        <DocumentViewer
          isOpen={showViewer}
          onClose={() => {
            setShowViewer(false);
            setSelectedDocument(null);
          }}
          documentId={selectedDocument.doc_id}
        />
      )}
    </div>
  );
};