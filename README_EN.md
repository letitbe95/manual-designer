# 📖 Manual Designer

> Build professional, high-end, premium corporate brochures and product manuals using a single consolidated HTML architecture, optimized for Facing Pages (对页排版) web preview and standard high-fidelity PDF printing strictly sized at **42.61 × 29.11 cm**.

---

## ✨ Features

- **Standardized Facing Pages Layout**: Fixed canvas size of **42.61 × 29.11 cm** (Width × Height), optimized for high-end print design.
- **Cinematic Aspect Ratio**: Aspect ratio of `1.4637` designed to look outstanding on wide-screen previewers and double-spread print spreads.
- **Automated Compilation**: Instantly bundles separate page assets (`page.html`, `copy.md`, locally scoped images) into a single optimized web preview booklet.
- **Headless PDF Export**: Automatically renders and prints your consolidated brochure to a print-ready vector PDF using headless Puppeteer, scaled perfectly with 0 margins and full background print settings.
- **Premium Previewer Shell**: Pre-configured dark-mode responsive glassmorphic screen viewer that automatically scales high-res booklets to fit target viewports without layout distortion.
- **Copyright-Safe Typography Guidelines**: Structured around high-end open-source fonts under the SIL Open Font License (OFL) like *Inter*, *Playfair Display*, and *Outfit* to prevent font copyright issues.

---

## 📂 Project Structure

```
.
├── package.json              # Shared dependencies (puppeteer, fs-extra)
├── .gitignore                # Global git ignores
├── LICENSE                   # MIT License
├── README.md                 # Chinese project documentation (default)
├── README_EN.md              # English project documentation (this file)
├── SKILL.md                  # AI Agent Skill specification
├── templates/
│   ├── build.js              # Project compiler/assembler script
│   └── export.js             # Puppeteer PDF export script
└── evals/
    └── evals.json            # AI-agent evaluation schema
```

---

## 🚀 Quick Start (AI Agent Skill Installation)

This tool can be used as a standalone compiler or integrated as a native **AI Agent Skill** into any AI coding assistants that support custom skills/plugins (such as Codex, Claude Code, Cursor, Gemini Antigravity, etc.).

### 1. Installing to AI Coding Assistants (Codex / Claude Code / Antigravity)

Most AI coding assistants that support skills or plugins scan your local workspace for an agent directory. You can easily clone this repository into your project's agent skill folder:

```bash
# 1. Navigate to your project/brochure workspace directory
cd my-brochure-workspace

# 2. Create the agent skill directory (e.g., .agents/skills/ or .claudecode/skills/ depending on the assistant)
mkdir -p .agents/skills/

# 3. Clone this repository directly into the skill directory
git clone https://github.com/letitbe95/manual-designer.git .agents/skills/manual-designer
```

#### ⚙️ How AI Agents Discover and Trigger this Skill
1. **Auto Discovery**: Upon startup, the AI assistant scans and loads `.agents/skills/manual-designer/SKILL.md` to learn the layout specifications, folder structure, and build commands.
2. **Natural Language Triggering**: Once loaded, simply ask the AI assistant in plain English/Chinese:
   > *"Use /manual-designer to design a high-end product brochure for me"*
   > *"Help me design a 42.61 × 29.11 cm high-tech manual and export it as PDF"*
   The AI assistant will automatically enforce the precise typography layout, folder system, and Puppeteer export pipeline without you having to write any CSS or configuration scripts manually.

---

### 2. Manual Developer Workflow

If you prefer to run the compilation and export processes manually without an AI assistant, execute these commands:

#### Install Dependencies:
```bash
# Navigate to the skill folder
cd .agents/skills/manual-designer
# Install Puppeteer and other compiler dependencies
npm install
```

#### Compile Brochure:
```bash
npm run build
```
This compiles and packages your pages into a single `dist/index.html` file. You can open this file in any web browser to see a beautiful responsive preview.

#### Export High-Fidelity PDF:
```bash
npm run export
```
Puppeteer will spin up a headless Chromium instance, load `dist/index.html`, and output a print-ready vector PDF at `dist/brochure.pdf` matching the precise physical proportions of **42.61cm × 29.11cm**.

---

## 🎨 Facing Pages Core CSS Blueprint

Every section's `page.html` should fit into the standard container grid. Here is the layout specification:

```css
:root {
  --spread-width: 42.61cm;
  --spread-height: 29.11cm;
  --page-width: 21.305cm;
  --page-height: 29.11cm;
}

/* Base Spread container */
.spread-container {
  width: var(--spread-width);
  height: var(--spread-height);
  position: relative;
  display: flex;
  overflow: hidden;
  background-color: #ffffff;
}

/* Left & Right Page divisions */
.left-page, .right-page {
  width: var(--page-width);
  height: var(--page-height);
  position: relative;
  overflow: hidden;
  padding: 2.2cm 2.5cm; /* Luxurious whitespace padding */
}
```

---

## 📄 MIT License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
