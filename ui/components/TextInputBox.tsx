import React from 'react';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';

interface TextInputBoxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
}

export const TextInputBox: React.FC<TextInputBoxProps> = ({
  value,
  onChange,
  placeholder = "请输入您的文案…",
  maxLength = 60
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto px-6">
      <div className="relative">
        <Label className="text-sm text-gray-600 mb-2 block">
          文案输入 ({value.length}/{maxLength})
        </Label>
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          className="min-h-[80px] resize-none text-base"
          rows={3}
        />
      </div>
    </div>
  );
};