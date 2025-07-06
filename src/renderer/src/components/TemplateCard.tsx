import React from 'react';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface TemplateCardProps {
  id: string;
  name: string;
  thumbnail: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  id,
  name,
  thumbnail,
  isSelected,
  onSelect
}) => {
  return (
    <Card 
      className={`mb-3 cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected 
          ? 'ring-2 ring-blue-500 shadow-md' 
          : 'hover:ring-1 hover:ring-gray-300'
      }`}
      onClick={() => onSelect(id)}
    >
      <div className="p-3">
        <div className="aspect-video mb-2 overflow-hidden rounded bg-gray-100 flex items-center justify-center">
          <ImageWithFallback
            src={thumbnail}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-center text-sm text-gray-700 truncate">{name}</p>
      </div>
    </Card>
  );
};