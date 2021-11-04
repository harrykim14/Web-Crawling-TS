"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var puppeteer_1 = require("puppeteer");
var OhaAsaCrawler = /** @class */ (function () {
    function OhaAsaCrawler() {
    }
    OhaAsaCrawler.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, puppeteer_1.launch()];
                    case 1:
                        _a.browser = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this.browser.newPage()];
                    case 2:
                        _b.page = _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    OhaAsaCrawler.prototype.gotoPageForData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var crawlingURL, Selector, allData, evaluatedData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        crawlingURL = "https://www.asahi.co.jp/ohaasa/week/horoscope/";
                        return [4 /*yield*/, this.page.goto(crawlingURL, { waitUntil: "networkidle2" })];
                    case 1:
                        _a.sent();
                        Selector = "body > div.wrap > div > div.wrap_column > article";
                        return [4 /*yield*/, this.page.$(Selector)];
                    case 2:
                        allData = _a.sent();
                        console.log(allData);
                        evaluatedData = this.page.evaluate(function (element) {
                            return element.textContent;
                        }, allData);
                        this.data = evaluatedData;
                        console.log(evaluatedData);
                        return [2 /*return*/];
                }
            });
        });
    };
    OhaAsaCrawler.prototype.todayis = function () {
        var now = new Date();
        var year = now.getFullYear();
        var month = (now.getMonth() + 1);
        var day = now.getDate();
        var result = "" + year + (month < 10 ? "0" + month : month) + (day < 10 ? "0" + day : day);
        this.today = result;
    };
    OhaAsaCrawler.prototype.closeBrowser = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.browser.close()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, console.log("Crawl completed!")];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return OhaAsaCrawler;
}());
exports.default = OhaAsaCrawler;
//# sourceMappingURL=crawler.js.map