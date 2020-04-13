import { Router } from 'express';
import logsRouter from './logs';
import estimateRouter from './estimates';
import estimateMiddleware from '../estimates';
import Logs from '../logs';

const router = Router();
const { createOne, readAll } = Logs;

router.use(readAll);
logsRouter(router);
router.use(estimateMiddleware, createOne);
estimateRouter(router);

export default (app) => app.use('/api/v1', router);
