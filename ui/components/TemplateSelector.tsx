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
                    <span className="text-xs text-gray-500 ml-2">
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
              <div className="w-1 h-4 bg-black rounded-full"></div>
              <h3 className="text-sm font-medium text-gray-800">可编辑文字</h3>
            </div>
            {textLayers.length > 0 && (
              <span className="text-xs text-gray-500">点击选择文字图层</span>
            )}
          </div>
          
          {textLayers.length > 0 ? (
            <div className="flex gap-2.5 overflow-x-auto pb-2 -mx-1 px-1">
              {textLayers.map((layer, index) => (
                <div
                  key={layer.id}
                  className={`group flex-shrink-0 w-24 h-16 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedLayerId === layer.id
                      ? 'bg-gray-100 shadow-md border-2 border-gray-300'
                      : 'bg-white border-2 border-gray-100 hover:border-gray-200 hover:shadow-md'
                  }`}
                  onClick={() => onLayerSelect(layer.id)}
                >
                  <div className="h-full p-2.5 flex flex-col justify-between">
                    <div className="flex-1 flex items-start">
                      <span className={`text-xs font-medium truncate block leading-tight ${
                        selectedLayerId === layer.id 
                          ? 'text-gray-900' 
                          : 'text-gray-800 group-hover:text-gray-900'
                      }`}>
                        {layer.text || `文字 ${index + 1}`}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-medium ${
                        selectedLayerId === layer.id 
                          ? 'text-gray-700' 
                          : 'text-gray-500'
                      }`}>
                        #{index + 1}
                      </span>
                      <div className="flex items-center gap-1">
                        <div
                          className={`w-3 h-3 rounded-full border-2 ${
                            selectedLayerId === layer.id 
                              ? 'border-gray-400' 
                              : 'border-gray-200'
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
            <div className="flex items-center justify-center h-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
              <p className="text-sm text-gray-500">当前模版没有可编辑的文字</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};