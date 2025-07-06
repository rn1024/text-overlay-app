# Text Overlay App

一个基于 Electron + React + Ant Design 的跨平台桌面应用程序，专注于图片文字叠加功能。

## 🚀 技术栈

- **Electron** - 跨平台桌面应用框架
- **React 18** - 现代化UI框架
- **TypeScript** - 类型安全的JavaScript
- **Ant Design** - 企业级UI组件库
- **Vite** - 快速构建工具
- **electron-store** - 本地数据存储

## 📁 项目结构

```
text-overlay-app/
├── src/
│   ├── main/                    # 主进程代码
│   │   ├── main.ts             # 主进程入口
│   │   └── ...
│   ├── renderer/               # 渲染进程代码
│   │   ├── components/         # React组件
│   │   ├── hooks/             # 自定义Hooks
│   │   ├── styles/            # 样式文件
│   │   ├── App.tsx            # 主应用组件
│   │   └── main.tsx           # 渲染进程入口
│   ├── preload/               # 预加载脚本
│   │   └── preload.ts         # 安全桥接
│   └── shared/                # 共享代码
│       └── types.ts           # 类型定义
├── public/                    # 静态资源
│   └── index.html            # HTML模板
├── dist/                      # 构建输出
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## 🛠️ 开发环境设置

### 前置要求

- Node.js (>= 16.0.0)
- npm 或 yarn

### 安装依赖

```bash
# 使用 npm
npm install

# 或使用 yarn
yarn install
```

### 开发模式

```bash
# 启动开发服务器
npm run dev

# 或
yarn dev
```

### 构建应用

```bash
# 构建所有代码
npm run build

# 或
yarn build
```

### 打包应用

```bash
# 打包当前平台
npm run package

# 打包 Windows 版本
npm run package:win

# 打包 macOS 版本
npm run package:mac

# 打包 Linux 版本
npm run package:linux
```

## 🎯 功能特性

- ✅ 跨平台支持 (Windows, macOS, Linux)
- ✅ 现代化UI设计
- ✅ 深色/浅色主题切换
- ✅ 本地数据存储
- ✅ 文件导入/导出
- ✅ 类型安全的代码
- ✅ 热重载开发体验

## 📦 构建配置

### 主进程构建

- 使用 TypeScript 编译器
- 输出到 `dist/main/`
- 支持 CommonJS 模块

### 渲染进程构建

- 使用 Vite 构建工具
- 输出到 `dist/renderer/`
- 支持 ES Modules
- 代码分割和优化

## 🔧 开发指南

### 添加新功能

1. 在 `src/renderer/components/` 中创建新组件
2. 在 `src/shared/types.ts` 中添加类型定义
3. 在 `src/renderer/hooks/` 中添加业务逻辑
4. 更新主应用组件 `App.tsx`

### 添加主进程功能

1. 在 `src/main/main.ts` 中添加 IPC 处理器
2. 在 `src/preload/preload.ts` 中暴露安全API
3. 在 `src/shared/types.ts` 中更新类型定义

### 调试

- 开发模式下会自动打开开发者工具
- 使用 `console.log` 进行调试
- 主进程日志会显示在终端
- 渲染进程日志会显示在开发者工具

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系

如有问题，请联系：[your-email@example.com] 