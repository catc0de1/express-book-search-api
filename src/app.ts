import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './modules/app.routes';

import type { Application } from 'express';

const app: Application = express();

app.use(helmet());
app.use(express.json());

app.use('/api', cors(), routes);

export default app;
