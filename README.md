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
├── README.md                 # Project documentation
├── SKILL.md                  # AI Agent Skill specification
├── templates/
│   ├── build.js              # Project compiler/assembler script
│   └── export.js             # Puppeteer PDF export script
└── evals/
    └── evals.json            # AI-agent evaluation schema
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites & Installation

Ensure you have **Node.js** (v16+) installed. Then clone the repository and install dependencies:

```bash
# Clone the repository
git clone https://github.com/<your-username>/manual-designer.git
cd manual-designer

# Install compiler dependencies (Puppeteer & FS Extra)
npm install
```

### 2. Creating a Brochure Project

Create your brochure files directly under the project root. The compiler looks for directories prefixed with two digits (e.g. `01_cover`, `02_intro_spread`):

```
my-brochure/
├── 01_cover/
│   ├── copy.md               # Raw copy/content
│   └── page.html             # HTML layout (right-page or full bleed cover)
├── 02_intro_spread/
│   ├── copy.md
│   └── page.html             # Left-page and right-page spread layout
├── 99_backcover/
│   ├── copy.md
│   └── page.html
├── assets/                   # Shared logos and global images
└── package.json              # Custom title and theme configurations
```

### 3. Assembly (`npm run build`)

Compile the page sections into a single HTML previewer booklet:

```bash
npm run build
```

This compiles your sections and places them into `dist/index.html`. You can open this file in any web browser to see a beautiful responsive preview.

### 4. PDF Generation (`npm run export`)

Print a high-fidelity vector-scale PDF from your compiled brochure:

```bash
npm run export
```

Puppeteer will spin up a headless Chromium instance, load `dist/index.html`, wait for all network assets to load, and output a print-ready PDF at `dist/brochure.pdf` matching the precise physical proportions of **42.61cm × 29.11cm**.

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
