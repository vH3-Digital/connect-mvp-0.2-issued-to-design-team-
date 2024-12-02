import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { Upload, Plus, Trash2, ChevronDown, ChevronRight, User } from 'lucide-react';

interface BulletinModalProps {
  isOpen: boolean;
  onClose: () => void;
  bulletin?: any;
  uploadedFile?: File | null;
  onSave: (formData: any) => void;
}

const categories = [
  'HVAC',
  'Plumbing',
  'Electrical',
  'Mechanical',
  'Civil',
  'Structural'
];

const engineers = [
  { id: 'ENG-001', name: 'John Smith' },
  { id: 'ENG-002', name: 'Emily Brown' },
  { id: 'ENG-003', name: 'Michael Johnson' }
];

const skillTags = [
  'HVAC Installation',
  'System Maintenance',
  'Safety Protocols',
  'Electrical Systems',
  'Circuit Design',
  'Safety Standards',
  'Plumbing Systems',
  'Emergency Repairs',
  'Preventive Maintenance'
];

interface ReportRecipient {
  id: string;
  name: string;
  email: string;
  role: string;
}

const reportRecipients: ReportRecipient[] = [
  { id: 'mgr-1', name: 'Sarah Manager', email: 'sarah@vh3.com', role: 'Manager' },
  { id: 'sup-1', name: 'Tom Supervisor', email: 'tom@vh3.com', role: 'Supervisor' },
  { id: 'coord-1', name: 'Alice Coordinator', email: 'alice@vh3.com', role: 'Coordinator' }
];

export const BulletinModal: React.FC<BulletinModalProps> = ({
  isOpen,
  onClose,
  bulletin,
  uploadedFile,
  onSave
}) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
    selectedCategories: [] as string[],
    selectedEngineers: [] as string[],
    selectedSkills: [] as string[],
    documents: [] as File[],
    questions: [''],
    answers: [''],
    scheduledDate: '',
    scheduledTime: '09:00',
    followUpDays: 7,
    passRate: 85,
    reportRecipients: [] as string[],
    reportNotes: '',
    includeResponses: true,
    includeAnalytics: true
  });

  // Section visibility states
  const [showDistribution, setShowDistribution] = useState(true);
  const [showQuestions, setShowQuestions] = useState(true);
  const [showFollowUp, setShowFollowUp] = useState(true);
  const [showReports, setShowReports] = useState(true);

  // Handle file upload processing
  useEffect(() => {
    if (uploadedFile) {
      // Generate AI content based on file
      const fileName = uploadedFile.name.split('.')[0].replace(/[-_]/g, ' ');
      setForm(prev => ({
        ...prev,
        title: fileName,
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
        ]
      }));
    }
  }, [uploadedFile]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description) return;

    onSave({
      ...form,
      documents: uploadedFile ? [uploadedFile] : form.documents
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={bulletin ? 'Edit Bulletin' : 'Create New Bulletin'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Title
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Enter bulletin title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 h-32 resize-none"
              placeholder="Enter bulletin description"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Priority
              </label>
              <select
                value={form.priority}
                onChange={(e) => setForm(prev => ({ ...prev, priority: e.target.value }))}
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Schedule Date
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={form.scheduledDate}
                  onChange={(e) => setForm(prev => ({ ...prev, scheduledDate: e.target.value }))}
                  className="bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <input
                  type="time"
                  value={form.scheduledTime}
                  onChange={(e) => setForm(prev => ({ ...prev, scheduledTime: e.target.value }))}
                  className="bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Distribution Options */}
        <div className="space-y-4">
          <button
            type="button"
            onClick={() => setShowDistribution(!showDistribution)}
            className="flex items-center gap-2 text-lg font-medium"
          >
            {showDistribution ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            Distribution Options
          </button>
          
          {showDistribution && (
            <div className="space-y-4 pl-4">
              {/* Categories */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  By Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => {
                        const categories = form.selectedCategories.includes(category)
                          ? form.selectedCategories.filter(c => c !== category)
                          : [...form.selectedCategories, category];
                        setForm(prev => ({ ...prev, selectedCategories: categories }));
                      }}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        form.selectedCategories.includes(category)
                          ? 'bg-cyan-500/20 text-cyan-300 ring-2 ring-cyan-500'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Engineers */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  By Engineer
                </label>
                <div className="flex flex-wrap gap-2">
                  {engineers.map(engineer => (
                    <button
                      key={engineer.id}
                      type="button"
                      onClick={() => {
                        const engineers = form.selectedEngineers.includes(engineer.id)
                          ? form.selectedEngineers.filter(id => id !== engineer.id)
                          : [...form.selectedEngineers, engineer.id];
                        setForm(prev => ({ ...prev, selectedEngineers: engineers }));
                      }}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        form.selectedEngineers.includes(engineer.id)
                          ? 'bg-cyan-500/20 text-cyan-300 ring-2 ring-cyan-500'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {engineer.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  By Skill
                </label>
                <div className="flex flex-wrap gap-2">
                  {skillTags.map(skill => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => {
                        const skills = form.selectedSkills.includes(skill)
                          ? form.selectedSkills.filter(s => s !== skill)
                          : [...form.selectedSkills, skill];
                        setForm(prev => ({ ...prev, selectedSkills: skills }));
                      }}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        form.selectedSkills.includes(skill)
                          ? 'bg-cyan-500/20 text-cyan-300 ring-2 ring-cyan-500'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Follow-up Configuration */}
        <div className="space-y-4">
          <button
            type="button"
            onClick={() => setShowFollowUp(!showFollowUp)}
            className="flex items-center gap-2 text-lg font-medium"
          >
            {showFollowUp ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            Follow-up Configuration
          </button>
          
          {showFollowUp && (
            <div className="space-y-4 pl-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Follow-up Days
                  </label>
                  <input
                    type="number"
                    value={form.followUpDays}
                    onChange={(e) => setForm(prev => ({ ...prev, followUpDays: parseInt(e.target.value) || 0 }))}
                    className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    min="1"
                    max="30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Required Pass Rate (%)
                  </label>
                  <input
                    type="range"
                    value={form.passRate}
                    onChange={(e) => setForm(prev => ({ ...prev, passRate: parseInt(e.target.value) }))}
                    className="w-full"
                    min="0"
                    max="100"
                    step="5"
                  />
                  <div className="text-center text-sm text-gray-400 mt-1">
                    {form.passRate}%
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Questions */}
        <div className="space-y-4">
          <button
            type="button"
            onClick={() => setShowQuestions(!showQuestions)}
            className="flex items-center gap-2 text-lg font-medium"
          >
            {showQuestions ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            Comprehension Questions
          </button>
          
          {showQuestions && (
            <div className="space-y-4 pl-4">
              {form.questions.map((question, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={question}
                      onChange={(e) => {
                        const newQuestions = [...form.questions];
                        newQuestions[index] = e.target.value;
                        setForm(prev => ({ ...prev, questions: newQuestions }));
                      }}
                      placeholder="Enter question"
                      className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                    {form.questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const newQuestions = form.questions.filter((_, i) => i !== index);
                          const newAnswers = form.answers.filter((_, i) => i !== index);
                          setForm(prev => ({
                            ...prev,
                            questions: newQuestions,
                            answers: newAnswers
                          }));
                        }}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    value={form.answers[index] || ''}
                    onChange={(e) => {
                      const newAnswers = [...form.answers];
                      newAnswers[index] = e.target.value;
                      setForm(prev => ({ ...prev, answers: newAnswers }));
                    }}
                    placeholder="Enter answer"
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  setForm(prev => ({
                    ...prev,
                    questions: [...prev.questions, ''],
                    answers: [...prev.answers, '']
                  }));
                }}
                className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Add Question
              </button>
            </div>
          )}
        </div>

        {/* Reports */}
        <div className="space-y-4">
          <button
            type="button"
            onClick={() => setShowReports(!showReports)}
            className="flex items-center gap-2 text-lg font-medium"
          >
            {showReports ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            Report Configuration
          </button>
          
          {showReports && (
            <div className="space-y-4 pl-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Report Recipients
                </label>
                <div className="space-y-2">
                  {reportRecipients.map(recipient => (
                    <label key={recipient.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={form.reportRecipients.includes(recipient.id)}
                        onChange={(e) => {
                          const recipients = e.target.checked
                            ? [...form.reportRecipients, recipient.id]
                            : form.reportRecipients.filter(id => id !== recipient.id);
                          setForm(prev => ({ ...prev, reportRecipients: recipients }));
                        }}
                        className="rounded border-gray-600 text-cyan-500 focus:ring-cyan-500"
                      />
                      <div>
                        <div className="text-sm">{recipient.name}</div>
                        <div className="text-xs text-gray-400">{recipient.role}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Additional Notes
                </label>
                <textarea
                  value={form.reportNotes}
                  onChange={(e) => setForm(prev => ({ ...prev, reportNotes: e.target.value }))}
                  placeholder="Add any specific instructions or notes for the report..."
                  className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 h-24 resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.includeResponses}
                    onChange={(e) => setForm(prev => ({ ...prev, includeResponses: e.target.checked }))}
                    className="rounded border-gray-600 text-cyan-500 focus:ring-cyan-500"
                  />
                  <span className="text-sm text-gray-400">Include individual responses</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.includeAnalytics}
                    onChange={(e) => setForm(prev => ({ ...prev, includeAnalytics: e.target.checked }))}
                    className="rounded border-gray-600 text-cyan-500 focus:ring-cyan-500"
                  />
                  <span className="text-sm text-gray-400">Include analytics and trends</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all"
          >
            {bulletin ? 'Update Bulletin' : 'Create Bulletin'}
          </button>
        </div>
      </form>
    </Modal>
  );
};