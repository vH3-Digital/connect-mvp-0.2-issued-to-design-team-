import React, { useState } from 'react';
import { Modal } from './Modal';
import { 
  Phone, 
  MessageSquare, 
  ArrowRight, 
  Settings,
  Briefcase,
  Map,
  Activity,
  BarChart3,
  Cloud,
} from 'lucide-react';
import { CustomerConfirmationConfig } from './workflows/CustomerConfirmationConfig';
import { FeedbackConfig } from './workflows/FeedbackConfig';
import { JobPrepConfig } from './workflows/JobPrepConfig';
import { RouteConfig } from './workflows/RouteConfig';
import { StatusConfig } from './workflows/StatusConfig';
import { SalesConfig } from './workflows/SalesConfig';

interface Workflow {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
}

const workflows: Workflow[] = [
  {
    id: 'customer-confirmation',
    name: 'Apointment Confirmation',
    description: 'Automated confirmation calls and rescheduling system',
    icon: Phone,
    color: 'from-purple-400 to-blue-500'
  },
  {
    id: 'feedback-collection',
    name: 'Feedback Collection',
    description: 'Collect and analyze customer feedback post-service',
    icon: MessageSquare,
    color: 'from-cyan-400 to-blue-500'
  },
  {
    id: 'job-prep',
    name: 'Engineer Briefing',
    description: 'Daily standup and pre-job briefings',
    icon: Briefcase,
    color: 'from-green-400 to-teal-500'
  },
  {
    id: 'route-optimization',
    name: 'Route Optimization',
    description: 'Dynamic route planning and traffic monitoring',
    icon: Map,
    color: 'from-blue-400 to-indigo-500'
  },
  {
    id: 'status-update',
    name: 'Status Updates',
    description: 'Real-time engineering activity tracking',
    icon: Activity,
    color: 'from-yellow-400 to-orange-500'
  },
  {
    id: 'sales-report',
    name: 'Sales Reports',
    description: 'Automated performance reporting system',
    icon: BarChart3,
    color: 'from-pink-400 to-rose-500'
  },
  {
    id: 'weather-watch',
    name: 'Weather Watch',
    description: 'Weather-based job monitoring and rescheduling',
    icon: Cloud,
    color: 'from-sky-400 to-blue-500'
  }
];

export const Workflows: React.FC = () => {
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  
  const renderConfigurationContent = (workflow: Workflow) => {
    switch (workflow.id) {
      case 'customer-confirmation':
        return <CustomerConfirmationConfig onClose={() => setSelectedWorkflow(null)} />;

      case 'feedback-collection':
        return <FeedbackConfig onClose={() => setSelectedWorkflow(null)} />;

      case 'job-prep':
        return <JobPrepConfig onClose={() => setSelectedWorkflow(null)} />;

      case 'route-optimization':
        return <RouteConfig onClose={() => setSelectedWorkflow(null)} />;

      case 'status-update':
        return <StatusConfig onClose={() => setSelectedWorkflow(null)} />;

      case 'sales-report':
        return <SalesConfig onClose={() => setSelectedWorkflow(null)} />;

      default:
        return (
          <div className="space-y-6">
            <p className="text-gray-400">
              Configuration options for this workflow will be implemented soon.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setSelectedWorkflow(null)}
                className="px-4 py-2 text-gray-400 hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-cyan-400">Workflows</h2>
        <p className="text-gray-400">Configure and manage automated workflows</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workflows.map((workflow) => (
          <div
            key={workflow.id}
            onClick={() => setSelectedWorkflow(workflow)}
            className="card hover:bg-gray-800/50 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${workflow.color}`}>
                <workflow.icon className="w-6 h-6 text-white" />
              </div>
              <button className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Settings className="w-5 h-5" />
              </button>
            </div>
            <h3 className="text-lg font-medium mt-4">{workflow.name}</h3>
            <p className="text-gray-400 text-sm mt-2">{workflow.description}</p>
            <div className="flex items-center gap-1 text-cyan-400 mt-4 text-sm group-hover:gap-2 transition-all">
              <span>Configure workflow</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      {selectedWorkflow && (
        <Modal
          isOpen={!!selectedWorkflow}
          onClose={() => setSelectedWorkflow(null)}
          title={`Configure ${selectedWorkflow.name}`}
          size="lg"
        >
          {renderConfigurationContent(selectedWorkflow)}
        </Modal>
      )}
    </div>
  );
};