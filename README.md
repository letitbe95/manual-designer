# 📖 Manual Designer | 画册与产品手册设计器

> 基于单页 HTML 架构的高端企业画册与产品手册设计工具，专为 **对页排版 (Facing Pages)** 网页预览与 **42.61 × 29.11 cm** 高保真 PDF 印刷标准而设计。

---

## ✨ 特性

- **标准对页排版**：固定画布尺寸为 **42.61 × 29.11 cm**（宽 × 高），专为高端印刷设计进行优化。
- **电影级宽幅比例**：`1.4637` 的宽高比，在宽屏预览器和双页印刷中呈现绝佳视觉效果。
- **自动编译打包**：瞬间将各个独立的页面资源（`page.html`、`copy.md`、本地图片）打包为单页优化的 Web 预览画册。
- **无头浏览器 PDF 导出**：使用 Puppeteer 自动加载和生成无边距、完全保留背景打印的印刷级矢量 PDF。
- **高级屏幕预览器**：预配置的暗黑模式响应式毛玻璃效果 Web 预览器，可根据屏幕尺寸自动缩放高保真画册，且绝不产生排版变形。
- **商用安全字体指南**：默认使用开源且可免费商用的 SIL OFL 授权字体（如 *Inter*、*Playfair Display*、*Outfit*），规避字体的版权纠纷。

---

## 📂 项目结构

```
.
├── package.json              # 共享依赖（puppeteer、fs-extra）
├── .gitignore                # 全局 Git 忽略配置
├── LICENSE                   # MIT 开源协议
├── README.md                 # 中文项目文档（本文件）
├── README_EN.md              # 英文项目文档
├── SKILL.md                  # AI Agent Skill 规范说明
├── templates/
│   ├── build.js              # 自动编译与画册装配脚本
│   └── export.js             # Puppeteer PDF 导出脚本
└── evals/
    └── evals.json            # AI Agent 自动评测 Schema
```

---

## 🚀 快速上手

### 1. 环境准备与安装

请确保已安装 **Node.js** (v16+)。接着克隆仓库并安装依赖项：

```bash
# 克隆仓库
git clone https://github.com/letitbe95/manual-designer.git
cd manual-designer

# 安装编译器依赖（Puppeteer & FS Extra）
npm install
```

### 2. 创建您的画册项目

在项目根目录下直接按照序号创建文件夹。编译器将自动寻找以两位数字开头的目录（例如 `01_cover`、`02_intro_spread`）：

```
my-brochure/
├── 01_cover/
│   ├── copy.md               # 原始文案与企划
│   └── page.html             # HTML 布局文件（封面右页或整页全幅面）
├── 02_intro_spread/
│   ├── copy.md
│   └── page.html             # 左右对页排版
├── 99_backcover/
│   ├── copy.md
│   └── page.html             # 封底左页排版
├── assets/                   # 项目共享 Logo 和通用图片资源
└── package.json              # 项目标题与主题自定义配置文件
```

### 3. 自动编译装配 (`npm run build`)

将页面切片与文案碎片一键装配为统一的 HTML 网页画册：

```bash
npm run build
```

这会将所有页面编译并合并到 `dist/index.html`。您只需用任意浏览器打开该文件，即可查看精美的毛玻璃屏幕预览器。

### 4. 导出印刷级 PDF (`npm run export`)

一键生成完全符合印刷尺寸的矢量 PDF 画册：

```bash
npm run export
```

Puppeteer 会自动运行 Chromium 实例，加载本地 `dist/index.html` 并自动打印生成不失真的 PDF：`dist/brochure.pdf`，其尺寸严格契合物理尺寸 **42.61cm × 29.11cm**。

---

## 🎨 对页排版核心 CSS 蓝图

每个页面的 `page.html` 必须严格遵循标准画布比例：

```css
:root {
  --spread-width: 42.61cm;
  --spread-height: 29.11cm;
  --page-width: 21.305cm;
  --page-height: 29.11cm;
}

/* 基础跨页对页容器 */
.spread-container {
  width: var(--spread-width);
  height: var(--spread-height);
  position: relative;
  display: flex;
  overflow: hidden;
  background-color: #ffffff;
}

/* 左右单页排版规范 */
.left-page, .right-page {
  width: var(--page-width);
  height: var(--page-height);
  position: relative;
  overflow: hidden;
  padding: 2.2cm 2.5cm; /* 预留高档艺术留白 */
}
```

---

## 📄 开源许可证

本项目基于 MIT 协议开源 - 详情请参阅 [LICENSE](LICENSE) 文件。
