import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './modules/app.routes';

import type { Application } from 'express';
import { errorHandler } from './middlewares/error-handler.middleware';

const app: Application = express();

app.use(helmet());
app.use(express.json());

app.use('/api', cors(), routes);
app.use(errorHandler);

export default app;
