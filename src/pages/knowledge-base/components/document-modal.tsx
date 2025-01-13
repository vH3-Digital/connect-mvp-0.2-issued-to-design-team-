import React, { useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { Modal } from "../../../widgets/modal/modal";
import { CustomButton } from "../../../widgets/custom-button";

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
  onViewChat,
}) => {
  const [activeTab, setActiveTab] = useState<"details" | "key-points">(
    "details"
  );
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
      gfm: true,
    });

    // Parse markdown and sanitize HTML
    const rawHtml = marked(content) as string;
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
        document.name
        // <div className="space-y-2">
        //   <h2 className="text-xl font-semibold">{document.name}</h2>
        //   <div className="flex items-center gap-2">
        //     <Tag className="w-4 h-4 text-primary" />
        //     <span className="text-sm text-primary">{document.category}</span>
        //   </div>
        // </div>
      }
      size="lg"
    >
      <div className="">
        {/* Tabs */}
        <div className="flex border-b mb-[16px] border-gray-700">
          <button
            onClick={() => setActiveTab("details")}
            className={`px-4 pb-2 border-b-2 transition-colors ${
              activeTab === "details"
                ? "border-primary text-primary"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            Details
          </button>
          <button
            onClick={() => setActiveTab("key-points")}
            className={`px-4 pb-2 border-b-2 transition-colors ${
              activeTab === "key-points"
                ? "border-primary text-primary"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            Key Points
          </button>
        </div>

        {/* Content */}
        {activeTab === "details" ? (
          <div className="bg-gray-800 rounded-lg p-4 flex-1 max-h-[calc(100vh-300px)] mb-[16px] overflow-y-auto">
            {renderMarkdown(document.description)}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg p-4 flex-1 max-h-[calc(100vh-300px)] mb-[16px] overflow-y-auto">
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
          <CustomButton styleType={"gray"} title="Close" onClick={onClose} />
          <CustomButton
            styleType={"primary"}
            title="Ask Questions"
            onClick={handleViewChat}
          />
        </div>
      </div>
    </Modal>
  );
};
