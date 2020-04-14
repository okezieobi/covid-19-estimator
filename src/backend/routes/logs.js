export default (router) => {
  router.get('/on-covid-19/logs', (req, res) => {
    res.locals.logData.logs.push();
    const logMessageObjects = res.locals.logData.logs.map(
      ({
        path, method, status, processTime
      }) => `${method}  ${path}  ${status}  ${processTime}ms`
    );
    const messages = logMessageObjects.join('\r\n');
    res.status(200).send(messages);
  });
};
