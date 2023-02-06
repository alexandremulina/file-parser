import * as fs from 'fs';

export function fileParser(file: any, options: { delimiter: string; header: boolean }) {
  const result = fs.readFileSync(file, 'utf-8');
  if (!result) {
    throw 'Error ao abrir arquivo';
  }

  const dataArray = result.split(/\r?\n/);
  const list = options.header
    ? parseWithHeader(dataArray, options.delimiter)
    : parseWithoutHeader(dataArray, options.delimiter);

  if (list.length === 0) {
    throw 'Error na formatação';
  }

  return list;
}

function parseWithHeader(dataArray: string[], delimiter: string) {
  const headers = dataArray[0].split(delimiter);
  const body = dataArray.slice(1);
  const list = [];

  for (const line of body) {
    if (line.split(delimiter).length > 1) {
      const row = line.split(delimiter);
      if (headers.length !== row.length) {
        throw 'Error formato';
      }

      const newObj = {} as any;
      for (let i = 0; i < headers.length; i++) {
        newObj[headers[i]] = row[i];
      }

      list.push(newObj);
    }
  }

  return list;
}

function parseWithoutHeader(dataArray: string[], delimiter: string) {
  const list = [];

  for (const line of dataArray) {
    if (line.split(delimiter).length > 1) {
      list.push(line.split(delimiter));
    }
  }

  return list;
}
