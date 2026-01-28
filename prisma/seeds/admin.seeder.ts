import bcrypt from 'bcrypt';
import { prisma } from '../../src/lib/prisma';

export async function adminSeeder() {
	const adminCount = await prisma.admin.count();

	if (adminCount > 0) {
		console.log('Admin already exist, skipping seed');
		return;
	}

	const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
	const PASSWORD_PEPPER = process.env.PASSWORD_PEPPER;
	const PASSWORD_SALT_ROUNDS = Number(process.env.PASSWORD_SALT_ROUNDS);

	if (!ADMIN_PASSWORD || !PASSWORD_PEPPER || !PASSWORD_SALT_ROUNDS) {
		throw new Error('ADMIN_PASSWORD or PASSWORD_PEPPER or PASSWORD_SALT_ROUNDS missing');
	}

	const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD + PASSWORD_PEPPER, PASSWORD_SALT_ROUNDS);

	await prisma.admin.create({
		data: {
			password: hashedPassword
		}
	});

	console.log('Admin seeded successfully');
}
