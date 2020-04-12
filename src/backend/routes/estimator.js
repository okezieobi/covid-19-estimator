export default (router) => {
  router.post('/on-covid-19', (req, res) => res.status(201).json(res.locals.estimate));

  router.post('/on-covid-19/json', (req, res) => res.status(201).json(res.locals.estimate));

  router.post('/on-covid-19/xml', (req, res) => res.status(201).type('xml').send(res.locals.estimate));
};
