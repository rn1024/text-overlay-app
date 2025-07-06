import React, { useState, useCallback, useMemo } from 'react';
import { CanvasRenderer, TextLayer } from './components/CanvasRenderer';
import { TextEditPanel } from './components/TextEditPanel';
import { TemplateSelector } from './components/TemplateSelector';
import { TopToolbar } from './components/TopToolbar';
import { HistoryModal } from './components/HistoryModal';
import { toast, Toaster } from 'sonner';
import { Undo2, Redo2 } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  backgroundImage: string;
  textLayers: TextLayer[]; // 预定义的文字图层配置
}

interface HistoryItem {
  id: string;
  thumbnail: string;
  timestamp: string;
  text: string;
  templateName: string;
}

// 模拟模版数据 - 每个模版都有预定义的文字图层
const templates: Template[] = [
  {
    id: '1',
    name: '春节贺卡模版',
    backgroundImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=533&fit=crop',
    textLayers: [
      {
        id: 'layer-1',
        text: '新春快乐',
        x: 150,
        y: 100,
        fontSize: 24,
        fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
        color: '#ff6b6b',
        fontWeight: 'bold',
        isSelected: true
      },
      {
        id: 'layer-2',
        text: '恭喜发财',
        x: 150,
        y: 150,
        fontSize: 18,
        fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
        color: '#ffd93d',
        fontWeight: 'normal',
        isSelected: true
      },
      {
        id: 'layer-3',
        text: '2025年',
        x: 150,
        y: 450,
        fontSize: 16,
        fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
        color: '#ffffff',
        fontWeight: 'normal',
        isSelected: true
      }
    ]
  },
  {
    id: '2',
    name: '中秋节模版',
    backgroundImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=533&fit=crop',
    textLayers: [
      {
        id: 'layer-1',
        text: '中秋快乐',
        x: 150,
        y: 120,
        fontSize: 26,
        fontFamily: 'KaiTi, serif',
        color: '#ffffff',
        fontWeight: 'bold',
        isSelected: true
      },
      {
        id: 'layer-2',
        text: '花好月圆',
        x: 150,
        y: 180,
        fontSize: 20,
        fontFamily: 'KaiTi, serif',
        color: '#f4d03f',
        fontWeight: 'normal',
        isSelected: true
      }
    ]
  },
  {
    id: '3',
    name: '生日祝福模版',
    backgroundImage: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=533&fit=crop',
    textLayers: [
      {
        id: 'layer-1',
        text: '生日快乐',
        x: 150,
        y: 200,
        fontSize: 28,
        fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
        color: '#ff69b4',
        fontWeight: 'bold',
        isSelected: true
      },
      {
        id: 'layer-2',
        text: '祝你永远年轻',
        x: 150,
        y: 250,
        fontSize: 16,
        fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
        color: '#ffffff',
        fontWeight: 'normal',
        isSelected: true
      },
      {
        id: 'layer-3',
        text: '身体健康',
        x: 150,
        y: 280,
        fontSize: 16,
        fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
        color: '#ffffff',
        fontWeight: 'normal',
        isSelected: true
      }
    ]
  },
  {
    id: '4',
    name: '商务海报模版',
    backgroundImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=533&fit=crop',
    textLayers: [
      {
        id: 'layer-1',
        text: '专业服务',
        x: 150,
        y: 150,
        fontSize: 24,
        fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
        color: '#2c3e50',
        fontWeight: 'bold',
        isSelected: true
      },
      {
        id: 'layer-2',
        text: '值得信赖',
        x: 150,
        y: 200,
        fontSize: 18,
        fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
        color: '#34495e',
        fontWeight: 'normal',
        isSelected: true
      },
      {
        id: 'layer-3',
        text: '联系电话：400-123-4567',
        x: 150,
        y: 400,
        fontSize: 14,
        fontFamily: 'Arial, sans-serif',
        color: '#7f8c8d',
        fontWeight: 'normal',
        isSelected: true
      }
    ]
  },
  {
    id: '5',
    name: '自然风景模版',
    backgroundImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=533&fit=crop',
    textLayers: [
      {
        id: 'layer-1',
        text: '大自然的美',
        x: 150,
        y: 100,
        fontSize: 22,
        fontFamily: 'KaiTi, serif',
        color: '#ffffff',
        fontWeight: 'bold',
        isSelected: true
      },
      {
        id: 'layer-2',
        text: '心灵的净土',
        x: 150,
        y: 140,
        fontSize: 18,
        fontFamily: 'KaiTi, serif',
        color: '#e8f5e8',
        fontWeight: 'normal',
        isSelected: true
      }
    ]
  },
  {
    id: '6',
    name: '城市风光模版',
    backgroundImage: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=533&fit=crop',
    textLayers: [
      {
        id: 'layer-1',
        text: '繁华都市',
        x: 150,
        y: 120,
        fontSize: 26,
        fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
        color: '#ffffff',
        fontWeight: 'bold',
        isSelected: true
      },
      {
        id: 'layer-2',
        text: '梦想启航',
        x: 150,
        y: 170,
        fontSize: 20,
        fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
        color: '#f39c12',
        fontWeight: 'normal',
        isSelected: true
      },
      {
        id: 'layer-3',
        text: '未来可期',
        x: 150,
        y: 220,
        fontSize: 16,
        fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
        color: '#ecf0f1',
        fontWeight: 'normal',
        isSelected: true
      }
    ]
  }
];

function App() {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(templates[0].id);
  const [textLayers, setTextLayers] = useState<TextLayer[]>(templates[0].textLayers);
  const [selectedLayerId, setSelectedLayerId] = useState<string | undefined>();
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isExporting, setIsExporting] = useState(false);
  const [currentCanvas, setCurrentCanvas] = useState<HTMLCanvasElement | null>(null);
  
  // 操作历史状态
  const [undoStack, setUndoStack] = useState<TextLayer[][]>([]);
  const [redoStack, setRedoStack] = useState<TextLayer[][]>([]);

  const selectedTemplate = useMemo(() => 
    templates.find(t => t.id === selectedTemplateId) || templates[0],
    [selectedTemplateId]
  );

  const selectedLayer = useMemo(() => 
    textLayers.find(layer => layer.id === selectedLayerId),
    [textLayers, selectedLayerId]
  );

  const handleTemplateSelect = useCallback((templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplateId(templateId);
      // 加载模版的预定义文字图层
      setTextLayers(template.textLayers);
      setSelectedLayerId(undefined);
      // 清空操作历史
      setUndoStack([]);
      setRedoStack([]);
    }
  }, []);

  const handleLayerSelect = useCallback((layerId: string) => {
    setSelectedLayerId(layerId);
  }, []);

  const handleLayerUpdate = useCallback((layerId: string, updates: Partial<TextLayer>) => {
    setTextLayers(prev => {
      // 保存当前状态到撤销栈
      setUndoStack(undoStack => [...undoStack, prev]);
      // 清空重做栈（因为进行了新操作）
      setRedoStack([]);
      
      return prev.map(layer => 
        layer.id === layerId ? { ...layer, ...updates } : layer
      );
    });
  }, []);

  const handleCanvasReady = useCallback((canvas: HTMLCanvasElement) => {
    setCurrentCanvas(canvas);
  }, []);

  const handleExport = useCallback(async () => {
    if (!currentCanvas) {
      toast.error('画布未准备好，请稍后再试');
      return;
    }

    if (textLayers.length === 0) {
      toast.error('当前模版没有可编辑的文字');
      return;
    }

    setIsExporting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const dataUrl = currentCanvas.toDataURL('image/png');
      
      const link = document.createElement('a');
      link.download = `图文作品_${new Date().getTime()}.png`;
      link.href = dataUrl;
      link.click();

      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        thumbnail: dataUrl,
        timestamp: new Date().toLocaleString('zh-CN'),
        text: textLayers.filter(layer => layer.isSelected).map(layer => layer.text).join(', '),
        templateName: selectedTemplate.name
      };
      
      setHistory(prev => [newHistoryItem, ...prev.slice(0, 9)]);
      
      toast.success('作品已保存至下载文件夹');
    } catch (error) {
      toast.error('导出失败，请重试');
    } finally {
      setIsExporting(false);
    }
  }, [currentCanvas, textLayers, selectedTemplate.name]);

  const handleHistoryReload = useCallback((item: HistoryItem) => {
    const template = templates.find(t => t.name === item.templateName);
    if (template) {
      setSelectedTemplateId(template.id);
      setTextLayers(template.textLayers);
      setSelectedLayerId(undefined);
      setIsHistoryOpen(false);
      toast.success('已重新载入');
    }
  }, []);

  const handleHistoryDelete = useCallback((id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
    toast.success('已删除');
  }, []);

  const handleSave = useCallback(() => {
    const projectData = {
      templateId: selectedTemplateId,
      textLayers: textLayers,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('textOverlayProject', JSON.stringify(projectData));
    toast.success('项目已保存');
  }, [selectedTemplateId, textLayers]);

  const handleUndo = useCallback(() => {
    if (undoStack.length === 0) {
      toast.error('没有可撤销的操作');
      return;
    }
    
    const previousState = undoStack[undoStack.length - 1];
    const newUndoStack = undoStack.slice(0, -1);
    
    // 将当前状态保存到重做栈
    setRedoStack(prev => [...prev, textLayers]);
    setUndoStack(newUndoStack);
    setTextLayers(previousState);
    
    toast.success('已撤销操作');
  }, [undoStack, textLayers]);

  const handleRedo = useCallback(() => {
    if (redoStack.length === 0) {
      toast.error('没有可重做的操作');
      return;
    }
    
    const nextState = redoStack[redoStack.length - 1];
    const newRedoStack = redoStack.slice(0, -1);
    
    // 将当前状态保存到撤销栈
    setUndoStack(prev => [...prev, textLayers]);
    setRedoStack(newRedoStack);
    setTextLayers(nextState);
    
    toast.success('已重做操作');
  }, [redoStack, textLayers]);

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      {/* 顶部工具栏 */}
      <TopToolbar
        onExport={handleExport}
        onHistoryOpen={() => setIsHistoryOpen(true)}
        onSave={handleSave}
        isExporting={isExporting}
      />

      {/* 主要内容区域 - 4:6比例 */}
      <div className="flex flex-1 min-h-0">
        {/* 左侧画布预览区 - 40% */}
        <div className="w-2/5 bg-[#f3f4f6] border-r border-[#e5e7eb]">
          <div className="h-full flex flex-col justify-center">
            <div className="text-center">
              <div className="mb-1">
                <p className="text-xs text-[#6b7280]">300 × 533 像素</p>
              </div>
              <div className="px-2 mb-6">
                <CanvasRenderer
                  backgroundImage={selectedTemplate.backgroundImage}
                  textLayers={textLayers}
                  selectedLayerId={selectedLayerId}
                  onLayerSelect={handleLayerSelect}
                  onCanvasReady={handleCanvasReady}
                  width={280}
                  height={497}
                />
              </div>
              {/* 撤销/重做控件 */}
              <div className="flex justify-center items-center gap-4 px-4 mt-2">
                <button
                  onClick={handleUndo}
                  disabled={undoStack.length === 0}
                  className="p-1 hover:bg-[#e5e7eb] disabled:cursor-not-allowed transition-colors"
                  title="撤销"
                >
                  <Undo2 className={`w-4 h-4 ${undoStack.length === 0 ? 'text-[#d1d5db]' : 'text-[#111827]'}`} />
                </button>
                <button
                  onClick={handleRedo}
                  disabled={redoStack.length === 0}
                  className="p-1 hover:bg-[#e5e7eb] disabled:cursor-not-allowed transition-colors"
                  title="重做"
                >
                  <Redo2 className={`w-4 h-4 ${redoStack.length === 0 ? 'text-[#d1d5db]' : 'text-[#111827]'}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧编辑面板 - 60% */}
        <div className="w-3/5 bg-[#ffffff] flex flex-col min-h-0">
          <div className="px-3 pt-3 pb-2 flex flex-col h-full">
            {/* 模版选择 - 固定高度 */}
            <div className="mb-2">
              <TemplateSelector
                templates={templates}
                selectedTemplateId={selectedTemplateId}
                onTemplateSelect={handleTemplateSelect}
                textLayers={textLayers}
                selectedLayerId={selectedLayerId}
                onLayerSelect={handleLayerSelect}
              />
            </div>

            {/* 文字编辑 - 占据剩余空间 */}
            <div className="flex-1 min-h-0">
              <TextEditPanel
                selectedLayer={selectedLayer}
                onLayerUpdate={handleLayerUpdate}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 历史记录弹窗 */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onReload={handleHistoryReload}
        onDelete={handleHistoryDelete}
      />
      
      {/* Toast通知 */}
      <Toaster position="top-right" />
    </div>
  );
}

export default App;