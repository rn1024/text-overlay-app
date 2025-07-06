// Electron API类型定义
export interface ElectronAPI {
  getConfig: (key: string) => Promise<any>;
  setConfig: (key: string, value: any) => Promise<boolean>;
  getAppVersion: () => Promise<string>;
  selectFile: () => Promise<string | null>;
  saveFile: (content: string, filename?: string) => Promise<boolean>;
}

// 全局类型声明
declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

// 应用状态类型
export interface AppState {
  data: any[];
  loading: boolean;
  error: string | null;
}

// 应用配置类型
export interface AppConfig {
  darkMode: boolean;
  language: string;
  windowSize: {
    width: number;
    height: number;
  };
} 