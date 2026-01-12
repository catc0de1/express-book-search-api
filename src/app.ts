import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './modules/app.routes';

import { sessionMiddleware } from './middlewares/session.middleware';
import { errorHandler } from './middlewares/error-handler.middleware';

import type { Application } from 'express';

const app: Application = express();

app.use(helmet());
app.use(
	cors({
		origin: true,
		credentials: true
	})
);
app.use(express.json());
app.use(sessionMiddleware);

app.use('/api', routes);

app.use(errorHandler);

export default app;
