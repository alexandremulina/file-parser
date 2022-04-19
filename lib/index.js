"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileParser = void 0;
var fs = require("fs");
function fileParser(file, options) {
    switch (options.header) {
        case true:
            var list = [];
            var result = fs.readFileSync(file, "utf-8");
            if (!result) {
                throw "Error ao abrir arquivo";
            }
            var dataArray = result.split(/\r?\n/);
            var headers = dataArray[0].split(options.delemiter);
            var body = dataArray.slice(1);
            for (var line in body) {
                if (body[line].split(";").length > 1) {
                    var row = body[line].split(";");
                    // console.log(`Header ${headers.length}`, `Row ${row.length}`);
                    if (headers.length != row.length) {
                        throw "Error formato";
                    }
                    var newObj = {};
                    for (var value in headers) {
                        newObj[headers[value]] = row[value];
                    }
                    list.push(newObj);
                }
            }
            if (list.length === 0) {
                throw "Error na formatação";
            }
            return list;
        case false:
            var noHeaderList = [];
            console.log(options);
            var noHeaderResult = fs.readFileSync(file, "utf-8");
            if (!noHeaderResult) {
                throw "Error ao abrir arquivo";
            }
            var noHeaderData = noHeaderResult.split(/\r?\n/);
            for (var line in noHeaderData) {
                if (noHeaderData[line].split(options.delemiter).length > 1) {
                    var row = noHeaderData[line].split(options.delemiter);
                    noHeaderList.push(row);
                }
            }
            if (noHeaderList.length === 0) {
                throw "Error na formatação";
            }
            return noHeaderList;
    }
}
exports.fileParser = fileParser;
