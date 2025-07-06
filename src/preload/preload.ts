import { contextBridge, ipcRenderer } from 'electron';

// 安全的API暴露
const electronAPI = {
  // 配置管理
  getConfig: (key: string) => ipcRenderer.invoke('get-config', key),
  setConfig: (key: string, value: any) => ipcRenderer.invoke('set-config', key, value),
  
  // 应用信息
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  
  // 文件操作
  selectFile: () => ipcRenderer.invoke('dialog:openFile'),
  saveFile: (content: string, filename?: string) => ipcRenderer.invoke('dialog:saveFile', content, filename),
};

// 暴露API到渲染进程
contextBridge.exposeInMainWorld('electronAPI', electronAPI);

// 类型定义导出
export type ElectronAPI = typeof electronAPI; 