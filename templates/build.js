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
  
  // Read package.json to get custom settings if available
  let title = 'Corporate Product Brochure';
  let themeColor = '#2563eb';
  const pkgJsonPath = path.join(PROJECT_DIR, 'package.json');
  if (await fs.pathExists(pkgJsonPath)) {
    try {
      const pkg = await fs.readJson(pkgJsonPath);
      if (pkg.brochureSettings) {
        if (pkg.brochureSettings.title) title = pkg.brochureSettings.title;
        if (pkg.brochureSettings.themeColor) themeColor = pkg.brochureSettings.themeColor;
      }
    } catch (e) {
      // Ignore JSON parse errors
    }
  }
  
  // Single HTML Shell template
  const htmlTemplate = `<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --spread-width: 42.61cm;
      --spread-height: 29.11cm;
      --page-width: 21.305cm;
      --page-height: 29.11cm;
      --theme-color: ${themeColor};
      --text-main: #1a1a1a;
      --text-muted: #666666;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      margin: 0;
      padding: 0;
      font-family: 'Outfit', 'Inter', sans-serif;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      color: var(--text-main);
    }
    
    @page {
      size: 42.61cm 29.11cm;
      margin: 0;
    }
    
    @media print {
      body {
        background: transparent;
      }
      .spread-container {
        page-break-after: always;
        page-break-inside: avoid;
        display: flex !important;
      }
    }
    
    /* Screen Viewport Scaling */
    @media screen {
      body {
        background-color: #0d0d0f;
        background-image: radial-gradient(circle at top left, #1a1a24 0%, #0d0d0f 70%);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 40px;
        gap: 50px;
      }
      .spread-container {
        box-shadow: 0 40px 90px rgba(0, 0, 0, 0.6);
        border-radius: 16px;
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
    
    h1, h2, h3 {
      font-family: 'Playfair Display', serif;
      font-weight: 700;
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
