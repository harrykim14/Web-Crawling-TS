## Typescript로 웹크롤링하여 매일 운세를 저장해보자

- 일시 : 2021. 04. 28

- 목적 : NHK의 오하아사(おはよう朝日です)의 [별자리 운세](https://www.asahi.co.jp/ohaasa/week/horoscope/)를 크롤링하여 저장해보기

- 사용한 기술 스택: ![TechBadge](https://img.shields.io/badge/Node.js-v14.15.0-green) ![TechBadge](https://img.shields.io/badge/Typescript-v4.2.4-blue) ![TechBadge](https://img.shields.io/badge/puppeteer-v9.0.0-purple)

```typescript
import * as puppeteer from "puppeteer"; // 웹크롤링용 puppeteer모듈
import * as fs from "fs"; // 텍스트 파일 저장용 fs모듈

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.asahi.co.jp/ohaasa/week/horoscope/", {
    waitUntil: "networkidle2",
  });
  let data = await page.$("body > div.wrap > div > div.wrap_column > article");
  let evalData = await page.evaluate((element) => {
    return element.textContent;
  }, data);

  if (!fs.existsSync("/ohaasa")) {
    fs.mkdirSync("/ohaasa");
  }

  fs.writeFileSync(`./ohaasa/ohaasa${new Date().getTime()}.txt`, evalData, {
    encoding: "utf8",
  });

  await page.pdf({
    path: `./ohaasa/ohaasa${new Date().getTime()}.pdf`,
    format: "a4",
  });

  await browser.close();
})();
```
