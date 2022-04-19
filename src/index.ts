import * as fs from 'fs';

export function fileParser(file: any, options: { delemiter: string; header: boolean }) {
  switch (options.header) {
    case true:
      const list = [];
      const result = fs.readFileSync(file, 'utf-8');
      if (!result) {
        throw 'Error ao abrir arquivo';
      }
      const dataArray = result.split(/\r?\n/);
      const headers = dataArray[0].split(options.delemiter);
      const body = dataArray.slice(1);

      for (const line in body) {
        if (body[line].split(';').length > 1) {
          const row = body[line].split(';');
          // console.log(`Header ${headers.length}`, `Row ${row.length}`);
          if (headers.length != row.length) {
            throw 'Error formato';
          }
          const newObj: any = {};
          for (const value in headers) {
            newObj[headers[value]] = row[value];
          }
          list.push(newObj);
        }
      }
      if (list.length === 0) {
        throw 'Error na formatação';
      }
      return list;

    case false:
      const noHeaderList = [];
      console.log(options);
      const noHeaderResult = fs.readFileSync(file, 'utf-8');
      if (!noHeaderResult) {
        throw 'Error ao abrir arquivo';
      }
      const noHeaderData = noHeaderResult.split(/\r?\n/);
      for (const line in noHeaderData) {
        if (noHeaderData[line].split(options.delemiter).length > 1) {
          const row = noHeaderData[line].split(options.delemiter);
          noHeaderList.push(row);
        }
      }

      if (noHeaderList.length === 0) {
        throw 'Error na formatação';
      }

      return noHeaderList;
  }
}
