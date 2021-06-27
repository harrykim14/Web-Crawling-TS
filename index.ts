import * as puppeteer from "puppeteer";
import * as fs from "fs";

export const crwalingOhaasa = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.asahi.co.jp/ohaasa/week/horoscope/", {
    waitUntil: "networkidle2",
  });
  let dataAll = await page.$(
    "body > div.wrap > div > div.wrap_column > article"
  );
  let evalData = await page.evaluate((element) => {
    return element.textContent;
  }, dataAll);

  let today = `${new Date().getFullYear()}${
    new Date().getMonth() + 1
  }${new Date().getDate()}`;

  try {
    if (!fs.existsSync("/ohaasa")) {
      fs.mkdirSync("/ohaasa");
    }

    fs.writeFileSync(`./ohaasa/ohaasa${today}.txt`, evalData, {
      encoding: "utf8",
    });
  } catch {
    console.log("Error at mkdirSync or writeFileSync function");
  }

  await page.pdf({ path: `./ohaasa/ohaasa${today}.pdf`, format: "a4" });

  await browser.close();
  await console.log("Crawl completed!");
};

crwalingOhaasa();
