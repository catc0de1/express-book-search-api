import { prisma } from '../../src/lib/prisma';
import { data } from './data/book.data';

import type { Prisma } from '../../src/generated/prisma/client';

export async function bookSeeder() {
	const bookCount = await prisma.book.count();

	if (bookCount > 0) {
		console.log('Books already exist, skipping seed');
		return;
	}

	await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
		for (const item of data) {
			const location = await tx.bookLocation.upsert({
				where: { name: item.bookLocation },
				update: {},
				create: { name: item.bookLocation }
			});

			await tx.book.create({
				data: {
					title: item.title,
					author: item.author,
					year: item.year,
					publisher: item.publisher,
					description: item.description,
					category: item.category,
					bookLocationId: location.id
				}
			});
		}
	});

	console.log('Books seeded successfully');
}
