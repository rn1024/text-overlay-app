import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Download, History, Save, Loader2, Settings, X } from 'lucide-react';

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
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  // 监听外部点击，关闭设置菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false);
      }
    };

    if (isSettingsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSettingsOpen]);

  const handleQuit = async () => {
    try {
      console.log('Attempting to quit app...');
      await window.api.quitApp();
      console.log('Quit app successful');
    } catch (error) {
      console.error('Failed to quit app:', error);
      // 如果API不可用，尝试关闭窗口
      try {
        await window.api.closeWindow();
      } catch (closeError) {
        console.error('Failed to close window:', closeError);
      }
    }
  };

  const handleSettingsClick = () => {
    console.log('Settings button clicked, current state:', isSettingsOpen);
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <div className="bg-[#ffffff] border-b border-[#e5e7eb] px-3 py-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <h1 className="text-lg text-[#111827]">图文编辑器</h1>
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
        
        {/* 设置按钮 */}
        <div className="relative" ref={settingsRef}>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSettingsClick}
            className="h-8 px-3"
          >
            <Settings className="w-3 h-3 mr-1" />
            设置
          </Button>
          
          {/* 设置菜单 */}
          {isSettingsOpen && (
            <div className="absolute right-0 top-full mt-1 w-32 bg-[#ffffff] border border-[#e5e7eb] rounded-md shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)] z-50">
              <div className="py-1">
                <button
                  onClick={handleQuit}
                  className="w-full text-left px-3 py-2 text-sm text-[#374151] hover:bg-[#f3f4f6] hover:text-[#111827] flex items-center gap-2 transition-colors"
                >
                  <X className="w-3 h-3" />
                  退出
                </button>
              </div>
            </div>
          )}
        </div>
        
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