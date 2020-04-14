import { Router } from 'express';
import logsRoutes from './logs';
import estimateRoutes from './estimates';

const logsRouter = Router();
const estimatesRouter = Router();

logsRoutes(logsRouter);
estimateRoutes(estimatesRouter);

export default (app) => app.use('/api/v1', logsRouter, estimatesRouter);
