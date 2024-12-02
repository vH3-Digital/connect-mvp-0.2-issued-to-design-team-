import React, { useRef } from 'react';
import { Send, Paperclip, Mic, Image as ImageIcon, StopCircle } from 'lucide-react';

interface MessageInputProps {
  message: string;
  setMessage: (message: string) => void;
  isRecording: boolean;
  recordingTime: number;
  onSendMessage: (e: React.FormEvent) => void;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>, type: 'file' | 'image') => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  message,
  setMessage,
  isRecording,
  recordingTime,
  onSendMessage,
  onStartRecording,
  onStopRecording,
  onFileUpload,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <form onSubmit={onSendMessage} className="p-4 border-t border-gray-800">
      <div className="relative flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-gray-800 text-white rounded-full px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          disabled={isRecording}
        />

        <div className="flex items-center gap-2">
          {isRecording ? (
            <button
              type="button"
              onClick={onStopRecording}
              className="p-2 text-red-400 hover:text-red-300 animate-pulse"
            >
              <StopCircle className="w-5 h-5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onStartRecording}
              className="p-2 text-gray-400 hover:text-white"
            >
              <Mic className="w-5 h-5" />
            </button>
          )}

          <button
            type="button"
            onClick={() => imageInputRef.current?.click()}
            className="p-2 text-gray-400 hover:text-white"
          >
            <ImageIcon className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-gray-400 hover:text-white"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          <button
            type="submit"
            className="p-2 text-cyan-400 hover:text-cyan-300"
            disabled={isRecording}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {isRecording && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-800 px-4 py-2 rounded-full flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-sm">Recording {formatTime(recordingTime)}</span>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={(e) => onFileUpload(e, 'file')}
      />
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onFileUpload(e, 'image')}
      />
    </form>
  );
};