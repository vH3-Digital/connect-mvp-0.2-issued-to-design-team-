import React from 'react';
import { Search, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Header: React.FC = () => {
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getInitial = () => {
    if (!user) return '';
    return user.first_name?.charAt(0) || user.email?.charAt(0) || '';
  };

  const getDisplayName = () => {
    if (!user) return '';
    if (user.first_name && user.last_name) {
      return `${user.first_name} ${user.last_name}`;
    }
    return user.email;
  };

  if (!user) return null;

  return (
    <header className="h-16 border-b border-gray-800 px-6 flex items-center justify-between">
      <div className="relative flex-1 max-w-2xl">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search for contacts, reports..."
          className="w-full bg-gray-800 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            {user.profile_picture ? (
              <img
                src={user.profile_picture.url}
                alt={getDisplayName()}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-300">
                  {getInitial()}
                </span>
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-sm font-medium">{getDisplayName()}</span>
              <span className="text-xs text-gray-400">{user.email}</span>
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </header>
  );
};