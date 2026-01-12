import { prisma } from '@/lib/prisma';

import type { CreateBookSchema, UpdateBookSchema } from './book.validator';

export class BookService {
	getAllBook() {
		return prisma.book.findMany({
			orderBy: {
				createdAt: 'desc'
			}
		});
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
