import { Router } from 'express';
import { adminGuard } from '@/middlewares/admin.middleware';
import { validate } from '@/middlewares/validate.middleware';
import { BookLocationController } from './book-location.controller';
import { createBookLocationSchema, updateBookLocationSchema } from './book-location.validator';

import type { Router as ExpressRouter } from 'express';

const router: ExpressRouter = Router();
const bookLocationController = new BookLocationController();

router.get('/', bookLocationController.getAll);
router.post('/', adminGuard, validate(createBookLocationSchema), bookLocationController.create);
router.put('/:id', adminGuard, validate(updateBookLocationSchema), bookLocationController.update);
router.delete('/:id', adminGuard, bookLocationController.delete);

export default router;
