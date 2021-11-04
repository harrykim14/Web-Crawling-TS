import * as puppeteer from "puppeteer";
import * as fs from "fs";

export const crawlingOhaasa = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://www.asahi.co.jp/ohaasa/week/horoscope/", {
    waitUntil: "networkidle2",
  });

  const dataAll = await page.$(
    "body > div.wrap > div > div.wrap_column > article"
  );
  const evalData = await page.evaluate((element) => {
    return element.textContent;
  }, dataAll);

  const today = todayis();

  fs.writeFile(`./ohaasa/ohaasa${today}.txt`, evalData, "utf-8", (err) => {
    if (err) {
      console.log(err);
    }
  });

  await page.pdf({ path: `./ohaasa/ohaasa${today}.pdf`, format: "a4" });
  await browser.close();
  await console.log("Crawl completed!");
};

const todayis = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1);
  const day = now.getDate();
  const result = `${year}${month < 10 ? `0${month}` : month}${day < 10 ? `0${day}` : day}`;
  return result;
}

crawlingOhaasa();
