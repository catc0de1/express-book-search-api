import { CategoryService } from './category.service';

import type { Request, Response } from 'express';

const categoryService = new CategoryService();

export class CategoryController {
	getAll(_req: Request, res: Response) {
		res.status(200).json({
			data: categoryService.getAll()
		});
	}
}
