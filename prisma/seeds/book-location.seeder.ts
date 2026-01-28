import { prisma } from '../../src/lib/prisma';
import { data } from './data/book-location.data';

export async function bookLocationSeeder() {
	const bookLocationCount = await prisma.bookLocation.count();

	if (bookLocationCount > 0) {
		console.log('Book Locations already exist, skipping seed');
		return;
	}

	await prisma.bookLocation.createMany({ data });

	console.log('Book Locations seeded successfully');
}
