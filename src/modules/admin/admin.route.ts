import { Router } from 'express';
import { AdminController } from './admin.controller';
import { authLimiter } from '@/middlewares/rate-limit.middleware';
import { validate } from '@/middlewares/validate.middleware';
import { changePasswordSchema, loginSchema } from './admin.validator';

import type { Router as ExpressRouter } from 'express';

const router: ExpressRouter = Router();
const adminController = new AdminController();

router.post('/login', authLimiter, validate(loginSchema), adminController.login);
router.post('/logout', adminController.logout);
router.post('/change-password', validate(changePasswordSchema), adminController.changePassword);

export default router;
