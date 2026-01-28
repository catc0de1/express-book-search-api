import 'dotenv/config';
import { prisma } from '../../src/lib/prisma';

async function main() {
	console.log('Deleting books...\n');

	const bookResult = await prisma.book.deleteMany();
	const bookLocationResult = await prisma.bookLocation.deleteMany();

	console.log(`Deleted ${bookResult.count} books`);
	console.log(`Deleted ${bookLocationResult.count} book locations\n`);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
