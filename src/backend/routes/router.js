import { Router } from 'express';
import estimateRoutes from './estimates';
import { readAll, createOne } from '../logs';
import logRoutes from './logs';

const router = Router();

router.use(readAll);
estimateRoutes(router);
router.use(createOne);
router.use(readAll);
logRoutes(router);

export default (app) => app.use('/api/v1', router);
