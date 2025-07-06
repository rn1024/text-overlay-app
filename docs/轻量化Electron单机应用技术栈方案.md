# 轻量化Electron单机应用技术栈方案

## 📋 方案概述

针对简单单机桌面应用的需求，提供一套**轻量化**、**易上手**、**快速开发**的Electron技术栈方案。专注于开发效率和简洁性，避免过度工程化。

## 🎯 核心原则

- **简单优先**：选择最简单有效的技术方案
- **快速开发**：最小化配置，专注业务逻辑
- **易于维护**：代码结构清晰，便于后续维护
- **性能够用**：满足单机应用的性能需求即可

## 🛠️ 技术栈选型

### 核心框架
- **Electron**: v30+ (稳定版本)
- **React**: v18+ (成熟稳定)
- **TypeScript**: v5+ (可选，但推荐)
- **Vite**: v5+ (快速构建)

### UI与样式
- **Ant Design**: v5+ (开箱即用的组件库)
- **CSS Modules** 或 **Styled Components** (样式方案)

### 状态管理
- **React Context + useReducer** (内置方案，够用)
- 或 **Zustand** (如需更复杂的状态管理)

### 数据存储
- **electron-store** (简单的本地存储)
- **lowdb** (轻量级JSON数据库，可选)

### 开发工具
- **ESLint + Prettier** (代码规范)
- **electron-builder** (打包工具)

## 📁 项目结构

```
simple-electron-app/
├── src/
│   ├── main/                    # 主进程
│   │   ├── main.ts             # 主进程入口
│   │   ├── menu.ts             # 菜单配置
│   │   └── windows.ts          # 窗口管理
│   ├── renderer/               # 渲染进程
│   │   ├── components/         # React组件
│   │   ├── pages/             # 页面组件
│   │   ├── hooks/             # 自定义Hooks
│   │   ├── utils/             # 工具函数
│   │   ├── types/             # 类型定义
│   │   ├── App.tsx            # 主应用组件
│   │   └── main.tsx           # 渲染进程入口
│   ├── preload/               # 预加载脚本
│   │   └── preload.ts         # 安全桥接
│   └── shared/                # 共享代码
│       ├── types.ts           # 共享类型
│       └── constants.ts       # 常量定义
├── public/                    # 静态资源
├── dist/                      # 构建输出
├── package.json
├── vite.config.ts
├── electron-builder.json
└── tsconfig.json
```

## 🏗️ 核心实现

### 1. 主进程 (main.ts)
```typescript
import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import Store from 'electron-store';

// 简单的配置存储
const store = new Store();

let mainWindow: BrowserWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // 开发环境加载开发服务器，生产环境加载打包文件
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }
}

// 应用准备就绪
app.whenReady().then(createWindow);

// 窗口关闭处理
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// 简单的IPC处理
ipcMain.handle('get-config', (event, key: string) => {
  return store.get(key);
});

ipcMain.handle('set-config', (event, key: string, value: any) => {
  store.set(key, value);
  return true;
});

ipcMain.handle('get-app-version', () => {
  return app.getVersion();
});
```

### 2. 预加载脚本 (preload.ts)
```typescript
import { contextBridge, ipcRenderer } from 'electron';

// 安全的API暴露
contextBridge.exposeInMainWorld('electronAPI', {
  // 配置管理
  getConfig: (key: string) => ipcRenderer.invoke('get-config', key),
  setConfig: (key: string, value: any) => ipcRenderer.invoke('set-config', key, value),
  
  // 应用信息
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  
  // 文件操作（如果需要）
  selectFile: () => ipcRenderer.invoke('dialog:openFile'),
  saveFile: (content: string) => ipcRenderer.invoke('dialog:saveFile', content),
});

// 类型定义
declare global {
  interface Window {
    electronAPI: {
      getConfig: (key: string) => Promise<any>;
      setConfig: (key: string, value: any) => Promise<boolean>;
      getAppVersion: () => Promise<string>;
      selectFile?: () => Promise<string>;
      saveFile?: (content: string) => Promise<boolean>;
    };
  }
}
```

### 3. React应用 (App.tsx)
```typescript
import React, { useState, useEffect } from 'react';
import { ConfigProvider, Layout, theme } from 'antd';
import MainContent from './components/MainContent';
import Sidebar from './components/Sidebar';

const { Header, Content, Sider } = Layout;

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [appVersion, setAppVersion] = useState('');

  useEffect(() => {
    // 加载应用配置
    loadAppConfig();
  }, []);

  const loadAppConfig = async () => {
    try {
      const savedDarkMode = await window.electronAPI.getConfig('darkMode');
      const version = await window.electronAPI.getAppVersion();
      
      setDarkMode(savedDarkMode || false);
      setAppVersion(version);
    } catch (error) {
      console.error('Failed to load config:', error);
    }
  };

  const toggleDarkMode = async () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    await window.electronAPI.setConfig('darkMode', newDarkMode);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Layout style={{ height: '100vh' }}>
        <Header style={{ padding: '0 24px', display: 'flex', alignItems: 'center' }}>
          <h1 style={{ color: 'white', margin: 0 }}>我的应用 v{appVersion}</h1>
        </Header>
        
        <Layout>
          <Sider width={250} theme={darkMode ? 'dark' : 'light'}>
            <Sidebar darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
          </Sider>
          
          <Content style={{ padding: '24px' }}>
            <MainContent />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
```

### 4. 简单的状态管理 (useAppStore.ts)
```typescript
import { useState, useCallback, useContext, createContext, ReactNode } from 'react';

interface AppState {
  data: any[];
  loading: boolean;
  error: string | null;
}

interface AppContextType {
  state: AppState;
  addData: (item: any) => void;
  removeData: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    data: [],
    loading: false,
    error: null,
  });

  const addData = useCallback((item: any) => {
    setState(prev => ({
      ...prev,
      data: [...prev.data, { ...item, id: Date.now().toString() }],
    }));
  }, []);

  const removeData = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      data: prev.data.filter(item => item.id !== id),
    }));
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error }));
  }, []);

  return (
    <AppContext.Provider value={{
      state,
      addData,
      removeData,
      setLoading,
      setError,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppStore() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppStore must be used within AppProvider');
  }
  return context;
}
```

## ⚙️ 配置文件

### package.json
```json
{
  "name": "simple-electron-app",
  "version": "1.0.0",
  "main": "dist/main/main.js",
  "scripts": {
    "dev": "concurrently \"npm run dev:vite\" \"npm run dev:electron\"",
    "dev:vite": "vite",
    "dev:electron": "wait-on http://localhost:3000 && electron .",
    "build": "npm run build:renderer && npm run build:main",
    "build:renderer": "vite build",
    "build:main": "tsc -p tsconfig.main.json",
    "package": "npm run build && electron-builder",
    "package:win": "npm run build && electron-builder --win",
    "package:mac": "npm run build && electron-builder --mac",
    "package:linux": "npm run build && electron-builder --linux"
  },
  "dependencies": {
    "antd": "^5.12.0",
    "electron-store": "^8.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "concurrently": "^8.2.0",
    "electron": "^27.0.0",
    "electron-builder": "^24.6.0",
    "typescript": "^5.2.0",
    "vite": "^5.0.0",
    "wait-on": "^7.0.0"
  }
}
```

### vite.config.ts
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist/renderer',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/renderer'),
    },
  },
});
```

### electron-builder.json
```json
{
  "appId": "com.example.simple-app",
  "productName": "Simple Electron App",
  "directories": {
    "output": "release"
  },
  "files": [
    "dist/**/*",
    "node_modules/**/*"
  ],
  "mac": {
    "target": "dmg"
  },
  "win": {
    "target": "nsis"
  },
  "linux": {
    "target": "AppImage"
  }
}
```

## 🚀 快速开始

### 1. 项目初始化
```bash
# 创建项目目录
mkdir my-simple-app && cd my-simple-app

# 初始化package.json
npm init -y

# 安装依赖
npm install electron react react-dom antd electron-store
npm install -D @types/react @types/react-dom typescript vite @vitejs/plugin-react electron-builder concurrently wait-on
```

### 2. 开发启动
```bash
# 开发模式
npm run dev

# 构建应用
npm run build

# 打包应用
npm run package
```

## 💡 简化的最佳实践

### 1. 保持简单
- 使用成熟稳定的技术栈
- 避免过度抽象和复杂的架构
- 优先使用现成的解决方案

### 2. 快速开发
- 使用Ant Design减少UI开发时间
- 使用electron-store简化数据存储
- 使用Vite提升开发体验

### 3. 必要的安全性
- 禁用nodeIntegration
- 使用preload脚本安全桥接
- 基本的输入验证

### 4. 性能够用即可
- 避免过早优化
- 关注用户体验
- 必要时再进行性能优化

## 🎯 适用场景

这套轻量化方案适合：

- **个人项目**：快速实现想法
- **小型工具**：办公、生活小助手
- **原型开发**：快速验证概念
- **学习项目**：Electron技术学习
- **简单业务应用**：功能相对简单的业务工具

## ⚠️ 注意事项

1. **性能考虑**：如果应用变复杂，可能需要更多优化
2. **安全性**：企业级应用需要更严格的安全措施
3. **扩展性**：大型项目建议采用更完整的架构
4. **维护性**：团队开发可能需要更规范的代码结构

这套方案专注于**简单、实用、快速**，让您能够快速开发出功能完整的Electron单机应用！ 