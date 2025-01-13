import React, { useState, useRef } from "react";
import { Upload, FileText } from "lucide-react";
import { documentsApi } from "../../../services/documents";
import { Modal } from "../../../widgets/modal/modal";
import { IDocumentItem } from "../../../interfaces/interfaces";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadComplete: (response: IDocumentItem) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onUploadComplete,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File) => {
    if (file.type !== "application/pdf") {
      setError("Only PDF files are supported");
      return false;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      return false;
    }
    return true;
  };

  const uploadFile = async (file: File) => {
    try {
      setError(null);
      setIsUploading(true);

      // Ensure documentsApi.upload returns a valid Promise
      const response = await documentsApi.upload(file);

      // Ensure the response structure is correct
      if (response && response.doc_id) {
        onUploadComplete(response); // Assuming response is correctly shaped
      } else {
        throw new Error("Unexpected response from server.");
      }
    } catch (err) {
      console.error("Upload error:", err);

      // Improved error handling with `instanceof` and fallback message
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred during the upload.");
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFile(file);
    if (validateFile(file)) {
      await uploadFile(file);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;
    setUploadedFile(file);
    if (validateFile(file)) {
      await uploadFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upload Document" size="md">
      <div
        className="space-y-6"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          className="hidden"
          accept="application/pdf"
        />

        {/* Uploading State */}
        {isUploading ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg font-medium text-primary">
              Processing document...
            </p>
            <p className="text-sm text-gray-400 mt-2">
              This may take a few moments
            </p>
          </div>
        ) : (
          // Upload Box
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`
              border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors
              ${
                uploadedFile
                  ? "border-cyan-500/50 bg-cyan-500/5"
                  : "border-gray-700 hover:border-gray-600"
              }
            `}
          >
            {uploadedFile ? (
              <div className="flex flex-col items-center gap-2">
                <FileText className="w-12 h-12 text-primary" />
                <div className="text-sm text-gray-400">{uploadedFile.name}</div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Upload className="w-12 h-12 text-gray-400" />
                <p className="text-lg font-medium">Upload a document</p>
                <p className="text-sm text-gray-400">
                  <span className="text-primary">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">PDF files up to 10MB</p>
              </div>
            )}
          </div>
        )}
        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-sm">
            {error}
          </div>
        )}
      </div>
    </Modal>
  );
};
