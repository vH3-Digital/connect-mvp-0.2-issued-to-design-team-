import React, { useState, useEffect } from 'react';
import { AgentCard } from './AgentCard';
import { LoadingScreen } from './LoadingScreen';
import { agentsApi } from '../services/agents';
import { Agent } from '../types/agents';

export const Agents: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAgents = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await agentsApi.getAgents();
        // Sort agents by ID in ascending order
        const sortedAgents = [...data].sort((a, b) => a.id - b.id);
        setAgents(sortedAgents);
      } catch (err: any) {
        console.error('Failed to load agents:', err);
        setError(err.message || 'Failed to load agents');
      } finally {
        setLoading(false);
      }
    };

    loadAgents();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-cyan-400">AI Agents</h2>
        <p className="text-gray-400">Your virtual assistance team</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
};