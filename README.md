## Typescript로 웹크롤링하여 매일 운세를 저장해보자

- 일시 : 2021. 04. 28

- 목적 : NHK의 오하아사(おはよう朝日です)의 [별자리 운세](https://www.asahi.co.jp/ohaasa/week/horoscope/)를 크롤링하여 저장해보기

- 사용한 기술 스택: ![TechBadge](https://img.shields.io/badge/Node.js-v14.15.0-green) ![TechBadge](https://img.shields.io/badge/Typescript-v4.2.4-blue) ![TechBadge](https://img.shields.io/badge/puppeteer-v9.0.0-purple)

- index.ts

```typescript
import * as puppeteer from "puppeteer"; // 웹크롤링용 puppeteer모듈
import * as fs from "fs"; // 텍스트 파일 저장용 fs모듈

(async () => {
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

- txt파일로 저장한 후에 이 객체를 불러들여 처리 할 모듈 textProcessing.ts를 생성

- textProcessing.ts

```typescript
import * as fs from "fs";

let today = `${new Date().getFullYear()}${
  new Date().getMonth() + 1
}${new Date().getDate()}`;
let originalData = fs.readFileSync(`./ohaasa/ohaasa${today}.txt`, {
  encoding: "utf-8",
});
console.log(
  originalData
    .replace(/  /gi, "") // 빈공간 삭제
    .replace(/\t/gi, "") // 탭
    .split("\n") // 엔터를 구분자로 나누기
    .filter((item) => item !== "") // 그래도 빈 문자배열이 있으므로 filter
);
/*
[
  '今日の星占いランキング',
  '4月28日（水）の運勢',
  '1ふたご座',
  '【成功を引き寄せられるかも】 向上心を持って取り組んで！ライバルも協力してくれるよ',
  '2てんびん座',
  '【ゆったり優雅に過ごせる日】 お気に入りの本を読もう',
  '3みずがめ座',
  '【大胆な行動で運気ＵＰ】 思い切ったイメージチェンジを！',
  '4しし座',
  '【刺激的な１日になる予感】 興味のある事を調べてみて',
  '5いて座',
  '【しっかりと結果を残せる時】 焦らず平常心を保ってね',
  '6おひつじ座',
  '【チャレンジ精神がみなぎりそう】 遠慮せず積極的に動くとＧＯＯＤ',
  '7かに座',
  '【余計な一言に気をつけて】 相手とは適度な距離を置こう',
  '8さそり座',
  '【思いやりのつもりがお節介に】 自分のやるべき事を思い出して',
  '9うお座',
  '【ハプニングが起こるかも】 落ち着いて判断すれば大丈夫',
  '10おとめ座',
  '【ルーズになってしまいそう】 規則正しい生活を心掛けて',
  '11やぎ座',
  '【ケアレスミスに注意が必要】 書類は何回もチェックしてね',
  '12おうし座',
  '【ちょっとした事でイライラ】 きょうは一人で過ごしては？ハーブティーを飲んでリラックス'
]
*/
```
