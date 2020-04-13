import estimator from '../estimator';

export default ({ body }, res, next) => {
  res.locals.reqProcessingStart = Date.now();
  const estimate = estimator(body);
  res.locals.estimate = estimate;
  next();
};
