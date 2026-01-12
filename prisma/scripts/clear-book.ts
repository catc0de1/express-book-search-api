import 'dotenv/config';
import { prisma } from '../../src/lib/prisma';

async function main() {
	console.log('Deleting books...');

	const result = await prisma.book.deleteMany();

	console.log(`Deleted ${result.count} books`);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
