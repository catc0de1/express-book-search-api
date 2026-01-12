import 'dotenv/config';
import bcrypt from 'bcrypt';
import { prisma } from '../src/lib/prisma';

async function main() {
	const adminCount = await prisma.admin.count();

	if (adminCount > 0) {
		console.log('Admin already exist, skipping seed');
		return;
	}

	const password = process.env.ADMIN_PASSWORD;
	const pepper = process.env.PASSWORD_PEPPER;

	if (!password || !pepper) {
		throw new Error('ADMIN_PASSWORD or PASSWORD_PEPPER missing');
	}

	const hashedPassword = await bcrypt.hash(password + pepper, 12);

	await prisma.admin.create({
		data: {
			password: hashedPassword
		}
	});

	console.log('Admin seeded successfully');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
