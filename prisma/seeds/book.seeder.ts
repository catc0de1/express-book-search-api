import { prisma } from '../../src/lib/prisma';
import { data } from './data/book.data';

export async function bookSeeder() {
	const bookCount = await prisma.book.count();

	if (bookCount > 0) {
		console.log('Books already exist, skipping seed');
		return;
	}

	await prisma.book.createMany({ data });

	console.log('Books seeded successfully');
}
