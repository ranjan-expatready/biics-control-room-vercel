const { chromium } = require('playwright');

async function takeScreenshot(page, url, filename, options = {}) {
  console.log(`Taking screenshot: ${filename}`);
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE viewport

  // Wait a bit for any dynamic content
  await page.waitForTimeout(1000);

  await page.screenshot({
    path: `audit_responsive/${filename}`,
    fullPage: false,
    ...options
  });
}

async function generateScreenshots() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    // Create directory
    const fs = require('fs');
    if (!fs.existsSync('audit_responsive')) {
      fs.mkdirSync('audit_responsive');
    }

    const baseUrl = 'http://localhost:3000';

    // Screenshot 1: Home page on mobile (375px)
    await takeScreenshot(page, `${baseUrl}/`, '01_home_mobile.png');

    // Screenshot 2: Rocks page on mobile (375px)
    await takeScreenshot(page, `${baseUrl}/rocks`, '02_rocks_mobile.png');

    // Screenshot 3: Rock detail page on mobile (375px)
    await takeScreenshot(page, `${baseUrl}/rocks/digital-transformation`, '03_rockdetail_mobile.png');

    // Screenshot 4: Exec pack page on mobile (375px)
    await takeScreenshot(page, `${baseUrl}/exec-pack`, '04_execpack_mobile.png');

    // Screenshot 5: Offering page on mobile (375px)
    await takeScreenshot(page, `${baseUrl}/offering`, '05_offering_mobile.png');

    // Additional screenshot: Cadence page (if it exists)
    try {
      await takeScreenshot(page, `${baseUrl}/cadence`, '06_cadence_mobile.png');
    } catch (e) {
      console.log('Cadence page not available, skipping...');
    }

    console.log('Responsive screenshots generated successfully in audit_responsive/');

  } catch (error) {
    console.error('Error generating screenshots:', error);
  } finally {
    await browser.close();
  }
}

generateScreenshots();
