import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Eye, EyeOff, Type, Trash2 } from 'lucide-react';
import { TextLayer } from './CanvasRenderer';

interface LayerPanelProps {
  layers: TextLayer[];
  selectedLayerId?: string;
  onLayerSelect: (layerId: string) => void;
  onLayerDelete: (layerId: string) => void;
  onLayerToggleVisibility: (layerId: string) => void;
  onAddLayer: () => void;
}

export const LayerPanel: React.FC<LayerPanelProps> = ({
  layers,
  selectedLayerId,
  onLayerSelect,
  onLayerDelete,
  onLayerToggleVisibility,
  onAddLayer
}) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">图层管理</CardTitle>
          <Button
            size="sm"
            onClick={onAddLayer}
            disabled={layers.length >= 10}
            className="h-8"
          >
            <Type className="w-4 h-4 mr-1" />
            添加文字
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 p-3 pt-0 max-h-80 overflow-y-auto">
        {layers.map((layer, index) => (
          <div
            key={layer.id}
            className={`flex items-center p-2 rounded border transition-colors cursor-pointer ${
              selectedLayerId === layer.id
                ? 'bg-blue-50 border-blue-300'
                : 'bg-white border-gray-200 hover:bg-gray-50'
            }`}
            onClick={() => onLayerSelect(layer.id)}
          >
            <Type className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-sm truncate">
                {layer.text || `文字图层 ${index + 1}`}
              </div>
              <div className="text-xs text-gray-500">
                {layer.fontSize}px • {layer.color}
              </div>
            </div>
            <div className="flex items-center space-x-1 ml-2">
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  onLayerToggleVisibility(layer.id);
                }}
              >
                {layer.isSelected ? (
                  <Eye className="w-3 h-3" />
                ) : (
                  <EyeOff className="w-3 h-3" />
                )}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                onClick={(e) => {
                  e.stopPropagation();
                  onLayerDelete(layer.id);
                }}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
        {layers.length === 0 && (
          <div className="text-center py-8 text-gray-500 text-sm">
            暂无文字图层
            <br />
            点击"添加文字"开始创作
          </div>
        )}
      </CardContent>
    </Card>
  );
};