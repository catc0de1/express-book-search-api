import { Prisma } from '@/generated/prisma/client';
import { BookService } from './book.service';

import type { NextFunction, Request, Response } from 'express';

const bookService = new BookService();

export class BookController {
	async getAll(req: Request, res: Response) {
		const page = Number(req.query.page) || 1;
		const limit = Number(req.query.limit) || 10;

		const parseSort = (value: unknown): 'asc' | 'desc' | null => {
			if (value === 'asc') return 'asc';
			if (value === 'desc') return 'desc';
			return null;
		};
		const parseFilter = (value: string): string | null => {
			if (value && value.trim() !== '') return value;
			return null;
		};

		const query = {
			page,
			limit,
			createdAtSort: parseSort(req.query.createdAtSort),
			titleSort: parseSort(req.query.titleSort),
			authorSort: parseSort(req.query.authorSort),
			yearSort: parseSort(req.query.yearSort),
			publisherSort: parseSort(req.query.publisherSort),
			categorySort: parseSort(req.query.categorySort),
			bookLocationSort: parseSort(req.query.bookLocationSort),
			titleFilter: parseFilter(req.query.titleFilter as string)
		};

		const result = await bookService.getAll(query);

		res.status(200).json(result);
	}

	async getOne(req: Request, res: Response) {
		const id = Number(req.params.id);

		if (Number.isNaN(id)) {
			return res.status(400).json({ message: 'Invalid book ID' });
		}

		const book = await bookService.getOne(id);

		if (!book) {
			return res.status(404).json({
				message: 'Book not found'
			});
		}

		res.status(200).json({
			data: book
		});
	}

	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const book = await bookService.create(req.body);

			res.status(201).json({
				message: 'Book created successfully',
				data: book
			});
		} catch (err) {
			next(err);
		}
	}

	async update(req: Request, res: Response) {
		try {
			const id = Number(req.params.id);

			if (Number.isNaN(id)) {
				return res.status(400).json({ message: 'Invalid book ID' });
			}

			const book = await bookService.update(id, req.body);

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

			await bookService.delete(id);

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
