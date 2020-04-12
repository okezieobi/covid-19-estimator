import 'core-js/stable';
import 'regenerator-runtime/runtime';
import express from 'express';
import cors from 'cors';
import allRoutes from './routes/router';
import { handleServerErrs } from './errors';


const app = express();

app.use(cors(), express.urlencoded({ extended: true }), express.json());

allRoutes(app);

app.use(handleServerErrs);

export default app;
