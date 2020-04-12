export default (router) => {
  router.get('/on-covid-19/logs', (req, res) => res.status(200).send(res.locals.logData));
};
