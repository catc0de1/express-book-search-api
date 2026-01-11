import { Router } from 'express';
import { HealthController } from './health.controller';

import type { Router as ExpressRouter } from 'express';

const router: ExpressRouter = Router();
const healthController = new HealthController();

router.get('/', healthController.apiCheck);
router.get('/db', healthController.dbCheck);

export default router;
