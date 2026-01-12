import { Router } from 'express';
import { adminGuard } from '@/middlewares/admin.middleware';
import { validate } from '@/middlewares/validate.middleware';
import { BookController } from './book.controller';
import { createBookSchema, updateBookSchema } from './book.validator';

import type { Router as ExpressRouter } from 'express';

const router: ExpressRouter = Router();
const bookController = new BookController();

router.get('/', bookController.getAll);
router.get('/:id', bookController.getOne);
router.post('/', adminGuard, validate(createBookSchema), bookController.create);
router.patch('/:id', adminGuard, validate(updateBookSchema), bookController.update);
router.delete('/:id', adminGuard, bookController.delete);

export default router;
