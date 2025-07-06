import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Trash2, RotateCcw } from 'lucide-react';

interface HistoryItem {
  id: string;
  thumbnail: string;
  timestamp: string;
  text: string;
  templateName: string;
}

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onReload: (item: HistoryItem) => void;
  onDelete: (id: string) => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  history,
  onReload,
  onDelete
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[600px]">
        <DialogHeader>
          <DialogTitle>历史记录</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[500px]">
          {history.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              暂无历史记录
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {history.map((item) => (
                <Card key={item.id} className="p-4">
                  <div className="aspect-video mb-3 overflow-hidden rounded bg-gray-100">
                    <ImageWithFallback
                      src={item.thumbnail}
                      alt={`历史记录 ${item.id}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm truncate">{item.text}</p>
                    <p className="text-xs text-gray-500">{item.templateName}</p>
                    <p className="text-xs text-gray-400">{item.timestamp}</p>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onReload(item)}
                        className="flex items-center gap-1"
                      >
                        <RotateCcw className="w-3 h-3" />
                        重新载入
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onDelete(item.id)}
                        className="flex items-center gap-1 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-3 h-3" />
                        删除
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};