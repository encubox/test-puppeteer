const puppeteer = require('puppeteer');

describe('foo', () => {
  test('bar', async () => {
    let browser = await puppeteer.launch({
      headless: false
    });

    let page = await browser.newPage();

    // page.emulate({
    //   viewport: {
    //     width: 500,
    //     height: 2400
    //   },
    //   userAgent: ''
    // });

    await page.goto('http://localhost:3001/');

    const innerText = await page.$eval('#root', el => el.innerText)
    expect(innerText.includes('...loading dog...')).toBeTruthy();;

    await page.waitForSelector('#root button');

    await page.click('#root button');

    const innerText2 = await page.$eval('#root', el => el.innerText);
    expect(innerText2.includes('...loading users...')).toBe(true);

    const hasCatchPhrase =  await page.waitForFunction(() => {
     return document.body.innerText.includes('catchPhrase')
    }, {timeout: 5000});

    expect(hasCatchPhrase).toBeTruthy();

    browser.close();
  }, 16000);
});
