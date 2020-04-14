import estimator from '../estimator';

export default ({ body }, res, next) => {
  const estimate = estimator(body);
  res.locals.estimate = estimate;
  res.locals.statusCode = 201;
  next();
};
