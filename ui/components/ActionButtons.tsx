import React from 'react';
import { Button } from './ui/button';
import { Eye, Download, History } from 'lucide-react';

interface ActionButtonsProps {
  onPreview: () => void;
  onExport: () => void;
  onHistoryOpen: () => void;
  isExporting?: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onPreview,
  onExport,
  onHistoryOpen,
  isExporting = false
}) => {
  return (
    <div className="fixed top-4 right-4 flex space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onPreview}
        className="flex items-center gap-2"
      >
        <Eye className="w-4 h-4" />
        预览
      </Button>
      <Button
        onClick={onExport}
        disabled={isExporting}
        className="flex items-center gap-2"
      >
        <Download className="w-4 h-4" />
        {isExporting ? '导出中...' : '导出图片'}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onHistoryOpen}
        className="flex items-center gap-2"
      >
        <History className="w-4 h-4" />
        历史记录
      </Button>
    </div>
  );
};