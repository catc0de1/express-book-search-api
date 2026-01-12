import { prisma } from '@/lib/prisma';

import type { CreateBookSchema, UpdateBookSchema } from './book.validator';

interface getAllBookQuery {
	page?: number;
	limit?: number;
	createdAtSort?: 'asc' | 'desc' | null;
	titleSort?: 'asc' | 'desc' | null;
	authorSort?: 'asc' | 'desc' | null;
	yearSort?: 'asc' | 'desc' | null;
	publisherSort?: 'asc' | 'desc' | null;
	categorySort?: 'asc' | 'desc' | null;
	titleFilter?: string | null;
}

export class BookService {
	async getAllBook(query?: getAllBookQuery) {
		const page = query?.page ?? 1;
		const limit = query?.limit ?? 10;

		const orderBy: Record<string, 'asc' | 'desc'>[] = [];

		if (query?.createdAtSort) orderBy.push({ createdAt: query.createdAtSort });
		if (query?.titleSort) orderBy.push({ title: query.titleSort });
		if (query?.authorSort) orderBy.push({ author: query.authorSort });
		if (query?.yearSort) orderBy.push({ year: query.yearSort });
		if (query?.publisherSort) orderBy.push({ publisher: query.publisherSort });
		if (query?.categorySort) orderBy.push({ category: query.categorySort });

		if (orderBy.length === 0) {
			orderBy.push({ createdAt: 'desc' });
		}

		const [books, total] = await Promise.all([
			prisma.book.findMany({
				where: query?.titleFilter
					? { title: { contains: query.titleFilter, mode: 'insensitive' } }
					: {},
				orderBy,
				skip: (page - 1) * limit,
				take: limit
			}),
			prisma.book.count({
				where: query?.titleFilter
					? { title: { contains: query.titleFilter, mode: 'insensitive' } }
					: {}
			})
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
