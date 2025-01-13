import React, { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import { documentsApi } from "../../services/documents";
import { SearchField } from "../../widgets/search-field";
import { IDocumentItem } from "../../interfaces/interfaces";
import DocumentItem from "./components/document-item";
import { DocumentModal } from "./components/document-modal";
import { DocumentViewer } from "./components/document-viewer";
import { CustomButton } from "../../widgets/custom-button";
import { UploadModal } from "./components/upload-modal";
import DocumentItemPlace from "./components/document-item-place";
// import { UploadModal } from "./documents/UploadModal";
// import { DocumentModal } from "./documents/DocumentModal";
// import { DocumentViewer } from "./documents/DocumentViewer";
// import { documentsApi } from "../services/documents";

export const KnowledgeBase: React.FC = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [showViewer, setShowViewer] = useState(false);
  const [selectedDocument, setSelectedDocument] =
    useState<IDocumentItem | null>(null);
  const [documents, setDocuments] = useState<IDocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        setLoading(true);
        setError(null);
        const docs = await documentsApi.listDocuments();

        const uniqueDocs = Array.from(
          new Map(
            docs.map((doc) => [
              doc.doc_id,
              {
                ...doc,
                id: doc.doc_id,
              },
            ])
          ).values()
        );

        setDocuments(uniqueDocs);
      } catch (err: any) {
        console.error("Failed to load documents:", err);
        setError(err.message || "Failed to load documents");
      } finally {
        setLoading(false);
      }
    };

    loadDocuments();
  }, []);

  const handleUploadComplete = (response: IDocumentItem) => {
    setSelectedDocument(response);
    setShowUploadModal(false);
    setShowDocumentModal(true);

    const newDoc = {
      ...response,
      id: response.doc_id,
    };

    setDocuments((prev) => {
      const existing = prev.find((doc) => doc.doc_id === newDoc.doc_id);
      if (existing) {
        return prev.map((doc) => (doc.doc_id === newDoc.doc_id ? newDoc : doc));
      }
      return [...prev, newDoc];
    });
  };

  const filteredDocuments = documents.filter((doc) => {
    if (!searchQuery) return true;
    const search = searchQuery.toLowerCase();
    return (
      doc.name?.toLowerCase().includes(search) ||
      doc.category?.toLowerCase().includes(search)
    );
  });

  return (
    <div className="">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-[20px]">
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-[10px]">
            Knowledge Base
          </h2>
          <p className="text-white">Access and manage documentation</p>
        </div>
        <CustomButton
          extraStyles={"w-full justify-center sm:w-[unset]"}
          styleType={"primary"}
          icon={<Upload className="w-5 h-5 mr-[4px]" />}
          title="Upload Document"
          onClick={() => setShowUploadModal(true)}
        />
      </div>

      {/* Search */}
      <SearchField
        containerStyles="mb-[16px]"
        placeholder="Search documents..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {/* Document Grid */}
      <div className="flex flex-wrap sm:mx-[-10px]">
        {loading ? (
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => {
            return <DocumentItemPlace key={index} />;
          })
        ) : error ? (
          <div className="col-span-full">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400">
              {error}
            </div>
          </div>
        ) : filteredDocuments.length === 0 ? (
          <div className="p-8 w-full text-center text-gray-400">
            {searchQuery
              ? "No documents match your search"
              : "No documents yet"}
          </div>
        ) : (
          filteredDocuments.map((item, index) => (
            <DocumentItem
              setSelectedDocument={setSelectedDocument}
              setShowDocumentModal={setShowDocumentModal}
              setShowViewer={setShowViewer}
              doc={item}
              key={index}
            />
          ))
        )}
      </div>

      {/* Modals */}
      {showUploadModal && (
        <UploadModal
          isOpen={showUploadModal}
          onClose={() => {
            setShowUploadModal(false);
            document.body.classList.remove("no-scroll");
          }}
          onUploadComplete={handleUploadComplete}
        />
      )}

      {selectedDocument && (
        <DocumentModal
          isOpen={showDocumentModal}
          onClose={() => {
            setShowDocumentModal(false);
            setSelectedDocument(null);
            document.body.classList.remove("no-scroll");
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
            document.body.classList.remove("no-scroll");
          }}
          documentId={selectedDocument.doc_id}
        />
      )}
    </div>
  );
};
