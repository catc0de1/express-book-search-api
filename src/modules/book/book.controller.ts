import { BookService } from './book.service';

import type { Request, Response } from 'express';

const bookService = new BookService();

export class BookController {
	async getAll(_req: Request, res: Response) {
		try {
			const books = await bookService.getAllBook();

			res.json({
				data: books,
				total: books.length
			});
		} catch (err) {
			res.status(500).json({
				message: `Failed to fetch books: ${err}`
			});
		}
	}

	getOne() {}

	create() {}

	update() {}

	delete() {}
}
