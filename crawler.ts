import {launch, Browser, Page } from "puppeteer";

export default class OhaAsaCrawler {
  browser!: Browser;
  page!: Page;
  data;
  today;

  async init() {
    this.browser = await launch();
    this.page = await this.browser.newPage();
  }

  async gotoPageForData() {
    const crawlingURL = "https://www.asahi.co.jp/ohaasa/week/horoscope/";
    await this.page.goto(crawlingURL, { waitUntil: "networkidle2"});

    const Selector = "body > div.wrap > div > div.wrap_column > article";
    const allData = await this.page.$(Selector);
    console.log(allData);

    const evaluatedData = this.page.evaluate((element) => {
        return element.textContent;
      }, allData);
    this.data = evaluatedData;
    console.log(evaluatedData);
  }

  todayis() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1);
    const day = now.getDate();
    const result = `${year}${month < 10 ? `0${month}` : month}${day < 10 ? `0${day}` : day}`;
    this.today = result;
  }

  async closeBrowser() {
    await this.browser.close();
    await console.log("Crawl completed!");
  }
}