import { prisma } from '@/lib/prisma';

import type { CreateBookLocationSchema, UpdateBookLocationSchema } from './book-location.validator';

export class BookLocationService {
	getAll() {
		return prisma.bookLocation.findMany();
	}

	create(body: CreateBookLocationSchema) {
		return prisma.bookLocation.create({
			data: {
				name: body.name
			}
		});
	}

	update(id: number, data: UpdateBookLocationSchema) {
		return prisma.bookLocation.update({
			where: { id },
			data: {
				name: data.name
			}
		});
	}

	async delete(id: number) {
		const bookCount = await prisma.book.count({
			where: { bookLocationId: id }
		});

		if (bookCount > 0) {
			throw new Error('Cannot delete book location with associated books');
		}

		return prisma.bookLocation.delete({
			where: { id }
		});
	}

	findUnique(name: string) {
		return prisma.bookLocation.findUnique({
			where: { name }
		});
	}
}
