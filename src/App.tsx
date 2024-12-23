import React from 'react';
import { useAuth } from './contexts/AuthContext';
import { Auth } from './components/Auth';
import { KnowledgeBase } from './components/KnowledgeBase';
import { Agents } from './components/Agents';
import { Engineers } from './components/Engineers';
import { Resources } from './components/Resources';
import { MessageCard } from './components/MessageCard';
// import { ChatPanel } from './components/ChatPanel';
import { SettingsPanel } from './components/SettingsPanel';
import { Header } from './components/Header';
import { BulletinsPanel } from './components/BulletinsPanel';
import { LoadingScreen } from './components/LoadingScreen';
import { CallLog } from './components/CallLog';
import { Workflows } from './components/Workflows';
import { Chats } from './components/Chats';
import { Integrations } from './components/Integrations';
import { SalesPerformance } from './components/sales/SalesPerformance';
import { messages } from './data';
import { Sidebar } from './widgets/sidebar/sidebar';
import { Jobs } from './pages/jobs/jobs';
import { Dashboard } from './pages/dashboard/dashboard';

const mockSalesData = {
  related_sales_opportunities: [],
  review_of_sales_data: "Sales Performance Report...",
  totals: {
    number_of_deals: 25,
    total_value_of_deals: 30764.51,
    total_cost_of_deals: 19199.74,
    total_profit_of_deals: 6437.58
  }
};

export function App() {
  const { user, loading } = useAuth();
  const [activeView, setActiveView] = React.useState('dashboard');

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Auth />;
  }

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'jobs':
        return <Jobs />;
      case 'bulletins':
        return <BulletinsPanel />;
      case 'engineers':
        return <Engineers />;
      case 'resources':
        return <Resources />;
      case 'agents':
        return <Agents />;
      case 'messages':
        return (
          <div className="grid grid-cols-1 gap-4">
            {messages.map((message) => (
              <MessageCard
                key={message.id}
                name={message.sender}
                message={message.preview}
                category={message.category}
                status={message.status}
                imageUrl={message.avatar}
                onClick={() => {}}
              />
            ))}
          </div>
        );
      case 'chats':
        return <Chats />;
      case 'calls':
        return <CallLog />;
      case 'workflows':
        return <Workflows />;
      case 'sales':
        return <SalesPerformance data={mockSalesData} />;
      case 'integrations':
        return <Integrations />;
      case 'knowledge':
        return <KnowledgeBase />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-[100vh] bg-background text-white">
      <Sidebar onNavigate={setActiveView} activeView={activeView} />
      <div className="lg:pl-64">
        <Header />
        <main className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto p-6">
  
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}