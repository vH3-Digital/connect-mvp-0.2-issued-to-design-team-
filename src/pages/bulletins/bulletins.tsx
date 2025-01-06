import React, { useState, useRef, useEffect } from "react";
import { Plus, Upload } from "lucide-react";
// import { BulletinModal } from "./BulletinModal";
// import { Modal } from "./Modal";
import { format } from "date-fns";
import { IBulletin } from "../../interfaces/interfaces";
import { CustomButton } from "../../widgets/custom-button";
import BulletinsCard from "./components/bulletins-card";
import { BulletinModal } from "./components/bulletins-modal";
import { Modal } from "../../widgets/modal/modal";

const mockBulletins: IBulletin[] = [
  {
    id: "BUL-001",
    title: "HVAC System Safety Protocol Update",
    status: "review",
    priority: "high",
    createdAt: "2024-03-15",
    updatedAt: "2024-03-16",
    assignedTo: "John Smith",
    progress: 75,
    scheduledDate: "2024-04-01",
    followUpDays: 7,
    passRate: 85,
    categories: ["HVAC", "Safety"],
    engineers: ["ENG-001", "ENG-002"],
  },
  {
    id: "BUL-002",
    title: "Electrical Installation Guidelines v2",
    status: "draft",
    priority: "medium",
    createdAt: "2024-03-14",
    updatedAt: "2024-03-14",
    assignedTo: "Emily Brown",
    progress: 30,
    scheduledDate: "2024-03-25",
    followUpDays: 5,
    passRate: 90,
    categories: ["Electrical", "Installation"],
    engineers: ["ENG-003"],
  },
];

export const Bulletins: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedBulletin, setSelectedBulletin] = useState<IBulletin | null>(
    null
  );
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedContent, setProcessedContent] =
    useState<Partial<IBulletin> | null>(null);
  const [bulletins, setBulletins] = useState<IBulletin[]>(mockBulletins);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCreateNew = () => {
    setShowCreateModal(true);
    setUploadedFile(null);
    setProcessedContent(null);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setIsProcessing(true);

      // Simulate AI processing delay
      setTimeout(() => {
        const content = generateAIContent(file);
        setProcessedContent(content);
        setIsProcessing(false);
        setShowUploadModal(false);
        setShowCreateModal(true);
      }, 2000);
    }
  };

  const generateAIContent = (file: File) => {
    const fileName = file.name.toLowerCase();
    let content: Partial<IBulletin> = {
      title: file.name.split(".")[0].replace(/[-_]/g, " "),
      description: `This comprehensive update introduces critical changes to our operational procedures, effective immediately. The document outlines enhanced measures, updated protocols, and revised guidelines.`,
      questions: [
        "What are the key changes introduced in this update?",
        "How will these changes affect daily operations?",
        "What are the implementation timelines?",
      ],
      answers: [
        "The update includes new safety protocols, revised documentation requirements, and updated emergency procedures.",
        "Daily operations will require additional verification steps and enhanced monitoring.",
        "Implementation begins immediately with a 2-week training period.",
      ],
      categories: ["Safety", "Compliance", "Training"],
      engineers: ["ENG-001", "ENG-002"],
      skills: ["Safety Protocols", "Emergency Response", "Risk Assessment"],
      followUpDays: 7,
      passRate: 85,
    };
    return content;
  };

  const handleSaveBulletin = (formData: any) => {
    const newBulletin: IBulletin = {
      id: `BUL-${String(bulletins.length + 1).padStart(3, "0")}`,
      title: formData.title,
      description: formData.description,
      status: "draft",
      priority: formData.priority,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      assignedTo: "Unassigned",
      progress: 0,
      scheduledDate: formData.scheduledDate,
      categories: formData.selectedCategories,
      engineers: formData.selectedEngineers,
      skills: formData.selectedSkills,
      questions: formData.questions,
      answers: formData.answers,
      followUpDays: formData.followUpDays,
      passRate: formData.passRate,
      reportRecipients: formData.reportRecipients,
      reportNotes: formData.reportNotes,
    };

    setBulletins((prev) => [...prev, newBulletin]);
    setShowCreateModal(false);
    setProcessedContent(null);
    setUploadedFile(null);
  };
  useEffect(() => {
    console.log(selectedBulletin);
  }, [selectedBulletin]);

  return (
    <>
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between mb-[20px]">
        <div className="mb-[20px]">
          <h2 className="text-2xl font-semibold text-primary mb-[10px]">
            Technical & Safety Bulletins
          </h2>
          <p className="text-white">Manage and track bulletin updates</p>
        </div>

        <div className="sm:flex sm:gap-3 ">
          <CustomButton
            extraStyles={"mb-[10px] sm:mb-0 w-full sm:w-auto flex items-center justify-center"}
            styleType={"gray"}
            icon={<Upload className="w-5 h-5 mr-[6px] inline-block" />}
            title="Upload Document"
            onClick={() => setShowUploadModal(true)}
          />
          <CustomButton
            extraStyles={" w-full sm:w-auto flex items-center justify-center"}
            styleType={"primary"}
            icon={<Plus className="w-5 h-5 mr-[6px]" />}
            title="Create Blank"
            onClick={handleCreateNew}
          />
        </div>
      </div>
      {/* Bulletins List */}
      <div className="grid gap-4">
        {bulletins.map((item: IBulletin, index) => (
          <BulletinsCard
            setSelectedBulletin={setSelectedBulletin}
            itemData={item}
            key={index}
          />
        ))}
      </div>

      {/* Upload Modal */}
      <Modal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        title="Upload Document"
        size="md"
      >
        <div className="space-y-6">
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileSelect}
            className="hidden"
            accept=".pdf,.doc,.docx,.txt"
          />

          {isProcessing ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-lg font-medium text-cyan-400">
                Processing document...
              </p>
              <p className="text-sm text-gray-400 mt-2">
                This may take a few moments
              </p>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-700 rounded-lg p-12 text-center cursor-pointer hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-colors"
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium">Upload a document</p>
              <p className="text-sm text-gray-400 mt-2">
                PDF, Word, or Text files up to 10MB
              </p>
              <p className="text-xs text-gray-500 mt-4">
                The document will be processed by AI to generate bulletin
                content
              </p>
            </div>
          )}
        </div>
      </Modal>

      {/* Create/Edit Modal */}
      <BulletinModal
        isOpen={showCreateModal || !!selectedBulletin}
        onClose={() => {
          setShowCreateModal(false);
          setSelectedBulletin(null);
        }}
        bulletin={selectedBulletin || processedContent || undefined}
        uploadedFile={uploadedFile}
        onSave={handleSaveBulletin}
      />
    </>
  );
};
