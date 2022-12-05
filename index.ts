import * as puppeteer from "puppeteer";
import * as fs from "fs";

const crawlingOhaasa = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const CrawlingURL = "https://www.asahi.co.jp/ohaasa/week/horoscope/";
  await page.goto(CrawlingURL, { waitUntil: "networkidle2", });

  const Selector = "body > div.wrap > div > div.wrap_column > article";
  const dataAll = await page.$(Selector);
  const evalData = await page.evaluate((element) => element.textContent, dataAll);
  const today = todayis();

  await data2file(today, evalData);
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

const data2file = (today, evalData) => {
  fs.writeFile(`./ohaasa/ohaasa${today}.txt`, evalData, "utf-8", 
  (err) => {
    if (err) {
      console.log(err);
    }
  });
}

crawlingOhaasa();
