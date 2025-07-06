📘 图片文字叠加应用程序产品文档（PRD）

一、产品概述

产品名称：图片文字叠加应用（Text Overlay Desktop App）
目标平台：桌面端（Electron + React + fabric.js）
产品定位：一个极简高效的图片模版文字编辑工具，适用于节日祝福、社交分享、电商促销、内容营销等场景，通过套用模版快速生成个性化图文内容。

⸻

二、核心理念
	•	✅ 模版驱动：用户选择已有模版，编辑其中的文字图层，快速生成图文作品。
	•	✅ 极简操作：不可新增图层，不可自定义样式，仅能修改文字内容，确保体验统一、操作高效。
	•	✅ 实时预览 & 一键导出：所有编辑操作实时同步到画布，支持快速导出为 PNG。
	•	✅ 本地保存历史记录：自动记录导出历史，支持浏览、重新加载与删除。

⸻

三、功能概览

功能模块	描述
模版选择	预设模版选择，下拉菜单方式展示
文本图层切换	可选中预定义文字图层，进行内容编辑
文案编辑	支持修改文字内容、字体大小、颜色、位置（受限）
画布实时预览	fabric.js 渲染画布，实时展示编辑结果
撤销/重做	支持多步操作历史切换
导出图片	一键导出当前画布为 PNG
保存项目	支持保存当前编辑状态到本地（可选）
历史记录	支持查看已导出的历史图像和内容摘要


⸻

四、页面结构设计

⛳ 主页面布局

区域	说明
顶部工具栏	导出、保存、查看历史按钮
左侧画布区域	固定尺寸（300×533px），用于图文预览与编辑
右侧编辑区域	包含模版选择、图层选择与文字编辑功能
画布下方区域	撤销与重做按钮居中排列

📐 页面尺寸与排版
	•	窗口最大尺寸：1200 × 720px
	•	布局比例：左侧画布 40%，右侧编辑区 60%
	•	居中定位，右侧可滚动，其他区域固定

⸻

五、组件与模块拆解

1. TopToolbar
	•	功能：操作按钮（导出、保存、历史记录）
	•	按钮状态管理：支持导出中高亮、按钮禁用灰态
	•	事件处理：
	•	onExport：导出当前画布为 PNG
	•	onSave：保存当前项目状态
	•	onHistoryOpen：弹出历史记录窗口

2. CanvasRenderer
	•	功能：渲染背景模版图与当前选中文字图层
	•	属性参数：
	•	backgroundImage: 背景图片 URL
	•	textLayers: 所有文字图层配置
	•	selectedLayerId: 当前编辑中的图层 ID
	•	功能特性：
	•	支持点击选中图层
	•	自动居中、等比缩放文字内容
	•	在画布上高亮当前选中图层边框

3. TemplateSelector
	•	功能：模版选择 & 图层缩略图展示
	•	功能特性：
	•	下拉菜单选择模版
	•	横向滚动展示文字图层缩略图
	•	图层点击后切换当前编辑图层

4. TextEditPanel
	•	功能：右侧文字编辑区
	•	包含组件：
	•	文本内容输入框
	•	字体大小滑块
	•	字体选择器
	•	颜色选择器
	•	X/Y 位置微调（可选）

5. HistoryModal
	•	功能：历史导出记录弹窗
	•	展示信息：
	•	导出缩略图
	•	模版名称
	•	文案摘要
	•	时间戳
	•	操作支持：重新载入、删除历史记录项

⸻

六、核心数据结构

✅ TextLayer

interface TextLayer {
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

✅ Template

interface Template {
  id: string;
  name: string;
  backgroundImage: string;
  textLayers: TextLayer[];
}

✅ HistoryItem

interface HistoryItem {
  id: string;
  thumbnail: string; // base64 image
  timestamp: string;
  text: string;
  templateName: string;
}


⸻

七、样式与交互规范
	•	主题：黑灰为主色调，专业简洁风
	•	字体：系统默认中文字体（思源黑体等）
	•	按钮反馈：
	•	Hover：加深边框
	•	禁用：浅灰处理
	•	交互响应：
	•	点击选中图层：画布虚线高亮
	•	输入文字：实时同步渲染

⸻

八、开发建议

模块	技术建议
UI 框架	React + Tailwind CSS（或其他）
渲染引擎	fabric.js（文字图层居中 + 缩放）
状态管理	React Context / Zustand
存储方案	LocalStorage / IndexedDB
Electron	启动器 + 导出功能的文件写入支持
导出	fabric.toDataURL() + Electron 写入 PNG 文件
缩略图生成	画布截图 + base64 缩放处理
