import React from 'react';

export const SettingsPanel = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-cyan-400">Language Preferences</h2>
        <select className="search-bar">
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6 text-cyan-400">Theme Settings</h2>
        <div className="flex space-x-4">
          <label className="flex items-center space-x-2">
            <input type="radio" name="theme" defaultChecked className="text-cyan-400" />
            <span>Dark Theme</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="radio" name="theme" className="text-cyan-400" />
            <span>Light Theme</span>
          </label>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6 text-cyan-400">Account Security</h2>
        <div className="space-y-4">
          <input
            type="password"
            placeholder="Enter New Password"
            className="search-bar"
          />
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="text-cyan-400" />
            <span>Enable Two-Factor Authentication</span>
          </label>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6 text-cyan-400">Notification Settings</h2>
        <div className="space-y-4">
          <label className="flex items-center space-x-2">
            <input type="checkbox" defaultChecked className="text-cyan-400" />
            <span>Email Notifications</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="text-cyan-400" />
            <span>SMS Notifications</span>
          </label>
        </div>
      </section>

      <div className="flex space-x-4 pt-6">
        <button className="px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg font-medium">
          Apply Changes
        </button>
        <button className="px-6 py-2 bg-gray-700 rounded-lg font-medium">
          Discard
        </button>
      </div>
    </div>
  );
};