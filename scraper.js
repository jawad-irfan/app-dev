import { chromium, devices } from 'playwright';

async function scrapeMobileAppVersion() {
    console.log('🔄 Browser launch ho raha hai...');
    
    // 1. Chromium browser ko headless mode mein launch karein
    const browser = await chromium.launch({ headless: true }); // Agar screen dekhni ho to true ko false kar dein
    
    // 2. iPhone 11 ka profile set karein taake website ko lage aap mobile app use kar rahe hain
    const iPhone = devices['iPhone 11'];
    const context = await browser.newContext({
        ...iPhone,
        locale: 'en-US',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1'
    });

    const page = await context.newPage();

    try {
        // 3. Apni target website ya app ka web URL yahan dalein
        console.log('🌐 Target page par jaa rahe hain...');
        await page.goto('https://toscrape.com', { waitUntil: 'networkidle' });

        // 4. Jis element ka data nikalna hai, uski CSS class ka wait karein
        const productSelector = '.product_pod'; // Isko apni target app ke mutabiq badlein
        await page.waitForSelector(productSelector, { timeout: 5000 });

        // 5. Page se data extract (scrape) karein
        console.log('📊 Data nikala jaa raha hai...');
        const products = await page.evaluate((selector) => {
            const items = Array.from(document.querySelectorAll(selector));
            return items.map(item => {
                // Title aur Price ki CSS classes yahan set karein
                const title = item.querySelector('.product-title')?.innerText || 'No Title';
                const price = item.querySelector('.product-price')?.innerText || 'No Price';
                return { title, price };
            });
        }, productSelector);

        // 6. Result ko table ki shakal mein console par dikhane ke liye
        console.log(`\n✅ Total ${products.length} products mile:\n`);
        console.table(products);

    } catch (error) {
        console.error('❌ Scraping ke dauran error aya:', error.message);
    } finally {
        // Browser ko lazmi band karein
        await browser.close();
        console.log('🔌 Browser band kar diya gaya hai.');
    }
}

// Function ko run karein
scrapeMobileAppVersion();
