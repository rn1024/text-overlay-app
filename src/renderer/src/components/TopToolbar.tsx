import React from 'react';
import { Button } from './ui/button';
import { Download, History, Save, Loader2 } from 'lucide-react';

interface TopToolbarProps {
  onExport: () => void;
  onHistoryOpen: () => void;
  onSave: () => void;
  isExporting: boolean;
}

export const TopToolbar: React.FC<TopToolbarProps> = ({
  onExport,
  onHistoryOpen,
  onSave,
  isExporting
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-3 py-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <h1 className="text-lg">图文编辑器</h1>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onSave}
          className="h-8 px-3"
        >
          <Save className="w-3 h-3 mr-1" />
          保存
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onHistoryOpen}
          className="h-8 px-3"
        >
          <History className="w-3 h-3 mr-1" />
          历史
        </Button>
        
        <Button
          onClick={onExport}
          disabled={isExporting}
          size="sm"
          className="h-8 px-3"
        >
          {isExporting ? (
            <Loader2 className="w-3 h-3 mr-1 animate-spin" />
          ) : (
            <Download className="w-3 h-3 mr-1" />
          )}
          {isExporting ? '导出中...' : '导出'}
        </Button>
      </div>
    </div>
  );
};