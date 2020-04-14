import fs from 'fs';
import * as pathFunc from 'path';

export default class Logs {
  static readAll(req, res, next) {
    fs.readFile(pathFunc.resolve(__dirname, 'logs.json'), (error, data) => {
      if (error) next(error);
      else {
        res.locals.logData = JSON.parse(data);
        res.locals.reqProcessingStart = Date.now();
        next();
      }
    });
  }

  static createOne({ path, method },
    { locals: { logData, reqProcessingStart, statusCode } }, next) {
    logData.logs.push({
      path,
      method,
      status: statusCode || 200,
      processTime: Date.now() - reqProcessingStart
    });
    const newData = JSON.stringify(logData);
    fs.writeFile(pathFunc.resolve(__dirname, 'logs.json'), newData, 'utf8', (error) => next(error) || next());
  }
}
