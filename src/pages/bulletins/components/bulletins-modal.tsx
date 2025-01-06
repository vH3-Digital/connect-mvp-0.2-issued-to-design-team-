import React, { useState, useEffect } from "react";
import { Plus, Trash2, ChevronDown } from "lucide-react";
import { Modal } from "../../../widgets/modal/modal";
import { FormField } from "../../../widgets/form-field";
import { Textarea } from "../../../widgets/textarea";
import { AnimatePresence, motion } from "framer-motion";
import { CustomSelect } from "../../../widgets/custom-select";
import { DateInput } from "../../../widgets/date-input";
import { TimeInput } from "../../../widgets/time-input";
import { NumberField } from "../../../widgets/number-field";
import { Checkbox } from "../../../widgets/checkbox";
import { CustomButton } from "../../../widgets/custom-button";
import { RangeSlider } from "../../../widgets/range-slider";

interface BulletinModalProps {
  isOpen: boolean;
  onClose: () => void;
  bulletin?: any;
  uploadedFile?: File | null;
  onSave: (formData: any) => void;
}
const priorityList = [{ value: "High" }, { value: "Medium" }, { value: "Low" }];
const categories = [
  "HVAC",
  "Plumbing",
  "Electrical",
  "Mechanical",
  "Civil",
  "Structural",
];

const engineers = [
  { id: "ENG-001", name: "John Smith" },
  { id: "ENG-002", name: "Emily Brown" },
  { id: "ENG-003", name: "Michael Johnson" },
];

const skillTags = [
  "HVAC Installation",
  "System Maintenance",
  "Safety Protocols",
  "Electrical Systems",
  "Circuit Design",
  "Safety Standards",
  "Plumbing Systems",
  "Emergency Repairs",
  "Preventive Maintenance",
];

interface ReportRecipient {
  id: string;
  name: string;
  email: string;
  role: string;
}

const reportRecipients: ReportRecipient[] = [
  {
    id: "mgr-1",
    name: "Sarah Manager",
    email: "sarah@vh3.com",
    role: "Manager",
  },
  {
    id: "sup-1",
    name: "Tom Supervisor",
    email: "tom@vh3.com",
    role: "Supervisor",
  },
  {
    id: "coord-1",
    name: "Alice Coordinator",
    email: "alice@vh3.com",
    role: "Coordinator",
  },
];
interface IFormState {
  title: string;
  description: string;
  priority: string;
  selectedCategories: string[];
  selectedEngineers: string[];
  selectedSkills: string[];
  documents: File[];
  questions: string[];
  answers: string[];
  scheduledDate: string; // Ensure this matches your expected type
  scheduledTime: string | null;
  followUpDays: number;
  passRate: number;
  reportRecipients: string[];
  reportNotes: string;
  includeResponses: boolean;
  includeAnalytics: boolean;
}
export const BulletinModal: React.FC<BulletinModalProps> = ({
  isOpen,
  onClose,
  bulletin,
  uploadedFile,
  onSave,
}) => {
  const [form, setForm] = useState<IFormState>({
    title: "",
    description: "",
    priority: "",
    selectedCategories: [] as string[],
    selectedEngineers: [] as string[],
    selectedSkills: [] as string[],
    documents: [] as File[],
    questions: [""],
    answers: [""],
    scheduledDate: "",
    scheduledTime: "12:00",
    followUpDays: 7,
    passRate: 85,
    reportRecipients: [] as string[],
    reportNotes: "",
    includeResponses: true,
    includeAnalytics: true,
  });
  // Handle file upload processing
  useEffect(() => {
    if (uploadedFile) {
      // Generate AI content based on file
      const fileName = uploadedFile.name.split(".")[0].replace(/[-_]/g, " ");
      setForm((prev) => ({
        ...prev,
        title: fileName,
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
      }));
    }
  }, [uploadedFile]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description) return;

    onSave({
      ...form,
      documents: uploadedFile ? [uploadedFile] : form.documents,
    });
  };
  console.log(form.priority);
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={bulletin ? "Edit Bulletin" : "Create New Bulletin"}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="">
        {/* Basic Information */}
        <FormField
          type="text"
          label="Title"
          value={form?.title}
          placeholder="Enter bulletin title"
          required={true}
          containerStyles="mb-6"
          onChange={(e) =>
            setForm((prev) => ({ ...prev, title: e.target.value }))
          }
        />{" "}
        <Textarea
          rows={5}
          label="Description"
          value={form.description}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, description: e.target.value }))
          }
          placeholder="Enter bulletin description"
          containerStyles="mb-6"
          required={true}
        />
        <div className="mb-6">
          <div className="sm:flex gap-4">
            <div className="sm:w-[40%] mb-4 sm:mb-0">
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Priority
              </label>
              <CustomSelect
                onChange={(item: { value: string }) =>
                  setForm((prev) => ({ ...prev, priority: item.value }))
                }
                selected={priorityList[1]}
                list={priorityList}
              />
            </div>
            <div className="sm:flex sm:w-[60%] gap-2">
              <DateInput
                containerStyles={"sm:w-[60%] mb-4 sm:mb-0"}
                label="Scheduled date"
                value={form.scheduledDate ? new Date(form.scheduledDate) : null}
                onChange={(date) =>
                  setForm((prev) => ({
                    ...prev,
                    scheduledDate: date ? date.toISOString() : "",
                  }))
                }
              />
              <TimeInput
                containerStyles={"sm:w-[40%]"}
                label="Scheduled time"
                value={form.scheduledTime}
                onChange={(newValue) =>
                  setForm((prev) => ({
                    ...prev,
                    scheduledTime: newValue,
                  }))
                }
              />
            </div>
          </div>
        </div>
        {/* Distribution Options */}
        <Accordion title={"Distribution Options"}>
          {/* Categories */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              By Category
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    const categories = form.selectedCategories.includes(
                      category
                    )
                      ? form.selectedCategories.filter((c) => c !== category)
                      : [...form.selectedCategories, category];
                    setForm((prev) => ({
                      ...prev,
                      selectedCategories: categories,
                    }));
                  }}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    form.selectedCategories.includes(category)
                      ? "bg-cyan-500/20 text-primary ring-2 ring-primary"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          {/* Engineers */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              By Engineer
            </label>
            <div className="flex flex-wrap gap-2">
              {engineers.map((engineer) => (
                <button
                  key={engineer.id}
                  type="button"
                  onClick={() => {
                    const engineers = form.selectedEngineers.includes(
                      engineer.id
                    )
                      ? form.selectedEngineers.filter(
                          (id) => id !== engineer.id
                        )
                      : [...form.selectedEngineers, engineer.id];
                    setForm((prev) => ({
                      ...prev,
                      selectedEngineers: engineers,
                    }));
                  }}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    form.selectedEngineers.includes(engineer.id)
                      ? "bg-cyan-500/20 text-primary ring-2 ring-primary"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {engineer.name}
                </button>
              ))}
            </div>
          </div>
          {/* Skills */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              By Skill
            </label>
            <div className="flex flex-wrap gap-2">
              {skillTags.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => {
                    const skills = form.selectedSkills.includes(skill)
                      ? form.selectedSkills.filter((s) => s !== skill)
                      : [...form.selectedSkills, skill];
                    setForm((prev) => ({
                      ...prev,
                      selectedSkills: skills,
                    }));
                  }}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    form.selectedSkills.includes(skill)
                      ? "bg-cyan-500/20 text-primary ring-2 ring-primary"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        </Accordion>
        {/* Follow-up Configuration */}
        <Accordion title={"Follow-up Configuration"}>
          <div className="grid grid-cols-2 gap-4">
            <NumberField
              type="number"
              required={true}
              placeholder="0"
              label="Follow-up Days"
              value={form.followUpDays}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  followUpDays: parseInt(e.target.value) || 0,
                }))
              }
            />
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-3">
                Required Pass Rate (%)
              </label>
              <div className="flex items-center ">
                <RangeSlider
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      passRate: parseInt(e.target.value),
                    }))
                  }
                  value={form.passRate}
                  min={0}
                  max={100}
                />
                <div className="text-center text-sm text-gray-400 ml-2">
                  {form.passRate}%
                </div>
              </div>
            </div>
          </div>
        </Accordion>
        {/* Questions */}
        <Accordion title={"Comprehension Questions"}>
          {form.questions.map((question, index) => (
            <div key={index} className="mb-4">
              <div className="flex mb-4">
                <FormField
                  containerStyles=" flex-1"
                  type="text"
                  value={question}
                  placeholder="Enter question"
                  onChange={(e) => {
                    const newQuestions = [...form.questions];
                    newQuestions[index] = e.target.value;
                    setForm((prev) => ({
                      ...prev,
                      questions: newQuestions,
                    }));
                  }}
                />
                {form.questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      const newQuestions = form.questions.filter(
                        (_, i) => i !== index
                      );
                      const newAnswers = form.answers.filter(
                        (_, i) => i !== index
                      );
                      setForm((prev) => ({
                        ...prev,
                        questions: newQuestions,
                        answers: newAnswers,
                      }));
                    }}
                    className="text-red-400 hover:text-red-300 ml-2"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
              <FormField
                containerStyles="mb-4 flex-1"
                type="text"
                value={form.answers[index] || ""}
                onChange={(e) => {
                  const newAnswers = [...form.answers];
                  newAnswers[index] = e.target.value;
                  setForm((prev) => ({ ...prev, answers: newAnswers }));
                }}
                placeholder="Enter answer"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              setForm((prev) => ({
                ...prev,
                questions: [...prev.questions, ""],
                answers: [...prev.answers, ""],
              }));
            }}
            className="text-cyan-400 hover:text-primary text-sm flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Add Question
          </button>
        </Accordion>
        {/* Reports */}
        <Accordion title={" Report Configuration"}>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Report Recipients
            </label>
            <div className="mb-[20px]">
              {reportRecipients.map((recipient) => (
                <div
                  key={recipient.id}
                  className="mb-[10px] relative last:mb-0 flex items-center"
                >
                  <Checkbox
                    checked={form.reportRecipients.includes(recipient.id)}
                    onChange={(e) => {
                      const recipients = e.target.checked
                        ? [...form.reportRecipients, recipient.id]
                        : form.reportRecipients.filter(
                            (id) => id !== recipient.id
                          );
                      setForm((prev) => ({
                        ...prev,
                        reportRecipients: recipients,
                      }));
                    }}
                  />
                  <div className="ml-[8px]">
                    <div className="text-sm">{recipient.name}</div>
                    <div className="text-xs text-gray-400">
                      {recipient.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-[10px]">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Additional Notes
            </label>
            <Textarea
              value={form.reportNotes}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  reportNotes: e.target.value,
                }))
              }
              placeholder="Add any specific instructions or notes for the report..."
            />
          </div>
          <div className="">
            <div className="flex items-center relative mb-[10px]">
              <Checkbox
                checked={form.includeResponses}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    includeResponses: e.target.checked,
                  }))
                }
              />
              <span className="text-sm text-gray-400 inline-block ml-[8px]">
                Include individual responses
              </span>
            </div>

            <div className="flex items-center relative ">
              <Checkbox
                checked={form.includeAnalytics}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    includeAnalytics: e.target.checked,
                  }))
                }
              />
              <span className="text-sm text-gray-400 inline-block ml-[8px]">
                Include analytics and trends
              </span>
            </div>
          </div>
        </Accordion>
        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <CustomButton onClick={onClose} styleType={"gray"} title="Cancel" />
          {bulletin ? (
            <CustomButton
              styleType={"primary"}
              onClick={() => {}}
              title="Update Bulletin"
            />
          ) : (
            <CustomButton onClick={() => {}} title="Create Bulletin" />
          )}
        </div>
      </form>
    </Modal>
  );
};
const Accordion = ({
  title,
  children,
}: {
  title?: string | null;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="mb-6">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-lg font-medium"
      >
        <span
          className={`flex items-center justify-center ${
            isOpen ? "-rotate-90" : ""
          }`}
        >
          <ChevronDown className="w-5 h-5" />
        </span>
        {title}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mt-4 sm:pl-7"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
