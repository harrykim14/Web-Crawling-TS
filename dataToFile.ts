import * as fs from "fs";
import OhaAsaCrawler from './crawler'

export default class App {
    crawler: typeof OhaAsaCrawler; 
    constructor(crawler){
        this.crawler = crawler;
    }        
}

const excute = async () => {
    try {
   const luckOftoday = new OhaAsaCrawler();
   await luckOftoday.init()
                    .then(luckOftoday.gotoPageForData)
                    .then(luckOftoday.closeBrowser);
//    await console.log(luckOftoday.page); -> confirmed
   await console.log(luckOftoday.data);
   const today = luckOftoday.todayis();
   console.log(today);
    } catch(error) {
        console.error(error);
    }

}

excute();