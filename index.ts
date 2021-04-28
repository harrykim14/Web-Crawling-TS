import * as puppeteer from 'puppeteer';
import * as fs from 'fs';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage()
  await page.goto('https://www.asahi.co.jp/ohaasa/week/horoscope/', {
      waitUntil: 'networkidle2'
  });
  let data = await page.$('body > div.wrap > div > div.wrap_column > article')
  let evalData = await page.evaluate(element => {
      return element.textContent
  }, data)

  if (!fs.existsSync('/ohaasa')) {
    fs.mkdirSync('/ohaasa');
  }

  fs.writeFileSync(`./ohaasa/ohaasa${new Date().getTime()}.txt`, evalData, {encoding: 'utf8'});

  await page.pdf({ path: `./ohaasa/ohaasa${new Date().getTime()}.pdf`, format:'a4' });

  await browser.close();
})();
