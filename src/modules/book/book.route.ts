import { Router } from 'express';
import { BookController } from './book.controller';

import type { Router as ExpressRouter } from 'express';

const router: ExpressRouter = Router();
const bookController = new BookController();

router.get('/', bookController.getAll);
router.get('/:id', bookController.getOne);
router.post('/', bookController.create);
router.patch('/:id', bookController.update);
router.delete('/:id', bookController.delete);

export default router;
