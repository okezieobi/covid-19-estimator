import { Router } from 'express';
import logsRouter from './logger';
import estimateRouter from './estimator';
import estimateMiddleware from '../middleware';
import Logs from '../logger';

const router = Router();
const { createOne, readAll } = Logs;

router.use(readAll);
logsRouter(router);
router.use(estimateMiddleware, createOne);
estimateRouter(router);

export default (app) => app.use('/api/v1', router);
