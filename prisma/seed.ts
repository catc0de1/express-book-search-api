import 'dotenv/config';

import { prisma } from '../src/lib/prisma';
import { adminSeeder } from './seeds/admin.seeder';
import { bookLocationSeeder } from './seeds/book-location.seeder';
import { bookSeeder } from './seeds/book.seeder';

async function main() {
	console.log('🌱 Seeding database...\n');

	await adminSeeder();
	await bookLocationSeeder();
	await bookSeeder();

	console.log('\n🌱 Seeding finished');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
