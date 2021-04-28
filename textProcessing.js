"use strict";
exports.__esModule = true;
var fs = require("fs");
var today = "" + new Date().getFullYear() + (new Date().getMonth() + 1) + new Date().getDate();
var originalData = fs.readFileSync("./ohaasa/ohaasa" + today + ".txt", {
    encoding: "utf-8"
});
console.log(originalData
    .replace(/  /gi, "")
    .replace(/\t/gi, "")
    .split("\n")
    .filter(function (item) { return item !== ""; }));
