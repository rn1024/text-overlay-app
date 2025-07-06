import React from 'react';
import { Minus, X } from 'lucide-react';

export const WindowControls: React.FC = () => {
  const handleMinimize = async () => {
    if (window.api) {
      await window.api.minimizeWindow();
    }
  };

  const handleClose = async () => {
    if (window.api) {
      await window.api.closeWindow();
    }
  };

  return (
    <div className="flex items-center gap-2 ml-auto">
      <button
        onClick={handleMinimize}
        className="flex items-center justify-center w-8 h-8 rounded hover:bg-gray-200 transition-colors"
        title="最小化"
      >
        <Minus className="w-4 h-4 text-gray-600" />
      </button>
      <button
        onClick={handleClose}
        className="flex items-center justify-center w-8 h-8 rounded hover:bg-red-500 hover:text-white transition-colors"
        title="关闭"
      >
        <X className="w-4 h-4 text-gray-600 hover:text-white" />
      </button>
    </div>
  );
}; 