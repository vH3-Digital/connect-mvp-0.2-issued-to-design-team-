import React, { useState, useEffect, useCallback } from 'react';
import { Mic, MicOff, Phone, PhoneOff } from 'lucide-react';
import { Modal } from './Modal';
import { BlandWebClient } from 'bland-client-js-sdk';
import { voiceChatService } from '../services/voiceChat';

interface VoiceChatProps {
  isOpen: boolean;
  onClose: () => void;
  agent: {
    id: string;
    name: string;
    avatar: string;
  };
}

export const VoiceChat: React.FC<VoiceChatProps> = ({
  isOpen,
  onClose,
  agent
}) => {
  const [client, setClient] = useState<BlandWebClient | null>(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);

  // Initialize client when modal opens
  useEffect(() => {
    let mounted = true;
    let blandClient: BlandWebClient | null = null;

    const initClient = async () => {
      if (!mounted) return;

      try {
        setIsInitializing(true);
        setError(null);

        // Get session details from API
        const session = await voiceChatService.getSession(agent.id);
        
        if (!mounted) return;

        // Initialize Bland client with API response
        blandClient = new BlandWebClient(session.agentId, session.sessionToken);
        
        // Add event listener for call termination
        blandClient.on('conversationEnded', () => {
          if (mounted) {
            setIsCallActive(false);
            setClient(null);
          }
        });
        
        setClient(blandClient);
      } catch (err: any) {
        if (mounted) {
          console.error('Failed to initialize client:', err);
          setError(err.message || 'Failed to initialize voice chat');
        }
      } finally {
        if (mounted) {
          setIsInitializing(false);
        }
      }
    };

    if (isOpen) {
      initClient();
    }

    // Cleanup function
    return () => {
      mounted = false;
      const cleanup = async () => {
        if (blandClient) {
          try {
            await blandClient.stopConversation();
            console.log('Conversation stopped successfully');
          } catch (err) {
            console.error('Error stopping conversation:', err);
          } finally {
            if (mounted) {
              setClient(null);
              setIsCallActive(false);
            }
          }
        }
      };

      cleanup();
    };
  }, [isOpen, agent.id]);

  const startCall = useCallback(async () => {
    if (!client) {
      setError('Voice chat not initialized');
      return;
    }

    try {
      setError(null);
      await client.initConversation({ 
        sampleRate: 44000, 
        bufferSize: 4096 
      });
      setIsCallActive(true);
      console.log('Call started successfully');
    } catch (err: any) {
      console.error('Failed to start call:', err);
      setError(err.message || 'Failed to start call');
      setIsCallActive(false);
    }
  }, [client]);

  const endCall = useCallback(async () => {
    if (!client) return;

    try {
      await client.stopConversation();
      setIsCallActive(false);
      console.log('Call ended successfully');
    } catch (err: any) {
      console.error('Failed to end call:', err);
      setError(err.message || 'Failed to end call');
    } finally {
      setIsCallActive(false);
    }
  }, [client]);

  // Handle modal close
  useEffect(() => {
    if (!isOpen && isCallActive) {
      endCall().catch(err => {
        console.error('Error ending call during modal close:', err);
      });
    }
  }, [isOpen, isCallActive, endCall]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Voice Chat" size="md">
      <div className="space-y-6">
        {/* Agent Info */}
        <div className="flex items-center gap-4">
          <img 
            src={agent.avatar} 
            alt={agent.name}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h3 className="text-lg font-medium">{agent.name}</h3>
            <p className="text-sm text-cyan-400">
              {isCallActive ? 'In Call' : isInitializing ? 'Initializing...' : 'Available'}
            </p>
          </div>
        </div>

        {/* Call Controls */}
        <div className="flex justify-center gap-4">
          {isCallActive ? (
            <button
              onClick={() => endCall()}
              className="p-4 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500/30 transition-colors"
            >
              <PhoneOff className="w-6 h-6" />
            </button>
          ) : (
            <button
              onClick={() => startCall()}
              disabled={isInitializing}
              className="p-4 bg-green-500/20 text-green-400 rounded-full hover:bg-green-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Phone className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Status & Error Messages */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-sm">
            {error}
          </div>
        )}

        {isInitializing && (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700/50 text-gray-300 rounded-full">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
              <span>Initializing voice chat...</span>
            </div>
          </div>
        )}

        {isCallActive && (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-full">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span>Voice Chat Active</span>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};