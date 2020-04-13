export default (router) => {
  router.get('/on-covid-19/logs', (req, res) => {
    const logMessageObjects = res.locals.logData.logs.map(
      ({ path, timestamp, processTime }) =>
        `${timestamp}  ${path}  done in ${processTime} seconds`
    );
    const messages = logMessageObjects.join('\r\n');
    res.status(200).send(messages);
  });
};
