import Logs from '../logs';

export default (router) => {
  const { createOne, readAll } = Logs;

  router.use(readAll, createOne, readAll);

  router.get('/on-covid-19/logs', (req, res) => {
    const logMessageObjects = res.locals.logData.logs.map(
      ({
        path, method, status, processTime
      }) => `${method}  ${path}  ${status}  ${processTime}ms`
    );
    const messages = logMessageObjects.join('\r\n');
    res.status(200).type('text').send(messages);
  });
};
