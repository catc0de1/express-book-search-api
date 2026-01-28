import { Router } from 'express';
import { CategoryController } from './category.controller';

import type { Router as ExpressRouter } from 'express';

const router: ExpressRouter = Router();
const categoryController = new CategoryController();

router.get('/', categoryController.getAll);

export default router;
