import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { TextLayer } from './CanvasRenderer';

interface TextEditPanelProps {
  selectedLayer?: TextLayer;
  onLayerUpdate: (layerId: string, updates: Partial<TextLayer>) => void;
}

const fontFamilies = [
  { value: 'PingFang SC, Microsoft YaHei, sans-serif', label: '苹方/微软雅黑' },
  { value: 'SimHei, sans-serif', label: '黑体' },
  { value: 'SimSun, serif', label: '宋体' },
  { value: 'KaiTi, serif', label: '楷体' },
  { value: 'Arial, sans-serif', label: 'Arial' },
  { value: 'Times New Roman, serif', label: 'Times New Roman' }
];

const fontWeights = [
  { value: 'normal', label: '正常' },
  { value: 'bold', label: '粗体' },
  { value: '100', label: '细体' },
  { value: '500', label: '中等' },
  { value: '700', label: '粗体' },
  { value: '900', label: '特粗' }
];

const colors = [
  { value: '#ffffff', label: '白色' },
  { value: '#000000', label: '黑色' },
  { value: '#ef4444', label: '红色' },
  { value: '#3b82f6', label: '蓝色' },
  { value: '#22c55e', label: '绿色' },
  { value: '#f59e0b', label: '黄色' },
  { value: '#8b5cf6', label: '紫色' },
  { value: '#06b6d4', label: '青色' }
];

export const TextEditPanel: React.FC<TextEditPanelProps> = ({
  selectedLayer,
  onLayerUpdate
}) => {
  if (!selectedLayer) {
    return (
      <Card className="h-[440px] flex flex-col">
        <CardHeader className="pb-1 px-4 pt-4 flex-shrink-0">
          <CardTitle className="text-sm">文字编辑</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center text-[#6b7280] text-sm px-4 pb-4">
          请选择一个文字进行编辑
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-[440px] flex flex-col">
      <CardHeader className="pb-1 px-4 pt-4 flex-shrink-0">
        <CardTitle className="text-sm">文字编辑</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 px-4 pb-4 pt-3">
        <div className="space-y-3 h-full">
          {/* 文字内容 - 全宽 */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-[#374151]">文字内容</Label>
            <Textarea
              value={selectedLayer.text}
              onChange={(e) => onLayerUpdate(selectedLayer.id, { text: e.target.value })}
              placeholder="输入文字内容..."
              className="min-h-[50px] resize-none text-sm"
            />
          </div>

          {/* 颜色选择 - 全宽 */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-[#374151]">颜色</Label>
            <div className="flex flex-wrap gap-1.5">
              {colors.map((color) => (
                <button
                  key={color.value}
                  className={`w-6 h-6 rounded border-2 transition-all ${
                    selectedLayer.color === color.value
                      ? 'border-[#6b7280] scale-110 shadow-[0_2px_4px_rgba(0,0,0,0.1)]'
                      : 'border-[#d1d5db] hover:border-[#9ca3af]'
                  }`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => onLayerUpdate(selectedLayer.id, { color: color.value })}
                  title={color.label}
                />
              ))}
            </div>
          </div>

          {/* 字体和字重 - 两列布局 */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[#374151]">字体</Label>
              <Select
                value={selectedLayer.fontFamily}
                onValueChange={(value) => onLayerUpdate(selectedLayer.id, { fontFamily: value })}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fontFamilies.map((font) => (
                    <SelectItem key={font.value} value={font.value}>
                      {font.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium text-[#374151]">字重</Label>
              <Select
                value={selectedLayer.fontWeight}
                onValueChange={(value) => onLayerUpdate(selectedLayer.id, { fontWeight: value })}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fontWeights.map((weight) => (
                    <SelectItem key={weight.value} value={weight.value}>
                      {weight.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 位置调整 - 两列布局 */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[#374151]">X轴</Label>
              <Input
                type="number"
                value={selectedLayer.x}
                onChange={(e) => {
                  const value = Math.max(0, Math.min(300, parseInt(e.target.value) || 0));
                  onLayerUpdate(selectedLayer.id, { x: value });
                }}
                min={0}
                max={300}
                className="h-8 text-xs"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-[#374151]">Y轴</Label>
              <Input
                type="number"
                value={selectedLayer.y}
                onChange={(e) => {
                  const value = Math.max(0, Math.min(533, parseInt(e.target.value) || 0));
                  onLayerUpdate(selectedLayer.id, { y: value });
                }}
                min={0}
                max={533}
                className="h-8 text-xs"
              />
            </div>
          </div>

          {/* 快速定位 - 全宽 */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-[#374151]">快速定位</Label>
            <div className="grid grid-cols-3 gap-2">
              <button
                className="h-8 px-3 text-xs bg-[#f3f4f6] hover:bg-[#e5e7eb] text-[#111827] rounded border border-[#e5e7eb] hover:border-[#9ca3af] transition-colors"
                onClick={() => onLayerUpdate(selectedLayer.id, { x: 140, y: 120 })}
              >
                上
              </button>
              <button
                className="h-8 px-3 text-xs bg-[#f3f4f6] hover:bg-[#e5e7eb] text-[#111827] rounded border border-[#e5e7eb] hover:border-[#9ca3af] transition-colors"
                onClick={() => onLayerUpdate(selectedLayer.id, { x: 140, y: 250 })}
              >
                中
              </button>
              <button
                className="h-8 px-3 text-xs bg-[#f3f4f6] hover:bg-[#e5e7eb] text-[#111827] rounded border border-[#e5e7eb] hover:border-[#9ca3af] transition-colors"
                onClick={() => onLayerUpdate(selectedLayer.id, { x: 140, y: 380 })}
              >
                下
              </button>
            </div>
          </div>

          {/* 字号 - 全宽 */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-[#374151]">字号: {selectedLayer.fontSize}px</Label>
            <Slider
              value={[selectedLayer.fontSize]}
              onValueChange={([value]) => onLayerUpdate(selectedLayer.id, { fontSize: value })}
              min={10}
              max={50}
              step={1}
              className="w-full"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};