import { prisma } from '@/lib/prisma';

import type { createBookSchema } from './book.validator';

export class BookService {
	getAllBook() {
		return prisma.book.findMany({
			orderBy: {
				createdAt: 'desc'
			}
		});
	}

	createBook(body: createBookSchema) {
		return prisma.book.create({
			data: body
		});
	}
}
