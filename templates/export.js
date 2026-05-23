const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs-extra');

async function exportPdf() {
  console.log('Launching browser to print PDF...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  const filePath = path.resolve(__dirname, 'dist', 'index.html');
  
  if (!(await fs.pathExists(filePath))) {
    console.error(`Error: Compiled HTML file not found at ${filePath}. Run node build.js first!`);
    await browser.close();
    process.exit(1);
  }
  
  console.log(`Loading compiled HTML: file://${filePath}`);
  await page.goto('file://' + filePath, {
    waitUntil: 'networkidle0',
    timeout: 30000
  });
  
  console.log('Generating PDF booklet (strictly 42.61cm x 29.11cm)...');
  await page.pdf({
    path: path.resolve(__dirname, 'dist', 'brochure.pdf'),
    width: '42.61cm',
    height: '29.11cm',
    printBackground: true,
    margin: {
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px'
    }
  });

  await browser.close();
  console.log('PDF brochure generated successfully at dist/brochure.pdf!');
}

exportPdf().catch(err => {
  console.error('PDF export failed:', err);
  process.exit(1);
});
