import React, { useRef, useEffect, useState, useCallback } from 'react';

export interface TextLayer {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  color: string;
  fontWeight: string;
  isSelected: boolean;
}

interface CanvasRendererProps {
  backgroundImage?: string;
  textLayers: TextLayer[];
  onLayerSelect: (layerId: string) => void;
  onCanvasReady?: (canvas: HTMLCanvasElement) => void;
  selectedLayerId?: string;
  width?: number;
  height?: number;
}

export const CanvasRenderer: React.FC<CanvasRendererProps> = ({
  backgroundImage,
  textLayers,
  onLayerSelect,
  onCanvasReady,
  selectedLayerId,
  width = 360,
  height = 640
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [backgroundImageElement, setBackgroundImageElement] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (backgroundImage) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        setBackgroundImageElement(img);
        setImageLoaded(true);
      };
      img.src = backgroundImage;
    }
  }, [backgroundImage]);

  const handleCanvasClick = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;

    // 检查点击是否在任何文字图层上
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    for (let i = textLayers.length - 1; i >= 0; i--) {
      const layer = textLayers[i];
      if (!layer.text || !layer.isSelected) continue;

      ctx.font = `${layer.fontWeight} ${layer.fontSize}px ${layer.fontFamily}`;
      const textMetrics = ctx.measureText(layer.text);
      const textWidth = textMetrics.width;
      const textHeight = layer.fontSize;

      // 简单的点击检测
      if (
        x >= layer.x - textWidth / 2 &&
        x <= layer.x + textWidth / 2 &&
        y >= layer.y - textHeight / 2 &&
        y <= layer.y + textHeight / 2
      ) {
        onLayerSelect(layer.id);
        return;
      }
    }
  }, [textLayers, onLayerSelect]);

  useEffect(() => {
    if (!canvasRef.current || !imageLoaded || !backgroundImageElement) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制背景图片
    const { width: canvasWidth, height: canvasHeight } = canvas;
    const { width: imgWidth, height: imgHeight } = backgroundImageElement;
    
    const scale = Math.min(canvasWidth / imgWidth, canvasHeight / imgHeight);
    const scaledWidth = imgWidth * scale;
    const scaledHeight = imgHeight * scale;
    const offsetX = (canvasWidth - scaledWidth) / 2;
    const offsetY = (canvasHeight - scaledHeight) / 2;

    ctx.drawImage(backgroundImageElement, offsetX, offsetY, scaledWidth, scaledHeight);

    // 绘制所有可见的文字图层
    textLayers.forEach((layer) => {
      if (!layer.text || !layer.isSelected) return;

      ctx.fillStyle = layer.color;
      ctx.font = `${layer.fontWeight} ${layer.fontSize}px ${layer.fontFamily}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // 文字描边增强可读性
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.lineWidth = 2;
      ctx.strokeText(layer.text, layer.x, layer.y);
      
      // 填充文字
      ctx.fillText(layer.text, layer.x, layer.y);

      // 如果图层被选中，绘制选择框
      if (layer.id === selectedLayerId) {
        const textMetrics = ctx.measureText(layer.text);
        const textWidth = textMetrics.width;
        const textHeight = layer.fontSize;
        
        ctx.strokeStyle = '#6b7280';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(
          layer.x - textWidth / 2 - 5,
          layer.y - textHeight / 2 - 5,
          textWidth + 10,
          textHeight + 10
        );
        ctx.setLineDash([]);
      }
    });

    if (onCanvasReady) {
      onCanvasReady(canvas);
    }
  }, [backgroundImageElement, textLayers, imageLoaded, onCanvasReady, selectedLayerId]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="block cursor-pointer"
          style={{ 
            maxWidth: '100%',
            maxHeight: '100%',
            width: `${width}px`,
            height: `${height}px`
          }}
          onClick={handleCanvasClick}
        />
      </div>
    </div>
  );
};