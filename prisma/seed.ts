import 'dotenv/config';

import { prisma } from '../src/lib/prisma';
import { adminSeeder } from './seeds/admin.seeder';
import { bookSeeder } from './seeds/book.seeder';

async function main() {
	console.log('🌱 Seeding database...\n');

	await adminSeeder();
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
