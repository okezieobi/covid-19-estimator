import estimates from '../estimates';
import Logs from '../logs';

export default (router) => {
  const { createOne, readAll } = Logs;

  router.use(readAll, estimates);

  router.post('/on-covid-19', (req, res) => res.status(201).json(res.locals.estimate));

  router.post('/on-covid-19/json', (req, res) => res.status(201).json(res.locals.estimate));

  router.post('/on-covid-19/xml', (req, res) => res.status(201).type('xml').send(res.locals.estimate));

  router.use(createOne);
};
