// sidebar start
export interface IModal {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  text?: string | null;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xlg";
}


// sidebar end
// jobs page start
export interface IJob {
  JobId: number;
  Ref: string;
  Type: string;
  Category: string;
  Contact: string;
  ContactId: number;
  ContactGoupId: number;
  Postcode: string;
  Location: string;
  JobContactLatitude: number;
  JobContactLongitude: number;
  Resource: string;
  Asset: string;
  PlannedStart: string;
  Duration: string;
  Status: string;
  StatusDate: string;
  RealStart: string;
  RealEnd: string;
  RealDuration: string;
  DrivingDur: string;
  Description: string;
  DrivingDist: number;
  PrintName: string;
  CustNote: string;
  ResNote: string;
  Actioned: string;
  JobPO: string | null;
  JobContractId: string | null;
  Created: string;
  Scheduled: string;
  CurrentFlag: string | null;
  Assistants:
    | {
        ResourceId: number;
        ResourceName: string;
        Start?: string;
        End?: string;
      }[]
    | null;
  ContactParentId: number | null;
  StatusComment: string;
  JobTypeId: number;
  JobCategoryId: number;
}
export interface IJobList {
  searchQuery: string;
  selectedFilters: string[];
}
export interface IJobModal {
  isOpen: boolean;
  onClose: () => void;
  job: IJob;
}
export interface IJobCard {
  job: IJob;
}
// jobs page end
// dashboard start
export interface IDashboardStats {
  total_calls: number;
  tokens: number;
  customer_feedback_calls: number;
  knowledge_base_items: string;
  agent_call_time: number;
  reschedules_handled: number;
}
export interface IDashboardStatsCard {
  title: string;
  value: string;
  trend?: string;
  gradient: string;
}
// dashboard end
export interface IBulletin {
  id: string;
  title: string;
  status: "draft" | "review" | "approved" | "scheduled";
  priority: "high" | "medium" | "low";
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
// bulletins end
export interface IDocumentItem {
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
