---
name: manual-designer
description: Design and build professional, premium company brochures or product manuals with Facing Pages (对页排版) layouts. Automatically structure copy and image assets into a standardized directory layout, build single consolidated HTML assets, and export perfectly scaled, non-distorted PDF booklets strictly sized at 42.61 × 29.11 cm. Trigger this skill whenever a user requests a brochure, product manual, flyer, booklet, company profile design, facing-pages print design, or when they ask to arrange contents side-by-side (left/right) for printing or display, even if they don't explicitly specify the 42.61 × 29.11 cm dimensions.
---

# Manual Designer Skill

A specialized skill for designing high-end, premium corporate brochures and product manuals using a single consolidated HTML architecture, optimized for Facing Pages (对页排版) web preview and standard high-fidelity PDF printing strictly sized at **42.61 × 29.11 cm**.

---

## 1. Fixed Directory Structure

Every manual workspace supports multiple design projects sharing a single unified set of dependencies (`node_modules`) at the root. This keeps the workspace organized, prevents redundancy, and makes it extremely lightweight.

```
<brochure-workspace>/
├── node_modules/             # Shared Node.js dependencies (installed once at root)
├── package.json              # Shared dependencies file (e.g., puppeteer, fs-extra)
├── package-lock.json
├── .gitignore                # Global git ignores
└── <brochure-projects>/      # Folder containing independent brochure projects
    ├── cele-tron-recloser/   # Project 1 folder
    │   ├── 01_cover/         # Front Cover (Right page of first spread or standalone)
    │   │   ├── copy.md
    │   │   └── page.html
    │   ├── 02_intro_spread/  # Spread 1 (Pages 2-3)
    │   │   ├── copy.md
    │   │   └── page.html
    │   ├── 03_products_spread/ # Spread 2 (Pages 4-5)
    │   │   ├── copy.md
    │   │   └── page.html
    │   ├── 99_backcover/     # Back Cover (Left page of final spread)
    │   │   ├── copy.md
    │   │   └── page.html
    │   ├── assets/           # Local shared resources (logos, local icons)
    │   │   └── logo.png
    │   ├── dist/             # Compiled output folder (Ignored in Git, created dynamically)
    │   │   ├── index.html    # Consolidated web preview booklet
    │   │   └── brochure.pdf  # Exact 42.61 x 29.11 cm PDF
    │   ├── build.js          # Project build script
    │   └── export.js         # Project Puppeteer export script (resolves node_modules from root)
    └── another-brochure/     # Project 2 folder (replicates same internal structure)
```

---

## 2. Facing Pages Layout Specifications

### Dimensions and aspect ratios
- **Total Spread Width**: 42.61 cm
- **Total Spread Height**: 29.11 cm
- **Aspect Ratio**: 42.61 / 29.11 ≈ 1.4637 (very wide, cinematic aspect ratio)
- **Single Page Dimension**: Width 21.305 cm, Height 29.11 cm

### Core CSS Implementation rules
To guarantee that the brochure scales perfectly, does not distort, and prints at high fidelity, the generated stylesheet MUST adhere to:

```css
:root {
  --spread-width: 42.61cm;
  --spread-height: 29.11cm;
  --page-width: 21.305cm;
  --page-height: 29.11cm;
}

/* Global resets for high-quality print and layout integrity */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  margin: 0;
  padding: 0;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

/* Printing styling: Exact 42.61 x 29.11 cm size, zero margins */
@page {
  size: 42.61cm 29.11cm;
  margin: 0;
}

@media print {
  body {
    background: transparent !important;
    display: block !important;
    padding: 0 !important;
    margin: 0 !important;
  }
  .spread-wrapper {
    width: var(--spread-width) !important;
    height: var(--spread-height) !important;
    max-width: none !important;
    margin: 0 !important;
    padding: 0 !important;
    transform: none !important;
    display: block !important;
  }
  .spread-container {
    page-break-after: always;
    page-break-inside: avoid;
    display: flex !important;
    transform: none !important;
    width: var(--spread-width) !important;
    height: var(--spread-height) !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
  }
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
  padding: 2.5cm; /* Standard luxurious padding for text copy and images */
}

/* Screen Previewer Mode: Dark backdrop and scaled previews */
@media screen {
  body {
    background-color: #121214;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px;
    gap: 40px;
  }
  .spread-container {
    box-shadow: 0 30px 70px rgba(0, 0, 0, 0.45);
    border-radius: 8px;
    transform-origin: top center;
  }
}
```

---

## 3. Workflow and Confirmation Guardrails

Before writing a single page of HTML or setting up files, you MUST propose the design scheme and get explicit user approval.

### Phase 1: Propose Design & Visual Language (User Confirmation Required)
You must present a formatted proposal detailing:
1. **Design Theme & Concept**: (e.g., Clean tech-minimalist, bold dark-mode corporate, organic editorial).
2. **Harmonious Color Palette**: List exact hex colors (Primary, Accent, Backgrounds).
3. **Typography pairing**: Curated Google Fonts combinations (e.g. Playfair Display for headings + Inter for copy).
4. **Spread Map**: Detailed plan of what content and graphics will go on which pages (e.g., Cover, Spread 1 Left vs. Spread 1 Right, etc.).
5. **Assets Plan**: Specify required imagery/icons.

*Do not write code until the user says "Approve", "Go ahead", or similar.*

### Phase 2: Create folder layout & assets
Once approved:
1. Initialize folders: `01_cover/`, `02_intro_spread/`, etc.
2. Place the approved text copy into each folder's `copy.md`.
3. Save image/graphic assets to their respective folders.

### Phase 3: Implement Page Modules
Write `page.html` snippets inside each folder. Design should be highly premium:
- Use smooth CSS transitions, linear and radial gradients, drop shadows, and modern grid-alignments.
- Include subtle graphic accents (geometric blocks, thin hairline borders, page numbering).

### Phase 4: Compile and Export PDF
1. Create and execute `build.js` to compile the fragments into a single `dist/index.html` file.
2. Create and run `export.js` using Puppeteer to convert the page to a print-ready PDF at `dist/brochure.pdf`.
3. Provide the user with a walkthrough of the files and show how the booklet renders.

---

## 4. Compilation Template (`build.js`)

Your generated `build.js` should look similar to this to automate assembling pages:

```javascript
const fs = require('fs-extra');
const path = require('path');

const PROJECT_DIR = __dirname;
const DIST_DIR = path.join(PROJECT_DIR, 'dist');

async function build() {
  await fs.ensureDir(DIST_DIR);
  
  // Find all subdirectories that start with two digits (e.g. 01_cover, 02_intro)
  const items = await fs.readdir(PROJECT_DIR);
  const sections = items
    .filter(item => /^\d{2}_/.test(item) && fs.statSync(path.join(PROJECT_DIR, item)).isDirectory())
    .sort();

  console.log('Assembling brochure sections:', sections);
  
  let sectionHtml = '';
  
  for (const section of sections) {
    const sectionPath = path.join(PROJECT_DIR, section);
    const htmlPath = path.join(sectionPath, 'page.html');
    
    if (await fs.pathExists(htmlPath)) {
      let content = await fs.readFile(htmlPath, 'utf8');
      
      // Copy assets of this section into dist/
      const distSectionDir = path.join(DIST_DIR, section);
      await fs.ensureDir(distSectionDir);
      
      const files = await fs.readdir(sectionPath);
      for (const file of files) {
        if (file !== 'page.html' && file !== 'copy.md' && file !== 'copy.txt') {
          await fs.copy(path.join(sectionPath, file), path.join(distSectionDir, file));
        }
      }
      
      sectionHtml += `\n<!-- SECTION: ${section} -->\n${content}\n`;
    }
  }
  
  // Copy global assets if they exist
  const globalAssetsSrc = path.join(PROJECT_DIR, 'assets');
  if (await fs.pathExists(globalAssetsSrc)) {
    await fs.copy(globalAssetsSrc, path.join(DIST_DIR, 'assets'));
  }
  
  // Single HTML Shell template
  const htmlTemplate = `<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Corporate Product Brochure</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,400&display=swap" rel="stylesheet">
  <style>
    :root {
      --spread-width: 42.61cm;
      --spread-height: 29.11cm;
      --page-width: 21.305cm;
      --page-height: 29.11cm;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      margin: 0;
      padding: 0;
      font-family: 'Inter', sans-serif;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    
    @page {
      size: 42.61cm 29.11cm;
      margin: 0;
    }
    
    @media print {
      body {
        background: transparent !important;
        display: block !important;
        padding: 0 !important;
        margin: 0 !important;
      }
      .spread-wrapper {
        width: var(--spread-width) !important;
        height: var(--spread-height) !important;
        max-width: none !important;
        margin: 0 !important;
        padding: 0 !important;
        transform: none !important;
        display: block !important;
      }
      .spread-container {
        page-break-after: always;
        page-break-inside: avoid;
        display: flex !important;
        transform: none !important;
        width: var(--spread-width) !important;
        height: var(--spread-height) !important;
        box-shadow: none !important;
        border-radius: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
      }
    }
    
    /* Screen Viewport Scaling */
    @media screen {
      body {
        background-color: #0f0f11;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 40px;
        gap: 50px;
      }
      .spread-container {
        box-shadow: 0 40px 90px rgba(0, 0, 0, 0.6);
        border-radius: 12px;
        transform-origin: top center;
        transition: transform 0.2s ease;
      }
    }
    
    .spread-container {
      width: var(--spread-width);
      height: var(--spread-height);
      position: relative;
      display: flex;
      overflow: hidden;
      background-color: #ffffff;
    }
    
    .left-page, .right-page {
      width: var(--page-width);
      height: var(--page-height);
      position: relative;
      overflow: hidden;
      padding: 2.2cm 2.5cm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    
    /* Global classes and visual helpers */
    h1, h2, h3 {
      font-family: 'Playfair Display', serif;
    }
  </style>
</head>
<body>
  ${sectionHtml}
  
  <script>
    // Premium Web Scaling Script
    function adjustScale() {
      if (window.matchMedia('(max-width: 45cm)').matches) {
        const spreads = document.querySelectorAll('.spread-container');
        spreads.forEach(spread => {
          const parent = spread.parentElement;
          const parentWidth = parent.clientWidth - 80;
          // Exact physical pixel size of 42.61cm at standard screen 96 DPI
          // 42.61cm / 2.54 * 96 ≈ 1610px width
          const targetWidth = 1610; 
          const scale = parentWidth / targetWidth;
          
          if (scale < 1) {
            spread.style.transform = \`scale(\${scale})\`;
            spread.style.transformOrigin = 'top center';
            // Scale container heights proportionately to prevent page layout collapse
            parent.style.height = \`\${1100 * scale}px\`;
            parent.style.display = 'flex';
            parent.style.justifyContent = 'center';
          } else {
            spread.style.transform = 'none';
            parent.style.height = '1100px';
          }
        });
      }
    }
    
    // Wrapped scale divs helper for screen display
    if (!window.matchMedia('print').matches) {
      const spreads = document.querySelectorAll('.spread-container');
      spreads.forEach(spread => {
        const wrapper = document.createElement('div');
        wrapper.className = 'spread-wrapper';
        wrapper.style.width = '100%';
        wrapper.style.maxWidth = '1610px';
        wrapper.style.height = '1100px';
        spread.parentNode.insertBefore(wrapper, spread);
        wrapper.appendChild(spread);
      });
      window.addEventListener('resize', adjustScale);
      window.addEventListener('load', adjustScale);
      setTimeout(adjustScale, 100);
    }
  </script>
</body>
</html>`;

  await fs.writeFile(path.join(DIST_DIR, 'index.html'), htmlTemplate, 'utf8');
  console.log('Successfully consolidated brochure inside dist/index.html!');
}

build().catch(err => {
  console.error('Compilation failed:', err);
  process.exit(1);
});
```

---

## 5. Printing and Rendering guidelines
- Avoid dynamic absolute position elements which can overflow when translated between browsers.
- Always use standard high-res image files (150-300 DPI equivalents).
- Maintain rigorous typography scales. Use `rem` or physical metric system elements (`pt`, `cm`, `mm`) for print accuracy.
- Print tests must be performed via Google Chrome headless print engine to guarantee sizing exactly matches 42.61 × 29.11 cm.
- **CRITICAL - Preventing Shrinkage**: When rendering in Puppeteer, you MUST set the page viewport to exactly **1610 × 1100 pixels** (the 1:1 pixel equivalence of 42.61cm at 96 DPI) using `page.setViewport({ width: 1610, height: 1100, deviceScaleFactor: 2 })`. This ensures that screen-scaling Javascript files calculate a scale factor of exactly `1` and do not shrink the layout. In addition, the print stylesheet MUST force `transform: none !important;` on the spread containers to override any dynamic script transforms.
- **CRITICAL - Copyright-Safe Typography**: To avoid copyright infringement risks, NEVER use proprietary commercial fonts (such as Helvetica, Arial, Microsoft YaHei / 微软雅黑, SimSun / 宋体, or PingFang / 平方) in print manuals unless the client holds explicit commercial licenses. Instead, always use open-source, commercially safe fonts distributed under the SIL Open Font License (OFL). Preferred examples include:
  - English: **Inter**, **Playfair Display**, **Outfit**, **Montserrat**, **Roboto**.
  - Chinese: **Noto Sans SC** (思源黑体), **Noto Serif SC** (思源宋体), or other OFL fonts.
  These fonts must be dynamically imported via Google Fonts or hosted locally to guarantee compliance and platform-independent rendering.

---

## 6. Graphic Elements & Visual Richness (SVG, Canvas, Images)
To ensure the brochure is "图文并茂" (rich in both text and graphics) and looks incredibly premium:
1. **Leverage SVG (Scalable Vector Graphics)**: Always use high-end SVGs for logos, technical diagrams, flowcharts, abstract background patterns, dynamic analytics curves, and structural borders. SVGs are infinitely scalable and remain razor-sharp when printed at 300 DPI on a 42.61cm x 29.11cm canvas.
2. **Utilize HTML5 Canvas**: For complex visualizations, generative abstract art, custom data charts, or intricate particle grids that are difficult to express in CSS, utilize HTML5 Canvas drawing scripts. Ensure the canvas is scaled to high resolution (matching devicePixelRatio or printed width/height) to avoid blurriness.
3. **Optimally Position Provided Images**: Place user-provided high-resolution photos, realistic product renders, and logos prominently as full-bleed backgrounds or beautiful asymmetrical inline images with subtle drop-shadows and borders.
4. **Rich Interactivity & Animations**: Use SVG transitions and micro-animations to wow users on screen, while ensuring they render perfectly in their static state for PDF printing.
