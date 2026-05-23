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

## 🚀 快速上手 (AI Agent Skill 安装)

本工具既可以作为独立开发工具使用，也已封装为标准的 **AI Agent Skill**。您可以直接将其导入支持 Skill 扩展的 AI 编码助手（如 Codex、Claude Code、Cursor、Gemini Antigravity 等）。

### 1. 安装到 AI 编码助手 (Codex / Claude Code / Antigravity)

大多数支持 Skill/Plugin 扩展的 AI 应用都遵循文件夹扫描机制。您只需将此仓库克隆或复制到您项目的 Agent 技能目录中：

```bash
# 1. 进入您正在开发的画册项目/代码仓库根目录
cd my-brochure-workspace

# 2. 创建 Agent 技能存放目录（不同 AI 应用的技能目录可能有所不同，如 .agents/skills/ 或 .claudecode/skills/）
mkdir -p .agents/skills/

# 3. 将本仓库克隆至该技能目录
git clone https://github.com/letitbe95/manual-designer.git .agents/skills/manual-designer
```

#### ⚙️ AI 助手如何识别与触发？
1. **自动加载**：AI 编码助手在启动或扫描时，会自动读取并解析 `.agents/skills/manual-designer/SKILL.md` 里的系统指令和规范。
2. **自然语言触发**：加载后，您只需在对话中用自然语言对 AI 助手下达任务，例如：
   > *“帮我用 /manual-designer 设计一套高端产品手册”*
   > *“帮我设计一个 42.61 × 29.11 cm 比例的科技感画册，并导出 PDF”*
   AI 助手将自动获取此 Skill 的最高标准排版规范、目录结构及 PDF 编译流程，代替您完成繁琐的 CSS 排版和 Puppeteer 脚本编写。

---

### 2. 开发者手动使用流程 (Manual Developer Workflow)

如果您希望脱离 AI 助手手动运行编译和导出流程，请执行以下命令：

#### 安装依赖：
```bash
# 进入技能目录
cd .agents/skills/manual-designer
# 安装编译器依赖（Puppeteer & FS Extra）
npm install
```

#### 编译装配画册网页：
```bash
npm run build
```
这会将画册合并编译为 `dist/index.html`。您只需用任意浏览器打开该文件，即可查看精美的毛玻璃屏幕预览器。

#### 导出印刷级 PDF：
```bash
npm run export
```
Puppeteer 会自动生成无边距的高保真 PDF：`dist/brochure.pdf`，尺寸严格契合 **42.61cm × 29.11cm**。

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
