import React, { useState, useRef } from 'react';
import { Plus, FileText, Upload, Clock, AlertCircle, ChevronRight, Calendar, Users, CheckCircle2 } from 'lucide-react';
import { BulletinModal } from './BulletinModal';
import { Modal } from './Modal';
import { format } from 'date-fns';

interface Bulletin {
  id: string;
  title: string;
  status: 'draft' | 'review' | 'approved' | 'scheduled';
  priority: 'high' | 'medium' | 'low';
  createdAt: string;
  updatedAt: string;
  assignedTo: string;
  progress: number;
  scheduledDate?: string;
  description?: string;
  categories?: string[];
  engineers?: string[];
  skills?: string[];
  questions?: string[];
  answers?: string[];
  documents?: File[];
  followUpDays?: number;
  passRate?: number;
  reportRecipients?: string[];
  reportNotes?: string;
}

const mockBulletins: Bulletin[] = [
  {
    id: 'BUL-001',
    title: 'HVAC System Safety Protocol Update',
    status: 'review',
    priority: 'high',
    createdAt: '2024-03-15',
    updatedAt: '2024-03-16',
    assignedTo: 'John Smith',
    progress: 75,
    scheduledDate: '2024-04-01',
    followUpDays: 7,
    passRate: 85,
    categories: ['HVAC', 'Safety'],
    engineers: ['ENG-001', 'ENG-002']
  },
  {
    id: 'BUL-002',
    title: 'Electrical Installation Guidelines v2',
    status: 'draft',
    priority: 'medium',
    createdAt: '2024-03-14',
    updatedAt: '2024-03-14',
    assignedTo: 'Emily Brown',
    progress: 30,
    scheduledDate: '2024-03-25',
    followUpDays: 5,
    passRate: 90,
    categories: ['Electrical', 'Installation'],
    engineers: ['ENG-003']
  }
];

export const BulletinsPanel: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedBulletin, setSelectedBulletin] = useState<Bulletin | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedContent, setProcessedContent] = useState<Partial<Bulletin> | null>(null);
  const [bulletins, setBulletins] = useState<Bulletin[]>(mockBulletins);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd/MM/yy');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-400';
      case 'review': return 'text-yellow-400';
      case 'scheduled': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-400/20 text-red-400';
      case 'medium': return 'bg-yellow-400/20 text-yellow-400';
      case 'low': return 'bg-green-400/20 text-green-400';
      default: return 'bg-gray-400/20 text-gray-400';
    }
  };

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
    let content: Partial<Bulletin> = {
      title: file.name.split('.')[0].replace(/[-_]/g, ' '),
      description: `This comprehensive update introduces critical changes to our operational procedures, effective immediately. The document outlines enhanced measures, updated protocols, and revised guidelines.`,
      questions: [
        'What are the key changes introduced in this update?',
        'How will these changes affect daily operations?',
        'What are the implementation timelines?'
      ],
      answers: [
        'The update includes new safety protocols, revised documentation requirements, and updated emergency procedures.',
        'Daily operations will require additional verification steps and enhanced monitoring.',
        'Implementation begins immediately with a 2-week training period.'
      ],
      categories: ['Safety', 'Compliance', 'Training'],
      engineers: ['ENG-001', 'ENG-002'],
      skills: ['Safety Protocols', 'Emergency Response', 'Risk Assessment'],
      followUpDays: 7,
      passRate: 85
    };
    return content;
  };

  const handleSaveBulletin = (formData: any) => {
    const newBulletin: Bulletin = {
      id: `BUL-${String(bulletins.length + 1).padStart(3, '0')}`,
      title: formData.title,
      description: formData.description,
      status: 'draft',
      priority: formData.priority,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      assignedTo: 'Unassigned',
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
      reportNotes: formData.reportNotes
    };

    setBulletins(prev => [...prev, newBulletin]);
    setShowCreateModal(false);
    setProcessedContent(null);
    setUploadedFile(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-cyan-400">Technical & Safety Bulletins</h2>
          <p className="text-gray-400">Manage and track bulletin updates</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-gray-700 text-white rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-gray-600 transition-all"
          >
            <Upload className="w-5 h-5" />
            Upload Document
          </button>
          <button
            onClick={handleCreateNew}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg px-4 py-2 flex items-center gap-2 hover:from-cyan-600 hover:to-blue-600 transition-all"
          >
            <Plus className="w-5 h-5" />
            Create Blank
          </button>
        </div>
      </div>

      {/* Bulletins List */}
      <div className="grid gap-4">
        {bulletins.map((bulletin) => (
          <div
            key={bulletin.id}
            onClick={() => setSelectedBulletin(bulletin)}
            className="card hover:bg-gray-800/50 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-gray-700 rounded-lg">
                  <FileText className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium">{bulletin.title}</h3>
                    <span className={`text-sm ${getStatusColor(bulletin.status)} capitalize`}>
                      • {bulletin.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-sm text-gray-400">ID: {bulletin.id}</span>
                    <span className="text-sm text-gray-400">•</span>
                    <span className="text-sm text-gray-400">Updated: {formatDate(bulletin.updatedAt)}</span>
                    <span className="text-sm text-gray-400">•</span>
                    <span className="text-sm text-gray-400">Assigned to: {bulletin.assignedTo}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {bulletin.categories?.map((category) => (
                      <span key={category} className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300">
                        {category}
                      </span>
                    ))}
                    {bulletin.followUpDays && (
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {bulletin.followUpDays}d follow-up
                      </span>
                    )}
                    {bulletin.passRate && (
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        {bulletin.passRate}% pass rate
                      </span>
                    )}
                    {bulletin.engineers && (
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {bulletin.engineers.length} engineers
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs ${getPriorityColor(bulletin.priority)}`}>
                  {bulletin.priority}
                </span>
                {bulletin.scheduledDate && (
                  <span className="flex items-center gap-1 text-sm text-gray-400">
                    <Calendar className="w-4 h-4" />
                    {formatDate(bulletin.scheduledDate)}
                  </span>
                )}
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Progress</span>
                <span className="text-cyan-400">{bulletin.progress}%</span>
              </div>
              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                  style={{ width: `${bulletin.progress}%` }}
                />
              </div>
            </div>
          </div>
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
              <p className="text-lg font-medium text-cyan-400">Processing document...</p>
              <p className="text-sm text-gray-400 mt-2">This may take a few moments</p>
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
                The document will be processed by AI to generate bulletin content
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
    </div>
  );
};