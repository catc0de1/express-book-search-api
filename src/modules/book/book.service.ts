import { prisma } from '@/lib/prisma';

import type { createBookSchema, updateBookSchema } from './book.validator';

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

	updateBook(id: number, body: updateBookSchema) {
		return prisma.book.update({
			where: { id },
			data: body
		});
	}
}
