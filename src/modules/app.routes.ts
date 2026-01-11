import { Router } from 'express';
import BookRoutes from './book/book.route';
import HealthRoutes from './health/health.route';

import type { Router as ExpressRouter } from 'express';

const router: ExpressRouter = Router();

router.use('/books', BookRoutes);
router.use('/health', HealthRoutes);

export default router;
