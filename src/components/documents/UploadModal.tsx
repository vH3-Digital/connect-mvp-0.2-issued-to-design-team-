import React, { useState, useRef } from 'react';
import { Modal } from '../Modal';
import { Upload, FileText } from 'lucide-react';
import { documentsApi } from '../../services/documents';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadComplete: (response: {
    name: string;
    doc_id: string;
    message: string;
    category: string;
    key_points: string;
    description: string;
  }) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onUploadComplete
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError('Only PDF files are supported');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setError('File size must be less than 10MB');
      return;
    }

    try {
      setError(null);
      setUploadedFile(file);
      setIsUploading(true);

      const response = await documentsApi.upload(file);
      console.log('Upload response:', response);
      onUploadComplete(response);
    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.message || 'Failed to upload document');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError('Only PDF files are supported');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    try {
      setError(null);
      setUploadedFile(file);
      setIsUploading(true);

      const response = await documentsApi.upload(file);
      console.log('Upload response:', response);
      onUploadComplete(response);
    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.message || 'Failed to upload document');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Upload Document"
      size="md"
    >
      <div 
        className="space-y-6"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          className="hidden"
          accept="application/pdf"
        />

        {isUploading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg font-medium text-cyan-400">Processing document...</p>
            <p className="text-sm text-gray-400 mt-2">This may take a few moments</p>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`
              border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors
              ${uploadedFile ? 'border-cyan-500/50 bg-cyan-500/5' : 'border-gray-700 hover:border-gray-600'}
            `}
          >
            {uploadedFile ? (
              <div className="flex flex-col items-center gap-2">
                <FileText className="w-12 h-12 text-cyan-400" />
                <div className="text-sm text-gray-400">{uploadedFile.name}</div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Upload className="w-12 h-12 text-gray-400" />
                <p className="text-lg font-medium">Upload a document</p>
                <p className="text-sm text-gray-400">
                  <span className="text-cyan-400">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PDF files up to 10MB</p>
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-sm">
            {error}
          </div>
        )}
      </div>
    </Modal>
  );
};