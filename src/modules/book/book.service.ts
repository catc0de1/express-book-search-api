import { prisma } from '@/lib/prisma';

export class BookService {
	getAllBook() {
		return prisma.book.findMany({
			orderBy: {
				createdAt: 'desc'
			}
		});
	}

	getOneBook() {
		return;
	}
}
