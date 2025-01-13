import React from "react";
import { IDocumentItem } from "../../../interfaces/interfaces";
import { Clock, FileText, Info, MessageSquare, Tag, User } from "lucide-react";
import { CustomButton } from "../../../widgets/custom-button";
import { motion } from "framer-motion";

const DocumentItem = ({
  doc,
  setSelectedDocument,
  setShowDocumentModal,
  setShowViewer,
}: {
  doc: IDocumentItem;
  setSelectedDocument: (doc: IDocumentItem | null) => void;
  setShowDocumentModal: (show: boolean) => void;
  setShowViewer: (show: boolean) => void;
}) => {
  const handleViewInfo = (doc: IDocumentItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDocument(doc);
    setShowDocumentModal(true);
  };

  const handleChat = (doc: IDocumentItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDocument(doc);
    setShowViewer(true);
  };
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        exit={{ opacity: 0 }}
        key={doc.doc_id}
        className="group w-full mb-4 rounded-[12px] overflow-hidden sm:w-[calc(50%-20px)] 2xl:w-[calc(33.3%-20px)] sm:m-[10px] relative p-[1px] transition-all cursor-pointer"
      >
        <div
          className={
            "rounded-[12px] top-[0] left-[0]  duration-500 transition-all group-hover:rotate-180  w-full h-full absolute bg-gradient-to-br from-gradOne  to-bgSecondary/0 to-20%"
          }
        ></div>
        <div
          className={
            "rounded-[12px] top-[0] left-[0] duration-500 transition-all group-hover:rotate-180  w-full h-full absolute bg-gradient-to-br from-bgSecondary/0   to-gradTwo from-80%"
          }
        ></div>
        <div className="bg-bgSecondary rounded-[12px]  p-4 relative">
          <div className="flex items-start gap-4 ">
            <div className="p-3 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-500/20 flex-shrink-0">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-lg mb-2 text-gray-100 truncate">
                {doc.name}
              </h3>

              {/* Metadata */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-primary" />
                  <span className="text-sm text-primary font-medium truncate">
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
          <div className="mt-6 flex justify-between">
            <CustomButton
              extraStyles={"w-[calc(50%-4px)] justify-center"}
              icon={<Info className="w-4 h-4 mr-[6px]" />}
              title="View Info"
              styleType={"gray"}
              onClick={(e) => handleViewInfo(doc, e)}
            />
            <CustomButton
              extraStyles={"w-[calc(50%-4px)] justify-center"}
              icon={<MessageSquare className="w-4 h-4 mr-[6px]" />}
              styleType={"primary"}
              title="Chat"
              onClick={(e) => handleChat(doc, e)}
            />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default DocumentItem;
