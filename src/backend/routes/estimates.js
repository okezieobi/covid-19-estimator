import estimator from '../../estimator';

export default (router) => {
  router.post('/on-covid-19', ({ body }, res, next) => {
    res.locals.statusCode = 201;
    res.status(201).json(estimator(body));
    next();
  });

  router.post('/on-covid-19/json', ({ body }, res) => {
    res.locals.statusCode = 201;
    res.status(201).json(estimator(body));
  });

  router.post('/on-covid-19/xml', ({ body }, res) => {
    res.locals.statusCode = 201;
    res.status(201).type('xml').send(estimator(body));
  });
};
