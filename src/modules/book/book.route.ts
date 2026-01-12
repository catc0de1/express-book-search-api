import { Router } from 'express';
import { validate } from '@/middlewares/validate.middleware';
import { BookController } from './book.controller';
import { createBookSchema } from './book.validator';

import type { Router as ExpressRouter } from 'express';

const router: ExpressRouter = Router();
const bookController = new BookController();

router.get('/', bookController.getAll);
router.get('/:id', bookController.getOne);
router.post('/', validate(createBookSchema), bookController.create);
router.patch('/:id', bookController.update);
router.delete('/:id', bookController.delete);

export default router;
