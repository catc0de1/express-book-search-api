import { Router } from 'express';
import BookRoutes from './book/book.route';
import HealthRoutes from './health/health.route';

import type { Router as ExpressRouter } from 'express';

const router: ExpressRouter = Router();

router.get('/books', BookRoutes);
router.get('/health', HealthRoutes);

export default router;
