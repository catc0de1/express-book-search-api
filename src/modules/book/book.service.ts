import { prisma } from '@/lib/prisma';
import { BookLocationService } from '@/modules/book-location/book-location.service';

import type { Prisma } from '@/generated/prisma/client';
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
	bookLocationSort?: 'asc' | 'desc' | null;

	bookLocationFilter?: string | null;
	titleFilter?: string | null;
}

const bookLocationService = new BookLocationService();

export class BookService {
	async getAll(query?: getAllBookQuery) {
		const page = query?.page ?? 1;
		const limit = query?.limit ?? 10;

		const orderBy: Prisma.BookOrderByWithRelationInput[] = [];

		if (query?.createdAtSort) orderBy.push({ createdAt: query.createdAtSort });
		if (query?.titleSort) orderBy.push({ title: query.titleSort });
		if (query?.authorSort) orderBy.push({ author: query.authorSort });
		if (query?.yearSort) orderBy.push({ year: query.yearSort });
		if (query?.publisherSort) orderBy.push({ publisher: query.publisherSort });
		if (query?.categorySort) orderBy.push({ category: query.categorySort });
		if (query?.bookLocationSort) orderBy.push({ bookLocation: { name: query.bookLocationSort } });

		if (orderBy.length === 0) {
			orderBy.push({ createdAt: 'desc' });
		}

		const where: Prisma.BookWhereInput = {};

		if (query?.titleFilter) {
			where.title = { contains: query.titleFilter, mode: 'insensitive' };
		}

		if (query?.bookLocationFilter) {
			where.bookLocation = {
				name: {
					contains: query.bookLocationFilter,
					mode: 'insensitive'
				}
			};
		}

		const [books, total] = await Promise.all([
			prisma.book.findMany({
				where,
				include: {
					bookLocation: true
				},
				orderBy,
				skip: (page - 1) * limit,
				take: limit
			}),
			prisma.book.count({ where })
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

	getOne(id: number) {
		return prisma.book.findUnique({
			where: { id },
			include: {
				bookLocation: true
			}
		});
	}

	async create(body: CreateBookSchema) {
		const location = await bookLocationService.findUnique(body.bookLocation);

		if (!location) {
			throw new Error('Book location does not exist');
		}

		return prisma.book.create({
			data: {
				title: body.title,
				author: body.author,
				year: body.year,
				publisher: body.publisher,
				description: body.description,
				category: body.category,
				bookLocation: {
					connect: {
						name: body.bookLocation
					}
				}
			}
		});
	}

	async update(id: number, body: UpdateBookSchema) {
		if (body.bookLocation) {
			const location = await bookLocationService.findUnique(body.bookLocation);

			if (!location) {
				throw new Error('Book location does not exist');
			}
		}

		return prisma.book.update({
			where: { id },
			data: {
				...(body.title && { title: body.title }),
				...(body.author && { author: body.author }),
				...(body.year && { year: body.year }),
				...(body.publisher !== undefined && { publisher: body.publisher }),
				...(body.description !== undefined && { description: body.description }),
				...(body.category && { category: body.category }),
				...(body.bookLocation && {
					bookLocation: {
						connect: {
							name: body.bookLocation
						}
					}
				})
			}
		});
	}

	delete(id: number) {
		return prisma.book.delete({
			where: { id }
		});
	}
}
