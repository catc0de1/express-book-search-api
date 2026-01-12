import { Router } from 'express';
import BookRoutes from './book/book.route';
import AdminRoutes from './admin/admin.route';
import HealthRoutes from './health/health.route';
import { adminGuard } from '@/middlewares/admin.middleware';

import type { Router as ExpressRouter } from 'express';

const router: ExpressRouter = Router();

router.use('/books', BookRoutes);
router.use('/admin', AdminRoutes);
router.use('/health', adminGuard, HealthRoutes);

export default router;
