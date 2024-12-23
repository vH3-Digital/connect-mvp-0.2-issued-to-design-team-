import React, { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Users,
  Briefcase,
  MessageSquare,
  Book,
  HelpCircle,
  Settings,
  AlertCircle,
  Hexagon,
  Phone,
  GitBranch,
  MessageCircle,
  Link2,
  Menu,
  X,
  Wrench,
  TrendingUp,
  ClipboardList,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";
import { UserProfile } from "./components/user-profile";

interface SidebarProps {
  onNavigate: (view: string) => void;
  activeView: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ onNavigate, activeView }) => {
  const [showProfile, setShowProfile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  const menuItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "jobs", icon: ClipboardList, label: "Jobs" },
    { id: "bulletins", icon: AlertCircle, label: "Bulletins" },
    { id: "engineers", icon: Users, label: "Engineers" },
    { id: "resources", icon: Wrench, label: "Resources" },
    { id: "agents", icon: Briefcase, label: "Agents" },
    { id: "messages", icon: MessageSquare, label: "Messages" },
    { id: "chats", icon: MessageCircle, label: "Chats" },
    { id: "calls", icon: Phone, label: "Call Log" },
    { id: "workflows", icon: GitBranch, label: "Workflows" },
    { id: "sales", icon: TrendingUp, label: "Sales Performance" },
    { id: "knowledge", icon: Book, label: "Knowledge Base" },
    { id: "integrations", icon: Link2, label: "Integrations" },
    { id: "support", icon: HelpCircle, label: "Support" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  const getDisplayName = () => {
    if (!user) return "";
    if (user.first_name && user.last_name) {
      return `${user.first_name} ${user.last_name}`;
    }
    return user.email;
  };

  const handleNavigate = (view: string) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>
      <aside
        className={`
        fixed overflow-y-auto no-scrollbar  inset-y-0 left-0 z-40 w-64 bg-bgSecondary p-4 flex flex-col justify-between
        transform transition-transform duration-300 ease-in-out
        ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }
      `}
      >
        <div className="">
          <div className="w-full p-4 flex items-center justify-center">
            <img
              src="https://cdn.prod.website-files.com/66f62ac0b4dbc96bb348eb73/66f646494a2921204a349922_vh3-connect-logo-p-500.png"
              alt="VH3 CONNECT"
              className="h-full w-full object-contain"
            />
          </div>
          <nav className="flex-1 mt-6">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavigate(item.id)}
                    className={`w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition-all ${
                      activeView === item.id
                        ? "bg-primary/20 text-white"
                        : "text-gray-400 hover:bg-primary/10"
                    }`}
                  >
                    <item.icon className={`w-5 h-5 ${activeView === item.id ? "text-primary" : "text-gray-400"}`  } />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-800">
          {user && (
            <button
              onClick={() => setShowProfile(true)}
              className="w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm text-gray-400 transition-all hover:bg-background"
            >
              {user.profile_picture ? (
                <img
                  src={user.profile_picture.url}
                  alt={getDisplayName()}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-300">
                    {user.first_name?.charAt(0) || user.email?.charAt(0)}
                  </span>
                </div>
              )}
              <div className="text-left">
                <div className="font-medium">{getDisplayName()}</div>
                <div className="text-xs text-gray-500">{user.email}</div>
              </div>
            </button>
          )}
        </div>
      </aside>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
      <UserProfile isOpen={showProfile} onClose={() => setShowProfile(false)} />
    </>
  );
};
