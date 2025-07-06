import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { TextLayer } from "./CanvasRenderer";

interface Template {
  id: string;
  name: string;
  backgroundImage: string;
  textLayers: TextLayer[];
}

interface TemplateSelectorProps {
  templates: Template[];
  selectedTemplateId: string;
  onTemplateSelect: (templateId: string) => void;
  textLayers: TextLayer[];
  selectedLayerId?: string;
  onLayerSelect: (layerId: string) => void;
}

export const TemplateSelector: React.FC<
  TemplateSelectorProps
> = ({ templates, selectedTemplateId, onTemplateSelect, textLayers, selectedLayerId, onLayerSelect }) => {
  const selectedTemplate = templates.find(
    (t) => t.id === selectedTemplateId,
  );

  return (
    <Card>
      <CardHeader className="px-4 pt-4">
        <CardTitle className="text-sm">模版选择</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1.5">
        <div className="mb-3">
          <Select
            value={selectedTemplateId}
            onValueChange={onTemplateSelect}
          >
            <SelectTrigger className="w-full h-8">
              <SelectValue placeholder="选择模版" />
            </SelectTrigger>
            <SelectContent>
              {templates.map((template) => (
                <SelectItem key={template.id} value={template.id}>
                  <div className="flex items-center justify-between w-full">
                    <span>{template.name}</span>
                    <span className="text-xs text-[#6b7280] ml-2">
                      {template.textLayers.length} 个文字
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 可编辑文字选择 */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-[#111827] rounded-full"></div>
              <h3 className="text-sm font-medium text-[#111827]">可编辑文字</h3>
            </div>
            {textLayers.length > 0 && (
              <span className="text-xs text-[#6b7280]">点击选择文字图层</span>
            )}
          </div>
          
          {textLayers.length > 0 ? (
            <div className="flex gap-2.5 overflow-x-auto pb-2 -mx-1 px-1">
              {textLayers.map((layer, index) => (
                <div
                  key={layer.id}
                  className={`group flex-shrink-0 w-24 h-16 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedLayerId === layer.id
                      ? 'bg-[#f3f4f6] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)] border-2 border-[#6b7280]'
                      : 'bg-[#ffffff] border-2 border-[#e5e7eb] hover:border-[#9ca3af] hover:shadow-[0_1px_2px_rgba(0,0,0,0.05)]'
                  }`}
                  onClick={() => onLayerSelect(layer.id)}
                >
                  <div className="h-full p-2.5 flex flex-col justify-between">
                    <div className="flex-1 flex items-start">
                      <span className={`text-xs font-medium truncate block leading-tight ${
                        selectedLayerId === layer.id 
                          ? 'text-[#111827]' 
                          : 'text-[#374151] group-hover:text-[#111827]'
                      }`}>
                        {layer.text || `文字 ${index + 1}`}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-medium ${
                        selectedLayerId === layer.id 
                          ? 'text-[#374151]' 
                          : 'text-[#6b7280]'
                      }`}>
                        #{index + 1}
                      </span>
                      <div className="flex items-center gap-1">
                        <div
                          className={`w-3 h-3 rounded-full border-2 ${
                            selectedLayerId === layer.id 
                              ? 'border-[#6b7280]' 
                              : 'border-[#d1d5db]'
                          }`}
                          style={{ backgroundColor: layer.color }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-16 bg-[#f9fafb] rounded-lg border-2 border-dashed border-[#e5e7eb]">
              <p className="text-sm text-[#6b7280]">当前模版没有可编辑的文字</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};