import { Prisma } from '@/generated/prisma/client';
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

	async getOne(req: Request, res: Response) {
		const id = Number(req.params.id);

		if (Number.isNaN(id)) {
			return res.status(400).json({ message: 'Invalid book ID' });
		}

		const book = await bookService.getOneBook(id);

		if (!book) {
			return res.status(404).json({
				message: 'Book not found'
			});
		}

		res.status(200).json({
			data: book
		});
	}

	async create(req: Request, res: Response) {
		const book = await bookService.createBook(req.body);

		res.status(201).json({
			message: 'Book created successfully',
			data: book
		});
	}

	async update(req: Request, res: Response) {
		try {
			const id = Number(req.params.id);

			if (Number.isNaN(id)) {
				return res.status(400).json({ message: 'Invalid book ID' });
			}

			const book = await bookService.updateBook(id, req.body);

			return res.json({
				message: 'Book updated successfully',
				data: book
			});
		} catch (err) {
			if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
				return res.status(404).json({
					message: 'Book not found'
				});
			}

			console.error(err);
			return res.status(500).json({
				message: 'Internal server error'
			});
		}
	}

	async delete(req: Request, res: Response) {
		try {
			const id = Number(req.params.id);

			if (Number.isNaN(id)) {
				return res.status(400).json({ message: 'Invalid book ID' });
			}

			await bookService.deleteBook(id);

			return res.json({
				message: 'Book deleted successfully'
			});
		} catch (err) {
			if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
				return res.status(404).json({
					message: 'Book not found'
				});
			}

			console.error(err);
			return res.status(500).json({
				message: 'Internal server error'
			});
		}
	}
}
