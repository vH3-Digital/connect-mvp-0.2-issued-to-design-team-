import React from 'react';
import { Folder, MoreVertical } from 'lucide-react';

interface Tag {
  name: string;
  color: 'purple' | 'cyan' | 'white';
}

interface FileCardProps {
  name: string;
  description: string;
  tags: Tag[];
}

export const FileCard = ({ name, description, tags }: FileCardProps) => {
  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Folder className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h3 className="font-medium">{name}</h3>
            <p className="text-sm text-gray-400 mt-1">{description}</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-white">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
      <div className="flex gap-2 mt-4">
        {tags.map((tag) => (
          <span key={tag.name} className={`badge badge-${tag.color}`}>
            {tag.name}
          </span>
        ))}
      </div>
    </div>
  );
};