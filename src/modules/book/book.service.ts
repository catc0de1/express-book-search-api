import { prisma } from '@/lib/prisma';

import type { CreateBookSchema, UpdateBookSchema } from './book.validator';

interface getAllBookQuery {
	page?: number;
	limit?: number;
	sort?: 'asc' | 'desc';
}

export class BookService {
	async getAllBook(query?: getAllBookQuery) {
		const page = query?.page ?? 1;
		const limit = query?.limit ?? 10;
		const sort = query?.sort ?? 'desc';

		const [books, total] = await Promise.all([
			prisma.book.findMany({
				orderBy: {
					createdAt: sort
				},
				skip: (page - 1) * limit,
				take: limit
			}),
			prisma.book.count()
		]);

		const totalPages = Math.ceil(total / limit);

		return {
			meta: {
				total,
				page,
				limit,
				totalPages
			},
			data: books
		};
	}

	getOneBook(id: number) {
		return prisma.book.findUnique({
			where: { id }
		});
	}

	createBook(body: CreateBookSchema) {
		return prisma.book.create({
			data: body
		});
	}

	updateBook(id: number, body: UpdateBookSchema) {
		return prisma.book.update({
			where: { id },
			data: body
		});
	}

	deleteBook(id: number) {
		return prisma.book.delete({
			where: { id }
		});
	}
}
