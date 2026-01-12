import { BookService } from './book.service';

import type { Request, Response } from 'express';

const bookService = new BookService();

export class BookController {
	async getAll(_req: Request, res: Response) {
		const books = await bookService.getAllBook();

		res.status(200).json({
			data: books,
			total: books.length
		});
	}

	getOne() {}

	async create(req: Request, res: Response) {
		const book = await bookService.createBook(req.body);

		res.status(201).json({
			message: 'Book created successfully',
			data: book
		});
	}

	update() {}

	delete() {}
}
